import { StyleSheet, Modal,Text,TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { fontSize } from '../../config/fontSize'
import Cross from "../../../assets/icons/iconss/Cross.svg"
import RightArrow from "../../../assets/icons/iconss/RightArrow.svg"
import ContactCard from "../../../assets/icons/iconss/contactCard.svg"
import LinkCard from "../../../assets/icons/iconss/LinkCard.svg"
import ListItemSeparator from '../../component/core/ListItemSeparator'
import AppButton from '../../component/core/AppButton'
import { hp, wp } from '../../config/dimensions'
const RewardModal = ({isDrawerVisible, onHide}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isDrawerVisible}
    onRequestClose={onHide}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
       <View style={{flexDirection:"row",padding: 20,alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Claim reward</Text>
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
       
       <View style={{padding: 20,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontFamily:fonts.bold,fontSize:fontSize.normal,fontWeight:600,color:"#FFB905"}}>1 HODL Tote bag</Text>
       </View>
       <View style={{paddingHorizontal:wp(3),position:"absolute",bottom:hp(3),width:"100%"}}>
        <AppButton title={"Claim now"}  />
        </View>


       
       </View>
      
    </View>
  </Modal>
  )
}

export default RewardModal

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
      height: '30%',
    },
  });