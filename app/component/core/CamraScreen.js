import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const askPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      // 'photo' contains the captured image data, you can use/store it as needed
      console.log(photo);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      let video = await cameraRef.current.recordAsync();
      // 'video' contains the recorded video data, you can use/store it as needed
      console.log(video);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPressIn={startRecording} onPressOut={stopRecording}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Record </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
