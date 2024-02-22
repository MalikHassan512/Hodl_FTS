import React from "react"
import { SafeAreaView, StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import AuthNavigator from "./AuthStack"
import BottomTabs from "./BottomTab"
import ChatScreen from "../screens/Chat/ChatScreen"
import ChatProfile from "../screens/Chat/ChatProfile"
import { useSelector } from "react-redux"
import AppWrapper from "../component/AppWrapper/Wrapper"
import SingleThread from "../screens/Thread/SingleThread"
import ThreadChat from "../screens/Thread/ThreadChat"
import Settings from "../screens/Menu.js/Settings"
import Account from "../screens/Menu.js/Account"
import Help from "../screens/Menu.js/Help"
import EditProfile from "../screens/Menu.js/EditProfile"
import HODLPremium from "../screens/Menu.js/HODLPremium"
import BadgeStack from "./BadgeStack"
import BuySellUsernames from "../screens/Menu.js/BuySellUsernames"
import PaidContentStack from "./PaidContentStack"
import Payment from "../screens/Menu.js/Payment"
import Wallet from "../screens/Menu.js/Wallet"
import Reward from "../screens/Menu.js/Reward"
import ChatFile from "../screens/Chat/ChatFile"
import GroupProfile from "../screens/Chat/GroupProfile"
import GroupChatScreen from "../screens/Chat/GroupChatScreen"
import ChatImages from "../screens/Chat/ChatImages"
import Suggestion from "../screens/Menu.js/Suggestion"
import HomeStack from "./HomeStack"
import TabSetting from "../screens/PaidContent/TabSetting"
import NotificationsStack from "./NotificationsStack"

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const MainNavigator = () => {
  const { isLoggedIn, token } = useSelector(state => state.auth)
  console.log("first", isLoggedIn)
  const AppStack = () => {
    return (
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="AppTabs" component={BottomTabs} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatProfile" component={ChatProfile} options={{ headerShown: false }} />
            <Stack.Screen name="GroupScreen" component={GroupChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GroupProfile" component={GroupProfile} options={{ headerShown: false }} />
            <Stack.Screen name="SingleThread" component={SingleThread} options={{ headerShown: false }} />
            <Stack.Screen name="ThreadChat" component={ThreadChat} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="HODLPremium" component={HODLPremium} options={{ headerShown: false }} />
            <Stack.Screen name="badgeEntry" component={BadgeStack} options={{ headerShown: false }} />
            <Stack.Screen name="paidEntry" component={PaidContentStack} options={{ headerShown: false }} />
            <Stack.Screen name="BuySellUsernames" component={BuySellUsernames} options={{ headerShown: false }} />
            <Stack.Screen name="CallHistory" component={HomeStack} options={{ headerShown: false }} />
            <Stack.Screen name="Payments" component={Payment} options={{ headerShown: false }} />
            <Stack.Screen name="CryptoWallet" component={Wallet} options={{ headerShown: false }} />
            <Stack.Screen name="Rewards" component={Reward} options={{ headerShown: false }} />
            <Stack.Screen name="ChatFile" component={ChatFile} options={{ headerShown: false }} />
            <Stack.Screen name="ChatImages" component={ChatImages} options={{ headerShown: false }} />
            <Stack.Screen name="Suggestions" component={Suggestion} options={{ headerShown: false }} />
            <Stack.Screen name="TabSetting" component={TabSetting} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={NotificationsStack} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    )
  }

  return (
    // <AppWrapper>
    <NavigationContainer>
      <StatusBar />
      <Drawer.Navigator
        //     drawerContent={props => <DrawerStack {...props} />}
        screenOptions={{
          gestureEnabled: false,
          drawerType: "front",
          headerShown: false,
          swipeEdgeWidth: 0,
          drawerStyle: {
            width: "70%",
            backgroundColor: "rgba(0,0,0,1)"
          }
          //   overlayColor: "rgba(0,0,0,.5)"
        }}>
        <Drawer.Screen name="AppStack" component={AppStack} />
      </Drawer.Navigator>
    </NavigationContainer>
    // </AppWrapper>
  )
}

export default MainNavigator
