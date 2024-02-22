import { StyleSheet, Modal,Text,TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { fontSize } from '../../config/fontSize'
import Cross from "../../../assets/icons/iconss/Cross.svg"
import WhatsApp from "../../../assets/icons/iconss/Whatsap.svg"
import ContactCard from "../../../assets/icons/iconss/contactCard.svg"
import LinkCard from "../../../assets/icons/iconss/LinkCard.svg"
import ListItemSeparator from '../../component/core/ListItemSeparator'
import { hp } from '../../config/dimensions'
import AppButton from '../../component/core/AppButton'
const MoneyWithDrawModal = ({isDrawerVisible, onHide}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isDrawerVisible}
    onRequestClose={onHide}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
       <View style={{flexDirection:"row",paddingHorizontal: 20,paddingTop:20,alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx11,fontWeight:600,color:colors.white}}>Withdrawal</Text>
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
       
       <View style={{padding: 20,flexDirection:"row",alignItems:"center"}}>
        <Text style={{fontFamily:fonts.bold,fontSize:fontSize.normal,fontWeight:600,color:colors.white}}>$ 67,98</Text>
       </View>
       <ListItemSeparator/>
      


       <View style={{padding: 20}}>
        <Text style={{fontFamily:fonts.light,fontSize:fontSize.tiny,color:colors.primary}}>To</Text>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:'center',marginTop:hp(1)}}>
        <View>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.tiny,fontWeight:600,color:colors.white}}>PayPal</Text>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.tiny,fontWeight:600,color:colors.white}}>henry-lopez@gmail.com</Text>
        </View>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.tiny,fontWeight:600,color:"#2DA1D7"}}>Edit</Text>
        </View>
       </View>
       <View style={{paddingHorizontal:20,position:"absolute",bottom:hp(2.5),width:"100%"}}>
        <AppButton title={"Withdraw money"}/>
       </View>
    
       
       </View>
      
    </View>
  </Modal>
  )
}

export default MoneyWithDrawModal

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', 
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    modalContent: {
      backgroundColor: "#222222", 
      borderTopLeftRadius: 20, 
      borderTopRightRadius: 20,
      height: '45%',
    },
  });