import {
  ScrollView,
  StyleSheet,
  FlatList,
  Animated,
  Text,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import React, { useRef, useState } from "react"
import Checkbox from "expo-checkbox"
import colors from "../../config/colors"
import Screen from "../../component/core/Screen"
import * as Yup from "yup"
import image from "../../../assets/3.png"
import AppText from "../../component/core/AppText"
import AppButton from "../../component/core/AppButton"
import AppTextInput from "../../component/core/AppTextInput"
import AppFormField, { AppDateField } from "../../component/forms/AppFormField"
import AppForm from "../../component/forms/AppForm"
import PasswordTextInput from "../../component/core/PasswordTextInput"
import SubmitButton from "../../component/core/SubmitButton"
import { useNavigation } from "@react-navigation/native"
import apiClient from "../../api/client"
import DatePicker from "../../component/core/DatePicker"
import Toast from "react-native-toast-message"
import { debounce } from "lodash"
import { RadioButton } from "react-native-paper"
import defaultStyles from "../../config/defaultStyles"
import PoneNumberInput from "../../component/core/PoneNumberInput"
import fonts from "../../../assets/fonts"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import ImageIcon from "../../../assets/icons/iconss/IconEditProfile.svg"
import Cross1 from "../../../assets/icons/iconss/Cross1.svg"
import ProfileImage from "../../../assets/icons/iconss/ProfileImage.png"
import { fontSize } from "../../config/fontSize"
import { hp, wp } from "../../config/dimensions"
import { LinearGradient } from "expo-linear-gradient"
import ProfilePictureModal from "./ProfilePictureModal"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const EditProfile = () => {
  const navigation = useNavigation()
  let initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: ""
  }
  const [pictureModal, setPictureModal] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    name: Yup.string().required().label("Name"),
    dob: Yup.string().required().label("DOB"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
  })

  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  const scrollY = useRef(new Animated.Value(7)).current
  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <LinearGradient
          colors={["#121111", "#131A1D", "#131A1D"]}
          style={styles.container}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          useAngle={true}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: hp(1),
                
              }}>
              <TitleBar title={"Edit Profile"} />
              <View style={{paddingHorizontal:wp(4.7)}}> 
              <Text style={styles.saveButton}>Save </Text>
              </View>
            </View>

            <View style={{ marginTop: hp(3), paddingHorizontal: wp(4.7), flexDirection: "row" }}>
              <ImageIcon style={{ marginRight: wp(2) }} onPress={() => setPictureModal(true)} />
              <View>
                <Image
                  source={ProfileImage}
                  style={{ width: 70, height: 70, borderRadius: 10, position: "relative" }}
                  resizeMode="contain"
                />
                <Cross1 style={{ position: "absolute", top: hp(-1), right: wp(-3) }} />
              </View>
            </View>

            <View>
              <View style={{ marginTop: hp(3) }}>
                <AppForm
                  initialValues={initialState}
                  onSubmit={async values => {
                    console.log(values, "sasasas")
                  }}
                  //   validationSchema={validationSchema}
                >
                  <AppFormField
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 24,
                      height: 36,
                      paddingHorizontal: 10,
                      color: "#fff"
                    }}
                    title="Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="name"
                    placeholderTextColor={colors.light}
                  />
                  <View style={{marginTop:hp(0.7)}}/>
                  <AppFormField
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 24,
                      height: 36,
                      paddingHorizontal: 10,
                      color: "#fff"
                    }}
                    title="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="email"
                    keyboardType="email-address"
                    placeholderTextColor={colors.light}
                  />
                      <View style={{marginTop:hp(0.7)}}/>
                  <PoneNumberInput name="phone" title="Phone Number" />
                  <View style={{marginTop:hp(0.7)}}/>
                  <AppFormField
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 24,
                      height: 36,
                      paddingHorizontal: 10,
                      color: "#fff"
                    }}
                    title="Gender"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="gender"
                    placeholderTextColor={colors.light}
                  />
                      <View style={{marginTop:hp(0.7)}}/>
                  <AppDateField
                    autoCapitalize="none"
                    autoCorrect={false}
                    title="Date of Birth"
                    name="dob"
                    AppTextInput={DatePicker}
                    placeholderTextColor={colors.light}
                  />
    <View style={{marginTop:hp(0.7)}}/>
                  <AppFormField
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 24,
                      height: 36,
                      paddingHorizontal: 10,
                      color: "#fff"
                    }}
                    title="Interests"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="interest"
                    placeholderTextColor={colors.light}
                  />
                </AppForm>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
        {pictureModal && (
          <ProfilePictureModal
            isDrawerVisible={pictureModal}
            onHide={() => setPictureModal(false)}
          />
        )}
      </View>
    </AppWrapper>
  )
}

export default EditProfile
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingHead: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.normal,
    width: wp(25),
    textAlign: "center"
  },
  saveButton: {
    color: "#2DA1D7",
    fontFamily: fonts.medium,
    fontSize: fontSize.smallx1,
    // width:wp(25),
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondary
    //   padding: 15,
  },
  mainContainer: {
    justifyContent: "center"
  },
  image: {
    width: "100%"
  },
  text: {
    letterSpacing: 1.5,
    marginTop: 10
  },
  imageContainer: {
    justifyContent: "center"
  },
  bottomText: {
    padding: 30,
    marginVertical: 30,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderColor: colors.danger,
    borderWidth: 1
  },
  corner: {
    backgroundColor: colors.secondary,
    width: 30,
    height: 30,
    position: "absolute",
    top: -5,
    left: -5
  },
  textStyle: {
    color: colors.white,
    margin: "auto"
  },
  section: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center"
  }
})
