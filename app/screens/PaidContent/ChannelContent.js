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
  KeyboardAvoidingView,
  Pressable
} from "react-native"
import React, { useRef, useEffect, useState } from "react"
import Screen from "../../component/core/Screen"
import AppCameraformik from "../../component/forms/AppCameraformik"
import ChatVedioCall from "../../../assets/icons/iconss/ChatVedioCall.svg"
import ChatAudioCall from "../../../assets/icons/iconss/ChayAudioCall.svg"
import ChatMic from "../../../assets/icons/iconss/ChatMic.svg"
import BackArrow from "../../../assets/cross.png"
import { AntDesign } from "@expo/vector-icons"
import PalestineSingle from "../../../assets/JoeProfile.png"
import colors from "../../config/colors"
import Back from "../../../assets/icons/iconss/BackIcon.svg"
import Channellock from "../../../assets/icons/iconss/channellock.svg"
import Verified from "../../../assets/icons/iconss/verified-yellow.svg"
import EyeIcon from "../../../assets/icons/iconss/eye.svg"
import ButtonAdd from "../../../assets/icons/iconss/AddEmojiBlack.svg"
import SettingContent from "../../../assets/icons/iconss/settingContent.svg"
import ChannelLockMSG from "../../../assets/icons/iconss/Lock send message.svg"
import PromotePostIcon from "../../../assets/icons/iconss/Promote post.svg"
import Mutee from "../../../assets/icons/iconss/mutee.svg"
import InfoWhiteIcon from "../../../assets/icons/iconss/info white.svg"
import CopyIcon from "../../../assets/icons/iconss/copy.svg"
import StarIcon from "../../../assets/icons/iconss/star.svg"
import Timer from "../../../assets/icons/iconss/TimerHour.svg"
import LargeTimer from "../../../assets/icons/iconss/LargeTimmer.svg"
import { fontSize } from "../../config/fontSize"
import fonts from "../../../assets/fonts"
import AppButton from "../../component/core/AppButton"
import { useNavigation } from "@react-navigation/native"
import { hp, wp } from "../../config/dimensions"
import AppText from "../../component/core/AppText"
import PaidContentModal from "./PaidContentModal"
import OutsidePressHandler from "react-native-outside-press"
import ListItemSeparator from "../../component/core/ListItemSeparator"
import PaidContentSubscribe from "./PaidContentSubscribe"
import LinearGradient from "react-native-linear-gradient"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import defaultStyles from "../../config/defaultStyles"


const ChannelContent = () => {
  const navigation = useNavigation()
  const flatListRef = useRef()
  const [subscribe,setSubcribe]=useState("channel")
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: new Date().getTime(),
      type: "receive",
      text: "Duis volutpat consectetur libero, et dignissim quam varius."
    },
    {
      id: new Date().getTime(),
      type: "receive",
      text: "Duis volutpat consectetur libero, et dignissim quam varius."
    },
    {
      id: new Date().getTime(),
      type: "receive",
      text: "Phasellus rhoncus sapien vitae dolor fermentum ultrices. Integer viverra odio eget dolor mollis, vitae elementum massa lobortis. Nullam euismod mauris sit amet vehicula dictum."
    },
    {
      id: new Date().getTime(),
      type: "receive",
      contentType:"paid",
      text: "Duis volutpat consectetur libero, et dignissim quam varius."
    },
    {
      id: new Date().getTime(),
      type: "receive",
      contentType:"paid",
      file:require("../../../assets/paidVideo.png"),
    },
    {
      id: new Date().getTime(),
      type: "receive",
      contentType:"paid",
      file:require("../../../assets/paidVideo.png"),
      video:true
    },
  ])
  const [message, setMessage] = useState("")
  const sendMsg = () => {
    if (message.length === 0) return
    setMessages([{ id: new Date().getTime(), type: "send", text: message }, ...messages])

    setMessage("")
  }
  const handleGoBack = () => {
    navigation.goBack()
  }
  const [modalShow,setModalShow]=useState(false)
  const[bar,setBar]=useState()
  const options=[
    {text:"Tab settings",icon:SettingContent,screen:"TabSetting"},
    {text:"Mute tab",icon:Mutee},
  ]
  return (
    <AppWrapper>
      <GradientWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <PaidContentModal isDrawerVisible={modalShow} onHide={()=>setModalShow(false)}/>
        
          <TouchableOpacity
          // onPress={() => navigation.navigate("ChatProfile")}
          >
            <View
              style={{
                paddingHorizontal: wp(4.3),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.header
              }}>
              <View style={styles.item}>
                <TouchableOpacity onPress={handleGoBack}>
                  <Back style={{ marginRight: 26 }} />
                </TouchableOpacity>
                <Image
                  style={styles.image1}
                  source={PalestineSingle}
                  resizeMode="contain" // Set resizeMode to contain
                />
                <View style={[styles.detail, { marginLeft: 10 }]}>
                  <Text style={[styles.name, { color: colors.white }]}>Joe Rodriguez</Text>
                </View>
                <View style={[styles.detail, { marginLeft: 5 }]}>
                  <Verified/>
                </View>
              </View>
              <View>
<AppText>13k members</AppText>

              </View>
            </View>
          </TouchableOpacity>
          <View style={{position:"relative",flex:1}}>

       
<View style={[styles.shadowContainer,{flexDirection:"row",backgroundColor:"#666",height:40,columnGap:20,paddingHorizontal:wp(4),
alignItems:"center"}]}>
<TouchableOpacity onPress={()=>setSubcribe("channel")}>
<AppText  style={{fontSize:fontSize.tinyx1,color:subscribe=="channel"?"white":"#979797"}}>channel</AppText>
</TouchableOpacity>
<TouchableOpacity onLongPress={()=>setBar("subscribers")} onPress={()=>setSubcribe("subscribers")} style={{flexDirection:"row",columnGap:5,alignItems:"center"}}>

<AppText style={{color:subscribe=="subscribers"?"white":"#979797",fontSize:fontSize.tinyx1}}>subscribers</AppText>
<Channellock/>
</TouchableOpacity>
</View>
{bar=="subscribers" &&
<View >
     <View
style={[
  { position: "relative" },
  styles.chatItemCommon,

  styles.send,
  {backgroundColor:colors.primary,width:"50%",marginTop:5,

}
]}
 >
  <OutsidePressHandler
       onOutsidePress={()=>setBar(false)}
     >
   <View  >
{options.map(({text,icon:Icon,screen},index)=>(
  <View  key={index}>
  
   <TouchableOpacity  onPress={()=>{
     screen &&  navigation.navigate(screen)
     setBar(false)
  }}  style={{flexDirection:'row',columnGap:5,marginBottom:10}} key={index}>
    <Icon/>
   <AppText white style={{fontSize:fontSize.tiny}}>{text}</AppText>
 </TouchableOpacity>
 <ListItemSeparator style={{backgroundColor:colors.gray_900,opacity:0.1,marginBottom:10}}/>
  </View>
))  }
   </View>
 </OutsidePressHandler>
 </View>
      </View>}


{subscribe=="subscribers"?<PaidContentSubscribe/>:
<>
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
              {message.length>0 ? <View
                style={{
                  padding: 5,
                  backgroundColor: "#2da1d7",
                  borderRadius: 30
                }}>
                  
{/* <ChannelLockMSG onPress={()=>setModalShow(true)}/> */}
                <AntDesign name="arrowup" size={20} color="white" onPress={sendMsg} />

              </View>:
              <View
                style={{
                  backgroundColor: "#2da1d7",
                  borderRadius: 30
                }}>
                  
<ChannelLockMSG onPress={()=>setModalShow(true)}/>
                {/* <AntDesign name="arrowup" size={20} color="white" onPress={sendMsg} /> */}

              </View>}
            </View>

            <View style={[{ flexDirection: "row" }]}>
              <ChatMic style={{ marginRight: 10 }} />
              {/* <FontAwesome5 name="camera" onPress={()=>setOpenCamera(true)}   size={24} color="white" /> */}
              <AppCameraformik />
            </View>
          </View>
          </>}

         
          </View>
       
      </KeyboardAvoidingView>
      </GradientWrapper>
      </AppWrapper>
   
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
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);

  const handleLongPress = () => {
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleCopy = () => {
    // Implement your copy logic here
    handleCloseContextMenu();
  };

  const handleStar = () => {
    // Implement your star logic here
    handleCloseContextMenu();
  };

  const options=[
    {text:"Promote post",icon:PromotePostIcon},
    {text:"Mark with star",icon:StarIcon},
    {text:"Copy",icon:CopyIcon},
    {text:"Details",icon:InfoWhiteIcon},
  ]
if(item.contentType==="paid")
return <PaidItem item={item}/>
  return (
  
    <View style={{ marginBottom: 15,  }}>
     <TouchableOpacity activeOpacity={1} onLongPress={handleLongPress}>
     
      <View
       style={[
        { position: "relative", },
        styles.chatItemCommon,
        item.type === "send" ? styles.send: styles.receive
      ]}
        >
           <LinearGradient
        colors={["#454545", "#222222",]}
        style={[
          { position: "relative", },
          styles.chatItemCommon,
          item.type === "send" ? styles.send1 : styles.receive1
        ]}
      > 
        <Text style={{ color: "white", fontFamily: fonts.medium, fontSize: 14, fontWeight: 400 }}>
          {item.text}
        </Text>
        </LinearGradient>
      </View>
      
      </TouchableOpacity>
      <View style={[item.type === "send" ? {flexDirection:"row",justifyContent:"flex-end"}: {flexDirection:"row",justifyContent:"flex-start"},]}>
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",maxWidth: "70%"}}>

      <View style={{flexDirection:"row",alignItems:"center"}}>
          <AppText white >12:02</AppText>
          <AppText white style={{marginRight:2,marginLeft:5}}>11k</AppText>
          <EyeIcon/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",columnGap:3}}>
        <View style={{backgroundColor:colors.primary,paddingVertical:3,paddingHorizontal:10,borderRadius:15}}>
          <AppText white  >🚀5</AppText>
          </View>
          <View style={{backgroundColor:colors.primary,paddingVertical:3,paddingHorizontal:10,borderRadius:15}}>
          <AppText white  >😍5</AppText> 
          </View>
          <View style={{backgroundColor:colors.primary,paddingVertical:3,paddingHorizontal:10,borderRadius:15}}>
          <AppText  >🌝5</AppText> 
          </View>
          <ButtonAdd/>
        </View>
      </View>
      </View>
     {isContextMenuVisible&&   
      <View >
     <View
style={[
  { position: "relative" },
  styles.chatItemCommon,

  item.type === "send" ? styles.send : styles.receive,
  {backgroundColor:colors.primary,width:"50%",marginTop:5,
transform:[{translateY:-20}]
}
]}
 >
  <OutsidePressHandler
       onOutsidePress={handleCloseContextMenu}
     >
   <View  style={{padding:wp(2.7)}}>
{options.map(({text,icon:Icon},index)=>(
  <View  key={index}>
  
   <TouchableOpacity onPress={handleCloseContextMenu} style={{flexDirection:'row',columnGap:5,marginBottom:10}} key={index}>
    <Icon/>
   <AppText white style={{fontSize:fontSize.tiny}}>{text}</AppText>
 </TouchableOpacity>
 <ListItemSeparator style={{backgroundColor:colors.gray_900,opacity:0.1,marginBottom:10}}/>
  </View>
))  }
   </View>
 </OutsidePressHandler>
 </View>
      </View>
}
    </View>
    
  )
}
function PaidItem({
  item,
  index
}) {
  return (
    <View style={{ marginBottom: 15}}>
    
      <View
        style={[
          { position: "relative" },
          styles.chatItemCommon,
          item.type === "send" ? styles.send : styles.receive,
          { paddingHorizontal: 0,
            paddingVertical: 0}
        ]}>
        {/* {item.reaction?.length>0 ?
            <> */}
         
     {item.text&&   <Text style={{ color:"gray", fontFamily: fonts.medium, fontSize: 14, fontWeight: 400 }}>
          Text Message locked
        </Text>}
     {item.file&&item.video? <Image source={item.file} style={{width:"100%"}}/>:
    
    
    item.file&& <Image source={item.file} style={{width:"100%"}}  blurRadius={10}/>}
     <View style={{ paddingHorizontal: 10,
  paddingVertical: 8,}}>

       <AppButton style={{backgroundColor:"#2DA1D7"}} title={"Unlock message for 5€"}/>
     </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",maxWidth: "70%"}}>

      <View style={{flexDirection:"row",alignItems:"center"}}>
          <AppText white >12:02</AppText>
          <AppText white style={{marginRight:2,marginLeft:5}}>11k</AppText>
          <EyeIcon/>
        </View>

      </View>
     
    </View>
  )
}
export default ChannelContent



const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    // top: 0, left: 0, bottom: 0, right: 0,
  },
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
    // backgroundColor: "#2c4957",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    width: "75%"
  },
  receive: {
    alignSelf: "flex-start",

    width: "75%"
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
    paddingVertical: 8,
    borderRadius: 10,
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
  },
  shadowContainer: {
    // Common styles
    backgroundColor: 'white',
    borderRadius: 10,
    
    // Android shadow
    elevation: 5,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.57,
    shadowRadius: 7,
  },
})
