import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
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
const ForgetConfirmation = () => {
    const navigation =useNavigation()
  return (
    <Screen style={[styles.container]}>
  
  <View style={[styles.mainContainer]}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
       
      </View>
     
      
      {/* <AppButton style={{marginTop:20}} title={"login"}/> */}
     
       <View style={{ flex: 2, justifyContent: "space-between", }}>
      <View style={{ justifyContent: "center",alignItems: "center",paddingHorizontal:15 }}>
        
     
              <AppText textCenter xl bold style={{color:colors.white,paddingTop:20}}>
               Thank You!
              </AppText>
              <AppText textCenter md style={{color:colors.primary,marginTop:10}}>
              The link to create a new password was sent to your email.
              </AppText>
             
       
      </View>
      <View style={{padding:10}}>
       <AppButton color='' style={{borderWidth:2,borderColor:colors.primary,borderRadius:10}} title={"Send Again"}/>
       <AppButton title={"login"} onPress={()=>navigation.navigate("Login")}/>
      </View>
    </View>
      
    </Screen>
  )
}

export default ForgetConfirmation
const styles = StyleSheet.create({
    container: {
        flex:1,
     
    },
    mainContainer: {
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    image: {
      width: 96,
      height: 136,
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