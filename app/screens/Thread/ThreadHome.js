import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useLayoutEffect, useState } from "react"
import Screen from "../../component/core/Screen"
import AppText from "../../component/core/AppText"
import logo from "../../../assets/logo.png"
import colors from "../../config/colors"
import { Ionicons } from "@expo/vector-icons"
import AppSearch from "../../component/core/AppSearch"
import palestine from "../../../assets/icons/iconss/Palestine1.png"
import thread2 from "../../../assets/icons/iconss/Thread2.png"
import thread3 from "../../../assets/icons/iconss/thread3.png"
import thread4 from "../../../assets/icons/iconss/thread4.png"
import thread5 from "../../../assets/icons/iconss/thread5.png"
import thread6 from "../../../assets/icons/iconss/thread6.png"
import Timer from "../../../assets/icons/iconss/TimerHour.svg"
import ManIcon from "../../../assets/icons/iconss/ManIcon.svg"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper"
import defaultStyles from "../../config/defaultStyles"
import NewThreadModal from "../../component/NewThreadModal"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import { hp, wp } from "../../config/dimensions"
import apiClient from "../../api/client"
const ThreadHome = () => {
  const navigation = useNavigation()
  const [show, setShow] = useState()
  const Buttons = ["politics", "art", "world", "technology", "football","politics", "art",]
  const [threads, setThreads] = useState()
  // const threads=[
  //   {text:"Israel and Palestine",
  //     image:palestine,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  //   {
  //     image:thread2,
  //     sponser:"sponsored"
  // },
  //   {text:"Modern art",
  //     image:thread3,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  //   {text:"Gaming",
  //     image:thread4,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  //   {text:"Anime",
  //     image:thread5,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  //   {text:"History sec XVIII",
  //     image:thread6,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  // {text:"Modern art",
  //     image:thread3,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  //   {text:"Gaming",
  //     image:thread4,
  //     time:"1h14m",
  //     score:"1/7"
  // },
  // ]

  const fetchThread = async () => {
    console.log("reesult")
    const result = await apiClient.get("thread/")
    setThreads(result.data.results)
    console.log(result.data.results)
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchThread()
    }, [])
  )

  console.log(threads, "__________________________________________")

  const renderItem = items => {
    const { item } = items
    return (
      <Card
        style={styles.card}
        onPress={() => navigation.navigate("SingleThread", { id: item.id })}>
        <Card.Cover
          source={{ uri: item.image }}
          style={{
            
            borderRadius: 0
          }}
        />
        <Text
          style={{
            top: 6,
            left: 10,
            position: "absolute",
            fontWeight: 600,
            fontFamily: fonts.regular,
            fontSize: 20,
            color: "white"
          }}>
          {item.title}
        </Text>
        <View style={styles.cardActionsContainer}>
          <Card.Actions style={styles.cardActions}>
            {item.sponser ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <Text style={{ fontSize: 14, color: "white", fontWeight: 600 }}>
                  {item.sponser}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                  <Timer />
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#2DA1D7"
                    }}>
                    {" "}
                    {item.created_at}
                  </Text>
                  {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Timers targetTime={item.created_at}/>
           </View> */}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap:5
                  }}>
                  <ManIcon />
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontWeight: 400,
                      fontSize: 14,
                      color: "white"
                    }}>
                    5/8
                  </Text>
                </View>
              </View>
            )}
          </Card.Actions>
        </View>
      </Card>
    )
  }
  return (
    <Screen style={styles.container}>
      <View style={{ paddingHorizontal:wp(4.7),flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Image
            source={logo}
            style={{ width: 36, height: 36, resizeMode: "contain", marginRight: 5 }}
          />
            <Text  style={{color:colors.white,fontSize:fontSize.normal,fontWeight:"600",fontFamily:fonts.medium}}>Topics</Text>
      
        </View>
        <Ionicons
          name="md-add-circle-outline"
          onPress={() => setShow(true)}
          size={24}
          color="white"
        />
      </View>
      <View style={{ marginTop: hp(2) ,paddingHorizontal:wp(4.7)}}>
        <AppSearch />
        <ScrollView 
        
          horizontal
          contentContainerStyle={{ flexDirection: "row" }}
          showsHorizontalScrollIndicator={false}>
          {Buttons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                paddingHorizontal:10,
                height:23,
                marginRight:hp(0.58),
                borderRadius: 15,
               marginTop:hp(1.1),
               marginBottom:hp(3),
                flex:1,
                alignItems:"center",
                justifyContent:"center"
              }}
              onPress={() => {
                // Add functionality for onPress event
              }}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: fonts.medium,
                  fontWeight: 400,
                  fontSize: 14
                }}>
                {item}
              </Text>
              {/* Change the text color and other styles as needed */}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={threads}
          columnWrapperStyle={{ justifyContent:"space-between"}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap:15}}
        />
      </View>
      {show && <NewThreadModal show={show} onhide={() => setShow(false)} />}
    </Screen>
  )
}

export default ThreadHome

const Timers = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetTime) // Recalculate time left every minute (you can adjust the interval)
    }, 60000)

    return () => clearInterval(interval) // Clean up the interval on unmount
  }, [])

  return (
    <Text style={{ fontFamily: fonts.medium, fontWeight: "400", fontSize: 14, color: "#2DA1D7" }}>
      {"timeLeft"}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 5,
    paddingBottom: 50
  },
  cardRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%"
  },
  card: {
    borderRadius: 10, // Apply border radius to the entire card
    overflow: "hidden",
    height: 150,
    // marginHorizontal: 3,
    width: "48%", // Adjust width as needed, allowing some space for margins/padding
    // marginBottom: 7
  },
  cardActionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  cardActions: {
    backgroundColor: "rgba(116, 116, 119, 0.8)",
    zIndex: 1
  }
})
