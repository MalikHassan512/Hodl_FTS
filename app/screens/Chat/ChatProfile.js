import {
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList
} from "react-native"
import React, { useContext, useEffect } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import colors from "../../config/colors"
import Screen from "../../component/core/Screen"
import Tick from "../../../assets/icons/iconss/tick.svg"
import { AntDesign } from "@expo/vector-icons"
import { Zocial } from "@expo/vector-icons"
import image3 from "../../../assets/3.png"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import AppText from "../../component/core/AppText"
import image1 from "../../../assets/icons/iconss/1.png"
import image2 from "../../../assets/icons/iconss/2.png"
import image4 from "../../../assets/icons/iconss/3.png"
import image5 from "../../../assets/icons/iconss/31.png"
import GP from "../../../assets/icons/iconss/gp.png"
import cross from "../../../assets/cross.png"
import image6 from "../../../assets/icons/iconss/4.png"
import TempMessage from "../../../assets/icons/iconss/tempMessage.svg"
import PromoteAdmin from "../../../assets/icons/iconss/PromoteAdmin.svg"
import PromoteSpeaker from "../../../assets/icons/iconss/SpeakerPromote.svg"
import RemovePerson from "../../../assets/icons/iconss/RemovePerson.svg"
import AddPArticipent from "../../../assets/icons/iconss/AddPArticipent.svg"
import Speaker from "../../../assets/icons/iconss/Speaker.svg"
import CamraRoll from "../../../assets/icons/iconss/CamraRoll.svg"
import defaultStyles from "../../config/defaultStyles"
import ListItemSeparator from "../../component/core/ListItemSeparator"
import ChatVedioCall from "../../../assets/icons/iconss/ChatVedioCall.svg"
import ChatAudioCall from "../../../assets/icons/iconss/ChayAudioCall.svg"
import { useState } from "react"
import { hp, wp } from "../../config/dimensions"
import apiClient from "../../api/client"
import useApi from "../../hooks/useApi"
import { SocketContext } from "../../component/socket/SocketProvider"
import { useSelector } from "react-redux"
import FullScreenModal from "./FullScreenModal"
import { checkType } from "../../modules/helpers"
import { fontSize } from "../../config/fontSize"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import fonts from "../../../assets/fonts"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
const { width } = Dimensions.get("window")
const itemWidth = width / 4.5

const ChatProfile = () => {
  const route = useRoute()
  const { name, id: chatId } = route.params
  const [selectedItem, setSelectedItem] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [participent, setParticipent] = useState(false)
  const navigation = useNavigation()
  const { userId, token } = useSelector(state => state.auth)
  const [images, setImages] = useState()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  const [muteStatus, SetMuteStatus] = useState(false)
  const toggleDirection1 = () => {
    onChangeSettings("MuteChat", !muteStatus)
    SetMuteStatus(!muteStatus)
  }
  const [cameraRollStatus, setCameraRollStatus] = useState(false)

  const toggleDirection = () => {
    onChangeSettings("CameraRollChat", !cameraRollStatus)
    setCameraRollStatus(!cameraRollStatus)
  }
  const { request, data: ChatData, loading } = useApi(() => apiClient.get(`/P2P_chat/${chatId}/`))

  const fetchChatData = async () => {
    const result = await request()
    if (!result.ok) return
    console.log(result.data)
    SetMuteStatus(result.data.mute)
    setCameraRollStatus(result.data.camera_roll)
  }
  const { request: requestMedia, data: mediaData } = useApi(() =>
    apiClient.get(`/chat_media/${chatId}/`)
  )

  const fetchChatMedia = async () => {
    const result = await requestMedia()
    if (!result.ok) return
    let imagesVideos = result.data.results
      .filter(item => ["image", "video"].some(x => checkType(item.file) === x))
      .slice(-10)
    setImages(imagesVideos)
  }
  useEffect(() => {
    fetchChatData()
    fetchChatMedia()
  }, [])

  const { socket, isConnected, reconnect } = useContext(SocketContext)
  useEffect(() => {
    if (!isConnected) {
      reconnect()
    }
  }, [isConnected])
  const onTemporaryModeChange = mode => {
    if (isConnected) {
      socket.send(
        JSON.stringify({
          message: mode,
          disappear_time: mode[0],
          type: "DisappearMessages",
          chat_id: chatId
        })
      )
    }
  }
  const onChangeSettings = (key, value) => {
    if (isConnected) {
      socket.send(JSON.stringify({ status: value, type: key, chat_id: chatId }))
    }
  }

  const renderItem = ({ item }) => {
    const { file } = item
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(file)
          setModalVisible(true)
        }}>
        <View style={{ padding: 2, borderRadius: 10, overflow: "hidden" }}>
          {checkType(file) == "image" && (
            <Image style={[styles.Scrolitem]} source={{ uri: file }} />
          )}
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <>
  
    < >
    <AppWrapper color={colors.header}>
      <GradientWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={[{ flex: 1 }]}>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: wp(4.7),
                justifyContent: "space-between",
                backgroundColor: colors.header
              }
            ]}>
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
                style={{width:35,height:35,borderRadius:5}}
                source={image3}
                resizeMode="contain" // Set resizeMode to contain
              />
              <View style={[styles.detail, { marginLeft: 10 }]}>
                <Text style={[styles.name, { color: colors.white }]}>
                  {" "}
                  {name.length > 10 ? `${name.substring(0, 10)}...` : name}
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap:10
                }}>
                <ChatVedioCall />

                <ChatAudioCall style={{ marginLeft: 10 }} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <View style={[styles.files]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatFile", { files: mediaData, name: name })}>
              <AppText>Files,links and documents</AppText>
            </TouchableOpacity>
            <View style={{ marginTop: hp(1.4) }}>
              <FlatList
                data={images}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={<View style={{ height: 1 }}></View>}
              />
            </View>
          </View>
          <View style={[styles.temp]}>
            <View style={{ flexDirection: "row",paddingHorizontal:wp(4.7) }}>
              <TempMessage />
              <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
                <Text  style={styles.tempMessageText}>
                  New temporary message
                </Text>
              </TouchableOpacity>
            </View>
            <ListItemSeparator style={{ marginTop: 20 }} />
            <View
              style={[
                {
                  paddingVertical: hp(1),
                  paddingHorizontal:wp(4.7),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }
              ]}>
              <View style={{ flexDirection: "row" }}>
                <Speaker />
                <Text  style={[{ color: colors.white, },styles.tempMessageText]}>
                  Mute
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={muteStatus ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection1}
                style={{ transform: [{ scale: 0.8 }] }} 
                value={muteStatus}
              />
            </View>
            <ListItemSeparator />
            <View
              style={[
                {
                  paddingVertical: hp(1),
                  flexDirection: "row",
                  paddingHorizontal:wp(4.7),
                  justifyContent: "space-between",
                  alignItems: "center"
                }
              ]}>
              <View style={{ flexDirection: "row" }}>
                <CamraRoll />
                <Text  style={[{ color: colors.white, },styles.tempMessageText]}>
                  Save to camera roll
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={cameraRollStatus ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection}
                style={{ transform: [{ scale: 0.8 }] }} 
                value={cameraRollStatus}
              />
            </View>
            <ListItemSeparator />

            <View style={{ flexDirection: "row", paddingHorizontal:wp(2.3),paddingVertical: 15 }}>
              <AppText
               
                style={[styles.tempMessageText,{ color: "#EA4646" }]}
                onPress={() => {
                  onChangeSettings("ClearChat")
                  navigation.navigate("Chat")
                }}>
                Delete conversation
              </AppText>
            </View>
            <ListItemSeparator />

            <View style={{ flexDirection: "row",paddingHorizontal:wp(2.3), paddingVertical: 15 }}>
              <AppText   style={[styles.tempMessageText,{ color: "#EA4646" }]}>
                Block {name}
              </AppText>
            </View>
            <ListItemSeparator />

            <View style={{ flexDirection: "row",paddingHorizontal:wp(2.3), paddingVertical: 15 }}>
              <AppText  style={[styles.tempMessageText,{ color: "#EA4646" }]}>
                Report {name}
              </AppText>
            </View>

            <ListItemSeparator />
          </View>

          <View style={[styles.group]}>
            <AppText style={{fontSize:16,fontFamily:fonts.medium,fontWeight:"600"}}>{ChatData?.common_groups?.length} Groups in common</AppText>
            {ChatData?.common_groups?.map((x, index) => (
              //  <TouchableOpacity key={index} onPress={()=>setParticipent(true)}>
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                <View style={styles.item}>
                  <Image
                    style={{width:35,height:35,borderRadius:5}}
                    source={GP}
                    resizeMode="contain" // Set resizeMode to contain
                  />
                  <View style={[styles.detail, { marginLeft: 10 }]}>
                    <Text style={[styles.tempMessageText, { color: colors.white }]}>{x.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                      <AppText style={{ fontSize:12,color: colors.primary, marginLeft: 5 }}>
                        {x.members
                          .filter(x => x.id !== userId)
                          .slice(0, 2)
                          .map(member => "@" + member.name)
                          .join(" and ")}
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>
              //  </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <TempMessageModal
        onTemporaryModeChange={onTemporaryModeChange}
        currentMode={ChatData?.temporary_mode}
        isDrawerVisible={isDrawerVisible}
        onHide={() => setIsDrawerVisible(false)}
      />
      {participent && (
        <ParticipentModal isDrawerVisible={participent} onHide={() => setParticipent(false)} />
      )}
      {modalVisible && (
        <FullScreenModal
          imageUrl={selectedItem}
          show={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
      </GradientWrapper>
      </AppWrapper>
    </>
    </>
  )
}

export default ChatProfile

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1
    // paddingBottom:100
  },
  image1: {
    width: 30,
    height: 30
  },
  images: {
    width: 87,
    height: 87
  },
  tempMessageText: {
    color: "#2DA1D7",
    fontSize: 14,
    fontFamily:fonts.medium,
    fontWeight:"600",
    marginLeft: 10 // Adjust this value as needed for the desired space
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
    // backgroundColor:colors.secondary
  },
  files: {
    paddingHorizontal: wp(4.7),
    marginTop: 15,
    flex: 1
  },
  temp: {
    marginTop: 30,
    
    flex: 3
  },
  group: {
    marginTop: 20,
    paddingHorizontal: 15,
    flex: 3
  },
  scrollView: {
    alignItems: "center"
  },
  Scrolitem: {
    height: itemWidth,
    width: itemWidth
    //  marginRight: gap,
    // borderRadius: 10,
  },
  drawerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    height: "35%", // Set the height of the drawer as needed
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  }
})

const TempMessageModal = ({ isDrawerVisible, onHide, onTemporaryModeChange, currentMode }) => {
  const navigation = useNavigation()
  const [show, setShow] = useState()
  const [selectedItem, setSelectedItem] = useState(currentMode) // Store the selected item state
  useEffect(() => {
    setSelectedItem(currentMode)
  }, [currentMode])
  // Function to handle selection
  const handleSelection = item => {
    setSelectedItem(item === selectedItem ? null : item) // Toggle selection
    onTemporaryModeChange(item)
  }

  // Render list items with blue tick based on the selection state
  const renderListItem = (itemText, value) => {
    const isSelected = selectedItem === value

    return (
      <View>
        <TouchableOpacity
          style={[styles.listItem, isSelected && styles.selectedItem]}
          onPress={() => handleSelection(value)}>
          <View style={[{ flexDirection: "row", paddingVertical: 15, width: "100%" }]}>
            <AppText bold style={{ color: colors.white, marginLeft: 10 }}>
              {itemText}
            </AppText>
            {isSelected && (
              <View style={{ marginLeft: 10 }}>
                <Tick />
              </View>
            )}
          </View>
          <ListItemSeparator />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDrawerVisible}
      onRequestClose={onHide}>
      <View style={[styles.drawerContainer, { backgroundColor: "#222222" }]}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <AppText bold style={{ color: colors.white, fontSize: 18 }}>
            Temporary message duration
          </AppText>
          <TouchableOpacity onPress={onHide}>
            <Image source={cross} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View>
          {renderListItem("24 hour", "Day")}
          {renderListItem("1 week", "Week")}
          {renderListItem("off", "Off")}
        </View>
      </View>
    </Modal>
  )
}
const ParticipentModal = ({ isDrawerVisible, onHide, data }) => {
  const navigation = useNavigation()
  const [show, setShow] = useState()
  const [selectedItem, setSelectedItem] = useState(null) // Store the selected item state

  // Function to handle selection
  const handleSelection = item => {
    setSelectedItem(item === selectedItem ? null : item) // Toggle selection
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDrawerVisible}
      onRequestClose={onHide}>
      <View style={[styles.drawerContainer, { backgroundColor: "#222222" }]}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={styles.item}>
            <Image
              style={styles.image1}
              source={image2}
              resizeMode="contain" // Set resizeMode to contain
            />
            <View style={[styles.detail, { marginLeft: 10 }]}>
              <Text style={[styles.name, { color: colors.white }]}>Joye</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onHide}>
            <Image source={cross} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ flexDirection: "row", paddingVertical: 15 }}>
            <PromoteAdmin />
            <AppText bold style={{ color: colors.white, marginLeft: 20 }}>
              Promote to admin
            </AppText>
          </View>
          <ListItemSeparator />
          <View style={{ flexDirection: "row", paddingVertical: 15 }}>
            <PromoteSpeaker />
            <AppText bold style={{ color: colors.white, marginLeft: 20 }}>
              Promote to speaker
            </AppText>
          </View>
          <ListItemSeparator />
          <View style={{ flexDirection: "row", paddingVertical: 15 }}>
            <RemovePerson />
            <AppText bold style={{ color: "#EA4646", marginLeft: 20 }}>
              Remove from group
            </AppText>
          </View>
        </View>
      </View>
    </Modal>
  )
}
