import { StyleSheet, Modal,Text,TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { fontSize } from '../../config/fontSize'
import Cross from "../../../assets/icons/iconss/Cross.svg"
import VideoPlay from "../../../assets/icons/iconss/video paly button copy.svg"
import WhatsApp from "../../../assets/icons/iconss/Whatsap.svg"
import ContactCard from "../../../assets/icons/iconss/contactCard.svg"
import LinkCard from "../../../assets/icons/iconss/LinkCard.svg"
import ListItemSeparator from '../../component/core/ListItemSeparator'
import { hp, wp } from '../../config/dimensions'
import PaidContentTabs from '../../component/buttons/PaidContentTabs'
import SubmitButton from '../../component/core/SubmitButton'
import AppFormField from '../../component/forms/AppFormField'
import AppText from '../../component/core/AppText'
import AppForm from '../../component/forms/AppForm'
import EuroInput from '../../component/inputs/MoneyInput'
import CamraThread from "../../../assets/icons/iconss/CamraThread.svg"
import TabsView from '../../component/TabsView'
import TabsViewPaid from '../../component/TabsViewPaid'
import defaultStyles from '../../config/defaultStyles'
const PaidContentModal = ({isDrawerVisible, onHide}) => {
    const [active,setActive]=useState(1)
    const tabs = [
      { key: "Text", title: "Text", component: TextForm },
      { key: "Photo", title: "Photo", component: PhotoForm },
      { key: "Video", title: "Video", component: VideoForm },
   
    ]
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={isDrawerVisible}
    onRequestClose={onHide}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            
       <View style={{flexDirection:"row",padding: 20,alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontFamily:fonts.regular,fontSize:fontSize.normal,fontWeight:600,color:colors.white}}>Paid Content</Text>
        <TouchableOpacity onPress={onHide} >
        <Cross/>
        </TouchableOpacity>
       </View>
      
<TabsViewPaid width={50} tabs={tabs} align={"align"}/>
        </ScrollView>
       </View>
      
    </View>
  </Modal>
  )
}
const TextForm = () => {
    return (
        <View style={[{flex:1,position:"relative"}]}>
              <AppForm 
          initialValues={{ email: "", password: "" }}
          // validationSchema={validationSchema}
          onSubmit={async values => {
            console.log(values)
          }}>
         
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
            <AppText style={{ fontSize: 14 }} pStyle={{ paddingHorizontal: 20 }}>
              Message
            </AppText>
            <View style={{paddingHorizontal:15 }}>
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
            <View style={{marginTop:hp(3)}}>
            <View style={{alignItems:"center"}}>

<AppText  style={{marginVertical:20,fontSize:fontSize.tinyx1}}>Choose the price for this content</AppText>
<EuroInput/>
</View>
            </View>
          </View>
          <View style={{position:"absolute",width:"100%",bottom:15,paddingHorizontal:wp(4.7)}}> 
              <SubmitButton title={"Send"}/>
              </View>


        </AppForm>
        </View>
    );
};
const PhotoForm = () => {
    return (
        <View style={{flex:1,position:"relative"}}>
        <AppForm
    initialValues={{ email: "", password: "" }}
    // validationSchema={validationSchema}
    onSubmit={async values => {
      console.log(values)
    }}>
            <View style={{paddingHorizontal:wp(4.6),marginTop: 15 }}>
      <AppText style={{marginLeft:10}}>Photo</AppText>
      <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(67, 67, 67, 0.70)",
              borderRadius: 20,
              height:hp(25)
            }}>
            <View style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 50 }}>
              <CamraThread style={{ padding: 10 }} />
            </View>
          </View>

    </View>
    <View style={{paddingHorizontal:wp(4.6),marginTop: 15 }}>
   
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

      <View style={{marginTop:hp(3)}}>
      <View style={{alignItems:"center"}}>

<AppText  style={{marginVertical:20,fontSize:fontSize.tinyx1}}>Choose the price for this content</AppText>
<EuroInput/>
</View>
      </View>
    </View>
    <View style={{position:"absolute",bottom:15,width:"100%",paddingHorizontal:wp(4.7)}}> 
        <SubmitButton title={"Send"}/>
        </View>


  </AppForm>
  </View>
    );
};
const VideoForm = () => {
    return (
        <View style={{flex:1,position:"relative"}}>
        <AppForm
    initialValues={{ email: "", password: "" }}
    // validationSchema={validationSchema}
    onSubmit={async values => {
      console.log(values)
    }}>
      <View style={{paddingHorizontal:wp(4.6),marginTop: 15 }}>
      <AppText style={{marginLeft:10}}>Video</AppText>
      <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(67, 67, 67, 0.70)",
              borderRadius: 20,
              height:hp(25)
            }}>
            <View style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 50 }}>
              <VideoPlay style={{ padding: 10 }} />
            </View>
          </View>

    </View>
    <View style={{ addingHorizontal:wp(4.6),marginTop: 15 }}>
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

      <View style={{marginTop:hp(3)}}>
      <View style={{alignItems:"center"}}>

<AppText  style={{marginVertical:20,fontSize:fontSize.tinyx1}}>Choose the price for this content</AppText>
<EuroInput/>
</View>
      </View>
    </View>
    <View style={{position:"absolute",bottom:15,width:"100%",paddingHorizontal:wp(4.7)}}> 
        <SubmitButton title={"Send"}/>
        </View>


  </AppForm>
  </View>
    );
};

export default PaidContentModal

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
      height: '90%',
    },
  });