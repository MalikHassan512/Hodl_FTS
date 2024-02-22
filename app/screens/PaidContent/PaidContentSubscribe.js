import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LockContent from "../../../assets/icons/iconss/LockContent.svg"
import { hp, wp } from '../../config/dimensions'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import defaultStyles from '../../config/defaultStyles'
import AppButton from '../../component/core/AppButton'
import { heightPercentageToDP } from 'react-native-responsive-screen'
const PaidContentSubscribe = () => {
  return (
    <>
    <View style={{height:hp(70),flexDirection:"column",justifyContent:"center",alignItems:"center",}}>
        <LockContent style={[{marginBottom:hp(3)}]}/>
        <Text style={[styles.locked,{marginBottom:hp(3)}]}>This tab is locked!</Text>
        <Text style={[styles.lockedSub,{width:wp(80),textAlign:"center"}]}>You can subscribe to get access to all private information shared here.</Text>
    </View>
    <View style={[{paddingHorizontal:wp(4.7)}]}>
    <AppButton title={"Subscribe"}/>
    </View>
    </>
  )
}

export default PaidContentSubscribe

const styles = StyleSheet.create({
    locked:{
        color:colors.white,
        fontWeight:"600",
        fontFamily:fonts.medium,
        fontSize:24,
    },
    lockedSub:{
        color:colors.white,
        fontWeight:"300",
        fontFamily:fonts.light,
        fontSize:18,
    },
})