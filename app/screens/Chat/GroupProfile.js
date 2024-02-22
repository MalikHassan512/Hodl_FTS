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
import { SocketContext } from "../../component/socket/SocketProvider"
import useApi from "../../hooks/useApi"
import NewGroupCallModel from "../../component/NewGroupCallModel"
import { checkType } from "../../modules/helpers"
import { useSelector } from "react-redux"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import fonts from "../../../assets/fonts"
  const { width } = Dimensions.get("window")
  const itemWidth = width / 4.5
  const gap = 10
  const GroupProfile = () => {
    
    const route = useRoute()
  const { id: groupId, name,leave } = route.params
  const { userId, token } = useSelector(state => state.auth)
    const[show,setShow]=useState(false)
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const [participent, setParticipent] = useState(false)
    const [participentId, setParticipentId] = useState()
    const[images,setImages]=useState([])
    const navigation = useNavigation()
    const handleGoBack = () => {
      navigation.goBack() // Go back to the previous screen
    }
    const [muteStatus, SetMuteStatus] = useState(false)
    const toggleDirection1 = () => {
      onChangeSettings("MuteGroup",!muteStatus)
      SetMuteStatus(!muteStatus)
    }
    const [cameraRollStatus, setCameraRollStatus] = useState(false)
  
    const toggleDirection = () => {
      onChangeSettings("CameraRollGroup",!cameraRollStatus)
      setCameraRollStatus(!cameraRollStatus)
    }




    const {request,data:ChatData,loading}=useApi(()=>apiClient.get(`/group/${groupId}/`))

    const fetchChatData=async ()=>{
      const result=await request()
      if(!result.ok) return
  // console.log(result.data.camera_roll.some(x=>x.id===userId));
      SetMuteStatus(result.data.mute)
      setCameraRollStatus(result.data.camera_roll)
  
    }
    const {request:requestMedia,data:mediaData}=useApi(()=>apiClient.get(`/group_media/${groupId}/`))
    console.log(ChatData,"Chat155");
    const fetchChatMedia=async ()=>{
      const result=await requestMedia()
      if(!result.ok) return
      let imagesVideos = result.data.results.filter(item => ["image", "video"].some(x => checkType(item.file) === x)).slice(-10);
      setImages(imagesVideos);
    }
    console.log(mediaData);
    useEffect(()=>{
  fetchChatData()
  fetchChatMedia()
    },[navigation])
    const onTemporaryModeChange = (mode) => {
      if (isConnected) 
      {
        socket.send(JSON.stringify({ message: mode,disappear_time:mode[0], type: "GroupDisappearMessages", group_id: groupId }))
      }
    }
    const { socket, isConnected,reconnect } = useContext(SocketContext)
    useEffect(()=>{
      if(!isConnected){
        reconnect()
      }
        },[isConnected])

        const onChangeSettings = (key,value) => {
          if (isConnected) 
          {
            socket.send(JSON.stringify({status:value, type: key, group_id: groupId }))
          }
        }
        const onMemberAction=(key,user_id)=>{
      
          socket.send(JSON.stringify({type:key, group_id:groupId,user_id }))
          fetchChatData()
          setShow(false)
          setParticipent(false)
        }


        const renderItem = ({ item }) => {
          const {file}=item
          return (
         
            <TouchableOpacity onPress={()=>{
              setSelectedItem(file)
              setModalVisible(true)
            }} >
              <View style={{padding:2,borderRadius:10,overflow:"hidden"}}>
      
            {(checkType(file)=="image") && 
              <Image
                        style={[styles.Scrolitem]}
                        source={{uri:file}} 
                        
                        
                      />}
              </View>
                     </TouchableOpacity>
          
          );
        };
    return (
      
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
                  <Text style={[styles.tempMessageText,{ color: colors.white }]}> {name.length > 10 ? `${name.substring(0, 10)}...` : name}</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",columnGap:12
                  }}>
                  <ChatVedioCall />
  
                  <ChatAudioCall style={{ marginLeft: 10 }} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 10 }}>
          <View style={[styles.files]}>
            <TouchableOpacity onPress={()=>navigation.navigate("ChatFile",{files:mediaData,name:name})}>
            <AppText style={[styles.tempMessageText,{color:colors.primary,fontSize:16}]}>Files,links and documents</AppText>
            </TouchableOpacity>
            <View style={{marginTop:hp(1.4)}}>
            <FlatList
      data={images}
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false} 
      ItemSeparatorComponent={<View style={{height:1}}></View>}
    />
    </View>
           
          </View>
            <View style={[styles.temp]}>
              <View style={{paddingHorizontal:wp(4.7), flexDirection: "row" ,columnGap:12}}>
                <TempMessage />
                <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
                  <AppText style={styles.tempMessageText}>
                    New temporary message
                  </AppText>
                </TouchableOpacity>
              </View>
              <ListItemSeparator style={{ marginTop: 20 }} />
              <View
                style={[
                  { paddingHorizontal:wp(4.7),paddingVertical:hp(1),flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
                ]}>
                <View style={{ flexDirection: "row" }}>
                  <Speaker />
                  <AppText bold style={{ color: colors.white, marginLeft: 10 }}>
                    Mute
                  </AppText>
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
                  {paddingHorizontal:wp(4.7), paddingVertical:hp(1),flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
                ]}>
                <View style={{ flexDirection: "row", columnGap:10 }}>
                  <CamraRoll />
                  <AppText  style={[,styles.tempMessageText,{ color: colors.white,  }]}>
                    Save to camera roll
                  </AppText>
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
  
              <View style={{ flexDirection: "row", paddingVertical: 15,paddingHorizontal:wp(4.7) }}>
                <AppText  style={[styles.tempMessageText,{ color: "#EA4646",  }]} onPress={()=>{
                onChangeSettings("ClearGroupChat")
               navigation.navigate("Chat")
                }}>
                  Delete conversation
                </AppText>
              </View>
              <ListItemSeparator />
  
              {!leave && <TouchableOpacity style={{ flexDirection: "row",paddingHorizontal:wp(4.7), paddingVertical: 15 }} 
              onPress={()=>{
                onMemberAction("GroupRemoveMembers",userId)
                navigation.navigate("Chat")
              }}
              >
                <AppText  style={[styles.tempMessageText,{ color: "#EA4646" }]}>
                 Leave group
                </AppText>
              </TouchableOpacity>}
              <ListItemSeparator />
  
              <View style={{ flexDirection: "row",paddingHorizontal:wp(4.7), paddingVertical: 15 }}>
                <AppText  style={[styles.tempMessageText,{color: "#EA4646", }]}>
                  Report group
                </AppText>
              </View>
  
              {/* <ListItemSeparator /> */}
            </View>
  
             
              <View style={[styles.group]}>
              <AppText style={[styles.tempMessageText,{fontSize:16,color:colors.primary}]}> {ChatData?.members?.length} Participants</AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                      
                  {!leave && <View style={[styles.item,{marginTop:4}]}>
                    <AddPArticipent />
                    <View style={[styles.detail, { marginLeft: 10 }]}>
                      <TouchableOpacity onPress={()=>setShow(true)}>
                      <Text style={[styles.tempMessageText, { color: "#2DA1D7" }]}>Add participants</Text>
                      </TouchableOpacity>
                    </View>
                  </View>}
                </View>
             
                {ChatData?.members?.map((itemMember, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                if(ChatData?.owner?.id!==itemMember.id)    
                {    setParticipent(true)
                    setParticipentId(itemMember.id)}
                  }}>
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
                          <Text style={[styles.tempMessageText, { color: colors.white }]}>{itemMember.name}</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}>
                            <AppText style={{ color: colors.primary, marginLeft: 5 }}>
                              {itemMember.log}
                            </AppText>
                          </View>
                        </View>
                      </View>
                      <AppText>{ChatData?.admins.some(x=>x.id===itemMember.id)&&"Admin"}</AppText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            
          </View>
        </ScrollView>
       
          <TempMessageModal
          currentMode={ChatData?.temporary_mode}
          onTemporaryModeChange={onTemporaryModeChange}
            isDrawerVisible={isDrawerVisible}
            onHide={() => setIsDrawerVisible(false)}
          />
        
        {participent && (
          <ParticipentModal groupId={groupId} fetchChatData={fetchChatData} isDrawerVisible={participent} onHide={() => setParticipent(false)} participentId={participentId} onMemberAction={onMemberAction} />
        )}
         {show&&        <NewGroupCallModel fetchChatData={fetchChatData} title={"Add Member"} show={show} onhide={()=>setShow(false)} groupId={groupId} />}
      </GradientWrapper>
      </AppWrapper>
      
    )
  }
  
  export default GroupProfile
  
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
      fontWeight:"600"
      // Adjust this value as needed for the desired space
    },
    item: {
      // paddingHorizontal: 5,
      paddingVertical: 7,
      flexDirection: "row",
      alignItems: "center"
    },
    container: {
      flex: 1
      // paddingHorizontal: 5,
      // backgroundColor:colors.secondary
    },
    files: {
      paddingHorizontal: 15,
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
  
  const TempMessageModal = ({ isDrawerVisible, onHide, onTemporaryModeChange ,currentMode}) => {
    const navigation = useNavigation()
    const [show, setShow] = useState()
    const [selectedItem, setSelectedItem] = useState(currentMode) // Store the selected item state
    useEffect(()=>{
      setSelectedItem(currentMode)
    },[currentMode])
    // Function to handle selection
    const handleSelection = item => {
  
      setSelectedItem(item === selectedItem ? null : item) // Toggle selection
      onTemporaryModeChange(item)
    }
  
    // Render list items with blue tick based on the selection state
    const renderListItem = (itemText,value) => {
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
            {renderListItem("24 hour","Day")}
            {renderListItem("1 week","Week")}
            {renderListItem("off","Off")}
          </View>
        </View>
      </Modal>
    )
  }
  const ParticipentModal = ({groupId, isDrawerVisible, onHide, participentId, onMemberAction}) => {


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
              <TouchableOpacity onPress={()=>onMemberAction("GroupAddAdmin",participentId)}>
              <AppText bold style={{ color: colors.white, marginLeft: 20 }}>
                Promote to admin
              </AppText>
              </TouchableOpacity>
      
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
              <TouchableOpacity onPress={()=>onMemberAction("GroupRemoveMembers",participentId)}>
              <AppText bold style={{ color: "#EA4646", marginLeft: 20 }}>
                Remove from group
              </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  