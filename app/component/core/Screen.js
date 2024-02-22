import React from "react"
import { StyleSheet,StatusBar, View } from "react-native"
import Constants from "expo-constants"
import { LinearGradient } from "expo-linear-gradient"
import { hp } from "../../config/dimensions"
import { SafeAreaView } from "react-native-safe-area-context"
const Screen = ({ children, style, color1 }) => {
  return (
    <LinearGradient
      colors={["#121111", "#131A1D", "#131A1D"]}
      style={styles.container}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      useAngle={true}>
      <SafeAreaView style={[styles.screen, style]}>
       
        <View style={[style, styles.view]}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp(1),
    flex: 1
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  view: {
    flex: 1
  }
})

export default Screen
