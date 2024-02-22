import { StyleSheet, Text, View } from "react-native"
import React, { useLayoutEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Chat from "../screens/Chat/Chat"
import ChatScreen from "../screens/Chat/ChatScreen"
import ChatProfile from "../screens/Chat/ChatProfile"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import AppWrapper from "../component/AppWrapper/Wrapper"
import colors from "../config/colors"
const Stack = createNativeStackNavigator()
const ChatStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatHome" component={Chat} options={{ headerShown: false }} />
      {/* <Stack.Screen name="ChatScreen" component={ChatScreen}   options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="ChatProfile" component={ChatProfile} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  )
}

export default ChatStack

const styles = StyleSheet.create({})
