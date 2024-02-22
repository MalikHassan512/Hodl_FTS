import { StyleSheet,Image, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Screen from '../../component/core/Screen'
import logo from "../../../assets/logo.png"
import Filter from "../../../assets/icons/iconss/filter.svg"
import dp from "../../../assets/icons/iconss/dp2.jpg"
import tylor from "../../../assets/tylor.png"
import tylor2 from "../../../assets/tylor2.png"
import dp1 from "../../../assets/icons/iconss/dp.png"
import dp3 from "../../../assets/icons/iconss/dp3.png"
import { Ionicons } from '@expo/vector-icons';
import AppSearch from '../../component/core/AppSearch';
import AppText from '../../component/core/AppText';
import colors from '../../config/colors';
import fonts from '../../../assets/fonts';
import { hp, wp } from '../../config/dimensions';
import { fontSize } from '../../config/fontSize'
import defaultStyles from '../../config/defaultStyles'
import FilterModal from './FilterModal'
const SearchHome = () => {
    const Buttons =["politics","art","world","technology","football"]
    const[filterModal,setFilterModal]=useState(false)
    const imageSources = [dp,dp1];
    const leftValue = 10 + (imageSources.length );
  return (
    <Screen style={styles.container}>
    <View style={[{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:wp(4.7)}]}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Image source={logo} style={{width:36,height:36,resizeMode:"contain",marginRight:5}}/>
            <Text  style={{color:colors.white,fontSize:fontSize.normal,fontWeight:"600",fontFamily:fonts.medium}}>Search</Text>
         </View>
         <Filter onPress={()=>setFilterModal(true)}/>
    </View>
    <View style={{marginTop:hp(2),paddingHorizontal:wp(4.7)}}>
              <AppSearch/>
              <ScrollView
      horizontal
     
      contentContainerStyle={{ flexDirection: 'row' }}
      showsHorizontalScrollIndicator={false}
    >
      
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
            flex:1,
            alignItems:"center",
            justifyContent:"center"
          }}
          onPress={() => {
            // Add functionality for onPress event
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center',fontFamily:fonts.medium,fontWeight:400,fontSize:fontSize.tiny }}>{item}</Text>
          {/* Change the text color and other styles as needed */}
        </TouchableOpacity>
      ))}
    
    </ScrollView>
    </View>
    <View style={{marginTop:hp(2.15),paddingHorizontal:wp(4.7)}}> 
    <View style={[styles.list]}>
          <Image source={tylor}  style={{width:"20%",height:"100%",}}/>
          <View style={[{marginVertical:hp(0.7),width:"78%",paddingHorizontal:wp(3.5)}]}>
            <View style={[{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
                <Text style={[styles.listText,{fontWeight:600}]}>Taylor Swift</Text>
                <Text style={[styles.listText1,{fontWeight:600}]}>Follow</Text>
            </View>
            <View  style={{flexDirection:"row",alignItems:"center",paddingHorizontal:wp(1)}}>
                <View style={[{flexDirection:"row"}]}>
                {imageSources.map((source, index) => (
        <Image key={index} source={source} style={{ width: 22, height: 22 }} />
      ))}
                {/* <Image source={dp} style={{width:40,height:40}}/> */}
                {/* <Image source={dp1} style={{width:40,height:40,position:"absolute",left:25}}/> */}
                </View>
                <View style={{paddingRight:wp(16),marginTop:hp(0.6)}}>
                <Text style={[{ left: leftValue,fontSize:12,fontWeight:"600",color:colors.primary,fontFamily:fonts.medium }]}>@joybbright94, @c.gomes and 5k others joined</Text>
                </View>
            </View>
          </View>
    </View>
    <View style={[styles.list]}>
          <Image source={tylor2}  style={{width:"20%",height:"100%",}}/>
          <View style={[{marginVertical:hp(0.7),width:"78%",paddingHorizontal:wp(3.5)}]}>
            <View style={[{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
                <Text style={[styles.listText,{fontWeight:600}]}>Taylor Swift</Text>
                <Text style={[styles.listText1,{fontWeight:600}]}>Follow</Text>
            </View>
            <View  style={{flexDirection:"row",alignItems:"center",paddingHorizontal:wp(1)}}>
                <View style={[{flexDirection:"row"}]}>
                {imageSources.map((source, index) => (
        <Image key={index} source={source} style={{ width: 22, height: 22 }} />
      ))}
                {/* <Image source={dp} style={{width:40,height:40}}/> */}
                {/* <Image source={dp1} style={{width:40,height:40,position:"absolute",left:25}}/> */}
                </View>
                <View style={{paddingRight:wp(16),marginTop:hp(0.6)}}>
                <Text style={[{ left: leftValue,fontSize:12,fontWeight:"600",color:colors.primary,fontFamily:fonts.medium }]}>@joybbright94, @c.gomes and 5k others joined</Text>
                </View>
            </View>
          </View>
    </View>

    <View style={[styles.list]}>
          <Image source={tylor}  style={{width:"20%",height:"100%",}}/>
          <View style={[{marginVertical:hp(0.7),width:"78%",paddingHorizontal:wp(3.5)}]}>
            <View style={[{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
                <Text style={[styles.listText,{fontWeight:600}]}>Taylor Swift</Text>
                <Text style={[styles.listText1,{fontWeight:600}]}>Follow</Text>
            </View>
            <View  style={{flexDirection:"row",alignItems:"center",paddingHorizontal:wp(1)}}>
                <View style={[{flexDirection:"row"}]}>
                {imageSources.map((source, index) => (
        <Image key={index} source={source} style={{ width: 22, height: 22 }} />
      ))}
                {/* <Image source={dp} style={{width:40,height:40}}/> */}
                {/* <Image source={dp1} style={{width:40,height:40,position:"absolute",left:25}}/> */}
                </View>
                <View style={{paddingRight:wp(16),marginTop:hp(0.6)}}>
                <Text style={[{ left: leftValue,fontSize:12,fontWeight:"600",color:colors.primary,fontFamily:fonts.medium }]}>@joybbright94, @c.gomes and 5k others joined</Text>
                </View>
            </View>
          </View>
    </View>
    
    </View>
    {filterModal && <FilterModal isDrawerVisible={filterModal} onHide={()=>setFilterModal(false)}/>}
    </Screen>
  )
}

export default SearchHome

const styles = StyleSheet.create({
    container: {
      
        paddingBottom:50
    },
    list:{
      marginTop:hp(0.6),
        flexDirection:"row",
        backgroundColor:colors.header,
        height:hp(8.95),
        overflow:"hidden",
        borderRadius:10
    },
    listText:{
        fontFamily:fonts.medium,
        color:colors.white,
        fontSize:fontSize.tinyx1,
    },
    listTag:{
        fontFamily:fonts.medium,
        paddingRight:wp(2),
        color:colors.primary,
        fontSize:fontSize.small,
       
    },
    listText1:{
        color:"#2DA1D7",
        fontFamily:fonts.regular,
        fontSize:fontSize.tiny,
    }
})