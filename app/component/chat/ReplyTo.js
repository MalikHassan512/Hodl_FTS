import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Cross from "../../../assets//icons/iconss/cross2.svg"
import { checkTypeAll } from '../../modules/helpers';
const ReplyTo = ({reply,handleCloseReaction}) => {
   
    const renderMediaView = () => {
        const fileType = checkTypeAll(reply.media); // Assuming reply.media contains the file name
    console.log(fileType,"__________________________________________________________________")
        if (fileType === "image") {
          return (
            <View style={styles.replymedia}>
              <Image source={{ uri: reply.media }} style={{ width: 30, height: 30 }} />
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
   <View style={{paddingHorizontal:20,paddingVertical:10,backgroundColor:"#2A2A2A"}}>
             {reply.media?
          <View >
          {/* <View style={styles.replymedia}> */}
            {renderMediaView()}
          {/* <Image source={{ uri: reply.media }} style={[,{width:30,height:30}]}/> */}
          </View>:
          <Text style={styles.replymsg}>{reply.text}</Text>}
          <TouchableOpacity style={{position:"absolute",top:-5,right:0}} onPress={()=>handleCloseReaction()}>
          <Cross />
          </TouchableOpacity>
          </View>
  )
}

export default ReplyTo

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