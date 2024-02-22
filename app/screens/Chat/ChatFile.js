import { FlatList,Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../config/colors';
import { useNavigation, useRoute } from "@react-navigation/native"
import { hp, wp } from '../../config/dimensions';
import Button from '../../component/core/TabButton';
import defaultStyles from '../../config/defaultStyles';
import img1 from "../../../assets/icons/iconss/11.png"
import img2 from "../../../assets/icons/iconss/22.png"
import img3 from "../../../assets/icons/iconss/1.png"
import img4 from "../../../assets/icons/iconss/2.png"
import img5 from "../../../assets/icons/iconss/11.png"
import img6 from "../../../assets/icons/iconss/22.png"
import img7 from "../../../assets/icons/iconss/11.png"
import File from "../../../assets/icons/iconss/File.svg"
import fonts from '../../../assets/fonts';
import { fontSize } from '../../config/fontSize';
import ListItemSeparator from '../../component/core/ListItemSeparator';
import { getFileNameFromURL } from '../../component/core/raw';
import FullScreenModal from './FullScreenModal';
import { checkType } from '../../modules/helpers';
import AppWrapper from '../../component/AppWrapper/Wrapper';
import TabsView from '../../component/TabsView';

const ChatFile = () => {
  const navigation = useNavigation()
  const handleGoBack = () => {
    console.log("kkkkkk")
    navigation.goBack() // Go back to the previous screen
  }
console.log("re render");
const tabs = [
  { key: "Files", title: "Files", component: Filess },
  { key: "Link", title: "Link", component: DOCS },
  { key: "Docs", title: "Docs", component: Links },
 
]

  return (
    <AppWrapper>
   
   <LinearGradient
      colors={["#121111", "#131A1D", "#131A1D"]}
      style={[styles.container,{marginTop:hp(1),position:"relative"}]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      useAngle={true}
      
    >
    
    <View  >
      <View>
              <Pressable onPress={handleGoBack}>
                <MaterialIcons style={{position:"absolute",left:10}} 
                  name="keyboard-arrow-left"
                  size={24}
                  color="white"
                  
                />
                {/* <Text>dcdcfdfcdfc</Text> */}
              </Pressable>
              </View>
            </View>
<TabsView width={40} tabs={tabs} />

            {/* <Button buttons={["Files", "Link","Docs"]} onClick={setActive} /> */}
            <View/>

    

{/* {active==1 &&
    <View style={[{marginTop:hp(1),justifyContent:"center"}]}>
    <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={Images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{justifyContent:"center"}}
          />
    </View>}
{active==3 &&
    <View style={[{marginTop:hp(1),justifyContent:"center"}]}>
    <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={Docs}
            renderItem={renderDocs}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{justifyContent:"center"}}
          />
    </View>} */}
      </LinearGradient>
    
    </AppWrapper>
  )
}

export default ChatFile


const Filess=()=>{
  const route=useRoute()
  const{files,name}=route.params

  const [Images]=useState(   files.filter(item => ["image", "video"].some(x => checkType(item.file) === x)))
  const [Docs]=useState(   files.filter(item => checkType(item.file) === "file"))
  
  const [active, setActive] = useState(1)
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = items => {
    const { item } = items
    const { file } = item
    
    return (
      <TouchableOpacity onPress={()=>{
        setSelectedItem(file)
        setModalVisible(true)
      }}>
      <View style={[item.type === "send" ? styles.send : styles.receive,{margin:1}]}>
        {(checkType(file)=="video")?
         <View style={[{position:"relative"}]}>
                <Video
                // controls={true}
                style={{height:90,width:wp(25)}}

                source={{
                    uri:file,
                }}
                useNativeControls
                paused={false}   
                isLooping
                isMuted={false}
            />
        </View>:
            <View style={{position:"relative"}}>
        <Image source={{uri:file}} style={{height:90,width:wp(25)}}/>
       
        </View>
    }
   </View>
   </TouchableOpacity>
     
    )}
  
  return(
    <View style={[{marginTop:hp(1),justifyContent:"center"}]}>
    <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={Images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{justifyContent:"center"}}
          />
           { modalVisible&& <FullScreenModal   imageUrl={selectedItem} show={modalVisible} onClose={()=>setModalVisible(false)} />}

    </View>
  )
}
const DOCS=()=>{
  const route=useRoute()
  const{files,name}=route.params

  const [Images]=useState(   files.filter(item => ["image", "video"].some(x => checkType(item.file) === x)))
  const [Docs]=useState(   files.filter(item => checkType(item.file) === "file"))
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  const [active, setActive] = useState(1)
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  
  const renderDocs = items => {
    const { item } = items
    const { file } = item
    
    return (
      <View>
      <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:wp(3)}}>
     <File style={{marginRight:wp(3)}}/>
     <View>
     <View style={[item.type === "send" ? styles.send : styles.receive,{marginTop:10}]}>
    <View style={[{flexDirection:"row",alignItems: 'center'}]}>
    {/* <MaterialCommunityIcons name='download' color={colors.gray_700} size={35} onPress={()=>saveToDevice(file)} /> */}
<Text style={{color:colors.white,  flexWrap: 'wrap', marginLeft: 5, maxWidth: '80%'}}>{getFileNameFromURL(file)}</Text>
</View>
</View>
      {/* <Text style={[styles.docs,{fontWeight:600}]}>hodlscreens.pdf</Text>
      <Text style={styles.docsType}>290KB - xlsx</Text> */}
     </View>
      </View>
      <View style={{
        marginVertical:hp(1),
        height: 0.5,
        width: "100%",
        backgroundColor: colors.primary,}}/>
      </View>
    )}
return(
  <View style={[{marginTop:hp(1),justifyContent:"center"}]}>
  <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={Docs}
          renderItem={renderDocs}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{justifyContent:"center"}}
        />
         { modalVisible&& <FullScreenModal   imageUrl={selectedItem} show={modalVisible} onClose={()=>setModalVisible(false)} />}

  </View>
)
}
const Links=()=>{
  
}







const styles = StyleSheet.create({
    container:{
        flex:1
    },
    docs:{
      fontFamily:fonts.medium,
      color:colors.white,
      fontSize:fontSize.tinyx1
    },
    docsType:{
      fontFamily:fonts.medium,
      color:colors.primary,
      fontSize:fontSize.tinyx1
    }
})