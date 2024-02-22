import {
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native"
import React, { useRef, useEffect, useState, useContext } from "react"
import Screen from "../../component/core/Screen"
import AppCameraformik from "../../component/forms/AppCameraformik"
import ChatVedioCall from "../../../assets/icons/iconss/ChatVedioCall.svg"
import ChatAudioCall from "../../../assets/icons/iconss/ChayAudioCall.svg"
import ChatMic from "../../../assets/icons/iconss/ChatMic.svg"
import BackArrow from "../../../assets/cross.png"
import { AntDesign } from "@expo/vector-icons"
import PalestineSingle from "../../../assets/icons/iconss/PalestineSingle.png"
import colors from "../../config/colors"
import Back from "../../../assets/icons/iconss/BackIcon.svg"
import Timer from "../../../assets/icons/iconss/TimerHour.svg"
import LargeTimer from "../../../assets/icons/iconss/LargeTimmer.svg"
import { fontSize } from "../../config/fontSize"
import fonts from "../../../assets/fonts"
import AppButton from "../../component/core/AppButton"
import { useNavigation } from "@react-navigation/native"
import { hp } from "../../config/dimensions"
import { SocketContext } from "../../component/socket/SocketProvider"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const ThreadChat = () => {
  const navigation = useNavigation()
  const flatListRef = useRef()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const { socket, isConnected, subscribe, unsubscribe, reconnect } = useContext(SocketContext)
  const sendMsg = () => {
    if (message.length === 0) return
    setMessages([{ id: new Date().getTime(), type: "send", text: message }, ...messages])

    setMessage("")
  }
  const handleGoBack = () => {
    navigation.goBack()
  }
  useEffect(() => {
    if (!isConnected) {
      reconnect()
    }
  }, [isConnected])
  return (
    // <AppWrapper>
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Screen
          style={[
            styles.container
            // { backgroundColor: notification && colors.header },
          ]}>
          <TouchableOpacity
          // onPress={() => navigation.navigate("ChatProfile")}
          >
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
                // backgroundColor: colors.header
              }}>
              <View style={styles.item}>
                <TouchableOpacity onPress={handleGoBack}>
                  <Back style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <Image
                  style={styles.image1}
                  source={PalestineSingle}
                  resizeMode="contain" // Set resizeMode to contain
                />
                <View style={[styles.detail, { marginLeft: 10 }]}>
                  <Text style={[styles.name, { color: colors.white }]}>Israel and Palestine</Text>
                </View>
              </View>

              <View>
                <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Timer />
                    <Text style={{ marginLeft: 5, fontSize: 16, color: "#2DA1D7" }}>1h57m</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <FlatList
            data={messages}
            ref={flatListRef}
            keyExtractor={item => Math.random().toString()}
            renderItem={({ item, index }) => (
              <ChatItem
                // selectedEmoji={selectedEmoji}
                // setSelectedEmoji={setSelectedEmoji}
                // handleEmojiSelection={handleEmojiSelection}
                // reaction={reaction}
                // handleCloseReaction={handleCloseReaction}
                // handleLongPress={handleLongPress}
                item={item}
                index={index}
              />
            )}
            // onScroll={handleScroll}
            // onContentSizeChange={() => {
            //   if (!initialContentSizeChanged) {
            //     handleBottom();
            //   }
            // }}
            contentContainerStyle={styles.listStyle}
          />

          <View style={[styles.bottom]}>
            <AppCameraformik doc="a" />

            <View style={[styles.container1, { width: "75%" }]}>
              <TextInput
               autoCapitalize="sentences"
                placeholder="Write something "
                style={[{ color: colors.white, width: "85%" }]}
                value={message}
                placeholderTextColor="#666666"
                onChangeText={setMessage}
              />
              <View
                style={{
                  padding: 5,
                  backgroundColor: "#2da1d7",
                  borderRadius: 30
                }}>
                <AntDesign name="arrowup" size={20} color="white" onPress={sendMsg} />
              </View>
            </View>

            <View style={[{ flexDirection: "row" }]}>
              <ChatMic style={{ marginRight: 10 }} />
              {/* <FontAwesome5 name="camera" onPress={()=>setOpenCamera(true)}   size={24} color="white" /> */}
              <AppCameraformik />
            </View>
          </View>
        </Screen>
      </KeyboardAvoidingView>
      {isDrawerVisible && (
        <TimerModal isDrawerVisible={isDrawerVisible} onHide={() => setIsDrawerVisible(false)} />
      )}
    </>
    // </AppWrapper>
  )
}

function ChatItem({
  // selectedEmoji,
  // handleEmojiSelection,
  // setSelectedEmoji,
  // handleLongPress,
  // handleCloseReaction,
  item,
  // reaction,
  index
}) {
  const ReactionEmoji = ["♥️", "😍", "👍🏽", "😂", "😢", "😡"]

  return (
    <View style={{ marginBottom: 15 }}>
      {/* {reaction === index && (
          <View
            style={[
              styles.modalContainer,
              { alignItems: item.type === "send" ? "flex-end" : "flex-start" },
            ]}
          >
            <TouchableOpacity
              style={styles.modalBackground}
              onPress={() => handleCloseReaction()}
            >
              <View style={styles.modalContent}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {ReactionEmoji.map((emoji, emojiIndex) => (
                    <TouchableOpacity
                      key={emojiIndex}
                      onPress={() => handleEmojiSelection(emoji, item.id)}
                    >
                      <Text style={{ marginLeft: 3, padding: 6, fontSize: 18 }}>
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
        )} */}

      {/* <TouchableOpacity
          onPress={() => handleCloseReaction()}
          onLongPress={() => handleLongPress(index)}
        > */}
      <View
        style={[
          { position: "relative" },
          styles.chatItemCommon,
          item.type === "send" ? styles.send : styles.receive
        ]}>
        {/* {item.reaction?.length>0 ?
            <> */}
        <Text style={{ color: "white", fontFamily: fonts.medium, fontSize: 14, fontWeight: 400 }}>
          {item.text}
        </Text>
      </View>
      {/* <View key={index} style={{flexDirection:"row", position: "absolute", right: item.type === 'send' ? 0 : null, left: item.type === 'receive' ? 0 : null, bottom: -13 }}>
            {item.reaction?.map((item,index)=>
              <Text style={{ color: 'white' }}>{item.emoji}</Text>
              )}
            </View> */}
      {/* </>:
       <>
         <Text style={{ color: 'white' }}>{item.text}</Text>
         <View style={{ position: "absolute", right: item.type === 'send' ? 0 : null, left: item.type === 'receive' ? 0 : null, bottom: -13 }}>
           (selectedEmoji?.id === item.id ) ? (
           <Text style={{ color: 'white' }}>{selectedEmoji?.emoji}</Text>
         </View>
       </>
    ) :
            <Text style={{ color: 'white' }}>{item.text}</Text>}
          </View>
        </TouchableOpacity> */}
    </View>
  )
}
export default ThreadChat

const TimerModal = ({ isDrawerVisible, onHide, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDrawerVisible}
      onRequestClose={onHide}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Your modal content */}
          <TouchableOpacity style={styles.closeButton} onPress={onHide}>
            <Image source={BackArrow} />
          </TouchableOpacity>
          <View style={styles.item}>
            <LargeTimer />
          </View>
          <View>
            <Text
              style={{
                fontSize: 24,
                color: "#fff",
                fontFamily: fonts.medium,
                fontWeight: 600,
                textAlign: "center"
              }}>
              Time’s up!
            </Text>
            <Text
              style={{
                marginTop: hp(5),
                fontSize: 18,
                color: "#fff",
                fontFamily: fonts.medium,
                fontWeight: 300,
                textAlign: "center"
              }}>
              Your conversation time is finished and this thread will be closed unless you make it
              permanent.
            </Text>
          </View>
          {/* Add other content or components here */}
          <View style={{ width: "100%", marginTop: hp(10) }}>
            <AppButton title={"Make it Payement"} style={{ backgroundColor: "#2DA1D7" }} />
            <AppButton title={"Got it "} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20
  },
  modalContent: {
    width: "80%", // Adjust the width of your modal content as needed
    backgroundColor: "#222222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderRadius: 20
  },
  image1: {
    width: 40,
    height: 40,
    borderRadius: 5
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
    backgroundColor: "#2c4957",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: "75%"
  },
  receive: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: "75%"
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
    backgroundColor: "#555",
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
