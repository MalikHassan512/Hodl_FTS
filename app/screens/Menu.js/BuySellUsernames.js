import {
  Text,
  Switch,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  TextInput
} from "react-native"
import React, { useState } from "react"

import { LinearGradient } from "expo-linear-gradient"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import { useNavigation } from "@react-navigation/native"
import TitleBar from "../../component/core/TitleBar"
import GradientWrapper from "../../component/AppWrapper/GradientWrapper"
import logo from "../../../assets/logo.png"
import StorageIcon from "../../../assets/icons/iconss/Storage.svg"
import VerifiedIcon from "../../../assets/icons/iconss/verified.svg"
import Ads from "../../../assets/icons/iconss/Ads.svg"
import Groups from "../../../assets/icons/iconss/Groups.svg"
import Gif from "../../../assets/icons/iconss/Gif.svg"
import { fontSize } from "../../config/fontSize"
import { FLEX_STYLE } from "../../config/Styles"
import colors from "../../config/colors"
import AppText from "../../component/core/AppText"
import GradientButton from "../../component/buttons/GradientButton"
import TabButton from "../../component/core/TabButton"
import EuroInput from "../../component/inputs/MoneyInput"
import defaultStyles from "../../config/defaultStyles"
import fonts from "../../../assets/fonts"
import AppSearch from "../../component/core/AppSearch"
import { useWindowDimensions } from "react-native"
import { TabView, TabBar, SceneMap } from "react-native-tab-view"
import TabsView from "../../component/TabsView"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const BuySellUsernames = () => {
  const tabs = [
    { key: "buy", title: "Buy", component: BuyUsernames },
    { key: "sell", title: "Sell", component: SellUsernames }
    // Add more tabs as needed
  ]
  return (
    <AppWrapper>
      <View style={[styles.container]}>
        <GradientWrapper>
          <TitleBar />
          <View style={{ marginBottom: hp(2) }}>
            <Text white center style={{ alignSelf:"center",color:colors.white,fontFamily:fonts.bold,fontWeight:"600",fontSize: fontSize.normal }}>
              Buy & Sell Usernames
            </Text>
            <Text
              c
              style={{
                color: colors.white,
                width: wp(80),
                alignSelf:"center",
                marginTop:hp(3),
                textAlign: "center",
                fontSize: fontSize.smallx1,
                fontFamily: fonts.light
              }}>
              Personal, Business and Community presence.
            </Text>
          </View>
          <TabsView tabs={tabs} />
          {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      /> */}
        </GradientWrapper>
      </View>
    </AppWrapper>
  )

  //   return (
  //     <View style={[styles.container]}>

  // <GradientWrapper>

  //         <TitleBar />
  //         <View style={{marginBottom:hp(2)}}>

  // <AppText white center style={{fontSize:fontSize.normal}}>Buy & Sell Usernames</AppText>
  // <AppText  center style={{color:colors.white, width:wp(80),
  // textAlign: 'center',
  //   fontSize:fontSize.smallx1,
  //   fontFamily:fonts.light}}>Personal, Business and Community presence.</AppText>
  //         </View>

  //         {/* <View style={{alignItems:"center",marginVertical:hp(2)}}>

  //         <TabButton buttons={["Buy","Sell"]}  onClick={(i)=>setActive(i)}/>
  //         </View>
  //         <View style={{paddingHorizontal:wp(2),marginVertical:hp(4)}}>
  //           <AppSearch/>
  //         </View>

  //         {active===1&&
  //         <BuyUsernames/>
  //         }
  // {active===2&&
  // <SellUsernames/>
  // } */}

  //     </GradientWrapper>
  //   </View>
  //   )
}

const BuyUsernames = () => {
  const usernamesBuyData = [
    { text: "henrylopezofficial", price: "€ 3,99" },
    { text: "henryworld", price: "€ 1,99" },
    { text: "henrylopezofficial1", price: "€ 3,99" },
    { text: "lopezhenry", price: "€ 3,99" },
    { text: "henryworld", price: "€ 1,99" },
    { text: "henrylopezofficial1", price: "€ 3,99" },
    { text: "henrylopezofficial", price: "€ 3,99" },
    { text: "henryworld", price: "€ 1,99" }
  ]

  const [active, setActive] = useState()

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: wp(4.7), marginVertical: hp(4) }}>
        <AppSearch />
      </View>
      <View style={{ height: hp(60) ,paddingHorizontal:wp(4.7) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={usernamesBuyData}
          renderItem={({ item, index }) => (
            <ListItem item={item} index={index} active={active} setActive={setActive} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: hp(17) }}
          ItemSeparatorComponent={() => <View style={{ height: 10, width: "100%" }}></View>}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 10 }}>
        <GradientButton
          title={"Buy"}
          colors={["#A375A1", "#2792C3"]}
          gradientStyle={{ borderRadius: 10, padding: 15 }}
        />
      </View>
    </View>
  )
}
const SellUsernames = () => {
  const [active, setActive] = useState(null)
  const usernamesSellData = ["henrylopez", "henrylopez", "henrylopez"]
  const [next, setNext] = useState()
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: wp(4.7), marginVertical: hp(4) }}>
        <AppSearch />
      </View>
      <View style={{ height: hp(60), paddingHorizontal: wp(4.7) }}>
        {next ? (
          <View>
            <SellListItem item={usernamesSellData[active]} active={false} />
            <View style={{ alignItems: "center" }}>
              <AppText style={{ marginVertical: 20, fontSize: fontSize.tinyx1 }}>
                Choose the price to sell it
              </AppText>
              <EuroInput />
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={usernamesSellData}
            renderItem={({ item, index }) => (
              <SellListItem item={item} index={index} active={active} setActive={setActive} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: hp(17) }}
            ItemSeparatorComponent={() => <View style={{ height: 10, width: "100%" }}></View>}
          />
        )}
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 10 }}>
        <GradientButton
          title={next ? "Sell" : "Next"}
          disabled={active !== null ? false : true}
          onPress={() => !next && setNext(true)}
          colors={["#A375A1", "#2792C3"]}
          gradientStyle={{ borderRadius: 10, padding: 15 }}
        />
      </View>
    </View>
  )
}

function ListItem({ item, index, active, setActive }) {
  return (
    <TouchableOpacity style={{  }} onPress={() => setActive(index)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 14,
          borderRadius: 10,
          backgroundColor: "#222",
          borderColor: "white",
          borderWidth: index === active ? 2 : 0
        }}>
        <Text style={[styles.text, { fontSize: fontSize.tinyx1 }]}>{item.text}</Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: fontSize.smallx1,
              color: "#2da1d7",
              paddingHorizontal: 10,
              borderRadius: 10
            }
          ]}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
function SellListItem({ item, index, active, setActive }) {
  return (
    <TouchableOpacity onPress={() => setActive(index)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 14,
          borderRadius: 10,
          backgroundColor: "#222",
          borderColor: "white",
          borderWidth: index === active ? 2 : 0
        }}>
        <Text style={[styles.text, { fontSize: fontSize.tinyx1 }]}>{item}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default BuySellUsernames
const styles = StyleSheet.create({
  scene: {
    flex: 1
  },

  tabBar: {
    width: wp(60), // Set the desired width
    alignSelf: "center", // Center the TabBar horizontally
    height: 25,
    // flexDirection: 'row', // Allow alignment of items in a row
    // justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.header,
    backgroundColor: colors.header // Background color of the tab bar
  },
  indicator: {
    backgroundColor: colors.primary,
    height: "100%",
    borderRadius: 30,
    borderBottomWidth: 0,
    fontWeight: "bold"
  },
  label: {
    flex: 1,
    marginTop: -6.5,
    fontSize: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: colors.primary
  },
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
