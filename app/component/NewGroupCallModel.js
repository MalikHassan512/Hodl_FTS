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
import cross from "../../assets/cross.png"
// import image3 from "../../assets/3.png"
import { Zocial } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import React, { useContext, useEffect, useState } from "react"
import colors from "../config/colors"
import AppText from "./core/AppText"
import AppSearch from "./core/AppSearch"
import { RadioButton } from "react-native-paper"
import AppButton from "./core/AppButton"
import BackArrow from "../../assets/icons/iconss/BackArrow.svg"
import image3 from "../../assets/icons/iconss/profilepic.png"
import Call1 from "../../assets/1.svg"
import Call2 from "../../assets/2.svg"
import ListItemSeparator from "./core/ListItemSeparator"
import apiClient from "../api/client"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { styles } from "../screens/Home/styles"
import { hp, wp } from "../config/dimensions"
import defaultStyles from "../config/defaultStyles"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { getGroupnameFromMembers } from "../screens/Chat/GroupList"
import { SocketContext } from "./socket/SocketProvider"
const NewGroupCallModel = ({ title, show, onhide,groupId,fetchChatData }) => {
  const { socket, isConnected, subscribe, unsubscribe,reconnect } = useContext(SocketContext)
  const { userId, token } = useSelector(state => state.auth)
  const navigation =useNavigation()
  const [search,setSearch]=useState("")
  const [allUser, setAllUser] = useState()
  const fetchUser = async () => {
    const result = await apiClient.get(`/user/?group=${groupId||""}&name=${search}`)
    console.log(result.data.results)
    setAllUser(result.data.results)
  }
  useEffect(()=>{
    if(!isConnected){
      reconnect()
    }
      },[isConnected])
  useEffect(() => {
    fetchUser()
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
    console.log(checkedItems, "ida")
    if(checkedItems.length>1){
      const formdata = new FormData()
      for (const item of checkedItems) {
        
        formdata.append("members", item.id)
      }
      const result = await apiClient.post("/group/", formdata)
if(!result.ok) return console.log(result.data);
onhide()
      navigation.navigate("AppStack", {
        screen: "GroupScreen",
        params: {
          id: result?.data.id,
          name: result?.data.name||getGroupnameFromMembers(result?.data.members),
          item:result?.data
        }
      })
    
    }
    else if(checkedItems.length===1){


      const formdata = new FormData()
      formdata.append("users", checkedItems[0].id)
      const result = await apiClient.post("P2P_chat/", formdata)
      console.log(result,"resultss")
      if(result.status===201||result.status===409) {

let user=result?.data?.users?.find(x => x.id !== userId)

      let chatItem={
        user,
        id:result.data.id,
        name: user?.name,
        item:{...result?.data,user},
      }
      console.log("first",chatItem,"LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        onhide()
        navigation.navigate("AppStack", {
          screen: "ChatScreen",
          params:chatItem
        })
      }
    }
    
  }
  const AddParticipants = async () => {
    console.log(checkedItems, "ida")
    const idsArray = checkedItems.map(item => item.id);
    // console.log(idsArray,"::::::::::::::::::::::::::::::::::::::::::::")
    socket.send(JSON.stringify({type: "GroupAddMembers", group_id: groupId,members_id:idsArray}))
    fetchChatData()
    onhide()
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
            style={{width:35,height:35}}
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
      <View style={{ flex: 1 ,marginTop:hp(6)}}>
        <View
          style={{
            paddingHorizontal: wp(4.7),
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

          <View style={{ marginTop: 18 }}>
          <AppSearch setSearch={setSearch} />
          </View>
          <View style={{ marginTop: 15 }}>
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
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allUser}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: hp(23) }}
            />
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
                  <Call2/>
                {/* <Zocial name="call" size={20} color="white" /> */}
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.button12,
                  { backgroundColor: checkedItems.length > 0 ? colors.primary : "#2A2E30" }
                ]}>
                  <Call1/>
                {/* <AntDesign name="videocamera" size={20} color="white" /> */}
              </TouchableOpacity>
            </>
          ) : title == "New Messages" ? (
            <View style={styles.createChat}>
              <AppButton
                onPress={() => createNewMessage()}
                disabled={checkedItems < 1}
                title={checkedItems.length>1?"Create group":"Create chat"}
              />
            </View>
          ) : title == "Add Member"?(<View style={styles.createChat}>
            <AppButton
              onPress={() => AddParticipants()}
              disabled={checkedItems < 1}
              title={"Add Member"}
            />
          </View>):(
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
      </View>
    </Modal>
  )
}

export default NewGroupCallModel
