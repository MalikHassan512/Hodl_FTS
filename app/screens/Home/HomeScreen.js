import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  StatusBar,
  View,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native"
import image from "../../../assets/ManueIcon.png"
import profile from "../../../assets/icons/iconss/profilepic.png"
import image1 from "../../../assets/Vector.png"
import image2 from "../../../assets/Vector_1.png"
import image3 from "../../../assets/3.png"
import cross from "../../../assets/cross.png"
import vedioCamraIcon from "../../../assets/vedioCamra.png"
import infoIcon from "../../../assets/info.png"
import Vediocam from "../../../assets/icons/iconss/Vediocam.svg"
import Screen from "../../component/core/Screen"
import AppSearch from "../../component/core/AppSearch"
import AppText from "../../component/core/AppText"
import Button from "../../component/core/TabButton"
import colors from "../../config/colors"
import List from "../../component/List"
import { AntDesign } from "@expo/vector-icons"
import { Zocial } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AppButton from "../../component/core/AppButton"
import NewGroupCallModel from "../../component/NewGroupCallModel"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/authSlice"
import CallIcon from "../../../assets/icons/call-icon.svg"
import VedioCall from "../../../assets/icons/video-call.svg"
import AudioCall from "../../../assets/icons/call-icon.svg"
import Account from "../../../assets/icons/iconss/Account.svg"
import CallPlus from "../../../assets/icons/iconss/CallPlus.svg"
import { fontSize } from "../../config/fontSize"
import HomeHeader from "./HomeHeader"
import Menu from "../../../assets/icons/iconss/Menu.svg"
import NewCallModel from "./Modal/NewCallModel"
import fonts from "../../../assets/fonts"
import { hp, wp } from "../../config/dimensions"
import { styles } from "./styles"
import TabsView from "../../component/TabsView"
import defaultStyles from "../../config/defaultStyles"
import TitleBar from "../../component/core/TitleBar"

const HomeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const data = [
    { name: "John", log: "Incoming" },
    { name: "Sarah", log: "Missed" },
    { name: "Mike", log: "Outgoing" },
    { name: "Liam", log: "Incoming" },
    { name: "Sophia", log: "Missed" },
    { name: "David", log: "Outgoing" },
    { name: "Emily", log: "Incoming" },
    { name: "Tom", log: "Missed" },
    { name: "Alice", log: "Outgoing" },
    { name: "William", log: "Incoming" },
    { name: "Mia", log: "Missed" },
    { name: "Ethan", log: "Outgoing" },
    { name: "Ava", log: "Incoming" },
    { name: "Olivia", log: "Missed" },
    { name: "Olivia", log: "Missed" },
    { name: "Olivia", log: "Missed" }
    // Add more items as needed
  ]
  const tabs = [
    { key: 'All', title: 'All', component:Call  },
    { key: 'Missed', title: 'Missed', component: MissCall },
    
  ];
  return (
    <Screen >
      {/* <HomeHeader isDrawerVisible={isDrawerVisible} setIsDrawerVisible={setIsDrawerVisible} /> */}
      {/* <View
      style={[defaultStyles.test,{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }]}> */}
      <View  style={[{flexDirection:"row",paddingHorizontal:wp(3),justifyContent:"space-between",marginBottom:hp(2.2),alignItems:"center"}]}>
      <TitleBar  containerStyle={{paddingHorizontal:0}} title={"Call History"} />
      {/* <Pressable style={{position:"absolute",left:10}} onPress={() => navigation.openDrawer()}>
        <Menu />
      </Pressable> */}
      <TouchableOpacity sty  onPress={() => setIsDrawerVisible(true)}>
        <CallPlus />
      </TouchableOpacity>
      </View>
    <TabsView width={45} tabs={tabs} />
 
      {/* <Button buttons={["All", "Missed"]} onClick={setActive} /> */}
      
    {/* </View> */}
      {/* <View style={{ marginTop: 20 }}>
        <AppSearch />
      </View> */}

        {isDrawerVisible && (
          <NewCallModel
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={() => setIsDrawerVisible(false)}
            data={data}
          />
        )}
    </Screen>
  )
}

export default HomeScreen
const Call=()=>{
  const data = [
    { name: "John", log: "Incoming" },
    { name: "Sarah", log: "Missed" },
    { name: "Mike", log: "Outgoing" },
    { name: "Liam", log: "Incoming" },
    { name: "Sophia", log: "Missed" },
    { name: "David", log: "Outgoing" },
    { name: "Emily", log: "Incoming" },
    { name: "Tom", log: "Missed" },
    { name: "Alice", log: "Outgoing" },
    { name: "William", log: "Incoming" },
    { name: "Mia", log: "Missed" },
    { name: "Ethan", log: "Outgoing" },
    { name: "Ava", log: "Incoming" },
    { name: "Olivia", log: "Missed" },
    { name: "Olivia", log: "Missed" },
    { name: "Olivia", log: "Missed" }
    // Add more items as needed
  ]
  const[search,setSearch]=useState("")
  return(
    <>
    <View style={{ marginTop: 20 ,paddingHorizontal:wp(4.6)}}>
        <AppSearch setSearch={setSearch} />
      </View>
    <View style={{ paddingHorizontal:wp(4.6),marginTop: 20,height:hp(100) }}>
        {/* Temperory Logout  */}
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={styles.title}>Recent Call</Text>
        </TouchableOpacity>
        <View style={{ paddingBottom: hp(25), marginTop: hp(2) }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: hp(6) }}
          />
        </View>

      
      </View>
      </>
  )
}
const MissCall=()=>{

}
const renderItem = items => {
  const { item } = items
  const x = item
  return (
    <View style={styles.list}>
      <View style={[styles.item]}>
        <Image
          style={{width:35,height:35,borderRadius:5,}}
          source={profile}
          resizeMode="contain" // Set resizeMode to contain
        />
        <View style={styles.detail}>
          <Text style={[styles.name, { color: x.log == "Missed" ? colors.red : colors.white }]}>
            {x.name}
          </Text>
          <View
            style={[{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding:2
            }]}>
            {x.log == "Outgoing" ? (
              <Vediocam/>
              // <Image
              //   // style={styles.image}
              //   source={vedioCamraIcon}
              //   style={{width:5,height:5}}
              // />
            ) : (
              <Image
                // style={styles.image}
                source={image2}
                style={{width:12,height:12}}
              />
            )}
            <Text style={styles.calling}>{x.log}</Text>
          </View>
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
            <Text style={styles.time}>12:44</Text>

            <Image
              // style={styles.image}
              source={infoIcon}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
