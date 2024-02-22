import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Cross from "../../../assets//icons/iconss/cross2.svg"
import { checkTypeAll } from '../../modules/helpers';
const ReplyView = ({reply}) => {
    const renderMediaView = () => {
        const fileType = checkTypeAll(reply); // Assuming reply.media contains the file name
        if (fileType === "image") {
          return (
            <View style={styles.replymedia}>
              <Image source={{ uri: reply }} style={{ width: 30, height: 30 }} />
            </View>
          );
        } else if (fileType === "audio") {
          return (
            <TouchableOpacity >
              <Text style={styles.replymsg}>Audio</Text>
            </TouchableOpacity>
          );
        } else if (fileType === "video") {
          return (
            <TouchableOpacity >
              <Text style={styles.replymsg}>Video</Text>
            </TouchableOpacity>
          );
        } else if (fileType === "file") {
          return (
            <TouchableOpacity>
              <Text style={styles.replymsg}>File</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <Text style={styles.replymsg}>{reply.text}</Text>
          );
        }
      };
    
  return (
   <View style={{}}>
            {renderMediaView()}
            {/* <Text>ghghg</Text> */}
          </View>
  )
}

export default ReplyView

const styles = StyleSheet.create({
    replymedia: {
        // alignSelf: "flex-start",
        backgroundColor: "#111D22",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderLeftWidth:2,
        borderLeftColor:"#2C5750",
        borderRadius: 4,
        minWidth: "75%"
      },
      replymsg: {
        // alignSelf: "flex-start",
        backgroundColor: "#111D22",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderLeftWidth:2,
        borderLeftColor:"#2C5750",
        borderRadius: 4,
        // maxWidth: "75%"
      },
})