import { Text, Image, View, StyleSheet, FlatList } from 'react-native';
import React from 'react';

import { hp, wp } from '../../../config/dimensions';
import TitleBar from '../../../component/core/TitleBar';
import { fontSize } from '../../../config/fontSize';
import { FLEX_STYLE } from '../../../config/Styles';
import colors from '../../../config/colors';
import GradientWrapper from '../../../component/AppWrapper/GradientWrapper';
import AppText from '../../../component/core/AppText';
import Check from '../../../../assets/icons/iconss/checkRequestsent.svg';
import AppButton from '../../../component/core/AppButton';
import AppForm from '../../../component/forms/AppForm';
const BadgeForm2 = ({navigation}) => {


    
  return (
    <View style={[styles.container]}>

<GradientWrapper>


        {/* <TitleBar title={"Verified Badge"}/> */}

<View style={{padding:10,paddingTop:hp(5),alignItems:"center"}}>

    <Check style={{marginVertical:hp(5)}}/>
    <AppText white center style={{fontSize:fontSize.normal}}>Request Sent</AppText>
    <AppText  style={{color:"#FFF",fontSize:fontSize.smallx1,fontWeight:"300"}}>Thank you for contacting us. Your request was successfully sent. We’ll get in touch soon.</AppText>
   </View>

   <View style={{position:"absolute",bottom:hp(4),width:"100%",padding:10}}>
 <AppButton onPress={()=>navigation.navigate("AppTabs")} title={"Ok"}/>
   </View>
    </GradientWrapper>
  </View>
  )
}

export default BadgeForm2
const styles = StyleSheet.create({
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