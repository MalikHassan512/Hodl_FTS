import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  Pressable
} from "react-native"
import React, { useContext, useLayoutEffect, useState } from "react"
import Screen from "../../component/core/Screen"
import PalestineSingle from "../../../assets/icons/iconss/PalestineSingle.png"
import Timer from "../../../assets/icons/iconss/TimerHour.svg"
import { LinearGradient } from "expo-linear-gradient"
import ManIcon from "../../../assets/icons/iconss/ManIcon.svg"
import Share from "../../../assets/icons/iconss/share.svg"
import Back from "../../../assets/icons/iconss/BackIcon.svg"
import defaultStyles from "../../config/defaultStyles"
import AppButton from "../../component/core/AppButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import { hp, wp } from "../../config/dimensions"
import apiClient from "../../api/client"
import { SocketContext } from "../../component/socket/SocketProvider"
import AppWrapper from "../../component/AppWrapper/Wrapper"
import colors from "../../config/colors"
const SingleThread = () => {
  const { socket, isConnected, subscribe, unsubscribe, reconnect } = useContext(SocketContext)
  const navigation = useNavigation()
  const route = useRoute()
  const [thread, setThread] = useState()
  const { id } = route?.params
  const Buttons = ["politics", , "world", "war"]
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }

  const fetchThread = async () => {
    const result = await apiClient.get(`thread/${id}/`)
    setThread(result.data)
    console.log(result.data)
  }
  useLayoutEffect(() => {
    fetchThread()
  }, [])
  return (
    // AppWrapper color={colors.themeColor2}>
      <LinearGradient
        colors={["#121111", "#131A1D", "#131A1D"]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        useAngle={true}>

        <View style={{ flex: 1 }}>
          {thread?.image && (
            <Image
              source={{ uri: thread?.image }}
              style={{ width: "100%", height: "100%", position: "relative" }}
              resizeMode="cover"
            />
          )}
          <Pressable
            style={[Platform.OS === 'ios' ? { marginTop: hp(5) } : null,{ position: "absolute", top: 20, left: 20 }]}
            onPress={() => handleGoBack()}>
            <Back />
          </Pressable>
          <Share style={[Platform.OS === 'ios' ? { marginTop: hp(5) } : null,{ position: "absolute", top: 20, right: 20 }]} />
        </View>
        <View style={{ flex: 2, paddingHorizontal: wp(4.7), marginTop: 20 }}>
          <View style={{ flex: 1 }}>
            <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{ fontSize: fontSize.regular, fontFamily: fonts.medium, color: "white" }}>
                {thread?.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Timer />
                <Text style={{ marginLeft: 5, fontSize: 16, color: "#2DA1D7" }}>
                  {thread?.created_at}
                </Text>
              </View>
            </View>
            <Text style={{color:colors.primary,fontSize:fontSize.tiny}}>Created by @joybbright94</Text>
            </View>
            <Text
              style={{
                marginTop: 15,
                fontSize: fontSize.tiny,
                fontWeight: "600",
                fontFamily: fonts.medium,
                color: "white"
              }}>
              {thread?.description}
            </Text>
            <View style={{ flexDirection: "row",marginTop:hp(3) }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row" }}>
                {/* {Buttons.map((item, index) => ( */}
                <TouchableOpacity
                  // key={index}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    paddingHorizontal: 10,
                    height: 23,
                    borderRadius: 15,
                    marginTop: 8,
                    margin: 3, // Add margin for buttons
                    marginBottom: 8, // Add margin for buttons
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    // Add functionality for onPress event
                  }}>
                  <Text style={{ color: "white", textAlign: "center" }}>{thread?.tags}</Text>
                  {/* Change the text color and other styles as needed */}
                </TouchableOpacity>
                {/* // ))} */}
              </ScrollView>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
              <ManIcon />
              <Text style={{ fontSize: 16, fontWeight: 400, marginLeft: 6, color: "white" }}>
                2/7
              </Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 400, marginTop: 5, color: "#666" }}>
              @joybbright94 and @c.gomes
            </Text>
          </View>
          <AppButton
            title={"Join topic"}
            onPress={() => {
              socket.send(JSON.stringify({ type: "AddThreadMember", thread_id: id }))
              navigation.navigate("ThreadChat")
            }}
            style={{ marginBottom: hp(5) }}
          />
        </View>
      </LinearGradient>
    // </AppWrapper>
  )
}

export default SingleThread

const styles = StyleSheet.create({})
