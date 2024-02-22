import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import AppButton from '../../component/core/AppButton'
import profile from "../../../assets/profile.png"
import profile2 from "../../../assets/BMW-blue.png"
import colors from '../../config/colors'
import Screen from '../../component/core/Screen'
import VedioCamra from "../../../assets/icons/iconss/video_call_background_icons.svg"
import Speaker from "../../../assets/icons/iconss/Audio_voice_call.svg"
import Mute from "../../../assets/icons/iconss/Mute.svg"
import CallEnd from "../../../assets/icons/iconss/callEnd.svg"
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import NewGroupCallModel from '../../component/NewGroupCallModel';
import { useEffect } from 'react';
import Button from '../../component/core/TabButton';
const CallScreen = ({ navigation, route }) => {
  const hideTabBar = () => {
    console.log(navigation.setOptions,"azsx")
    navigation.setOptions({
      tabBarStyle: false
    });
  };
  useEffect(()=>{hideTabBar},[])
    const data = [
        { name: 'John', log: 'incoming' },
        { name: 'Sarah', log: 'missed' },
        { name: 'Mike', log: 'outgoing' },
        { name: 'Liam', log: 'incoming' },
        { name: 'Sophia', log: 'missed' },
        { name: 'David', log: 'outgoing' },
        { name: 'Emily', log: 'incoming' },
        { name: 'Tom', log: 'missed' },
        { name: 'Alice', log: 'outgoing' },
        { name: 'William', log: 'incoming' },
        { name: 'Mia', log: 'missed' },
        { name: 'Ethan', log: 'outgoing' },
        { name: 'Ava', log: 'incoming' },
        { name: 'Olivia', log: 'missed' },
        // Add more items as needed
      ];
    const[show,setShow]=useState()
  return (
    <Screen style={styles.container}>
     <View style={styles.container1}>
     {/* <AppButton onPress={hideTabBar} title="Hide Tab Bar" color="#841584" /> */}
     <TouchableOpacity style={styles.topRightButton}>
     <Ionicons name="md-person-add-sharp" size={24} color="white"  onPress={() => {
              setShow(true)
                }}/>
      </TouchableOpacity>
      <View style={styles.centeredContainer}>
        <Image source={profile} style={styles.image} />
        <Image source={profile} style={styles.overlayImage} />
      </View>
      <View style={[styles.buttonView]}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <TouchableOpacity >
      
        <VedioCamra/>
        {/* <AntDesign name="videocamera"  size={17} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity >
      
        <Mute/>
        {/* <Feather name="mic-off" size={17} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity >
      
        <Speaker/>
        {/* <AntDesign name="sound" size={17} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity >
      
        <CallEnd/>
        {/* <MaterialCommunityIcons name="phone-hangup-outline"  size={17} color="white" /> */}
      </TouchableOpacity>
      </View>
      </View>
    </View>
    {show&&        <NewGroupCallModel title={"Invite to call"} show={show} onhide={()=>setShow(false)} data={data}/>}
        </Screen>
  )
}

export default CallScreen

const styles = StyleSheet.create({
    container: {
       
        paddingHorizontal: 15,
        backgroundColor:colors.secondary
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 200, // Adjust the width and height as needed
        height: 200,
        resizeMode: 'contain', // This ensures the image fits within the defined dimensions
      },
      overlayImage: {
        position: 'absolute',
        top: "20%", 
        left: "20%",
        width: 200,
        height: 200, 
        resizeMode: 'contain',
      },
      buttonView: {
        // flexDirection:"row",
        position: 'absolute',
        bottom: 20, // Adjust bottom value for desired positioning
        width:"100%"
       
      },
      button:{
        marginHorizontal:10,
         backgroundColor: colors.primary,
        padding:10,
        borderRadius: 5,
      },
      topRightButton: {
        position: 'absolute',
        top: 20, 
        right: 3, 
        // backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
      },
})