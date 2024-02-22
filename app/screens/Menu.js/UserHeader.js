import { Text, View, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import {AntDesign} from "@expo/vector-icons";
import Qr from "../../../assets/icons/iconss/qrCode.svg"
import ProfileImage from "../../../assets/icons/iconss/ProfileImage.png"
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
const UserHeader = () => {
  const dispatch = useDispatch()
  return (
    <View style={styles.userCon}>
      <View style={styles.header}>
        <View style={styles.profile}>

        <Image source={ProfileImage} style={{width:50,borderRadius:5,height:50}} resizeMode="contain" />
        <Text style={styles.userText}>Henry Lopez</Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",columnGap:15}}>
        <Qr/>
      </View>
      </View>
    </View>
  )
}

export default UserHeader
