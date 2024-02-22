import { Text, Switch, Image, View, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"

import { LinearGradient } from "expo-linear-gradient"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import { useNavigation } from "@react-navigation/native"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Account = () => {
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
          <TitleBar title="Account" />
          <View
            style={{
              flexDirection: "row",
              marginTop: hp(3.3),
              justifyContent: "space-between",
              paddingHorizontal: wp(4.7)
            }}>
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Change password</Text>
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
            <Text style={[styles.settingText, { fontWeight: 600 }]}>
              Configure 2 steps authentication
            </Text>
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
            <Text style={[styles.settingText, { fontWeight: 600 }]}>Blocked users</Text>
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
            <Text style={[styles.settingdeleteText, { fontWeight: 600 }]}>Delete account</Text>
          </View>
        </LinearGradient>
      </View>
    </AppWrapper>
  )
}

export default Account
