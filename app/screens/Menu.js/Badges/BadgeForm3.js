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
import CamraThread from "v../../../../assets/icons/iconss/CamraThread.svg"
import AppFormField from "../../../component/forms/AppFormField"
import AppForm from "../../../component/forms/AppForm"
import AppWrapper from "../../../component/AppWrapper/Wrapper"
const BadgeForm2 = ({ navigation }) => {
  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <GradientWrapper>
          <TitleBar title={"Verified Badge"} />
          <AppForm
            initialValues={{ email: "", password: "" }}
            // validationSchema={validationSchema}
            onSubmit={async values => {
              console.log(values)
            }}>
            <View style={{paddingHorizontal:wp(4.7), paddingVertical: 10 }}>
              <View>
                <AppText white style={{ fontSize: fontSize.smallx1 }}>
                  News coverage
                </AppText>
                <AppText white style={{ fontSize: fontSize.tiny }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat orci in
                  sagittis ullamcorper.{" "}
                </AppText>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <AppFormField
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 24,
                  height: 36,
                  paddingHorizontal: 0,
                  color: "#FFF"
                }}
                title={"News reference link"}
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholderTextColor={colors.light}
              />
              <AppFormField
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 24,
                  height: 36,
                  paddingHorizontal: 0,
                  color: "#FFF"
                }}
                title={"News reference link"}
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholderTextColor={colors.light}
              />
              <AppFormField
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 24,
                  height: 36,
                  paddingHorizontal: 0,
                  color: "#FFF"
                }}
                title={"News reference link"}
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholderTextColor={colors.light}
              />
            </View>
            <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 10 }}>
              <AppButton
                onPress={() => navigation.navigate("BadgeFormFinal")}
                title={"Request Badge"}
              />
            </View>
          </AppForm>
        </GradientWrapper>
      </View>
    </AppWrapper>
  )
}

export default BadgeForm2
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
