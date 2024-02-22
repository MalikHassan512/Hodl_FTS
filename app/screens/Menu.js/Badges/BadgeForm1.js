import { Text, Image, View, StyleSheet, FlatList } from "react-native"
import React from "react"

import { hp, wp } from "../../../config/dimensions"
import TitleBar from "../../../component/core/TitleBar"
import { fontSize } from "../../../config/fontSize"
import { FLEX_STYLE } from "../../../config/Styles"
import colors from "../../../config/colors"
import GradientWrapper from "../../../component/AppWrapper/GradientWrapper"
import AppText from "../../../component/core/AppText"
import Icon, { IconOnly } from "../../../component/core/Icon"
import FieldIcon from "../../../component/forms/FieldIcon"
import BackArrowReverse from "../../../../assets/icons/iconss/backArrowReverse.svg"
import AppButton from "../../../component/core/AppButton"
import AppWrapper from "../../../component/AppWrapper/Wrapper"
import fonts from "../../../../assets/fonts"
const BadgeForm1 = ({ navigation }) => {
  const questions = [
    "Activist, organizer or influencer",
    "Company, brand or organization",
    "Entertainers and entertainment groups",
    "Government official or affiliate",
    "Jounalist or news organization",
    "Professional sports or e-sports entity"
  ]

  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <GradientWrapper>
          <TitleBar title={"Verified Badge"} />

          <View style={{ paddingHorizontal:wp(4.7),paddingVertical: 10, paddingTop: hp(5) }}>
            <AppText white style={{ fontSize: fontSize.smallx1 }}>
              Who are you
            </AppText>
            <AppText white style={{ fontSize: fontSize.tiny }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat orci in sagittis
              ullamcorper.{" "}
            </AppText>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={questions}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical:15,
                    alignItems: "center",
                    paddingHorizontal: wp(4.7)
                  }}>
                  <Text  style={{ color:colors.white,fontFamily:fonts.bold,fontSize: fontSize.tiny }}>
                    {item}
                  </Text>

                  <BackArrowReverse />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: hp(2) }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 0.7,
                    width: "100%",
                    backgroundColor: colors.gray_700,
                    opacity: 0.5
                  }}></View>
              )}
            />
          </View>
          <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 10 }}>
            <AppText center>
              Need help finding the right category?
              <Text style={{ color: "#2DA1D7" }}>Learn more</Text>
            </AppText>
            <AppButton onPress={() => navigation.navigate("BadgeForm2")} title={"Next"} />
          </View>
        </GradientWrapper>
      </View>
    </AppWrapper>
  )
}

export default BadgeForm1
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "white"
  },
  title: {
    color: "white",
    fontSize: fontSize.tiny
  },
  subTitle: {
    color: "white",
    fontSize: fontSize.vtiny
  },
  headStyle: {
    fontSize: fontSize.medium,
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
