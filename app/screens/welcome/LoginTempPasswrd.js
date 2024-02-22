import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"
import colors from "../../config/colors"
import Screen from "../../component/core/Screen"
import image from "../../../assets/3.png"
import image1 from "../../../assets/profile.png"
import AppText from "../../component/core/AppText"
import AppButton from "../../component/core/AppButton"
import AppTextInput from "../../component/core/AppTextInput"
import AppFormField from "../../component/forms/AppFormField"
import AppForm from "../../component/forms/AppForm"
import PasswordTextInput from "../../component/core/PasswordTextInput"
import SubmitButton from "../../component/core/SubmitButton"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import defaultStyles from "../../config/defaultStyles"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import { hp } from "../../config/dimensions"
import { useDispatch, useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { login } from "../../redux/authSlice"
import apiClient from "../../api/client"
const LoginTempPassword = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { user} = useSelector(state => state.auth)
  console.log(user, "username")
  return (
    <Screen style={[styles.container]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1}}>
      <View style={[styles.mainContainer, { marginTop: 50 }]}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <AppForm
            initialValues={{password: "" }}
            // validationSchema={validationSchema}
            onSubmit={async values => {
              console.log(values)
              const result = await apiClient.post("login/", {
                username: user.email,
                password: values.password
              })
              dispatch(login({ token: result.data.token, id: result.data.id }))
              navigation.replace("AppTabs")
            
            }}>
      <View style={styles.card}>
        <Image source={image1} style={{ width: 70, height: 70,marginVertical:hp(2) }} resizeMode="contain" />
        <AppText
          style={{
            color: colors.white,
            marginTop: 10,
            fontSize: fontSize.tinyx1,
            fontFamily: fonts.light,
            fontWeight: 600
          }}>
          Henry Lopez
        </AppText>
        <AppText
          style={{
            color: colors.white,
            fontSize: fontSize.tinyx1,
            fontFamily: fonts.light,
            fontWeight: 300
          }}>
          {user?.userName}
        </AppText>
       
            <View style={{ width: "100%",marginVertical:hp(2) }}>
             
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
     
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText
              style={[defaultStyles.textLogin, { fontFamily: fonts.lato, marginVertical: hp(1) }]}>
              Login with other account
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }
          ]}>
          <Text style={{ color: colors.white, fontFamily: fonts.lato }}>
            Don't you have an account yet?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[defaultStyles.textLogin, fonts.lato]}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[{ justifyContent: "space-between", }]}>
              

              <View style={{ paddingHorizontal: 10 }}>
               
                <SubmitButton title={"Login"} />
              </View>
            </View>
      </AppForm>
      </KeyboardAwareScrollView>
    </Screen>
  )
}

export default LoginTempPassword
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
  card: {
    width: "100%",
    backgroundColor: colors.header,
    marginTop: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
   
  }
})
