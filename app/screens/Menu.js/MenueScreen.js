import { Text, View, StatusBar, SafeAreaView } from "react-native"
import React, { useCallback } from "react"
import { styles } from "./styles"
import UserHeader from "./UserHeader"
import Button from "./Button"
import { LinearGradient } from "expo-linear-gradient"
import colors from "../../config/colors"
import { useFocusEffect } from "@react-navigation/native"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import { isAndroid } from "../../config/plaform"
import defaultStyles from "../../config/defaultStyles"

const MenueScreen = () => {
  useFocusEffect(
    useCallback(() => {
      isAndroid && StatusBar.setBackgroundColor(colors.header)

      return () => {
        isAndroid && StatusBar.setBackgroundColor(colors.themeColor)
      }
    }, [])
  )
  return (
    <View style={[styles.container]}>
      <UserHeader />
      <LinearGradient
        colors={["#434343", colors.secondary]}
        style={styles.container}
        start={{ x: 1.7, y: 0.3 }}
        end={{ x: 1.2, y: 0.9 }}
        useAngle={true}>
        <Button />
      </LinearGradient>
    </View>
  )
}

export default MenueScreen
