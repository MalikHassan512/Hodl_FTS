import { useTheme } from "@/hooks"
import { Gutters, Images, Layout } from "@/theme"
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Colors, FontSize } from "@/theme/Variables"
import fonts from "@/theme/assets/fonts"
const CustomDrawerItem = ({ onPress, label, labelColor, icon: IconComponent }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ marginVertical: 23, flexDirection: "row" }}>
        {/* {IconComponent && <IconComponent /> } */}
        <Text
          style={{
            left: 20,
            alignSelf: "center"
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default CustomDrawerItem
