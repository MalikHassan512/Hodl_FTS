import {
    Animated,
    Modal,
    Dimensions,
    StatusBar,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    FlatList,
    SafeAreaView
  } from "react-native"
  import cross from "../../../assets/cross.png"
  import image3 from "../../../assets/3.png"
  import { Zocial } from "@expo/vector-icons"
  import { AntDesign } from "@expo/vector-icons"
  import React, { useContext, useEffect, useState } from "react"
  import { RadioButton } from "react-native-paper"
  import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
  import ListItemSeparator from "../../component/core/ListItemSeparator"
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
  import { styles } from "../Home/styles"
  import { useNavigation } from "@react-navigation/native"
  import { useSelector } from "react-redux"
import colors from "../../config/colors"
import AppText from "../../component/core/AppText"
import AppSearch from "../../component/core/AppSearch"
import AppButton from "../../component/core/AppButton"
import apiClient from "../../api/client"
import { hp, wp } from "../../config/dimensions"
import { getGroupnameFromMembers } from "./GroupList"
import { SocketContext } from "../../component/socket/SocketProvider"
  const ForwardModal = ({ title, show, onhide,forward,handleCloseReaction }) => {
    const { userId, token } = useSelector(state => state.auth)
    const navigation =useNavigation()
    const [allUser, setAllUser] = useState()
    const [search,setSearch]=useState("")
    const [allgroup, setAllgroup] = useState()
    const { socket, isConnected, subscribe, unsubscribe,reconnect } = useContext(SocketContext)
    const sendMsg = (message,item) => {
      console.log(message,item,"send socket")
      {
        socket.send(JSON.stringify({ message: message, type: item.type==="group"?"GroupMessage":"ChatMessage",  ...(item.type==="group" ? { group_id: item.id } : { chat_id: item.id }) }))
      }
    }
    const fetchUser = async () => {
      const result = await apiClient.get(`user/?name=${search}`)
      console.log(result.data.results)
      setAllUser(result.data.results)
    }
    const fetchAllMyChat = async () => {
      const result = await apiClient.get(`/group/?name=${search}`)
      if (!result.ok) return console.log("error")
      console.log(result.data.results)
      const allUsers = result.data.results
      let data = []
  
      allUsers.map(item => {
        let name = item.name||getGroupnameFromMembers(item.members)
        data.push({ name, id: item.id, message: item?.lastmsg?.message || "",type:"group" })
      })
      console.log(data)
      setAllgroup(data)
    }
  
    useEffect(() => {
      fetchUser()
      fetchAllMyChat()
    }, [search])
  
    const [checkedItems, setCheckedItems] = useState([])
    console.log(checkedItems, "aassas")
    const handleRadioButtonChange = value => {
      let updatedCheckedItems = [...checkedItems]
  
      const itemIndex = updatedCheckedItems.findIndex(item => item.id === value.id)
  
      if (itemIndex !== -1) {
        // If the item exists, remove it (uncheck)
        updatedCheckedItems.splice(itemIndex, 1)
      } else {
        // If the item doesn't exist, add it (check)
        updatedCheckedItems.push(value)
      }
  
      setCheckedItems(updatedCheckedItems)
    }
    const isItemChecked = value => {
      return checkedItems.some(item => item.id === value)
    }
  
    const createNewMessage = async () => {

 let idz=[]

 for (const itemMember of checkedItems.filter(x=>x.type!=="group")) {

  
   const formdata = new FormData()
   formdata.append("users", itemMember.id)
   const result = await apiClient.post("P2P_chat/", formdata)
   console.log(result,"::::::::::::::::::::::all")
   
  if( result?.data)
  idz.push({id:result.data.id})
 }
 let newChatItems=checkedItems.filter(x=>x.type==="group").concat(idz)
 newChatItems.forEach(x=>{

   sendMsg(forward,x)
 })
        onhide()
        handleCloseReaction()
     
      
      
    }
    const [statusBarHeight, setStatusBarHeight] = useState(0)
    useEffect(() => {
      // Retrieve the status bar height
      StatusBar.currentHeight && setStatusBarHeight(StatusBar.currentHeight)
    }, [])
  
    console.log(statusBarHeight, "asdfgh")
    const renderItem = items => {
      const { item } = items
      const x = item
      return (
        <View style={styles.list}>
          <View style={styles.item}>
            <Image
              style={styles.image1}
              source={image3}
              resizeMode="contain" // Set resizeMode to contain
            />
            <View style={styles.detail}>
              <Text style={[styles.name, { color: colors.white }]}>{x.name}</Text>
            </View>
          </View>
  
          <View>
            <View>
              <RadioButton.Android
                value={x.email}
                status={isItemChecked(x.id) ? "checked" : "unchecked"}
                onPress={() => handleRadioButtonChange(x)}
                color="#2DA1D7"
              />
            </View>
          </View>
        </View>
      )
    }
    return (
      <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => onhide()}>
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: wp(3),
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: hp(1),
              backgroundColor: "#222222",
              flex: 1
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: wp(4)
              }}>
              <View style={{ width: 20, height: 20 }} />
              <AppText bold lg style={{ color: colors.white }}>
                {title}
              </AppText>
              <TouchableOpacity onPress={() => onhide()}>
                <Image source={cross} style={styles.image} resizeMode="contain" />
              </TouchableOpacity>
            </View>
  
            <View style={{ marginTop: 20 }}>
              <AppSearch setSearch={setSearch} />
            </View>
            <View style={{ marginTop: 20 }}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.innerContainer}>
                  {checkedItems?.map((item, index) => (
                    <View key={index} style={styles.itemChecked}>
                      <Text style={[styles.name, { color: colors.white }]}>{item.name}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
  
              {checkedItems.length > 0 && <ListItemSeparator />}
              <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}>
              {allUser?.map((x,index)=>
               <View key={index} style={styles.list}>
               <View style={styles.item}>
                 <Image
                   style={styles.image1}
                   source={image3}
                   resizeMode="contain" // Set resizeMode to contain
                 />
                 <View style={styles.detail}>
                   <Text style={[styles.name, { color: colors.white }]}>{x.name}</Text>
                 </View>
               </View>
       
               <View>
                 <View>
                   <RadioButton.Android
                     value={x.email}
                     status={isItemChecked(x.id) ? "checked" : "unchecked"}
                     onPress={() => handleRadioButtonChange(x)}
                     color="#2DA1D7"
                   />
                 </View>
               </View>
             </View>
              )}
              {allgroup?.map((x,index)=>
               <View key={index} style={styles.list}>
               <View style={styles.item}>
                 <Image
                   style={styles.image1}
                   source={image3}
                   resizeMode="contain" // Set resizeMode to contain
                 />
                 <View style={styles.detail}>
                   <Text style={[styles.name, { color: colors.white }]}>{x.name}</Text>
                 </View>
               </View>
       
               <View>
                 <View>
                   <RadioButton.Android
                     value={x.email}
                     status={isItemChecked(x.id) ? "checked" : "unchecked"}
                     onPress={() => handleRadioButtonChange(x)}
                     color="#2DA1D7"
                   />
                 </View>
               </View>
             </View>
              )}
              </ScrollView>
              {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={allUser}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: hp(23) }}
              /> */}
            </View>
          </View>
  
          <View style={[styles.buttonContainer1]}>
            {title == "New Group Call" ? (
              <>
                <TouchableOpacity
                  style={[
                    styles.button12,
                    {
                      marginRight: 10,
                      backgroundColor: checkedItems.length > 0 ? colors.primary : "#2A2E30"
                    }
                  ]}>
                  <Zocial name="call" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button12,
                    { backgroundColor: checkedItems.length > 0 ? colors.primary : "#2A2E30" }
                  ]}>
                  <AntDesign name="videocamera" size={20} color="white" />
                </TouchableOpacity>
              </>
            ) : title == "New Messages" ? (
              <View style={styles.createChat}>
                <AppButton
                  onPress={() => createNewMessage()}
                  disabled={checkedItems < 1}
                  title={forward?"Forward":"Create chat"}
                />
              </View>
            ) : (
              // <TouchableOpacity style={[styles.button1,{flexDirection:"row",width:"100%",justifyContent:"center"}]} onPress={()=>createNewMessage()}>
              // <AppText lg style={{color:colors.white,}}>Create Chat</AppText>
              // </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button1,
                  {
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center"
                  }
                ]}>
                <AppText lg style={{ color: colors.white }}>
                  Invite
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
  
  export default ForwardModal
  