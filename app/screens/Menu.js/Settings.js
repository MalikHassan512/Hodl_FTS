import { Text, TouchableOpacity, Switch, Image, View, Pressable } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"
import UserHeader from "./UserHeader"
import Button from "./Button"
import { LinearGradient } from "expo-linear-gradient"
import colors from "../../config/colors"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import Qr from "../../../assets/icons/iconss/qrCode.svg"
import Translater from "../../../assets/icons/iconss/Translation.svg"
import Language from "../../../assets/icons/iconss/Language.svg"
import ProfileImage from "../../../assets/icons/iconss/ProfileImage.png"
import Account from "../../../assets/icons/iconss/Account.svg"
import RightArrow from "../../../assets/icons/iconss/RightArrow.svg"
import Edit from "../../../assets/icons/iconss/Edit.svg"
import Notify from "../../../assets/icons/iconss/Notify.svg"
import PaymentCard from "../../../assets/icons/iconss/paymentCard.svg"
import Help from "../../../assets/icons/iconss/help.svg"
import { useNavigation } from "@react-navigation/native"
import ProfileModal from "./ProfileModal"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/authSlice"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Settings = () => {
  const dispatch = useDispatch()
  const [isRow1, setIsRow1] = useState(true)
  const [profileModal, setProfileModal] = useState(false)
  const toggleDirection1 = () => {
    setIsRow1(!isRow1)
  }
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  return (
    // <AppWrapper>
      <View style={[styles.container,]}>
        <LinearGradient
          colors={["#121111", "#131A1D", "#131A1D"]}
          style={styles.container}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          useAngle={true}>
            <View style={[Platform.OS === 'ios' ? { marginTop: hp(5) } : null]}/>
          <TitleBar title={"Settings"} />
          {/* <View style={{flexDirection:"row",alignItems:"center",marginTop:hp(1),paddingHorizontal:wp(3)}}>
      <BackArrow style={{marginRight:5}} onPress={handleGoBack}/>
     <Text style={styles.settingHead}>Settings</Text>
    </View> */}

          <View style={{ paddingHorizontal: wp(3), marginTop: hp(2) }}>
            <TouchableOpacity onPress={() => setProfileModal(true)}>
              <View
                style={[
                  styles.header,
                  { backgroundColor: colors.header, paddingVertical: hp(1), borderRadius: 10 }
                ]}>
                <View style={styles.profile}>
                  <Image source={ProfileImage} style={{width:50,borderRadius:5,height:50}} resizeMode="contain" />
                  <Text style={styles.userText}>Henry Lopez</Text>
                </View>
                <Qr />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: hp(4),
              paddingHorizontal: wp(4.7)
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Language style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Language</Text>
            </View>
            <View>
              <Text style={styles.settingText}>English</Text>
            </View>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Translater style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Translation</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isRow1 ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection1}
                value={isRow1}
                style={Platform.OS === 'ios' ? { transform: [{ scale: 0.8 }] } : null}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}
            onPress={() => navigation.navigate("Account")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Account style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Account</Text>
            </View>
            <View>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}
            onPress={() => navigation.navigate("EditProfile")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Edit style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Edit</Text>
            </View>
            <View>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20
            }}
            onPress={() => navigation.navigate("Notifications")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Notify style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Notification</Text>
            </View>
            <View>
              <RightArrow />
            </View>
          </Pressable>
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
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.navigate("Payments")}>
              <PaymentCard style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Payments</Text>
            </TouchableOpacity>
            <View>
              <RightArrow />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 0.5,
              marginVertical: hp(2),
              backgroundColor: "rgba(102, 102, 102, 0.40)"
            }}
          />
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}
            onPress={() => navigation.navigate("Help")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Help style={{ marginRight: 10 }} />
              <Text style={[styles.settingText, { fontWeight: 600 }]}>Help</Text>
            </View>
            <View>
              <RightArrow />
            </View>
          </TouchableOpacity>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => dispatch(logout())}>
                <Text style={[styles.settingLowerText, { fontWeight: 600 }]}>Logout</Text>
              </TouchableOpacity>
            </View>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.settingLowerText, { fontWeight: 600 }]}>Connect wallet</Text>
            </View>
          </View>

          {profileModal && (
            <ProfileModal isDrawerVisible={profileModal} onHide={() => setProfileModal(false)} />
          )}
        </LinearGradient>
      </View>
    // </AppWrapper>
  )
}

export default Settings
