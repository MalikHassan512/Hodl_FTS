import React, { useRef, useState } from "react"
import { Animated, StyleSheet, Image, Text, TouchableOpacity, View, Dimensions } from "react-native"
import Screen from "./Screen"
import image from "../../../assets/ManueIcon.png"
import image1 from "../../../assets/Vector.png"
import colors from "../../config/colors"
import AppSearch from "./AppSearch"
import AppText from "./AppText"
import defaultStyles from "../../config/defaultStyles"
import { hp, wp } from "../../config/dimensions"
import fonts from "../../../android/app/src/main/assets/custom"
import { fontSize } from "../../config/fontSize"

export default function Button({ width, buttons, onClick,containerStyle }) {
  console.log(buttons)
  const [btnContainerWidth, setWidth] = useState(0)
  const btnWidth = btnContainerWidth / buttons.length
  const translateX = useRef(new Animated.Value(0)).current
  const translateXOpposit = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  })
  const onPress = i => {
    onClick(i + 1)
    Animated.spring(translateX, {
      toValue: i * btnWidth,
      useNativeDriver: true,
      bounciness: 0
    }).start()
  }
  const windowWidth = Dimensions.get("window").width
  const buttonWidth = windowWidth * 0.5
  return (
    <View
      style={[styles.btnContainer, { width: width ? "100%" : "50%" },containerStyle]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      {buttons.map((btn, i) => (
        <TouchableOpacity key={btn + "_" + i} style={styles.btn} onPress={() => onPress(i)}>
          <Text style={{ color: colors.primary, fontSize: 12 }}>{btn}</Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[styles.animatedBtnContainer, { width: btnWidth+0.4, transform: [{ translateX }] }]}>
        {buttons.map(btn => (
          <Animated.View
            key={btn}
            style={[
              styles.animatedBtn,
              { width: btnWidth, transform: [{ translateX: translateXOpposit }] }
            ]}>
            <Text style={[styles.btnTextActive, { fontSize: fontSize.vtinyx2 }]}>{btn}</Text>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  )
}
export  function PaidContentTabs({ width, buttons, onClick,containerStyle }) {
  console.log(buttons)
  const [btnContainerWidth, setWidth] = useState(0)
  const btnWidth = btnContainerWidth / buttons.length
  const translateX = useRef(new Animated.Value(0)).current
  const translateXOpposit = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  })
  const onPress = i => {
    onClick(i + 1)
    Animated.spring(translateX, {
      toValue: i * btnWidth,
      useNativeDriver: true,
      bounciness: 0
    }).start()
  }
  const windowWidth = Dimensions.get("window").width
  const buttonWidth = windowWidth * 0.5
  return (
    <View
      style={[styles.btnContainer, { width: width ? "100%" : "50%" },{backgroundColor:"#454545"}]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      {buttons.map((btn, i) => (
        <TouchableOpacity key={btn + "_" + i} style={styles.btn} onPress={() => onPress(i)}>
          <Text style={{ color: colors.primary, fontSize: 12 }}>{btn}</Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        style={[styles.animatedBtnContainer, { width: btnWidth+0.4, transform: [{ translateX }] }]}>
        {buttons.map(btn => (
          <Animated.View
            key={btn}
            style={[
              styles.animatedBtn,
              { width: btnWidth, transform: [{ translateX: translateXOpposit }] }
            ]}>
            <Text style={[styles.btnTextActive, { fontSize: fontSize.vtinyx2 }]}>{btn}</Text>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },

  btnContainer: {
    height: hp(3.5),
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: colors.header
  },
  btn: {
    backgroundColor: colors.header,
    borderRadius: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  animatedBtnContainer: {
    height: hp(3.5),
    flexDirection: "row",
    position: "absolute",
    overflow: "hidden",
    backgroundColor: colors.header
  },
  animatedBtn: {
    height: hp(3.5),
    marginHorizontal: -0.20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    backgroundColor: colors.primary
  },
  btnTextActive: {
    color: "#fff",
    fontWeight: "bold"
  }
})
