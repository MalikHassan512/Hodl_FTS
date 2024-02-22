import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Image,
  View
} from "react-native"
import React from "react"
import colors from "../../config/colors"
import Screen from "../../component/core/Screen"
import image from "../../../assets/3.png"
import AppText from "../../component/core/AppText"
import AppButton from "../../component/core/AppButton"
import AppTextInput from "../../component/core/AppTextInput"
import AppFormField from "../../component/forms/AppFormField"
import AppForm from "../../component/forms/AppForm"
import PasswordTextInput from "../../component/core/PasswordTextInput"
import SubmitButton from "../../component/core/SubmitButton"
import * as Yup from "yup"
import { useNavigation } from "@react-navigation/native"
import apiClient from "../../api/client"
import { useDispatch } from "react-redux"
import { login, profileData } from "../../redux/authSlice"
import Toast from "react-native-toast-message"
import defaultStyles from "../../config/defaultStyles"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import { hp } from "../../config/dimensions"
const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
  })
  const showToast = () => {
    console.log("object")
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋"
    })
  }
  return (
    <Screen style={[styles.container]}>
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}> */}
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.mainContainer]}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={[styles.formContainer]}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              console.log(values)
              const result = await apiClient.post("login/", {
                username: values.email,
                password: values.password
              })
              console.log(result.data, "login result")

              if (!result.ok) {
                if (result.data?.active === false) {
                  navigation.navigate("Otp", { id: result?.data.user })
                  return
                }
                // Toast.show({
                //   type: "error",
                //   text2: "Invalid Crediential"
                // })
                return
              }
              // Toast.show({
              //   type: "success",
              //   // text1: 'Hello',
              //   text2: "Login Successfully👋"
              // })
              dispatch(login({ token: result.data.token, id: result.data.id }))
              dispatch(profileData({email:values.email,password:values.password, userName: result.data.username}));
              navigation.replace("AppTabs")
            }}>
            <View>
              <AppFormField
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 24,
                  height: 36,
                  paddingHorizontal: 10,
                  color: "#FFF"
                }}
                icon="email"
                title={"Email or phone number "}
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                keyboardType="email-address"
                placeholderTextColor={colors.light}
              />
<View style={{marginTop:hp(1.58)}}>
              <AppFormField
                icon="lock"
                title={"Password"}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.light}
                AppTextInput={PasswordTextInput}
                name="password"
              />
              </View>
            </View>

            <View style={[{ flex: 2, justifyContent: "space-between",marginTop:hp(1), marginBottom:10 }]}>
              <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
                <AppText center style={[defaultStyles.textLogin, {fontSize:14, fontFamily: fonts.lato }]}>
                  Forgot password?
                </AppText>
              </TouchableOpacity>

              <View style={{ paddingHorizontal: 10 }}>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical:hp(0.7)
                    }
                  ]}>
                  <Text style={{ color: "#FFF", fontSize: 14 }}>
                    Don't you have an account yet?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={[defaultStyles.textLogin,{fontSize:14}]}>Register here</Text>
                  </TouchableOpacity>
                </View>
                <SubmitButton title={"Login"} />
              </View>
            </View>
          </AppForm>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </Screen>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    marginTop:hp(1.7),
    flex: 2
  },

  image: {
    width: 145,
    height: 164
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
  }
})
