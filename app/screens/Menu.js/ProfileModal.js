import { StyleSheet, Modal,Text,TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

import Cross from "../../../assets/icons/iconss/Cross.svg"
import profile from "../../../assets/icons/iconss/ProfileImage.png"
import QrPic from "../../../assets/icons/iconss/QrPic.png"
import { hp, wp } from '../../config/dimensions'
import defaultStyles from '../../config/defaultStyles'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { fontSize } from '../../config/fontSize'
import AppButton from '../../component/core/AppButton'

const ProfileModal = ({isDrawerVisible, onHide}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isDrawerVisible}
    onRequestClose={onHide}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
       <View style={{flexDirection:"row",paddingVertical: 20,alignItems:"center",justifyContent:"flex-end"}}>
        {/* <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Invite Friend</Text> */}
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
       
       
       <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
       <View>
                <Image source={profile} style={{alignSelf:"center",width:93,borderRadius:5,height:93}} resizeMode='contain'/>
                <Text style={[styles.settingText,{marginTop:hp(2)}]}>Henry Lopez</Text>
                </View>
        </View>
       <View style={{marginTop:hp(12),flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Image source={QrPic}  resizeMode='contain'/>
        </View> 
        <AppButton title={"Share Profile"}  style={{position:'absolute',bottom:hp(3), alignSelf:'center'}}/>
       </View>
      
    </View>
  </Modal>
  )
}

export default ProfileModal

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', 
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    modalContent: {
      backgroundColor: "#222222", 
      borderTopLeftRadius: 20,
      paddingHorizontal:wp(4), 
      borderTopRightRadius: 20,
      height: '90%',
    },
    settingText:{
        color:colors.white,
        fontFamily:fonts.regular,
        fontSize:fontSize.normal,
        textAlign:"center"
      },
  });