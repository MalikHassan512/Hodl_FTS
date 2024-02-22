import {
  Text,
  Switch,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button
} from "react-native"
import React, { useState } from "react"

import { LinearGradient } from "expo-linear-gradient"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import { useNavigation } from "@react-navigation/native"
import TitleBar from "../../component/core/TitleBar"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import logo from "../../../assets/logo.png"
import StorageIcon from "../../../assets/icons/iconss/Storage.svg"
import VerifiedIcon from "../../../assets/icons/iconss/verified.svg"
import Ads from "../../../assets/icons/iconss/Ads.svg"
import Groups from "../../../assets/icons/iconss/Groups.svg"
import Gif from "../../../assets/icons/iconss/Gif.svg"
import { fontSize } from "../../config/fontSize"
import { FLEX_STYLE } from "../../config/Styles"
import colors from "../../config/colors"
import AppText from "../../component/core/AppText"
import GradientButton from "../../component/buttons/GradientButton"
import { ScrollView } from "react-native-virtualized-view"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import fonts from "../../../assets/fonts"
const Help = () => {
  const data = [
    {
      icon: Ads,
      head: "Ads",
      subHead: "No ads allowed"
    },
    {
      icon: Gif,
      head: "GIFs",
      subHead: "Can use GIFs on name and communities title"
    },
    {
      icon: StorageIcon,
      head: "Storage",
      subHead: "4GB per doc, unlimited storage for chats and medias"
    },
    {
      icon: Groups,
      head: "Groups",
      subHead: "Create unlimited groups per day"
    },
    {
      icon: VerifiedIcon,
      head: "Verified",
      subHead: "Automatically receive verified badge"
    }
  ]

  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <GradientWrapper>
          <ScrollView>
            <TitleBar title={""} />

            <View style={{ ...FLEX_STYLE.columnCenter }}>
              <Image
                source={logo}
                style={{
                  width: 84,
                  height: 86,
                  resizeMode: "contain",
                  marginRight: 5
                }}
              />
              <Text style={styles.headStyle}>Topics Premium</Text>
            </View>
            <View style={{ paddingHorizontal: wp(4.7) }}>
              <View style={[styles.planContainer, { marginTop: 15 }]}>
                <View>
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <Text style={[styles.text, { fontSize: fontSize.smallx1 }]}>Yealry plan</Text>
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: fontSize.smallx1,
                          backgroundColor: "#2da1d7",
                          paddingHorizontal: 10,
                          borderRadius: 10
                        }
                      ]}>
                      -34%
                    </Text>
                  </View>
                  <Text style={[styles.text, { fontSize: fontSize.tiny }]}>
                    <Text style={{ textDecorationLine: "line-through" }}>71,88€</Text> 47,88€
                    /yearly
                  </Text>
                </View>
                <Text style={[styles.text, { fontSize: fontSize.smallx1 }]}>3,99€ </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: wp(4.7) }}>
              <View
                style={[
                  styles.planContainer,
                  { marginVertical: 10, backgroundColor: "#222", borderColor: "#666" }
                ]}>
                <View>
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <Text style={[styles.text, { fontSize: fontSize.smallx1 }]}>Monthly plan</Text>
                  </View>
                  <Text style={[styles.text, { fontSize: fontSize.tiny }]}>Pay per month</Text>
                </View>
                <Text style={[styles.text, { fontSize: fontSize.smallx1 }]}>5,99€ </Text>
              </View>
            </View>
            <View >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                  <ListItem Icon={item.icon} title={item.head} subTitle={item.subHead} />
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: hp(2) }}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 1, width: "100%", backgroundColor: colors.header }}></View>
                )}
              />
            </View>
            <View style={{marginTop:hp(9),paddingHorizontal:wp(4.7)}}>
            <GradientButton
              title={"Upgrade for 3,99€ monthly"}
              colors={["#A375A1", "#2792C3"]}
              gradientStyle={{ borderRadius: 10, paddingHorizontal:wp(4.7),paddingVertical: 15 }}
            />
            </View>
          </ScrollView>
        </GradientWrapper>
      </View>
    </AppWrapper>
  )
}
function ListItem({ Icon, title, subTitle, style }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10,paddingHorizontal:wp(4.7), paddingVertical: 12 }}>
      <Icon />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </View>
  )
}
export default Help
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "white"
  },
  title: {
    color: "#fff",
    fontSize: fontSize.tiny,
    fontFamily:fonts.bold,
    fontWeight:"600"
  },
  subTitle: {
    color: "white",
    fontSize: fontSize.vtiny,
    fontFamily:fonts.light,
    fontWeight:"600"
  },
  headStyle: {
    fontSize: fontSize.normal,
    fontFamily:fonts.bold,
    fontWeight:"600",
    color: "white"
  },
  planContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#454545",
    height: 90
  }
})
