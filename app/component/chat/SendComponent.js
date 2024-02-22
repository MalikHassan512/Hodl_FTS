import AppCameraformik from "../forms/AppCameraformik"
import colors from "../../config/colors"
import ChatMic from "../../../assets/icons/iconss/ChatMic.svg"
import Dollar from "../../../assets/icons/iconss/Dollar.svg"
import TopArrow from "../../../assets/icons/iconss/TopArrow.svg"
import React, { useEffect, useState } from "react"
import { StyleSheet, TextInput, View, Text, TouchableOpacity, PermissionsAndroid } from "react-native"
import RNFetchBlob from "rn-fetch-blob"
import apiClient from "../../api/client"
import { wp } from "../../config/dimensions"
import PaidContentModal from "../../screens/PaidContent/PaidContentModal"
import useAudioRecorder from "../../redux/useAudioRecorder"
import uuid from "react-native-uuid"
import ChatFileModal from "../ChatFileModal"
const SendComponent = ({ values }) => {
  const { id, sendMsg, notification, message, setMessage, group, appendMessage } = values
  const [file, setFile] = useState(true)
  const [fileShare, setFileShare] = useState(false)

  const [paidModal, setPaidModal] = useState(false)
  const { isRecording, recordTime, audioPath, startRecording, stopRecording } = useAudioRecorder()

  const handleLongPress = () => {
    if (!isRecording) {
      startRecording()
    }
  }

  const handlePressOut = async () => {
    if (isRecording) {
      try {
        await stopRecording()
        // The recording has stopped, now you can safely submit the voice
        handleVoiceSubmit(audioPath)
      } catch (error) {
        console.error("Error during recording:", error)
      }
    }
  }

  const formatTimeStamp = time => {
    return time.charAt(0) === "0" ? time.slice(1, 5) : time.slice(0, 5)
  }

  const handleVoiceSubmit = async path => {
    console.log(path, "pp")
    let filename = path.replace("file:////", "file:///")
    const fileExists = await RNFetchBlob.fs.exists(filename)

    if (fileExists) {
      // File exists, handle it (e.g., delete or choose a different name)
      // For example:
      console.log(fileExists, "kkkk")
    }
    let identifier = uuid.v4()
    console.log(filename, "pp")
    let formData = new FormData()
    appendMessage({ file: [filename], identifier })
    if (group) {
      formData.append("file", {
        uri: filename,
        name: "recording-" + Date.now() + ".wav",
        // name: generateFileName,
        type: "application/octet-stream"
      })
      formData.append("msg", "")
      formData.append("group_id", id)
      formData.append("identifier", identifier)
      console.log("called")
      const response = await apiClient.post("group_media/", formData)
      console.log(response)
    } else {
      formData.append("file", {
        uri: filename,
        name: "recording-" + Date.now() + ".wav",
        type: "application/octet-stream"
      })
      formData.append("msg", "")
      formData.append("chat_id", id)
      formData.append("identifier", identifier)
      console.log("called")
      const response = await apiClient.post("chat_media/", formData)
      console.log(response)
    }
  }

  useEffect(() => {
    requestRecordingPermission()
  }, [])

  const requestRecordingPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Audio Recording Permission",
            message: "App needs access to your microphone for audio recording.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Recording permission granted")
        } else {
          console.log("Recording permission denied")
        }
      } catch (error) {
        console.error("Error requesting recording permission:", error.message)
      }
    }
  }

  return (
    <>
      <View style={[styles.bottom]}>
        <PaidContentModal isDrawerVisible={paidModal} onHide={() => setPaidModal(false)} />
        {isRecording ? (
          <View style={styles.container1}>
            <Text>{formatTimeStamp(recordTime)}</Text>
          </View>
        ) : (
          <>
            {!notification && (
              <AppCameraformik
                doc="a"
                chat_id={id}
                group={group && "group"}
                appendMessage={appendMessage}
              />
            )}

            <View
              style={[styles.container1, { width: notification ? "100%" : "75%", marginLeft: 3 }]}>
              <TextInput
              autoCapitalize="sentences"
                placeholder="Write something "
                style={[{ paddingHorizontal: 10, color: colors.white, width: "85%" }]}
                value={message}
                placeholderTextColor="#666666"
                onChangeText={setMessage}
              />
              <View
                style={[
                  {
                    paddingHorizontal: wp(2)
                  }
                ]}>
                {message.length > 0 ? (
                  <TopArrow onPress={sendMsg} />
                ) : (
                  <Dollar onPress={() => setPaidModal(true)} />
                )}
              </View>
            </View>
          </>
        )}

        {!notification && (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10
              }
            ]}>
            <TouchableOpacity
              style={{
                transform: [{ scale: isRecording ? 2 : 1 }],
                marginRight: isRecording ? 10 : 0
              }}
              onLongPress={handleLongPress}
              onPressOut={handlePressOut}>
              <ChatMic style={{ marginRight: 10 }} />
            </TouchableOpacity>
            {/* <FontAwesome5 name="camera" onPress={()=>setOpenCamera(true)}   size={24} color="white" /> */}
            {!isRecording && (
              <AppCameraformik
                chat_id={id}
                file={file}
                setFile={setFile}
                group={group && "group"}
                appendMessage={appendMessage}
              />
            )}
          </View>
        )}
      </View>
     
    </>
  )
}

export default SendComponent

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#2A2A2A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 50
  },

  container1: {
    flexDirection: "row",
    width: "75%",
    borderWidth: 1,
    padding: 5,
    borderColor: "rgba(116, 116, 128, 0.50)",
    backgroundColor: "#383838",
    borderRadius: 30
    // padding: 5
  }
})
