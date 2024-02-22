import { Text, Image, View, TouchableOpacity, SafeAreaView, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import homeActive from "../../assets/homeActive.png"
import home from "../../assets/Home.png"
import search from "../../assets/searchManue.png"
import searchActive from "../../assets/searchActive.png"
import thread from "../../assets/threadd.png"
import threadActive from "../../assets/threadactive.png"
import chatActive from "../../assets/chatActive.png"
import chat from "../../assets/chat.png"
import HomeManueActive from "../../assets/HomeManueActive.png"
import HomeManue from "../../assets/HomeManue.png"
import { useState } from "react"
import HomeStack from "./HomeStack"
import ChatStack from "./ChatStack"
import WelcomeStack from "./AuthStack"
const Tab = createBottomTabNavigator()
import { LinearGradient } from "expo-linear-gradient"

import ThreadStack from "./ThreadStack"
import MenueScreen from "../screens/Menu.js/MenueScreen"
import { hp } from "../config/dimensions"
import MenuStack from "./MenuStack"
import SearchStack from "./SearchStack"
import Feed from "../screens/Feed/Feed"
export default function BottomTabs() {
  const [active, setActive] = useState("Home")
  return (
 
    <View style={{ flex: 1, backgroundColor: "#2A2A2A" }}>
      <Tab.Navigator
        initialRouteName="Home"
      
        screenOptions={{
          
          tabBarStyle: {
            backgroundColor: "#121111",
            paddingBottom: 20,
            borderTopWidth: 0
            
          },
          tabBarActiveTintColor: "#ffff",
          headerShown: false
        }}>
        <Tab.Screen
          name="Home1"
          component={Feed}
          // name="Home1"
          // component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <LinearGradient
                colors={["#121111", "#121111FB", "#121111"]} // Set your gradient colors
                start={{ x: 0, y: 0 }} // Start from the top
                end={{ x: 0, y: 1 }} // End at the bottom
                style={{
                  height: 37,

                  flexDirection: "row" // Necessary for positioning the tab icons
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Image
                    source={focused ? HomeManueActive : HomeManue}
                    style={{
                      marginBottom:Platform.OS=="ios"? -7:hp(1)
                    }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            ),
            tabBarVisible: false
          }}
        />
        <Tab.Screen
          name="Search1"
          component={SearchStack}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size, focused }) => (
              <LinearGradient
                colors={["#121111", "#121111FB", "#121111"]} // Set your gradient colors
                start={{ x: 0, y: 0 }} // Start from the top
                end={{ x: 0, y: 1 }} // End at the bottom
                style={{
                  height: 37,
                  flexDirection: "row" // Necessary for positioning the tab icons
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Image
                    source={focused ? searchActive : search}
                    style={{
                      marginBottom:Platform.OS=="ios"? -7:hp(1)
                    }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            )
          }}
        />
        <Tab.Screen
          name="Thread"
          component={ThreadStack}
          options={{
            tabBarLabel: "Topics",
            tabBarIcon: ({ color, size, focused }) => (
              <LinearGradient
                colors={["#121111", "#121111FB", "#121111"]} // Set your gradient colors
                start={{ x: 0, y: 0 }} // Start from the top
                end={{ x: 0, y: 1 }} // End at the bottomy
                style={{
                  height: 37,

                  flexDirection: "row" // Necessary for positioning the tab icons
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Image
                    source={focused ? threadActive : thread}
                    style={{
                      marginBottom:Platform.OS=="ios"? -7:hp(1)
                    }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            )
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStack}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size, focused }) => (
              <LinearGradient
                colors={["#121111", "#121111FB", "#121111"]} // Set your gradient colors
                start={{ x: 0, y: 0 }} // Start from the top
                end={{ x: 0, y: 1 }} // End at the bottom
                style={{
                  height: 37,

                  flexDirection: "row" // Necessary for positioning the tab icons
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Image
                    source={focused ? chatActive : chat}
                    style={{
                      marginBottom:Platform.OS=="ios"? -7:hp(1)
                    }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            )
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStack}
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size, focused }) => (
              <LinearGradient
                colors={["#121111", "#121111FB", "#121111"]} // Set your gradient colors
                start={{ x: 0, y: 0 }} // Start from the top
                end={{ x: 0, y: 1 }} // End at the bottom
                style={{
                  height: 37,

                  flexDirection: "row" // Necessary for positioning the tab icons
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Image
                    source={focused ? homeActive : home}
                    style={{
                      marginBottom:Platform.OS=="ios"? -7:hp(1)
                    }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
