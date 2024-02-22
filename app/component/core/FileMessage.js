import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useMemo, useState } from "react"
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native"
import { View, StyleSheet } from "react-native"
import { getFileNameFromURL, saveToDevice } from "./raw"
import { FLEX_STYLE, HEADINGS } from "../../config/Styles"
import COLOR from "../../config/colors"
import Video from "react-native-video"
import defaultStyles from "../../config/defaultStyles"
import { hp, wp } from "../../config/dimensions"
import colors from "../../config/colors"
import { useNavigation } from "@react-navigation/native"
import FullScreenModal from "../../screens/Chat/FullScreenModal"
import AudioPlayCompoent from "../chat/AudioPlay"
import { checkTypeAll } from "../../modules/helpers"
import LinearGradient from "react-native-linear-gradient"

const FileMessage = React.memo(({ item, files }) => {
  const navigation = useNavigation()

  if (files.length === 1 && checkTypeAll(files[0]) === "audio") {
    return (
      <>
        <AudioPlayCompoent item={item} file={files[0]} type={checkTypeAll(files[0])} />
        {item.status === "sending" && <Loading />}
      </>
    )
  }
  const images = []
  const otherFiles = []
  files.forEach(file => {
    if (checkTypeAll(file) === "file") {
      otherFiles.push(file)
    } else {
      images.push(file)
    }
  })
  return (
    <View style={[{ alignSelf: item.type === "send" ? "flex-end" : "flex-start" }]}>
      <View
        style={{
          borderWidth: files?.length > 1 ? 1 : 0,
          borderColor: item.type === "send" ? "#2c4957" : colors.primary,
          width: "85%",
          borderRadius: 10
        }}>
        <View style={[{ width: 220, flexWrap: "wrap", flexDirection: "row" }]}>
          {images.slice(0, 3).map((file, index) =>
            images.length > 3 ? (
              <>
                <ImageOrVideo
                  key={index}
                  item={item}
                  width={88}
                  height={90}
                  file={file}
                  type={checkTypeAll(file)}
                />
                {index == 2 && (
                  <View
                    style={[item.type === "send" ? styles.send : styles.receive, { margin: 1 }]}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ChatImages", { img: images, item: item })
                      }>
                      <Image
                        blurRadius={15}
                        source={{ uri: file }}
                        style={{ width: 88, height: 90 }}
                      />
                      <Text style={styles.overlayText}>{images.length - 3} More</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <ImageOrVideo key={index} item={item} file={file} type={checkTypeAll(file)} />
            )
          )}
        </View>
        { otherFiles.map((file,index)=>
    <FileDownload key={index} item={item} file={file}/>)
    }
    {item.status==="sending"&&<Loading/>}
        </View>
        </View>
       
    );
})


const ImageOrVideo=({item,width,height,file,type})=>{
    const [selectedItem, setSelectedItem] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
        <TouchableOpacity onPress={()=>{
        setSelectedItem(file)
        setModalVisible(true)
      }}>
    <View style={[item.type === "send" ? styles.send : styles.receive,{margin:1}]}>
    <LinearGradient
        colors={ item.type === "send" ?["#2C4957", "#16252C"]:["#454545", "#222222",]}
        style={[
          { position: "relative", },
          styles.chatItemCommon,
          item.type === "send" ? styles.send1 : styles.receive1
        ]}
      > 
        {(type=="video")?
         <View style={[{position:"relative"}]}>
                <Video
                // controls={true}
                style={{
                  width: width || 200,
                  height: height || 200
                }}
                source={{
                  uri: file
                }}
                useNativeControls
                paused={false}
                isLooping
                isMuted={false}
              />
              <View style={styles.playIconContainer}>
                <MaterialCommunityIcons
                  name="play"
                  color={COLOR.white}
                  size={40}
                  onPress={() => {
                    setSelectedItem(file)
                    setModalVisible(true)
                  }}
                />
              </View>
              {!width && item.type !== "send" && (
                <MaterialCommunityIcons
                  name="download"
                  color={COLOR.gray_700}
                  size={40}
                  onPress={() => saveToDevice(file)}
                  style={[{ position: "absolute", top: "80%", height: 40 }]}
                />
              )}
            </View>
          : 
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: file }}
                style={{ width: width || 200, height: height || 200,borderRadius:10 }}
              />

              {!width && item.type !== "send" && (
                <MaterialCommunityIcons
                  name="download"
                  color={COLOR.gray_700}
                  size={40}
                  onPress={() => saveToDevice(file)}
                  style={[{ position: "absolute", top: "80%", height: 40 }]}
                />
              )}
            </View>
          }
          </LinearGradient>
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <FullScreenModal
          name={item.name}
          imageUrl={selectedItem}
          show={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  )
}

const FileDownload=({item,file})=>{
    return (
<View style={[item.type === "send" ? styles.send : styles.receive,{marginTop:10}]}>
<LinearGradient
        colors={ item.type === "send" ?["#2C4957", "#16252C"]:["#454545", "#222222",]}
        style={[
          { position: "relative", },
          styles.chatItemCommon,
          item.type === "send" ? styles.send1 : styles.receive1
        ]}
      > 
    <View style={[{flexDirection:"row",alignItems: 'center'}]}>
    {item.type !== "send" &&<MaterialCommunityIcons name='download' color={COLOR.gray_700} size={35} onPress={()=>saveToDevice(file)} />}
<Text style={{color:colors.white,  flexWrap: 'wrap', marginLeft: 5, maxWidth: '80%'}}>{getFileNameFromURL(file)}</Text>
</View>
</LinearGradient>
</View>
    )
}
const Loading = ({}) => {
  return (
    <View
      style={[styles.send, { marginTop: -50, margingRight: 40, backgroundColor: "transparent" }]}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  // photoVideoContainer: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
  receive: {
    alignSelf: "flex-start",
    // backgroundColor: colors.primary,
    // paddingHorizontal: 4,
    // paddingVertical: 4,
    // borderRadius: 10
    // maxWidth: "75%"
  },
  send: {
    alignSelf: "flex-end",
    // backgroundColor: "#2c4957",
    // paddingHorizontal: 4,
    // paddingVertical: 4,
    // borderRadius: 10
    // maxWidth: "75%"
  },
  send1: {
    alignSelf: "flex-end",
    width: "100%",
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  receive1: {
    alignSelf: "flex-start",
    width: "100%",
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  downloadButton: {
    position: "absolute",
    top: 7,
    right: 5
  },
  overlayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    bottom: 45,
    left: 27
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default FileMessage
