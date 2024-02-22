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
const InviteModal = ({isDrawerVisible, onHide}) => {
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
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Invite Friend</Text>
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
       
       <View style={{padding: 20,flexDirection:"row",alignItems:"center"}}>
        <WhatsApp style={{marginRight:15}}/>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Invite Friend</Text>
       </View>
       <ListItemSeparator/>
      


       <View style={{padding: 20,flexDirection:"row",alignItems:"center"}}>
        <ContactCard style={{marginRight:15}}/>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Contacts</Text>
       </View>
    
       <ListItemSeparator/>
       <View style={{padding: 20,flexDirection:"row",alignItems:"center"}}>
        <LinkCard style={{marginRight:15}}/>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.smallx1,fontWeight:600,color:colors.white}}>Copy link</Text>
       </View>
       </View>
      
    </View>
  </Modal>
  )
}

export default InviteModal

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