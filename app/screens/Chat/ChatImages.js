import { FlatList,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'
import COLOR from '../../config/colors';
import Video from 'react-native-video';
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from '@react-navigation/native'
import { hp } from '../../config/dimensions';
import colors from '../../config/colors';
import image3 from "../../../assets/3.png"
import FullScreenModal from './FullScreenModal';
import { checkType } from '../../modules/helpers';

const ChatImages = () => {
    const routes =useRoute()
    const navigation=useNavigation()
    const {img,item}=routes.params
    const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
    const handleGoBack = () => {
        navigation.goBack()
      }
    const ImageOrVideo=({item,file,type})=>{
        return (
            <>
      <TouchableOpacity onPress={()=>{
        setSelectedItem(file)
        setModalVisible(true)
      }}>
            {(type=="video")?
             <View style={[{position:"relative",marginVertical:hp(0.8)}]}>
                    <Video
                    // controls={true}
                    style={{
                        // marginTop: 10,
                        width: "100%",height:hp(50)
                    }}
    
                    source={{
                        uri:file,
                    }}
                    useNativeControls
                    paused={false}   
                    // resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    isMuted={false}
    
                    // onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                />
                <MaterialCommunityIcons  name='download' color={COLOR.gray_700} size={40} onPress={()=>saveToDevice(file)}
             style={[{position:"absolute",top:"80%",height:40}]}/>
    
            </View>:
                <View style={{position:"relative",marginVertical:hp(0.8),borderRadius:20}}>
            <Image source={{uri:file}} style={{width: "100%",height:hp(50),}}/>
           
           <MaterialCommunityIcons  name='download' color={COLOR.gray_700} size={40} onPress={()=>saveToDevice(file)}
             style={[{position:"absolute",top:"80%",height:40}]}/>
    
            </View>
        }
       </TouchableOpacity>
    </>
        )
    }
  return (
    <View>
        <View>
       
              <View
                style={{
                  paddingHorizontal: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: colors.header
                }}>
                <View style={styles.item}>
                  <TouchableOpacity onPress={handleGoBack}>
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      size={24}
                      color="white"
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <Image
                    style={styles.image1}
                    source={image3}
                    resizeMode="contain" // Set resizeMode to contain
                  />
                  <View style={[styles.detail, { marginLeft: 10 }]}>
                    <Text style={[styles.name, { color: colors.white }]}>{item.name}</Text>
                    {/* <Text style={[{ fontSize: 11, color: colors.white }]}>{img.length}</Text> */}
                  </View>
                </View>
                </View>
            
        </View>
      <FlatList
      data={img}
      keyExtractor={(item, index) => `${item}_${index}`}
      renderItem={({ item }) => (
        <ImageOrVideo  file={item} type={checkType(item)}/>
              
      )}
    />
   { modalVisible&& <FullScreenModal name={item.name} imageUrl={selectedItem} show={modalVisible} onClose={()=>setModalVisible(false)} />}
    </View>
  )
}

export default ChatImages

const styles = StyleSheet.create({
    item: {
        // paddingHorizontal: 5,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center"
      },
      image1: {
        width: 30,
        height: 30
      },
})