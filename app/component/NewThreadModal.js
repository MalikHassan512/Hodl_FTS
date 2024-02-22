import {
  Animated,
  Modal,
  Dimensions,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native"
import cross from "../../assets/cross.png"
import image3 from "../../assets/3.png"
import React, { useState } from "react"
import AppText from "./core/AppText"
import colors from "../config/colors"
import defaultStyles from "../config/defaultStyles"
import { fontSize } from "../config/fontSize"
import fonts from "../../assets/fonts"
import CamraThread from "../../assets/icons/iconss/CamraThread.svg"
import AppFormField from "./forms/AppFormField"
import AppForm from "./forms/AppForm"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import AppFormFieldMultiline from "./forms/AppFormFieldMultiline"
import { hp, wp } from "../config/dimensions"
import SubmitButton from "./core/SubmitButton"
import image from "../../assets/BMW-blue.png"
import * as ImagePicker from 'expo-image-picker';
import apiClient from "../api/client"
import { pickFile, pickImage } from "../modules/fileHelpers"
const NewThreadModal = ({ show, onhide }) => {
  const [file,setFile]=useState()
  const handleImageSelection = async () => {
    const options = {
      // mediaTypes:  ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    };
    const { cancelled,...otherProps } = await pickImage(options);
  
    if (!cancelled) {
      setFile(otherProps);
    }
 
  };
  return (
    <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => onhide()}>
    
    {/* <SafeAreaView style={{flex:1}}> */}


      <View
        style={[{
          borderTopLeftRadius: 30,
          //   marginTop: isIOS && statusBarHeight,
          borderTopRightRadius: 30,
          flex: 1,
         marginTop:hp(6),
          // paddingHorizontal: 20,
          paddingTop: wp(4.4),
          backgroundColor: "#222222"
        }]}>
          <KeyboardAwareScrollView  style={{flex:1}}>
        <AppForm 
          initialValues={{ title: "", description: "",tags:"" }}
          // validationSchema={validationSchema}
          onSubmit={async values => {
            const formData=new FormData()
            formData.append("title",values.title)
            formData.append("description",values.description)
            formData.append("tags",values.tags)
            console.log(file);
            formData.append("image",{...file,type:"image/*"})
            const result =await apiClient.post("/thread/",formData)
            if(!result.ok) return console.log(result.status,"error");
            console.log(result,"|______________________________________")
          }}>
            <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal:wp(4.4)
            }}>
            <View style={styles.image}/>
            <Text
              style={{ fontSize: fontSize.smallx11, color: colors.white, fontFamily: fonts.medium }}>
              New Thread
            </Text>
            <TouchableOpacity onPress={() => onhide()}>
              <Image source={cross} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal:wp(4.2)}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(67, 67, 67, 0.70)",
              borderRadius: 20,
              height:hp(13.5),
             
            }}>
            <View style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 50 }}>
              <TouchableOpacity onPress={()=>handleImageSelection()}>
              <CamraThread style={{ padding: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
          </View>
          </View>
          <View style={[{ marginTop: 15 }]}>
            <AppFormField
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 24,
                height: 36,
                paddingHorizontal: 10,
                color: "#FFF"
              }}
              title={"Title"}
              autoCapitalize="none"
              autoCorrect={false}
              name="title"
              placeholderTextColor={colors.light}
            />
            <AppText style={{ fontSize: 14,marginTop:hp(1),marginBottom:2 }} pStyle={{ paddingHorizontal: 20 }}>
              Description
            </AppText>
            <View style={{paddingHorizontal:wp(4) }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 24,
                  height: hp(25)
                  // paddingHorizontal: 20,

                  // marginTop:hp(20)
                }}>
                <AppFormField
                  style={{ color: "#FFF" }}
                  multiline
                  // title={"Description"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="description"
                  placeholderTextColor={colors.light}
                />
              </View>
            </View>
            <View style={{marginTop:hp(1),paddingHorizontal:2}}>
            <AppFormField
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 24,
                height: 36,
                paddingHorizontal: 10,
                color: "#FFF"
              }}
              title={"Tags"}
              autoCapitalize="none"
              autoCorrect={false}
              name="tags"
              placeholderTextColor={colors.light}
            />
            </View>
          </View>
          <View style={[{justifyContent:"center",alignItems:"flex-end",height:hp(35),paddingHorizontal:wp(4.4)}]}> 
              <SubmitButton title={"Create Thread"}/>
              </View>


        </AppForm>
        </KeyboardAwareScrollView>
      </View>
    {/* </SafeAreaView> */}
    </Modal>
  )
}

export default NewThreadModal
const styles = StyleSheet.create({
  image:{
    width:wp(5),
    height:hp(3)
  }
})
