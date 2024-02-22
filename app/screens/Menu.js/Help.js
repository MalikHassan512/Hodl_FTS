import { Text, Switch, Image, View, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"

import { LinearGradient } from "expo-linear-gradient"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import { useNavigation } from "@react-navigation/native"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import TitleBar from "../../component/core/TitleBar"
const Help = () => {
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack()
  }
  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <LinearGradient
          colors={["#121111", "#131A1D", "#131A1D"]}
          style={styles.container}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          useAngle={true}>
          <TitleBar title="Help" />

          <View
            style={{
              flexDirection: "row",
              marginTop: hp(3.3),
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}>
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Help center</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}>
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Contact us</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}>
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Terms and Privacy Policy</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}>
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Licenses</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
        </LinearGradient>
      </View>
    </AppWrapper>
  )
}

export default Help
