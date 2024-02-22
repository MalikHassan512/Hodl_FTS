import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { styles } from "./styles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import LinearGradient from "react-native-linear-gradient"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import { useNavigation } from "@react-navigation/native"
import AppForm from "../../component/forms/AppForm"
import { fontSize } from "../../config/fontSize"
import fonts from "../../../assets/fonts"
import colors from "../../config/colors"
import AppFormField from "../../component/forms/AppFormField"
import AppText from "../../component/core/AppText"
import SubmitButton from "../../component/core/SubmitButton"
import defaultStyles from "../../config/defaultStyles"
import { TextInput } from "react-native-gesture-handler"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Suggestion = () => {
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  return (
    <AppWrapper color={colors.themeColor2}>
   <View style={[styles.container]}>
    <LinearGradient
       colors={["#121111", "#131A1D", "#131A1D"]}
       style={styles.container}
       start={{ x: 1, y: 0.5 }}
       end={{ x: 1, y: 1 }}
       useAngle={true}
     >
        
  
     <TitleBar title={"Suggestions"}/>
   <View style={{flex:1}}>
    
        <AppForm
          initialValues={{ title: "", description: "",tags:"" }}
          // validationSchema={validationSchema}
          onSubmit={async values => {
            const formData=new FormData()
            // formData.append("title",values.title)
            // formData.append("description",values.description)
            // formData.append("tags",values.tags)
            // console.log(file);
            // formData.append("image",{...file,type:"image/*"})
            // const result =await apiClient.post("/thread/",formData)
            // if(!result.ok) return console.log(result.status,"error");
            // console.log(result,"|______________________________________")
          }}>
              <KeyboardAwareScrollView  >
            <View style={{paddingHorizontal:wp(4.7)}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <Text
              style={{ fontSize: fontSize.smallx1, color: colors.white, fontFamily: fonts.regular ,marginTop:hp(1.2)}}>
             We want to know about your suggestions. Send them here.
            </Text>
            
          </View>
          
          </View>
          <View style={{ marginTop: 15 }}>
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
            <View style={{marginTop:hp(1)}}/>
            <AppText style={{ fontSize: 14,marginBottom:2 }} pStyle={{ paddingHorizontal: wp(4.7) }}>
              Message
            </AppText>
            <View style={{paddingHorizontal:wp(4.7) }}>
            <TextInput
                 style={{
                    textAlignVertical:"top",
                   borderWidth: 1,
                   borderColor: colors.border,
                   borderRadius: 24,
                   minHeight: hp(35),
                   padding: 10,
                   paddingVertical:hp(7),
                   color: "#FFF"
                 }}
                 autoCapitalize="sentences"
                 title={"Message"}
                  multiline
                  // title={"Description"}
                
                  autoCorrect={false}
                  name="message"
                  placeholderTextColor={colors.light}
                />
            </View>
           

          </View>
          </KeyboardAwareScrollView>
          <View style={{paddingHorizontal:wp(4.7),marginTop:"auto"}}> 
              <SubmitButton title={"Send"}/>
              </View>
            </AppForm>
          </View>
        </LinearGradient>
      </View>
    </AppWrapper>
  )
}

export default Suggestion
