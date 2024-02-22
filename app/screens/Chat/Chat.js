import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  FlatList,
  Dimensions,
  Animated,
  RefreshControl,
  View
} from "react-native"
import React, { useEffect, useState } from "react"
import profile from "../../../assets/profile.png"
import Screen from "../../component/core/Screen"
import { AntDesign } from "@expo/vector-icons"
import colors from "../../config/colors"
import AppText from "../../component/core/AppText"
import logo from "../../../assets/logo.png"
import { Ionicons } from "@expo/vector-icons"
import chatdp from "../../../assets/chatdp.png"
import Button from "../../component/core/TabButton"
import SwipableListButton from "../../component/core/SwipeList"
import { Swipeable } from "react-native-gesture-handler"
import SwipableItem from "../../component/core/SwipeList"
import CollapsibleHeader from "../../component/core/CollapseHeadere"
import ContactScreen from "./ContactScreen"
import AppSearch from "../../component/core/AppSearch"
import AppButton from "../../component/core/AppButton"
import { LinearGradient } from "expo-linear-gradient"
import Delete from "../../../assets/icons/iconss/delete.svg"
import Pin from "../../../assets/icons/iconss/pin.svg"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import ChatScreen from "./ChatScreen"
import NewGroupCallModel from "../../component/NewGroupCallModel"
import apiClient from "../../api/client"
import { hp, wp } from "../../config/dimensions"
import GroupScreen from "./GroupList"
import GroupList from "./GroupList"
import TabsView from "../../component/TabsView"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import { useNavigation } from "@react-navigation/native"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import { fontSize } from "../../config/fontSize"
import fonts from "../../../assets/fonts"
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Chat = () => {
  const onPress = itemId => {
    if (StateOpen === itemId) {
      // If the same item is pressed again, close it
      setStateOpen(null)
    } else {
      // If a different item is pressed, open it
      setStateOpen(itemId)
    }
  }
  const [newChat, setNewChat] = useState()
  const [active, setActive] = useState(1)
  const [State, setState] = useState(true)
  const [StateOpen, setStateOpen] = useState()
  const data = [
    { id: 1, name: "John", message: "Hello there!" },
    { id: 2, name: "Alice", message: "Hi! vel laoreet metus, " },
    { id: 3, name: "Bob", message: "Nice to meet you." }
    // {id:4, name: 'John', message: 'Hello there!' },
    // {id:5, name: 'Alice', message: 'How are you?' },
    // {id:6, name: 'Bob', message: 'Nice to meet you.' },
    // {id:7, name: 'John', message: 'Hello there!' },
    // {id:8, name: 'Alice', message: 'Hi! vel laoreet metus, nec congue ex. Vestibulum in velit vitae leo elementum ornare. Mauris at neque fringilla, pharetra tellus eget, placerat odio. Duis volutpat consectetur libero, et dignissim quam varius ut Menu' },
    // {id:9, name: 'Bob', message: 'Nice to meet you.' },
    // {id:10, name: 'John', message: 'Hello there!' },
    // {id:11, name: 'Alice', message: 'How are you?' },
    // {id:12, name: 'Bob', message: 'Nice to meet you.' },
    // Add more items as needed
  ]
  const [list, setList] = useState(data)
  const handleDelete = id => {
    // setList(prevList => prevList.filter(item => item.id !== id));
    setList(pev => [...pev.filter(item => item.id !== id)])
    setState(!State)
  }
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setList(data)
    setRefreshing(false)
  }

  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  const renderSwipeableItem = ({ item }) => {
    const rightActions = (progress, dragX) => {
      const swipeThreshold = -screenWidth * 0.4 // Adjust this value as needed for your 50% screen swipe

      let initialTrans = dragX.interpolate({
        inputRange: [-screenWidth * 1, 0],
        outputRange: [-screenWidth * 1, 0],
        extrapolate: "clamp"
      })

      let trans = initialTrans
      const comparisonResult = trans.__getValue() < swipeThreshold
      let deleteHandled = false
      if (comparisonResult && !deleteHandled) {
        handleDelete(item.id)
        // trans = initialTrans
      }

      return (
        <LinearGradient
          colors={["#222222", "#E51F26"]}
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Delete />
          </View>
          {/* <Text style={{ color: 'white', paddingHorizontal: 20 }}>Delete</Text> */}
        </LinearGradient>
      )
    }
    const leftActions = (progress, dragX) => {
      const swipeThreshold = screenWidth * 0.7 // Adjust this value as needed for your 50% screen swipe

      let initialTrans = dragX.interpolate({
        inputRange: [0, screenWidth * 1],
        outputRange: [0, screenWidth * 1],
        extrapolate: "clamp"
      })

      let trans = initialTrans
      const comparisonResult = trans.__getValue() > swipeThreshold
      // Define your left swipe action handling here
      let someLeftHandled = false
      if (comparisonResult && !someLeftHandled) {
        // Handle left swipe action
      }

      return (
        <LinearGradient
          colors={["#2DA1D7", "#222222"]}
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Pin />
          </View>
        </LinearGradient>
      )
    }

    return (
      <Swipeable renderLeftActions={leftActions} renderRightActions={rightActions}>
        <View style={styles.item}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <Image source={profile} style={{ width: 30, height: 30, marginRight: 10 }} />
              <AppText bold style={{ color: colors.white }}>
                {item.name}
              </AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <AppText style={{ marginRight: 10 }}>4 min</AppText>
              {/* {(pinlist==index)&&<SimpleLineIcons name="pin" size={15} color="#2b8fbe" />} */}
            </View>
          </View>
          <TouchableOpacity onPress={() => onPress(item.id)}>
            <View style={{ paddingVertical: 5 }}>
              <AppText style={{ color: colors.white }}>{item.message}</AppText>
            </View>
          </TouchableOpacity>
          {
            StateOpen == item.id && <ChatScreen notification={"Notification"} />
            // [1, 2, 3, 4, 5].map(x => (
            //     <Text key={x} style={styles.subItem}>
            //         - SOME DATA
            //     </Text>
            // ))
          }
        </View>
      </Swipeable>
    )
  }



  const tabs = [
    { key: "2Reply", title: "2Reply", component: Reply },
    { key: "Chat", title: "Chat", component: ContactScreen },
    { key: "Communities", title: "Communities", component: Coummunities },
    { key: "Other", title: "Other", component: GroupList }
  ]
  return (
    <AppWrapper>
      <GradientWrapper>
        <View
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#00ff00"]} // Set the colors of the refresh indicator
            />
          }>
            {/* <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Image source={logo} style={{width:30,height:30,resizeMode:"contain",marginRight:5}}/>
            <AppText lg bold style={{color:colors.white}}>Search</AppText>
         </View>
    </View> */}
          <View
            style={{
             
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20
            }}>
            <View
              style={{
                
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
              <Image
                source={logo}
                style={{
                  width: 36,
                  height: 36,
                  resizeMode: "contain",
                  marginRight: 5
                }}
              />
             <Text  style={{color:colors.white,fontSize:fontSize.normal,fontWeight:"600",fontFamily:fonts.medium}}>Chat</Text>
            </View>
            <Ionicons
              name="md-add-circle-outline"
              onPress={() => setNewChat(true)}
              size={24}
              color="white"
            />
          </View>
     
          <TabsView width={90} tabs={tabs} />

          {newChat && (
            <NewGroupCallModel
              title={"New Messages"}
              show={newChat}
              onhide={() => setNewChat(false)}
              // data={allUser}
            />
          )}
        </View>
      </GradientWrapper>
    </AppWrapper>
  )
}

export default Chat


const Coummunities=()=>{
  const navigation = useNavigation()
  return (
    <>
     <View style={{ marginVertical: 20 }}>
        <AppSearch />
      </View>
   
    <TouchableOpacity
          onPress={() =>
            navigation.navigate("AppStack", {
             screen:"paidEntry"
            })
          }>
          <View style={[styles.item]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <Image source={profile} style={{ width: 30, height: 30, marginRight: 10 }} />
                <AppText bold style={{ color: colors.white }}>
                 John Week
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <AppText style={{ marginRight: 10 }}>12/12/12</AppText>
              </View>
            </View>
           
              <View style={{ paddingVertical: 5 }}>
                {/* <AppText style={{color:colors.white}}>{"fgdfg"}</AppText> */}
                {/* <AppText style={{ color: colors.white }}>
                  {item.message?.length > 30
                    ? `${item.message.substring(0, 40)}...`
                    : item.message}
                </AppText> */}
              </View>
          
          </View>
        </TouchableOpacity>
        </>
  );
}

const Reply=()=>{
  const onPress = itemId => {
    if (StateOpen === itemId) {
      // If the same item is pressed again, close it
      setStateOpen(null)
    } else {
      // If a different item is pressed, open it
      setStateOpen(itemId)
    }
  }
  const [newChat, setNewChat] = useState()
  const [active, setActive] = useState(1)
  const [State, setState] = useState(true)
  const [StateOpen, setStateOpen] = useState()
  const data = [
    { id: 1, name: "Alexander Gobbs", message: "That sounds cool. What do you think about a pool party in my house?" },
    { id: 2, name: "Alice", message: "Hi! vel laoreet metus, " },
    { id: 3, name: "Bob", message: "Hi! vel laoreet metus, nec congue ex. Vestibulum in velit vitae leo elementum ornare. Mauris at neque fringilla, pharetra tellus eget, placerat odio. Duis volutpat consectetur libero, et dignissim quam varius ut." }
    // {id:4, name: 'John', message: 'Hello there!' },
    // {id:5, name: 'Alice', message: 'How are you?' },
    // {id:6, name: 'Bob', message: 'Nice to meet you.' },
    // {id:7, name: 'John', message: 'Hello there!' },
    // {id:8, name: 'Alice', message: 'Hi! vel laoreet metus, nec congue ex. Vestibulum in velit vitae leo elementum ornare. Mauris at neque fringilla, pharetra tellus eget, placerat odio. Duis volutpat consectetur libero, et dignissim quam varius ut Menu' },
    // {id:9, name: 'Bob', message: 'Nice to meet you.' },
    // {id:10, name: 'John', message: 'Hello there!' },
    // {id:11, name: 'Alice', message: 'How are you?' },
    // {id:12, name: 'Bob', message: 'Nice to meet you.' },
    // Add more items as needed
  ]
  const [list, setList] = useState(data)
  const handleDelete = id => {
    // setList(prevList => prevList.filter(item => item.id !== id));
    setList(pev => [...pev.filter(item => item.id !== id)])
    setState(!State)
  }
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setList(data)
    setRefreshing(false)
  }

  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  const renderSwipeableItem = ({ item }) => {
    const rightActions = (progress, dragX) => {
      const swipeThreshold = -screenWidth * 0.4 // Adjust this value as needed for your 50% screen swipe

      let initialTrans = dragX.interpolate({
        inputRange: [-screenWidth * 1, 0],
        outputRange: [-screenWidth * 1, 0],
        extrapolate: "clamp"
      })

      let trans = initialTrans
      const comparisonResult = trans.__getValue() < swipeThreshold
      let deleteHandled = false
      if (comparisonResult && !deleteHandled) {
        handleDelete(item.id)
        // trans = initialTrans
      }

      return (
        <LinearGradient
          colors={["#222222", "#E51F26"]}
          style={{ flex: 1, justifyContent: "center",borderRadius:11, alignItems: "flex-end" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ paddingHorizontal: wp(4.4),borderRadius:11 }}>
            <Delete />
          </View>
          {/* <Text style={{ color: 'white', paddingHorizontal: 20 }}>Delete</Text> */}
        </LinearGradient>
      )
    }
    const leftActions = (progress, dragX) => {
      const swipeThreshold = screenWidth * 0.7 // Adjust this value as needed for your 50% screen swipe

      let initialTrans = dragX.interpolate({
        inputRange: [0, screenWidth * 1],
        outputRange: [0, screenWidth * 1],
        extrapolate: "clamp"
      })

      let trans = initialTrans
      const comparisonResult = trans.__getValue() > swipeThreshold
      // Define your left swipe action handling here
      let someLeftHandled = false
      if (comparisonResult && !someLeftHandled) {
        // Handle left swipe action
      }

      return (
        <LinearGradient
          colors={["#2DA1D7", "#222222"]}
          style={{ flex: 1, justifyContent: "center", borderRadius:11,alignItems: "flex-start" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ paddingHorizontal: wp(4.4) ,}}>
            <Pin />
          </View>
        </LinearGradient>
      )
    }

    return (
      <Swipeable renderLeftActions={leftActions} renderRightActions={rightActions}>
        <View style={styles.item}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <Image source={chatdp} style={{ width: 35, height: 35,borderRadius:5, marginRight: wp(3.5) }} />
              <Text style={{ color: colors.white,fontFamily:fonts.medium,fontSize:fontSize.tiny,fontWeight:"600" }}>
                {item.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <AppText style={{ marginRight: 10 }}>4 min</AppText>
              {/* {(pinlist==index)&&<SimpleLineIcons name="pin" size={15} color="#2b8fbe" />} */}
            </View>
          </View>
          <TouchableOpacity onPress={() => onPress(item.id)}>
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ color: colors.white,fontFamily:fonts.medium,fontSize:fontSize.tiny,fontWeight:"400" }}>{item.message}</Text>
            </View>
          </TouchableOpacity>
          {
            StateOpen == item.id && <ChatScreen notification={"Notification"} />
            // [1, 2, 3, 4, 5].map(x => (
            //     <Text key={x} style={styles.subItem}>
            //         - SOME DATA
            //     </Text>
            // ))
          }
        </View>
      </Swipeable>
    )
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, marginTop: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#00ff00"]} // Set the colors of the refresh indicator
          />
        }>
        <FlatList data={list} renderItem={renderSwipeableItem} keyExtractor={item => item.id} />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(1),
    paddingHorizontal:wp(4.7),
    flex:1
    // backgroundColor:colors.secondary
  },
  btn2: {
    borderRadius: 10,
    width: "100%",
    padding: 20,
    backgroundColor: "blue",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: "flex-end",
    marginVertical: 5,
    justifyContent: "center"
  },
  item: {
    // height: '100%',
    width: "100%",
    paddingHorizontal: wp(2.5),
    paddingVertical:hp(1.6),
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.header,
    borderRadius: 10,
    marginVertical: 5,
    zIndex: 2
  }
})
