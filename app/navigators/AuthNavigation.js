import { View,Image, TouchableOpacity,Text, Touchable } from 'react-native'
import React,{useState} from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabButton from './TabButton';
import {
    MaterialCommunityIcons,
    FontAwesome,
    Ionicons,
    AntDesign,
  } from "@expo/vector-icons";
import HomeStack from './HomeStack';
import WelcomeStack from './WelcomeStack';
import colors from '../config/colors';
import ChatStack from './ChatStack';
import homeActive from "../../assets/homeActive.png"
import home from "../../assets/Home.png"
import search from "../../assets/searchManue.png"
import searchActive from "../../assets/searchActive.png"
import thread from "../../assets/Tread.png"
import threadActive from "../../assets/threadactive.png"
import chatActive from "../../assets/chatActive.png"
import chat from "../../assets/chat.png"
import HomeManueActive from "../../assets/HomeManueActive.png"
import HomeManue from "../../assets/HomeManue.png"
import MyTabs from '../component/core/MyTabs';







const Tab = createBottomTabNavigator();
const AuthNavigation = () => {
    const { isVisible } = useState(false);
    const [active, setActive] = useState("Home");
    const getTabBarVisibility = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? ""
    console.log(routeName,"aszx");
      if (routeName === 'Chat') {
        return { display: "none" }// Hide tab bar for 'Call' screen
      }
    
      return true; // Show tab bar for other screens
    };
    console.log(active,"sasasas");
  return (
    <View style={{flex:1}}>
    <MyTabs />
    </View>
//     <Tab.Navigator
//     screenOptions={{
//       tabBarStyle: 
//         {
//           backgroundColor: colors.secondary,
//           height: 70,
//           flexDirection:"column",
//           borderColor: colors.secondary,
//           justifyContent: "space-between", // Adjust the space between tabs
//           paddingHorizontal: 20, 
//           },
//       headerShown: false,
//     }}
//   >
//     <Tab.Screen
//       name="EntHome"
//       component={HomeStack}
//       options={({ navigation,route  }) => ({
//         tabBarButton: () => (
//           <TouchableOpacity  active={active}
//             onPress={() => {
//               navigation.navigate('EntHome', { screen: 'Home' })
//               setActive("Home");
//             }}>
//              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//   {active === "Home" ?
//     <Image
//       source={HomeManueActive}
//       resizeMode="contain"
//     /> :
//     <Image
//       source={HomeManue}
//       resizeMode="contain"
//     />}
//   <Text style={{ color: colors.white, marginTop: 5 }}>Home</Text>
// </View>
//          </TouchableOpacity>
          
//         ),
//         tabBarVisible: false,
//       })}
//     />
//     <Tab.Screen
//       name="Search"
//       component={WelcomeStack}
//       options={({ navigation }) => ({
//         tabBarButton: () => (
//           <TouchableOpacity  active={active}
//           onPress={() => {
//             navigation.navigate('EntHome', { screen: 'Home' })
//             setActive("Search");
//           }}>
//            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
// {active === "Search" ?
//   <Image
//     source={searchActive}
//     resizeMode="contain"
//   /> :
//   <Image
//     source={search}
//     resizeMode="contain"
//   />}
// <Text style={{ color: colors.white, marginTop: 5 }}>Search</Text>
// </View>
//        </TouchableOpacity>
//         ),
       
//       })}
//     />
//     <Tab.Screen
//       name="Notification"
//       component={HomeStack}
//       options={({ navigation }) => ({
//         tabBarButton: () => (
//           <TouchableOpacity  active={active}
//           onPress={() => {
//             navigation.navigate('EntHome', { screen: 'Home' })
//             setActive("Thread");
//           }}>
//            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
// {active === "Thread" ?
//   <Image
//     source={threadActive}
//     resizeMode="contain"
//   /> :
//   <Image
//     source={thread}
//     resizeMode="contain"
//   />}
// <Text style={{ color: colors.white, marginTop: 5 }}>Thread</Text>
// </View>
//        </TouchableOpacity>
//         ),
//       })}
//     />
//     <Tab.Screen
//       name="Chat"
//       component={ChatStack}
//       options={({ navigation }) => ({
//         tabBarButton: () => (
//           <TouchableOpacity  active={active}
//           onPress={() => {
//             navigation.navigate('EntHome', { screen: 'Home' })
//             setActive("Chat");
//           }}>
//            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
// {active === "Chat" ?
//   <Image
//     source={chatActive}
//     resizeMode="contain"
//   /> :
//   <Image
//     source={chat}
//     resizeMode="contain"
//   />}
// <Text style={{ color: colors.white, marginTop: 5 }}>Chat</Text>
// </View>
//        </TouchableOpacity>
//         ),
        
//       })}
//     />
//     <Tab.Screen
//       name="ProfiHle"
//       component={HomeStack}
//       options={({ navigation }) => ({
//         tabBarButton: () => (
//           <TouchableOpacity  active={active}
//             onPress={() => {
//               navigation.navigate('EntHome', { screen: 'Home' })
//               setActive("Manue");
//             }}>
//              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//   {active === "Manue" ?
//     <Image
//       source={homeActive}
//       resizeMode="contain"
//     /> :
//     <Image
//       source={home}
//       resizeMode="contain"
//     />}
//   <Text style={{ color: colors.white, marginTop: 5 }}>Manue</Text>
// </View>
//          </TouchableOpacity>
//         ),
//       })}
//     />
    

    
//   </Tab.Navigator>
  )
}

export default AuthNavigation