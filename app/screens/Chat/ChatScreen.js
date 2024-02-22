import React, { useCallback, useReducer, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Platform
} from "react-native"
import Clipboard from "@react-native-clipboard/clipboard"
import { MaterialIcons } from "@expo/vector-icons"
import image3 from "../../../assets/3.png"
import Screen from "../../component/core/Screen"
import colors from "../../config/colors"
import { AntDesign, Entypo } from "@expo/vector-icons"
import { Zocial } from "@expo/vector-icons"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { useSelector } from "react-redux"
import ChatVedioCall from "../../../assets/icons/iconss/ChatVedioCall.svg"
import ChatAudioCall from "../../../assets/icons/iconss/ChayAudioCall.svg"
import Dollar from "../../../assets/icons/iconss/Dollar.svg"
import ChatMic from "../../../assets/icons/iconss/ChatMic.svg"
import AppCameraformik from "../../component/forms/AppCameraformik"
import apiClient from "../../api/client"
import Cross from "../../../assets/icons/iconss/cross2.svg"
import AddEmoji from "../../../assets/icons/iconss/AddEmoji.svg"
import Disappear from "../../../assets/icons/iconss/disappear.svg"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"
import { SocketContext } from "../../component/socket/SocketProvider"
import FileMessage from "../../component/core/FileMessage"
import { saveToDevice } from "../../component/core/raw"
import OutsidePressHandler from "react-native-outside-press"
import NewGroupCallModel from "../../component/NewGroupCallModel"
import ForwardModal from "./ForwardModal"
import SendComponent from "../../component/chat/SendComponent"
import ReplyTo from "../../component/chat/ReplyTo"
import ReplyView from "../../component/chat/ReplyView"
import defaultStyles from "../../config/defaultStyles"
import AppText from "../../component/core/AppText"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import { isAndroid } from "../../config/plaform"
import LinearGradient from "react-native-linear-gradient"
import fonts from "../../../assets/fonts"

const ChatScreen = React.memo(({ notification }) => {
  const route = useRoute()
  const { id, name, item: chatInfo } = route.params || {}
  const [cameraRollStatus, setCameraRollStatus] = useState(chatInfo?.camera_roll)
  console.log(route.params, "params")
  const { userId, token } = useSelector(state => state.auth)
  const { users: onlineUsers } = useSelector(state => state.chatUser)
  const navigation = useNavigation()
  // const [messages, setMessages] = useState([])
  const [messages, dispatch] = useReducer(appendMessageReducer, [])


  const memoizedMessages = useMemo(() => messages, [messages])

  const [newChat, setNewChat] = useState()
  const [reply, setReply] = useState()
  const [message, setMessage] = useState("")
  const [page, setPage] = useState(1)
  const [load, setLoad] = useState(true)
  const [iosProps] = useState(   Platform.OS==="ios" ? { behavior: "padding", keyboardVerticalOffset: 64 } : {})

  const [initialContentSizeChanged, setInitialContentSizeChanged] = useState(false)
  const { socket, isConnected, subscribe, unsubscribe, reconnect } = useContext(SocketContext)
  const sendMsg = useCallback(() => {
    if (message.length === 0) return
    // setMessages([{ id: new Date().getTime(), type: 'send', text: message }, ...messages]);
    {
      const dataToSend = {
        message: message,
        type: "ChatMessage",
        chat_id: id
      }

      if (reply !== null) {
        dataToSend.reply_id = reply?.id
      }

      socket.send(JSON.stringify(dataToSend))
      // socket.send(JSON.stringify({ message: message, type: "ChatMessage", chat_id: id,reply_id:messages[reaction].id }))
    }
    setReply(null)
    setMessage("")
    handleCloseReaction()
  }, [message, reply, socket, id])

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

  const  handleMessage = useCallback((e )=> {
    const data = JSON.parse(e.data)
    console.log(data, "_________________________________________________")
    if (data?.chat_id == id)
      if (data.type == "ChatMessage") {
        // setMessages(prevMessages => [
        //   {
        //     id: data.id,
        //     text: data.message,
        //     time: data.created_at,
        //     reply_to: data.reply_to?.message,
        //     reply_media: data.reply_to?.media?.[0]?.file,
        //     name: data.user.name,
        //     type: userId == data.user.id ? "send" : "receive"
        //   },
        //   ...prevMessages
        // ])
        dispatch({ type: "add", payload: data })
        // setTimeout(()=>{

        //   handleBottom()
        // },50)
      } else if (data.type == "DisappearMessages") {
        setMessages(prevMessages => [
          {
            id: data.id,
            text: data.message,
            time: data.created_at,
            type: "server"
          },
          ...prevMessages
        ])
      } else if (data.type == "MessageReaction") {
        console.log("MessageReaction", data)

        setMessages(prevMessages =>
          prevMessages.map(item => {
            if (item.id === data.message_id) {
              console.log("Found matching message:", item)
              if (!Array.isArray(item.reaction)) {
                item.reaction = [] // Initialize 'reaction' as an array if it's not already one
              }
              console.log(item.reaction, "react...................")
              let index = item.reaction.findIndex(x => x.user === data.user)
              console.log("index", index)
              if (index !== -1) {
                console.log("index", item.reaction[index])
                item.reaction[index].emoji = data.emoji
              } else {
                item.reaction.push({ emoji: data.emoji, user: data.user })
              }
              console.log(item.reaction, "r")
            }
            return item
          })
        )
      } else if (data.type == "MessageMedia") {
        console.log(data, "message+++++++++++++++++++++++++++++++++++++++++++++++++++")
        if (chatInfo.cameraRollMode && userId !== data.user.id)
          data.media.map(item => {
            saveToDevice(item.file)
          })

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
              text: data.message.message,
              media: data.media.map(item => item.file),
              type: userId == data.user.id ? "send" : "receive"
            },
            ...prevMessages
          ])
        // setTimeout(()=>{

        //   handleBottom()
        // },50)
      }
  },[socket, subscribe, unsubscribe]
  )



  useEffect(() => {

    if (socket) subscribe(handleMessage)

    return () => {
      unsubscribe(handleMessage)
    }
  }, [socket, subscribe, unsubscribe])

  
 

  //   if (socket) subscribe(handleMessage)

  //   return () => {
  //     unsubscribe(handleMessage)
  //   }
  // }, [socket, subscribe, unsubscribe])

  const fetchMessages = useCallback( async () => {
    let result
    // if (load) {
    result = await apiClient.get(`messages/${id}/?page=${page}&limit=1`)

    if (!result.ok) return console.log("first error")
    if (result.data.results.length > 0) {
      const newMessages = result.data.results.map(msg => {
        const reactions = msg.reactions
          ? msg.reactions.map(emojii => ({
              emoji: emojii.emoji, // Update 'emoji' based on your data structure
              user: emojii.user // Update 'user' based on your data structure
            }))
          : []
        if (!msg?.user)
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
          media: msg?.media?.map(item => item.file) || [],
          time: msg.created_at,
          name: msg.user?.name,
          type: userId === msg.user?.id ? "send" : "receive"
        }
      })
      if (cameraRollStatus)
        for (const item of newMessages.flatMap(msg => msg.media || [])) {
          saveToDevice(item, false)
        }
      setMessages(prevMessages => {
        // Create a Set of existing message IDs
        const existingMessageIds = new Set(prevMessages.map(msg => msg.id))

        // Filter out new messages that don't exist in prevMessages
        const uniqueNewMessages = newMessages.filter(newMsg => !existingMessageIds.has(newMsg.id))

        // Concatenate prevMessages with unique new messages
        return [...prevMessages, ...uniqueNewMessages]
      })
    }
    // }

    // setLoad(false)

    if (result?.data?.next) {
      setPage(page + 1)
    }
  }
  , [id, page, cameraRollStatus, userId])
  


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
  const copyToClipboard = () => {
    console.log(messages[reaction].text, "_________________aaaaa_________________")
    Clipboard.setString(messages[reaction].text)
    handleCloseReaction()
  }

  const [reaction, setReaction] = useState(null)
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
    socket.send(JSON.stringify({ emoji: emoji, type: "MessageReaction", message_id: id }))

    setReaction(null)
  }
  const msgDelete = () => {
    socket.send(JSON.stringify({ type: "MessageDelete", message_id: messages[reaction].id }))
    const filteredMessages = messages.filter(message => message.id !== messages[reaction].id)
    setMessages(filteredMessages)
    handleCloseReaction()
  }

  const starredmsg = () => {
    socket.send(
      JSON.stringify({ type: "ChatStarredMessage", chat_id: id, msgs: messages[reaction].id })
    )
    handleCloseReaction()
  }

  // const appendMessage = data => {
  //   setMessages(prevMessages => [
  //     {
  //       id: data.id,
  //       text: data.message,
  //       time: data.created_at,
  //       media: data.file,
  //       name: data.user?.name,
  //       identifier: data.identifier,
  //       status: "sending",
  //       type: "send"
  //     },
  //     ...prevMessages
  //   ])
  // }

  const appendMessageReducer = (state, action) => {
      switch (action.type) {
        case "add":
          return [
            {
              id: action.payload.id,
              text: action.payload.message,
              reply_to: action.payload.reply_to?.message,
              reply_media: action.payload.reply_to?.media?.[0]?.file,
              reaction: action.payload.reactions,
              media: action.payload.media?.map(item => item.file) || [],
              time: action.payload.created_at,
              name: action.payload.user?.name,
              type: userId === action.payload.user?.id ? "send" : "receive"
            },
            ...state
          ]
        default:
          return state
      }
    }


  return (
    <AppWrapper color={colors.header}>
      <GradientWrapper>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
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
                    onPress={() => navigation.navigate("ChatProfile", { id: id, name: name })}>
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
                            {name?.length > 10 ? `${name?.substring(0, 10)}...` : name}
                          </Text>
                          <Text style={[{ fontSize: 11, color: colors.white }]}>
                            {onlineUsers.includes(chatInfo?.user?.id) && "online"}
                          </Text>
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
              // data={messages}
              data={memoizedMessages}
              ref={flatListRef}
              inverted={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <ChatItem
                  key={item.id}
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
              //    {reply.media?
              // <View style={styles.replymedia}>
              // <Image source={{ uri: reply.media }} style={[,{width:30,height:30}]}/>
              // </View>:
              // <Text style={styles.replymsg}>{reply.text}</Text>}
              // <TouchableOpacity style={{position:"absolute",top:-5,right:0}} onPress={()=>handleCloseReaction()}>
              // <Cross />
              // </TouchableOpacity>
              // </View>
            }
            <SendComponent
              values={{ id, sendMsg, notification, message, setMessage, appendMessageReducer }}
            />
            {newChat && (
              <ForwardModal
                title={"New Messages"}
                show={newChat}
                onhide={() => setNewChat(false)}
                forward={messages[reaction].text}
                handleCloseReaction={handleCloseReaction}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </GradientWrapper>
    </AppWrapper>
  )
})
export default ChatScreen

const ChatItem = React.memo(function ChatItem({
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
          style={[styles.disappear, { flexDirection: "row", alignItems: "center", columnGap: 3 }]}>
          <Disappear style={{ marginBottom: 10 }} />
          <Text style={{ color: colors.white, fontSize: fontSize.tiny, marginBottom: 0 }}>
            {item.text}
          </Text>
        </View>
      ) : (
        <>
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
            key={index}
            onPress={() => {
              handleCloseReaction()
            }}
            onLongPress={() => item.status!=="sending"&&handleLongPress(index)}>
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
                      <Text key={index} style={{ color: "white" }}>
                        {item.emoji}
                      </Text>
                    ))}
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: item.type === "send" ? "right" : "left",
                    color: colors.primary,
                    fontSize: fontSize.vtinyx1
                  }}>
                  {item.time}
                </Text>
              </>
            ) : (
              <>
                <View
                  style={[
                    // { position: "relative" },
                    // styles.chatItemCommon,
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
                  {item.reply_to && (
                    
                    <View
                      style={[
                        { position: "relative" },
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
                 
                  {/* {item.reaction?.length > 0 ? (
                    <>
                       
                      <Text style={{ position:"relative",color: "white",fontSize:14,fontWeight:"400",fontFamily:fonts.regular }}>{item.text}</Text>

                      <View
                        key={index}
                        style={[{
                          flexDirection: "row",
                          position: "absolute",
                          right: item.type === "send" ? 0 : null,
                          left: item.type === "receive" ? 0 : null,
                          bottom: -13,
                        
                        },defaultStyles.test]}>
                        {item.reaction?.map((item, index) => (
                          <Text key={index} style={{ color: "white", }}>{item.emoji}</Text>
                        ))}
                      </View>
                    </>
                  ) : ( */}
                    <>
                     
                      <Text style={{ color: "white" ,fontFamily:fonts.medium,fontSize:14,fontWeight:"400"}}>{item.text}</Text>
                     
                    
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
})

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    marginVertical: 5
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
  item1: {
    // paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
  send: {
    alignSelf: "flex-end",
    // backgroundColor: "#2c4957",
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderRadius: 10,
    maxWidth: "75%"
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
  disappear: {
    alignSelf: "center",
    backgroundColor: "rgba(58, 58, 58, 0.30)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
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
  msgtxt: {
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: "75%"
  },
  listStyle: {
    paddingTop: 10,
    paddingHorizontal: 10
    // paddingBottom: 20
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
  }
})
