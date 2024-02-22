import React from "react"
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions,
  SafeAreaView
} from "react-native"
import { hp } from "../../config/dimensions"
import image3 from "../../../assets/3.png"
import Video from "react-native-video"
import { MaterialIcons } from "@expo/vector-icons"
import colors from "../../config/colors"
import ImageZoom from "react-native-image-pan-zoom"
import defaultStyles from "../../config/defaultStyles"
import { checkType } from "../../modules/helpers"
import Screen from "../../component/core/Screen"
import ImageViewer from 'react-native-image-zoom-viewer';

const FullScreenModal = ({ name, imageUrl, show, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={show} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colors.dark }}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.header
            }}>
            <View style={styles.item}>
              <TouchableOpacity onPress={onClose}>
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
                <Text style={[styles.name, { color: colors.white }]}>{name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.mediaContainer}>
            {checkType(imageUrl) === "image" ? (
         // <ImageZoom
            //   cropWidth={"100%"}
            //   cropHeight={"100%"}
            //   imageWidth={Dimensions.get("window").width}
            //   imageHeight={"100%"}
            //   pinchToZoom={true}
            //   panToMove={true}
            //   enableDoubleClickZoom={true}
            //   onDoubleClick={()=>{}}
            //   >
            //   <Image
            //     source={{ uri: imageUrl }}
            //     style={{ width: "100%", height: "100%" }}
            //     resizeMode="contain"
            //   />
            // </ImageZoom>
            <View style={[{flex:1}]}>
              
              
              
              <ImageViewer
              renderIndicator={() => {}}
              imageUrls={[{ url: imageUrl }]}
            />
              </View>
            ) : (
              <Video
                controls={true}
                style={{
                  // marginTop: 10,
                  width: "100%",
                  height: hp(50)
                }}
                source={{
                  uri: imageUrl
                }}
                useNativeControls
                paused={false}
                // resizeMode={ResizeMode.CONTAIN}
                isLooping
                isMuted={false}

                // onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1
    // You can add a close button icon or text here
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100px",
    height: "100px"
  },
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
  mediaContainer: { flex: 1, justifyContent: "center", backgroundColor: colors.black }
})

export default FullScreenModal
