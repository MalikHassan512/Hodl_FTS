import { StyleSheet, Text, Image, View, TouchableOpacity, Pressable } from "react-native"
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
import { login, profileData } from "../../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import apiClient from "../../api/client"
const LoginTemp = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {user}  = useSelector(state => state.auth)
  console.log(user, "username")
 
  const logintem=async()=>{
    const result = await apiClient.post("login/", {
      username: user?.email,
      password: user?.password
    })
    console.log(result,"aaaaaaaaaaaaaaasssssssssssssssssssssss")
    if (!result.ok) {
      if (result.status === 401) {
        navigation.navigate("PasswordTemp")
        return
      }
      // Toast.show({
      //   type: "error",
      //   text2: "Invalid Crediential"
      // })
      return
    }
    dispatch(login({ token: result.data.token, id: result.data.id }))
              navigation.replace("AppTabs")
              
  }
  return (
    <Screen style={[styles.container]}>
      <View style={[styles.mainContainer, { marginTop: 50 }]}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <Pressable style={[styles.card,{marginTop:50}]} onPress={logintem}>
        <Image source={image1} style={{ width: 70, height: 70 }} resizeMode="contain" />
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
      </Pressable>
      {/* <AppButton style={{ marginTop: 20 }} title={"login"} /> */}
      {/* <View style={{flexDirection:"column",alignContent:"space-between",alignItems:"center"}}>
        <AppText style={{color:colors.primary}}>Login with other account</AppText>
        <AppText style={{color:colors.primary}}> Don't you have an account yet?{' '}
  <Text style={{color:colors.blue}}>Register here</Text></AppText>
      </View> */}
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText
              style={[defaultStyles.textLogin, { fontSize:14,fontFamily: fonts.lato,fontWeight:"400", marginVertical: hp(2) }]}>
              Login with other account
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom:-10
            }
          ]}>
          <Text style={{fontSize:14, color: colors.white, fontFamily: fonts.lato }}>
            Don't you have an account yet?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[defaultStyles.textLogin, fonts.lato,{fontSize:16}]}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

export default LoginTemp
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7
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
    height: 195,
    backgroundColor: colors.header,
    marginTop: 40,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center"
  }
})
