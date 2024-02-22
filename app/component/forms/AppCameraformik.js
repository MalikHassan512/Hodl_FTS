import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5,Octicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import ChatCamra from "../../../assets/icons/iconss/ChatCamra.svg"
import Filepicker from "../../../assets/icons/iconss/filepicker.svg"
import * as ImageManipulator from 'expo-image-manipulator';
import { create } from 'apisauce';
import defaultStyles from "../../config/defaultStyles";
import apiClient from "../../api/client";
import { pickFile, pickImage } from "../../modules/fileHelpers";
import uuid from 'react-native-uuid';
import ChatFileModal from "../ChatFileModal";
import NewGroupCallModel from "../NewGroupCallModel";

const api = create({
  baseURL: 'http://api.healthhop.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    // Add any other required headers here
  },
});
const AppCameraformik = ({doc,group,file,setFile,chat_id,...props}) => {
  const [fileData,setFileData]=useState()
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [fileShare, setFileShare] = useState(false)
  
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const handleCamera = async () => {
    const options = {
      mediaTypes:  ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    };

    const status = await ImagePicker.launchCameraAsync(options);
    console.log(status,"star");
    if (!status.canceled) {
      let identifier=uuid.v4()
      props.appendMessage({file:[status.assets[0].uri],identifier})
      setCapturedImage(status.assets[0].uri)
      console.log(status.assets[0],"______________qq____")
      if(group=="group"){
      let formdata=new FormData()
      formdata.append('file', {
        uri: status.assets[0].uri,
        name: 'file.jpeg', 
        type: 'image/jpeg', 
      })
      formdata.append("msg","")
      formdata.append("group_id",chat_id)
      formdata.append("identifier",identifier)
      const response=await apiClient.post("group_media/",formdata)
      console.log(response,"ssasasasas")
      }else{
        let formdata=new FormData()
      formdata.append('file', {
        uri: status.assets[0].uri,
        name: 'file.jpeg', 
        type: 'image/jpeg', 
      })
      formdata.append("msg","")
      formdata.append("chat_id",chat_id)
      formdata.append("identifier",identifier)
      const response=await apiClient.post("chat_media/",formdata)
      console.log(response,"ssasasasas")
      setFile(!file)
      }
    }
  };
  // const handleImageSelection = async () => {
  //   const options = {
  //     mediaTypes:  ImagePicker.MediaTypeOptions.Videos,
  //     allowsEditing: false,
  //     aspect: [4, 3],
  //     quality: 1,
  //   };

  //   const status = await ImagePicker.launchImageLibraryAsync(options);
  //   console.log(status,"star");
  //   if (!status.canceled) {
  //     setCapturedImage(status.assets[0].uri)
  //     if (response.ok) {
  //       console.log('Upload Response:', response.data);
  //       setFile(response.data.result)
  //       // Handle the response from the server as needed
  //     } else {
  //       console.error('Upload Error:', response.problem);
  //     }
  //     // const manipulatedImage = await ImageManipulator.manipulateAsync(
  //     //   status.uri,
  //     //   [{ resize: { width: 500 } }], // Set the desired width (you can adjust this)
  //     //   { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Adjust compression and format as needed
  //     // );
  //   }
  // };
  const handleImageSelection = async () => {
    const options = {
      multiple:true,
      // mediaTypes:  ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      
    };


  
    const { canceled,results } = await pickFile(options);
  console.log( canceled,results,"___________LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    if (!canceled) {
      console.log( canceled,results,"___________LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
      let identifier=uuid.v4()
      console.log(identifier)
      // setFileData(otherProps);
      if(group=="group"){
        props.appendMessage({file:results.map(x=>x.uri),identifier})
      let formdata=new FormData()
      for (const itemFile of results) {
        
        formdata.append('file', {
          ...itemFile,
          type: 'application/octet-stream', 
        })
      }
      formdata.append("msg","")
      formdata.append("group_id",chat_id)
      formdata.append("identifier",identifier)
      const response=await apiClient.post("group_media/",formdata)
      console.log(response,"QQQ_______________________ssasasasas")
      // setFile(!file)
    }else{

      props.appendMessage({file:results.map(x=>x.uri),identifier})
      let formdata=new FormData()
      for (const itemFile of results) {
        
        formdata.append('file', {
          ...itemFile,
          type: 'application/octet-stream', 
        })
      }
      formdata.append("msg","")
      formdata.append("chat_id",chat_id)
      formdata.append("identifier",identifier)
     console.log("api called");
      const response=await apiClient.post("chat_media/",formdata)
      console.log(response,"resp");
    }
  }
    
 
  };
  console.log(fileShare,"s ")   
  return (
    <View >
      {hasPermission === null ? (
        <Button title="Grant Permission" onPress={requestCameraPermission} />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
       <>
       {doc=="a"? 
       
      //  <TouchableOpacity onPress={handleImageSelection}  style={{padding:5}}>
       <TouchableOpacity onPress={()=>setFileShare(true)}  style={{padding:5}}>
  <Filepicker    />
       </TouchableOpacity>
     :
                //  <FontAwesome5 name="camera" onPress={handleCamera}  color="white" />}
                <TouchableOpacity onPress={handleCamera}  style={{padding:5}}>
                 <ChatCamra />
                 
                 </TouchableOpacity>}
                 </>        
          )}
          {fileShare &&
           <ChatFileModal
           handleCamera={handleCamera}
           handleImageSelection={handleImageSelection}
         show={fileShare}
         onhide={() =>setFileShare (false)}
       />
    //   <NewGroupCallModel
    //   title={"New Messages"}
    //   show={fileShare}
    //   onhide={() => setFileShare(false)}
    //   // data={allUser}
    // />
       }
        </View>
     
  );
};

// const CameraPreview = ({ photo,handleCamera }) => {
//   return (
//     <View
//       style={{
//         backgroundColor: "red",
//         flex: 1,
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       {photo && (
//          <TouchableOpacity onPress={handleCamera}>
//         <Image source={{ uri: photo }} style={styles.finalImage} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const CameraComponent = ({names,setFieldValue, setShowCamera, setCapturedImage }) => {
//   let camera;
//   const takePicture = async () => {
//     const photo = await camera.takePictureAsync();
//     console.log(photo);
//     setShowCamera(false);
//     setCapturedImage(photo);
//     const {uri}=photo
//     // setFieldValue(names,uri)
//   };
//   return (
//     <>
//       <Camera
//         style={styles.camera}
//         ref={(r) => {
//           camera = r;
//         }}
//         type={Camera.Constants.Type.front}
//       />
//       <Button title="Take Picture" onPress={takePicture} />
//     </>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: 300,
    height: 400,
  },
});

export default AppCameraformik;
