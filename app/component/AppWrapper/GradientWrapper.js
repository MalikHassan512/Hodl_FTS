import { LinearGradient } from "expo-linear-gradient"
import React, { Children } from "react"
import { View, StyleSheet } from "react-native"

const GradientWrapper = ({ children, stylesContainer }) => {
  return (
    <LinearGradient
      colors={["#121111", "#131A1D", "#131A1D"]}
      //   colors={[color1, color2, color2]}
      style={[styles.container, stylesContainer]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      useAngle={true}>
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default GradientWrapper
