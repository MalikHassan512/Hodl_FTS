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
import SubmitButton, { SubmitButtonRegister } from "../../component/core/SubmitButton"
import { useNavigation } from "@react-navigation/native"
import apiClient from "../../api/client"
import DatePicker from "../../component/core/DatePicker"
import Toast from "react-native-toast-message"
import { debounce } from "lodash"
import { RadioButton } from "react-native-paper"
import defaultStyles from "../../config/defaultStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import PoneNumberInput from "../../component/core/PoneNumberInput"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import { hp } from "../../config/dimensions"
const Register = () => {
  const navigation = useNavigation()
  let initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  }

  const [isChecked, setChecked] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    name: Yup.string().required().label("Name"),
    dob: Yup.string().required().label("DOB"),
   
    // contact: Yup.string()
    // .matches(/^(?:\+92|92)?[345678]\d{9}$/, 'Invalid phone number', 'Phone number is not valid')
    // .required('Phone number is required')
    // .label('Phone number'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
  })
  const [iosProps] = useState(   Platform.OS==="ios" ? { behavior: "padding", keyboardVerticalOffset: 64 } : {})

  const scrollY = useRef(new Animated.Value(7)).current
  return (
    //     <Animated.ScrollView  scrollEnabled
    //     onScroll={Animated.event(
    //       [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    //       { useNativeDriver: true } // Use the native driver for performance
    //     )}
    //     scrollEventThrottle={16} // Set the scroll event throttle
    // >
    <Screen style={{paddingTop:Platform.OS==="ios" ? hp(-6):hp(-3)}}>
    <KeyboardAwareScrollView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...iosProps}
      style={{ flex: 1 }}>
      <Screen style={[styles.container]}>
        <ScrollView>
          <View style={[styles.mainContainer, { marginTop: 50 }]}>
            <Image source={image} style={styles.image} resizeMode="contain" />
          </View>
          <View>
            <View style={{ marginTop: 25 }}>
              <AppForm
                initialValues={initialState}
                onSubmit={async values => {
                  console.log(values, "sasasas")
                  const result = await apiClient.post("user/", values)
                  console.log(result)
                  if (!result.ok) {
                    Object.keys(result.data).forEach(key => {
                      const errorMessage = result.data[key][0] // Get the first error message for the field
                      Toast.show({
                        type: "error",
                        text2: errorMessage
                      })
                    })
                    return
                  }

                  navigation.navigate("Otp", { id: result?.data.id })
                }}
                validationSchema={validationSchema}>
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
                  autoCapitalize="sentences"
                  name="name"
                  placeholderTextColor={colors.light}
                />
                <View style={{marginTop:hp(1.58)}}>
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
                </View>
                <View style={{marginTop:hp(1.58)}}>
                <PoneNumberInput name="phone" title="Phone Number" />
                
                </View>
                {/* <AppFormField style={{borderWidth: 1,borderColor: colors.border,borderRadius: 24,height:36,paddingHorizontal:10,color:"#666666"}}
            title="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            name="phone"
            keyboardType="numeric"
            placeholderTextColor={colors.light}
           
          /> */}
          <View style={{marginTop:hp(1.58)}}>
                <AppDateField
                  autoCapitalize="none"
                  autoCorrect={false}
                  title="Date of Birth"
                  name="dob"
                  AppTextInput={DatePicker}
                  placeholderTextColor={colors.light}
                />
</View>
<View style={{marginTop:hp(1.58)}}>
                <AppFormField
                  title="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.light}
                  AppTextInput={PasswordTextInput}
                  name="password"
                />
                </View>
                <View style={{marginTop:hp(1.58)}}>
                <AppFormField
                  title="Confirm Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.light}
                  AppTextInput={PasswordTextInput}
                  name="confirmPassword"
                />
</View>
                <View style={[styles.section,{marginTop:hp(1.58)}]}>
                  <RadioButton.Android
                    value="first"
                    color={"#2DA1D7"}
                    status={isChecked === "first" ? "checked" : "unchecked"}
                    onPress={() => setChecked("first")}
                    // uncheckedColor={'red'}
                  />

                  <View>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      I agree with <Text style={defaultStyles.textLogin}>Terms & Conditions</Text>{" "}
                      and <Text style={defaultStyles.textLogin}>Privacy Policy</Text>.
                    </Text>
                  </View>
                </View>

                <View
                  style={[{
                    marginTop: 50,
                    paddingHorizontal: 15,
                    marginBottom: 20
                  }]}>
                  <View style={{ paddingVertical:hp(0.7),flexDirection: "row", justifyContent: "center" }}>
                    <AppText
                      style={{
                        color: colors.white,
                        fontFamily: fonts.lato,
                        fontSize: fontSize.tiny
                      }}>
                      Already have an account?{" "}
                    </AppText>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text
                        style={[
                          defaultStyles.textLogin,
                          { fontFamily: fonts.lato, fontSize: fontSize.tiny }
                        ]}>
                        Login here
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <SubmitButtonRegister disabled={isChecked !== "first"} title={"Register"} />
                </View>
              </AppForm>
            </View>
          </View>
        </ScrollView>
      </Screen>
    </KeyboardAwareScrollView>
 </Screen>
  )
}

export default Register
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    // backgroundColor: colors.secondary
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
