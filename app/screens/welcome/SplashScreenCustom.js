import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../component/config/colors'
import Screen from '../../component/core/Screen'
import image from "../../../assets/3.png"
import image1 from "../../../assets/profile.png"
import AppText from '../../component/core/AppText'
import AppButton from '../../component/core/AppButton'
import AppTextInput from '../../component/core/AppTextInput'
import AppFormField from '../../component/forms/AppFormField'
import AppForm from '../../component/forms/AppForm'
import PasswordTextInput from '../../component/core/PasswordTextInput'
import SubmitButton from '../../component/core/SubmitButton'
import { useNavigation } from '@react-navigation/native'
const SaplashScreen = () => {
    const navigation =useNavigation()
  return (
    <Screen style={[styles.container]}>
  
  <View style={[styles.mainContainer,{marginTop:100}]}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
       
      </View>
     
       <View style={{ flex: 1, justifyContent: "flex-start",marginTop:100}}>
        
      <View style={{ alignItems: "center",paddingHorizontal:15 }}>
        
     
              <AppText textCenter xl bold style={{color:colors.white}}>
              Welcome!
              </AppText>
              <AppText textCenter md style={{color:colors.primary,marginTop:10}}>
              Start using HODL app and be the first to discover new features soon.
              </AppText>
             
       
      </View>
     
    </View>
      
    </Screen>
  )
}

export default SaplashScreen
const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor: colors.secondary,
      padding: 10,
    },
    mainContainer: {
      justifyContent: "center",
    
    },
    image: {
      width: "100%",
    },
    text: {
      letterSpacing: 1.5,
      marginTop: 10,
    },
    imageContainer: {
      justifyContent: "center",
    },
    bottomText: {
      padding: 30,
      marginVertical: 30,
      borderRadius: 20,
      borderTopLeftRadius: 0,
      borderColor: colors.danger,
      borderWidth: 1,
    },
    corner: {
      backgroundColor: colors.secondary,
      width: 30,
      height: 30,
      position: "absolute",
      top: -5,
      left: -5,

    },
    textStyle: {
      color: colors.white,
      margin: "auto",
    },
    card:{
        width:"100%",
        height:200,
        backgroundColor:colors.primary,
        marginTop:40,
       borderRadius:30,
   
       justifyContent:"center",
       alignItems:"center"
    }
    
  });