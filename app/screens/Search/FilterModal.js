import { StyleSheet, Modal,Text,TouchableOpacity, View, Switch } from 'react-native'
import React, { useState } from 'react'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { fontSize } from '../../config/fontSize'
import Cross from "../../../assets/icons/iconss/Cross.svg"
import WhatsApp from "../../../assets/icons/iconss/Whatsap.svg"
import Filter1 from "../../../assets/icons/iconss/filter1.svg"
import Filter2 from "../../../assets/icons/iconss/filter2.svg"
import ListItemSeparator from '../../component/core/ListItemSeparator'
const FilterModal = ({isDrawerVisible, onHide}) => {
  const [isRow1, setIsRow1] = useState(true)
  const toggleDirection1 = () => {
    setIsRow1(!isRow1)
  }
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
        <Text style={{fontFamily:fonts.medium,fontSize:fontSize.smallx11,fontWeight:600,color:colors.white}}>Filter</Text>
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
       
       <View style={{padding: 20,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
       <View style={{flexDirection:"row"}}>
        <Filter1 style={{marginRight:10}}/>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.tiny,fontWeight:600,color:colors.white}}>Communities</Text>
       </View>
       <Switch
                trackColor={{ false: "#767577", true: "#2DA1D7" }}
                thumbColor={isRow1 ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection1}
                value={isRow1}
              />
       </View>
       <ListItemSeparator/>
      


       <View style={{padding: 20,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row"}}>
        <Filter2 style={{marginRight:10}}/>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.tiny,fontWeight:600,color:colors.white}}>Channels</Text>
       </View>
       <Switch
                trackColor={{ false: "#767577", true: "#2DA1D7" }}
                thumbColor={isRow1 ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection1}
                value={isRow1}
              />
       </View>
    
       
       </View>
      
    </View>
  </Modal>
  )
}

export default FilterModal

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