import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import cross from "../../assets/cross.png"
import FileCam from "../../assets/icons/iconss/fileCam.svg"
import FileGal from "../../assets/icons/iconss/fileGal.svg"
import FileChat from "../../assets/icons/iconss/fileChat.svg"
import FileLocation from "../../assets/icons/iconss/fileLocation.svg"
import FileContact from "../../assets/icons/iconss/fileContact.svg"
import FilePoll from "../../assets/icons/iconss/filePoll.svg"
import { hp, wp } from '../config/dimensions'
import AppText from './core/AppText'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import fonts from '../../assets/fonts'
import { fontSize } from '../config/fontSize'
import ListItemSeparator from './core/ListItemSeparator'

const ChatFileModal = ({show,handleCamera,handleImageSelection, onhide}) => {
    
  return (
    <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => onhide()}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
        style={[styles.drawerContainer,{ backgroundColor: "#222222"}]}
        //   style={{
        //     paddingHorizontal: wp(3),
        //     borderTopLeftRadius: 30,
        //     borderTopRightRadius: 30,
        //    height:hp(30),
        //     backgroundColor: "#222222",
        //     flex: 1
        //   }}
          >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <View style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <TouchableOpacity onPress={handleCamera} style={{flexDirection:"row",columnGap:10}}>
                <FileCam/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
             Camera
            </Text>

            </TouchableOpacity>
        
           <TouchableOpacity onPress={() => onhide()}>
              <Image source={cross} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          </View>
          <View
                style={[styles.seprator]}
              />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <TouchableOpacity onPress={handleImageSelection}  style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <View style={{flexDirection:"row",columnGap:10}}>
                <FileGal/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
            Library
            </Text>
            </View>
        
           
          </TouchableOpacity>
          </View>
          <View
                style={[styles.seprator]}
              />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <View style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <View style={{flexDirection:"row",columnGap:10}}>
                <FileChat/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
            Document
            </Text>
            </View>
        
           
          </View>
          </View>
          <View
                style={[styles.seprator]}
              />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <View style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <View style={{flexDirection:"row",columnGap:10}}>
                <FileLocation/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
            Location
            </Text>
            </View>
        
           
          </View>
          </View>
          <View
                style={[styles.seprator]}
              />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <View style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <View style={{flexDirection:"row",columnGap:10}}>
                <FileContact/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
            Contact
            </Text>
            </View>
          
           
          </View>
          </View>
          <View
                style={[styles.seprator]}
              />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding:20
            }}>
            
            <View style={[{flexDirection:"row",justifyContent:"space-between",width:"100%"}]} >
            <View style={{flexDirection:"row",columnGap:10}}>
                <FilePoll/>
            <Text style={{ color: colors.white,fontSize:14,fontFamily:fonts.medium }}>
            Poll
            </Text>
            </View>
        
           
          </View>
          </View>
         
            </View>
           
           </SafeAreaView>
        </Modal>
  )
}

export default ChatFileModal

const styles = StyleSheet.create({
    drawerContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    
        height: "50%", // Set the height of the drawer as needed
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
      },
      seprator:{
  
        height: 0.6,
        width: "100%",
        backgroundColor: colors.primary,
      
      }
     
})