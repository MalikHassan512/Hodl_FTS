import React, { useState, useEffect } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType
} from "react-native-audio-recorder-player"
import RNFetchBlob from "rn-fetch-blob"
const useAudioRecorder = () => {
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer())
  const [isRecording, setIsRecording] = useState(false)
  const [recordTime, setRecordTime] = useState("00:00:00")
  const [audioPath, setAudioPath] = useState("")

  useEffect(() => {
    return () => {
      // Cleanup function when component unmounts
      audioRecorderPlayer.removeRecordBackListener()
    }
  }, [audioRecorderPlayer])

  const startRecording = async () => {
    try {
      // await requestRecordingPermission()

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
        OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS
      }

      const path = generateFilePath()

      const uri = await audioRecorderPlayer.startRecorder(path, audioSet)

      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
      })

      setAudioPath(uri)
      setIsRecording(true)
    } catch (error) {
      console.error("Error in startRecording:", error.message)
    }
  }

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    setIsRecording(false)
    setRecordTime("00:00:00")
    // You can return or handle the result as needed

    return result
  }

  const generateFilePath = () => {
    // Implement your logic to generate a unique file path
    // For example:
    const currentDate = new Date()
    const formattedDate = `${currentDate.getDate().toString().padStart(2, "0")}_${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}${currentDate.getMinutes().toString().padStart(2, "0")}${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`
    const fileName = `recording_${formattedDate}.wav`

    // Update this path based on your requirements
    const filePath = Platform.select({
      ios: undefined,
      //   android: `file://${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      android: RNFetchBlob.fs.dirs.DownloadDir + "/my.wav"
    })
    return filePath
  }

  return {
    isRecording,
    recordTime,
    audioPath,
    startRecording,
    stopRecording
  }
}

export default useAudioRecorder
