import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MenueScreen from "../screens/Menu.js/MenueScreen"
import GradientWrapper from "../component/AppWrapper/GradientWrapper"
import AppWrapper from "../component/AppWrapper/Wrapper"
import colors from "../config/colors"
const Stack = createNativeStackNavigator()
const MenuStack = () => {
  return (
    <AppWrapper color={colors.header}>
      <GradientWrapper>
        <Stack.Navigator>
          <Stack.Screen name="MenuHome" component={MenueScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </GradientWrapper>
    </AppWrapper>
  )
}

export default MenuStack

const styles = StyleSheet.create({})
