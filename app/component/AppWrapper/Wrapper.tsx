import React from "react"
import { hp } from "../../config/dimensions"
import { View, Platform, StatusBar, SafeAreaView } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "../../config/colors"
interface Props {
  children: any
  color?: string
}

const AppWrapper = ({ children, color }: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color ? color : colors.themeColor
      }}>
      <StatusBar backgroundColor={color ? color : colors.themeColor} />

      {children}
    </SafeAreaView>
  )
}

export default AppWrapper
