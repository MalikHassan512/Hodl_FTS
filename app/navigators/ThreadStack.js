import { StyleSheet, Text, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useLayoutEffect } from "react"
import ThreadHome from "../screens/Thread/ThreadHome"
import SingleThread from "../screens/Thread/SingleThread"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import ThreadChat from "../screens/Thread/ThreadChat"
import AppWrapper from "../component/AppWrapper/Wrapper"
const ThreadStack = ({ navigation, route }) => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="ThreadHome" component={ThreadHome} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ThreadStack

const styles = StyleSheet.create({})
