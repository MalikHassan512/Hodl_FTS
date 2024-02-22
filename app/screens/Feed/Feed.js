import { Pressable, Image,StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native"
import React, { useState } from "react"

import Arrow from "../../../assets/icons/iconss/RightArrow.svg"
import AddFeedIcon from "../../../assets/icons/iconss/AddFeedIcon.svg"
import Bage from "../../../assets/icons/iconss/Bage.svg"
import logo from "../../../assets/logo.png"
import Swift from "../../../assets/icons/iconss/swift.png"
import { useNavigation } from "@react-navigation/core"
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../config/colors';
import { styles } from "./styles"
import AppText from "../../component/core/AppText"
import { fontSize } from "../../config/fontSize"
import dp from "../../../assets/icons/iconss/feeddp.png"
import fonts from "../../../assets/fonts"
import Filter from "../../../assets/icons/iconss/filter.svg"
import { hp, wp } from "../../config/dimensions"
import defaultStyles from "../../config/defaultStyles"
import Screen from "../../component/core/Screen"
import { useSelector } from "react-redux"
const Feed = () => {
  
  return (
    <Screen style={styles.container}>
     {/* <View style={styles.container}>
       <LinearGradient
      colors={["#121111", "#131A1D", "#131A1D"]}
      style={styles.container}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      useAngle={true}
    > */}
        
        {/* <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:wp(2),marginTop:hp(1.3)}}>
            <Image source={logo} style={{width:30,height:30,resizeMode:"contain",marginRight:5}}/>
            <AppText style={{color:colors.white,fontFamily:fonts.medium,fontSize:fontSize.normal,fontWeight:600}}>Feed</AppText>
         </View> */}
         <View style={{paddingHorizontal:wp(4.7),flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Image source={logo} style={{width:36,height:36,resizeMode:"contain",marginRight:5}}/>
            <Text  style={{color:colors.white,fontSize:fontSize.normal,fontWeight:"600",fontFamily:fonts.medium}}>Feed</Text>
         </View>
         <View/>
         <View/>
         {/* <Filter onPress={()=>setFilterModal(true)}/> */}
    </View>
    <ScrollView contentContainerStyle={{paddingBottom:hp(3)}}>
         <View style={{marginTop:hp(2),paddingHorizontal:wp(4.7),}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Image source={dp} resizeMode="contain" style={{width:30,height:30,borderRadius:5,marginRight:wp(4)}}/>
                <Text style={[styles.feedName,{fontWeight:"600"}]}>Mr Beast</Text>
                <Bage style={{marginHorizontal:wp(2)}}/>
                <Text style={styles.feedTime}>2 min</Text>
                </View>
                <Arrow/>
            </View>
            <View>
                <Text style={[styles.feedText,{fontWeight:"400"}]}>Fusce iaculis libero nec diam gravida, sit amet accumsan nibh maximus. Sed id tristique ante. Nullam pretium, risus ac hendrerit bibendum, risus leo ultrices augue, in dictum odio libero vitae orci. Aliquam lobortis!! 🍅🤸🏽‍♀️</Text>
            </View>
         </View>

         <View style={{marginTop:hp(2)}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:wp(4.7),}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Image source={dp} resizeMode="contain" style={{width:30,height:30,borderRadius:5,marginRight:wp(4)}}/>
                <Text style={[styles.feedName,{fontWeight:"600"}]}>Taylor Swift</Text>
                <Bage style={{marginHorizontal:wp(2)}}/>
                <Text style={styles.feedTime}>2 min</Text>
                </View>
                <Arrow/>
            </View>
            <View>
                <Text style={[styles.feedText,{fontWeight:"400",paddingHorizontal:wp(4.7),marginBottom:hp(0.65)}]}>Aliquam lobortis, tellus malesuada sollicitudin tristique!!!</Text>
                <Image source={Swift} resizeMode="contained" style={{width:"100%",height:200}}/>
            </View>
            <View style={{marginTop:hp(1), paddingHorizontal:wp(4.7), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ marginRight:wp(1),backgroundColor: "#454545", borderRadius: 15, paddingHorizontal:wp(2),paddingVertical:2 }}>
          <Text style={[styles.feedIcon,{fontWeight:"600"}]}>😍 3</Text>
        </View>
        <View style={{ backgroundColor: "#454545", borderRadius: 15, paddingHorizontal:wp(2),paddingVertical:2 }}>
          <Text style={[styles.feedIcon,{fontWeight:"600"}]}>🚀 5</Text>
        </View>
        <View style={{  borderRadius: 10, paddingHorizontal:wp(2),paddingVertical:2 }}>
          <AddFeedIcon/>
        </View>
      </View>
         </View>

         <View style={{marginTop:hp(2),paddingHorizontal:wp(4.7),}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Image source={dp} resizeMode="contain" style={{width:40,height:40,borderRadius:5,marginRight:wp(4)}}/>
                <Text style={[styles.feedName,{marginRight:wp(2)}]}>Amelie Smith</Text>
                <Text style={styles.feedTime}>2 min</Text>
                </View>
                <Arrow/>
            </View>
            <View>
                <Text style={styles.feedText}>Sed id tristique ante. Nullam pretium, risus ac hendrerit bibendum, risus leo ultrices augue 🌝</Text>
           
                <View style={{marginTop:hp(1), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ marginRight:wp(1),backgroundColor: "#454545", borderRadius: 15, paddingHorizontal:wp(2),paddingVertical:2 }}>
          <Text style={[styles.feedIcon,{fontWeight:"600"}]}>😍 3</Text>
        </View>
        <View style={{ backgroundColor: "#454545", borderRadius: 15, paddingHorizontal:wp(2),paddingVertical:2 }}>
          <Text style={[styles.feedIcon,{fontWeight:"600"}]}>🚀 5</Text>
        </View>
        <View style={{  borderRadius: 10, paddingHorizontal:wp(2) }}>
          <AddFeedIcon/>
        </View>
      </View>
            </View>
         </View>
         </ScrollView>
        {/* </LinearGradient>
    </View> */}
    </Screen>
  )
}

export default Feed
