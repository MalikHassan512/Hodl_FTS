import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView
} from "react-native"
import profile from "../../../assets/profile.png"
import { MaterialIcons } from "@expo/vector-icons"
import image3 from "../../../assets/3.png"
import Screen from "../../component/core/Screen"
import { FontAwesome5 } from "@expo/vector-icons"
import Cross from "../../../assets/icons/iconss/cross2.svg"
import colors from "../../config/colors"
import { Zocial } from "@expo/vector-icons"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { FontAwesome } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"
import { Octicons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import ImagePicker from "react-native-image-picker"
import defaultStyles from "../../config/defaultStyles"
import ChatVedioCall from "../../../assets/icons/iconss/ChatVedioCall.svg"
import ChatAudioCall from "../../../assets/icons/iconss/ChayAudioCall.svg"
import ChatMic from "../../../assets/icons/iconss/ChatMic.svg"
import AppCameraformik from "../../component/forms/AppCameraformik"
import apiClient from "../../api/client"
import AddEmoji from "../../../assets/icons/iconss/AddEmoji.svg"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"
import Clipboard from "@react-native-clipboard/clipboard"
import { SocketContext } from "../../component/socket/SocketProvider"
import AppText from "../../component/core/AppText"
import fonts from "../../../assets/fonts"
import { AntDesign, Entypo } from "@expo/vector-icons"
import FileMessage from "../../component/core/FileMessage"
import ForwardModal from "./ForwardModal"
import Disappear from "../../../assets/icons/iconss/disappear.svg"
import { saveToDevice } from "../../component/core/raw"
import ReplyTo from "../../component/chat/ReplyTo"
import ReplyView from "../../component/chat/ReplyView"
import SendComponent from "../../component/chat/SendComponent"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import { isAndroid } from "../../config/plaform"
import LinearGradient from "react-native-linear-gradient"
export default function GroupChatScreen({ notification }) {
  const route = useRoute()
  const { id, name, item: chatInfo } = route.params
  console.log(chatInfo, "info")
  const [cameraRollStatus, setCameraRollStatus] = useState(chatInfo.camera_roll)
  const { userId, token } = useSelector(state => state.auth)
  const navigation = useNavigation()
  // StatusBar.setBackgroundColor(colors.header)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [newChat, setNewChat] = useState()
  const [reply, setReply] = useState()
  const [page, setPage] = useState(1)
  const [load, setLoad] = useState(true)
  const [iosProps] = useState(   Platform.OS==="ios" ? { behavior: "padding", keyboardVerticalOffset: 64 } : {})

  const [initialContentSizeChanged, setInitialContentSizeChanged] = useState(false)
  const { socket, isConnected, subscribe, unsubscribe, reconnect } = useContext(SocketContext)

  const sendMsg = () => {
    if (message.length === 0) return
    // setMessages([{ id: new Date().getTime(), type: 'send', text: message }, ...messages]);
    {
      let dataToSend = {
        message: message,
        type: "GroupMessage",
        group_id: id
      }

      if (reply !== null) {
        dataToSend.reply_id = reply?.id
      }

      socket.send(JSON.stringify(dataToSend))
      // socket.send(JSON.stringify({ message: message, type: "GroupMessage", group_id: id }))
    }
    setMessage("")
    setReply(null)
    handleCloseReaction()
  }
  useEffect(() => {
    if (!isConnected) {
      reconnect()
    }
  }, [isConnected])

  useFocusEffect(
    useCallback(() => {
      isAndroid && StatusBar.setBackgroundColor(colors.header)

      return () => {
        isAndroid && StatusBar.setBackgroundColor(colors.themeColor)
      }
    }, [])
  )

  const handleGoBack = () => {
    navigation.goBack()
  }
  useEffect(() => {
    fetchMessages()
  }, [navigation])
  const copyToClipboard = () => {
    Clipboard.setString(messages[reaction].text)
    handleCloseReaction()
  }

  useEffect(() => {
    handleMessage = e => {
      const data = JSON.parse(e.data)
      console.log(data, "socket")
      if (data?.group_id == id || data?.group == id)
        if (data.type == "GroupMessage") {
          setMessages(prevMessages => [
            !data.user
              ? {
                  id: data.id,
                  text: data.message,
                  time: data.created_at,
                  type: "server"
                }
              : {
                  id: data.id,
                  reply_to: data.reply_to?.message,
                  reply_media: data.reply_to?.media?.[0]?.file,
                  text: data.message,
                  time: data.created_at,
                  user: data.user,
                  type: userId == data.user.id ? "send" : "receive"
                },
            ...prevMessages
          ])
        } else if (data.type == "GroupMessageReaction") {
          console.log("MessageReaction", data)

          setMessages(prevMessages =>
            prevMessages.map(item => {
              if (item.id === data.message_id) {
                console.log("Found matching message:", item)
                if (!Array.isArray(item.reaction)) {
                  item.reaction = [] // Initialize 'reaction' as an array if it's not already one
                }
                let index = item.reaction.findIndex(x => x.user === data.user)
                if (index !== -1) {
                  item.reaction[index].emoji = data.emoji
                } else {
                  item.reaction.push({ emoji: data.emoji, user: data.user })
                }
              }
              return item
            })
          )
        } else if (data.type == "MessageMedia") {
          if (userId === data.user.id) {
            setMessages(prevMessages =>
              prevMessages.map(item => {
                if (item.identifier === data.identifier)
                  item = { ...item, id: data.id, type: "send", status: "" }
                return item
              })
            )
          } else
            setMessages(prevMessages => [
              {
                id: data.id,
                reply_to: data.reply_to?.message,
                reply_media: data.reply_to?.media?.[0]?.file,
                text: data.message.message,
                media: data.media.map(item => item.file),
                type: userId == data.user.id ? "send" : "receive"
              },
              ...prevMessages
            ])
        } else if (data.type == "GroupDisappearMessages") {
          setMessages(prevMessages => [
            {
              id: data.id,
              text: data.message,
              time: data.created_at,
              type: "server"
            },
            ...prevMessages
          ])
        }
    }

    if (socket) subscribe(handleMessage)

    return () => {
      unsubscribe(handleMessage)
    }
  }, [socket, subscribe, unsubscribe])

  const fetchMessages = async () => {
    let result
    if (load) {
      result = await apiClient.get(`/group_chat/${id}/?page=${page}`)

      if (!result.ok) return console.log("first error")
      console.log(result.data.results, "data msg")
      const newMessages = result.data.results.map(msg => {
        const reactions = msg.reactions
          ? msg.reactions.map(emojii => ({
              emoji: emojii.emoji, // Update 'emoji' based on your data structure
              user: emojii.user // Update 'user' based on your data structure
            }))
          : []
        if (!msg.user)
          return {
            id: msg.id,
            text: msg.message,
            time: msg.created_at,
            type: "server"
          }
        return {
          id: msg.id,
          text: msg.message,
          reply_to: msg.reply_to?.message,
          reply_media: msg.reply_to?.media?.[0]?.file,
          reaction: reactions,
          user: msg.user,
          media: msg?.media?.map(item => item.file) || [],
          time: msg.created_at,
          type: userId === msg.user?.id ? "send" : "receive"
        }
      })
      console.log(cameraRollStatus, "status11")
      if (cameraRollStatus)
        for (const item of newMessages.flatMap(msg => msg.media || [])) {
          saveToDevice(item, false)
        }
      setMessages(prevMessages => {
        // Create a Set of existing message IDs
        const existingMessageIds = new Set(prevMessages.map(msg => msg.id))

        // Filter out new messages that don't exist in prevMessages
        const uniqueNewMessages = newMessages.filter(newMsg => !existingMessageIds.has(newMsg?.id))

        // Concatenate unique new messages with prevMessages
        return [...prevMessages, ...uniqueNewMessages]
      })
      flatListRef.current.scrollToEnd({ animated: true })
    }

    setLoad(false)

    if (result?.data?.next) {
      setPage(page + 1)
    }
  }

  const flatListRef = useRef()

  const handleLoadMore = () => {
    fetchMessages()
  }
  const handleScroll = event => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent

    const isAtTop = contentOffset.y >= contentSize.height - layoutMeasurement.height

    if (isAtTop) handleLoadMore()
  }
  const handleLongPress = id => {
    setReaction(id)
  }
  const [reaction, setReaction] = useState(null)
  const [selectedEmoji, setSelectedEmoji] = useState()
  const handleCloseReaction = () => {
    setReaction(null)
    setReply(null)
  }
  const handleEmojiSelection = (emoji, id) => {
    setMessages(prevMessages =>
      prevMessages.map(item => {
        if (item.id === id) {
          if (!Array.isArray(item.reaction)) {
            item.reaction = [] // Initialize 'reaction' as an array if it's not already one
          }
          let index = item.reaction.findIndex(x => x.user === userId)
          if (index !== -1) {
            if (item.reaction[index].emoji === emoji) {
              item.reaction.splice(index, 1)
              emoji = ""
            } else item.reaction[index].emoji = emoji
          } else {
            item.reaction.push({ emoji, user: userId })
          }
        }
        return item
      })
    )

    console.log(
      emoji,
      "emoji _____________________",
      emoji.length,
      "______________________________________"
    )
    socket.send(JSON.stringify({ emoji: emoji, type: "GroupMessageReaction", message_id: id }))

    setReaction(null)
  }
  const msgDelete = () => {
    console.log("+++++++++++++++++")
    socket.send(JSON.stringify({ type: "GroupMessageDelete", message_id: messages[reaction].id }))
    const filteredMessages = messages.filter(message => message.id !== messages[reaction].id)
    setMessages(filteredMessages)
    handleCloseReaction()
  }
  const starredmsg = () => {
    socket.send(
      JSON.stringify({ type: "GroupStarredMessage", group_id: id, msgs: messages[reaction].id })
    )
    handleCloseReaction()
  }
  const appendMessage = data => {
    console.log(data, "df1")
    setMessages(prevMessages => [
      {
        id: data.id,
        text: data.message,
        time: data.created_at,
        media: data.file,
        name: data.user?.name,
        identifier: data.identifier,
        status: "sending",
        type: "send"
      },
      ...prevMessages
    ])
  }

  return (
    <AppWrapper color={colors.header}>
      <GradientWrapper>
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[{ flex: 1 }]}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
        {...iosProps}
        >
          <View style={[styles.container, { backgroundColor: notification && colors.header }]}>
            {!notification && (
              <>
                {reaction !== null ? (
                  <View
                    style={{
                      paddingHorizontal: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: colors.header
                    }}>
                    <View style={[styles.item1, { width: "100%" }]}>
                      <TouchableOpacity onPress={() => handleCloseReaction()}>
                        <MaterialIcons
                          name="keyboard-arrow-left"
                          size={24}
                          color="white"
                          style={{ marginRight: 10 }}
                        />
                      </TouchableOpacity>
                      <View />
                      <View
                        style={[
                          { width: "100%", flexDirection: "row", justifyContent: "space-around" }
                        ]}>
                        <Entypo
                          name="reply"
                          size={20}
                          color="white"
                          onPress={() => {
                            const selectedMessage = messages?.[reaction]
                            if (selectedMessage) {
                              console.log(selectedMessage)

                              setReply({
                                text: selectedMessage.text,
                                media: selectedMessage.media && selectedMessage.media[0],
                                id: selectedMessage.id
                              })
                            }
                          }}
                        />
                        <Entypo name="star" size={20} color="white" onPress={() => starredmsg()} />
                        <AntDesign
                          name="delete"
                          size={20}
                          color="white"
                          onPress={() => msgDelete()}
                        />
                        <Entypo
                          name="forward"
                          size={20}
                          color="white"
                          onPress={() => setNewChat(true)}
                        />
                        <Entypo name="copy" size={20} color="white" onPress={copyToClipboard} />
                      </View>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("GroupProfile", {
                        id: id,
                        name: name,
                        leave: chatInfo?.leave
                      })
                    }>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: colors.header
                      }}>
                      <View style={styles.item}>
                        <TouchableOpacity onPress={handleGoBack}>
                          <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color="white"
                            style={{ marginRight: 10 }}
                          />
                        </TouchableOpacity>
                        <Image
                          style={styles.image1}
                          source={image3}
                          resizeMode="contain" // Set resizeMode to contain
                        />
                        <View style={[styles.detail, { marginLeft: 10 }]}>
                          <Text style={[styles.name, { color: colors.white }]}>
                            {" "}
                            {name.length > 10 ? `${name.substring(0, 10)}...` : name}
                          </Text>
                          {/* <Text style={[{ fontSize: 11, color: colors.white }]}>online</Text> */}
                        </View>
                      </View>

                      <View>
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}>
                            <ChatVedioCall />

                            <ChatAudioCall style={{ marginLeft: 10 }} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            )}

            <FlatList
              data={messages}
              inverted={true}
              ref={flatListRef}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <ChatItem
                  selectedEmoji={selectedEmoji}
                  setSelectedEmoji={setSelectedEmoji}
                  handleEmojiSelection={handleEmojiSelection}
                  reaction={reaction}
                  handleCloseReaction={handleCloseReaction}
                  handleLongPress={handleLongPress}
                  userId={userId}
                  item={item}
                  index={index}
                />
              )}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={100}
              onScroll={handleScroll}
              contentContainerStyle={styles.listStyle}
            />
            {
              reply && <ReplyTo reply={reply} handleCloseReaction={handleCloseReaction} />
              // <View style={{paddingHorizontal:20,paddingVertical:10,backgroundColor:"#2A2A2A"}}>
              //   {reply.media?
              //   <View style={styles.replymedia}>
              //   <Image source={{ uri: reply.media }} style={[,{width:30,height:30}]}/>
              //   </View>:
              // <Text style={styles.replymsg}>{reply.text}</Text>}
              // <TouchableOpacity style={{position:"absolute",top:-5,right:0}} onPress={()=>handleCloseReaction()}>
              // <Cross />
              // </TouchableOpacity>
              // </View>
            }
            {chatInfo?.leave ? (
              <View style={styles.leftUserBoxContainer}>
                <AppText style={{ fontSize: fontSize.tinyx1 }}>
                  {"You're no longer a member"}
                </AppText>
              </View>
            ) : (
              <SendComponent
                values={{
                  id,
                  sendMsg,
                  notification,
                  message,
                  setMessage,
                  group: true,
                  appendMessage
                }}
              />
            )}
          </View>
        </KeyboardAvoidingView>
        {newChat && (
          <ForwardModal
            title={"New Messages"}
            show={newChat}
            onhide={() => setNewChat(false)}
            forward={messages[reaction].text}
            handleCloseReaction={handleCloseReaction}
          />
        )}
      </GradientWrapper>
    </AppWrapper>
  )
}

function ChatItem({
  handleEmojiSelection,
  handleLongPress,
  handleCloseReaction,
  item,
  reaction,
  userId,
  index
}) {
  const ReactionEmoji = ["😍", "😂", "😢", "😡", "👍"]
  return (
    <View key={item.id} style={{ marginBottom: 15 }}>
      {item.type == "server" ? (
        <View
          style={[
            styles.disappear,
            { flexDirection: "row", alignItems: "center", columnGap: 3, paddingVertical: 10 }
          ]}>
          <Disappear />
          <Text style={{ color: colors.white, fontSize: fontSize.tiny }}>{item.text}</Text>
        </View>
      ) : (
        <>
        <View
                    style={[{
                    
                      flexDirection: "row",
                   
                      justifyContent: item.type === "send" ? "flex-end" : "flex-start",
                     
                    }]}>
                      <View style={[{
                    
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 15,
                    marginBottom:hp(1)
                  }]}>
                    <Image source={profile} style={{ width: 20, height: 20, borderRadius: 5 }} />
                    <AppText style={{ color: colors.white,color:"#FF8743", fontSize: fontSize.tiny,fontFamily:fonts.light,fontWeight:"600" }}>
                      {item.user?.name}
                    </AppText>
                    </View>
                  </View>
          {reaction === index && (
            <View
              style={[
                styles.modalContainer,
                { alignItems: item.type === "send" ? "flex-end" : "flex-start" }
              ]}>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => handleCloseReaction()}>
                <View style={styles.modalContent}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {ReactionEmoji.map((emoji, emojiIndex) => (
                      <TouchableOpacity
                        key={emojiIndex}
                        onPress={() => handleEmojiSelection(emoji, item.id)}>
                        <Text
                          style={{
                            marginLeft: 3,
                            padding: 6,
                            fontSize: 18,
                            backgroundColor:
                              item.reaction?.some(x => x.user === userId && x.emoji === emoji) &&
                              colors.gray_1000
                          }}>
                          {emoji}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <View style={{ paddingHorizontal: 10 }}>
                      <AddEmoji />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              handleCloseReaction()
            }}
            onLongPress={() => {
              handleLongPress(index)
            }}>
            {item.media?.length > 0 ? (
              <>
                <View
                  style={[
                    { position: "relative" }
                    //  styles.chatItemCommon,
                    //  item.type === "send" ? styles.send : styles.receive
                  ]}>
                  <FileMessage item={item} files={item.media} />
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      right: item.type === "send" ? wp(2) : null,
                      left: item.type === "receive" ? 0 : null,
                      bottom: hp(-0.7)
                    }}>
                    {item.reaction?.map((item, index) => (
                      <Text style={{ color: "white" }}>{item.emoji}</Text>
                    ))}
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: item.type === "send" ? "right" : "left",
                    color: colors.primary,
                    marginTop:hp(1),
                    fontSize: fontSize.vtinyx1
                  }}>
                  {item.time}
                </Text>
              </>
            ) : (
              <>
                <View
                  style={[
                    { position: "relative" },
                    styles.chatItemCommon,
                    item.type === "send" ? styles.send : styles.receive
                  ]}>
                      <LinearGradient
        colors={ item.type === "send" ?["#2C4957", "#16252C"]:["#454545", "#222222",]}
        style={[
          { position: "relative", },
          styles.chatItemCommon,
          item.type === "send" ? styles.send1 : styles.receive1
        ]}
      > 
                  
                  {/* <View style={{marginVertical:hp(1)}}> */}
                  {item.reply_to && (
                    <View
                      style={[
                        { position: "relative", marginVertical: hp(1) },

                        item.type === "send" ? styles.repsend : styles.replyreceive
                      ]}>
                      <Text style={{ color: "white" }}>{item.reply_to}</Text>
                    </View>
                  )}

                  {item.reply_media && (
                    <View style={[styles.replymedia, { marginVertical: hp(1) }]}>
                      <ReplyView reply={item.reply_media} />
                      {/* <Image source={{ uri: item.reply_media }} style={[,{width:30,height:30}]}/> */}
                    </View>
                  )}
                  {/* </View> */}
                  
                    <>
                    <Text style={{ color: "white",fontFamily:fonts.medium,fontSize:14,fontWeight:"400" }}>{item.text}</Text>
                    </>
                  {/* )} */}
                  </LinearGradient>
                  {item.reaction?.length > 0 && <View
 key={index}
 style={[{
   flexDirection: "row",
   position: "absolute",
   right: item.type === "send" ? 0 : null,
   left: item.type === "receive" ? 0 : null,
   bottom: -8,
 
 }]}>
 {item.reaction?.map((item, index) => (
   <Text key={index} style={{ color: "white", }}>{item.emoji}</Text>
 ))}
</View>}
                </View>
                <Text
                  style={{
                    marginTop: item.reaction?.length > 0 ? hp(1) : 0,
                    textAlign: item.type === "send" ? "right" : "left",
                    color: colors.primary,
                    fontSize: fontSize.vtinyx1
                  }}>
                  {item.time}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    marginVertical: 5,
    
    // position: 'relative',

    // alignItems: 'flex-start',
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    borderRadius: 11,
    backgroundColor: "#666",
    padding: 5
  },
  image1: {
    width: 30,
    height: 30
  },
  item: {
    // paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1
    // paddingHorizontal: 5,
    // backgroundColor:colors.red
  },
  bottom: {
    backgroundColor: "#2A2A2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  repsend: {
    // alignSelf: "flex-end",
    backgroundColor: "#111D22",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#2C5750",
    // borderBottomWidth:1,
    borderRadius: 4,
    maxWidth: "75%"
  },
  replyreceive: {
    // alignSelf: "flex-start",
    backgroundColor: "#111D22",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#2C5750",
    borderRadius: 4,
    maxWidth: "75%"
  },
  replymsg: {
    // alignSelf: "flex-start",
    backgroundColor: "#111D22",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#2C5750",
    borderRadius: 4
    // maxWidth: "75%"
  },
  replymedia: {
    // alignSelf: "flex-start",
    backgroundColor: "#111D22",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#2C5750",
    borderRadius: 4,
    minWidth: "75%"
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 18
    // paddingVertical: 10,
    // paddingHorizontal: 10
  },
  chatItemCommon: {
    marginBottom: 2
  },
  disappear: {
    alignSelf: "center",
    backgroundColor: "rgba(58, 58, 58, 0.30)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: "75%"
  },
  send: {
    alignSelf: "flex-end",
    // backgroundColor: "#2c4957",
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 10,
    maxWidth: "75%"
  },
  sendMedia: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10
    // maxWidth: "75%"
  },
  receiveMedia: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10
    // maxWidth: "75%"
  },
  receive: {
    alignSelf: "flex-start",
    // backgroundColor: colors.primary,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 10,
    maxWidth: "75%"
  },
  send1: {
    alignSelf: "flex-end",
    width: "100%",
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  receive1: {
    alignSelf: "flex-start",
    width: "100%",
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 11,
  },
  msgtxt: {
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: "75%"
  },
  listStyle: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  container1: {
    flexDirection: "row",
    width: "75%",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#383838",
    borderRadius: 30,
    padding: 5
  },
  input: {
    flex: 1,
    color: colors.primary,
    marginLeft: 10,
    fontSize: 16
  },
  item1: {
    // paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftUserBoxContainer: {
    backgroundColor: "#2A2A2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 50
  }
})
