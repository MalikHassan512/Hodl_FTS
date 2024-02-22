import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import Sound from 'react-native-sound';
import colors from '../../config/colors';
import defaultStyles from '../../config/defaultStyles';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
const AudioPlayComponent = ({ item, file }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
console.log(duration,currentTime,"aaaa")
  const handlePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play((success) => {
          if (success) {
            console.log('Audio played successfully');
          } else {
            console.error('Failed to play audio');
          }
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
   
    // Cleanup function when component unmounts
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  useEffect(() => {
    
    // Load audio from URL only on mount
    if (file) {
      const soundUrl = file;
      const soundObject = new Sound(soundUrl, null, (error) => {
        if (error) {
          console.error('Failed to load the sound', error);
        } else {
          setSound(soundObject);
          setDuration((soundObject.getDuration()));
        }
      });

      return () => {
        // Cleanup function when component unmounts
        if (soundObject) {
          soundObject.release();
        }
      };
    }
  }, []); // Emp

  useEffect(() => {
    // Update current time while playing
    const intervalId = setInterval(() => {
      if (isPlaying && sound) {
        sound.getCurrentTime((seconds) => {
          let remaining = duration - seconds;
          console.log(remaining, seconds, "sec");
          setCurrentTime(seconds);
          if (remaining < 1) {
            setTimeout(() => {
              sound.getCurrentTime((seconds) => {
                setCurrentTime(seconds);
              });
            }, remaining * 1000);
          }
        });
      }
    }, 1000);
  
    // Cleanup interval when component unmounts or audio stops playing
    return () => clearInterval(intervalId);
  }, [isPlaying, sound, duration]);
  
  const handleSliderChange = (value) => {
    if (sound) {
      sound.setCurrentTime(value);
      setCurrentTime(value);
    }
  };
  return (
   
    <View style={[item.type === 'send' ? styles.send : styles.receive, { marginTop: 10 }]}>
      <LinearGradient
        colors={ item.type === "send" ?["#2C4957", "#16252C"]:["#454545", "#222222",]}
        style={[
          { position: "relative", },
          styles.chatItemCommon,
          item.type === "send" ? styles.send1 : styles.receive1
        ]}
      > 
      <View style={{ flexDirection: 'row',width:"100%" }}>
   
        <TouchableOpacity onPress={handlePlayPause} disabled={!sound}>
      {!sound?<ActivityIndicator size={"large"}/>:!isPlaying?  <Entypo name="controller-play" size={40} color="black" />:
      <Feather name="pause-circle" size={40} color="black" />}
        </TouchableOpacity>
        <Slider
          style={{ flex: 1, marginLeft: 10 }}
          step={0.001}
          // minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={handleSliderChange}
          disabled={!sound}
          thumbStyle={{ height: 20, width: 20,backgroundColor:colors.gray_1000}}

          // thumbImage={require('../../../assets/3.png')}
        />
      </View>
     {isPlaying? <Text >{formatDuration(Math.ceil(currentTime))}</Text>: <Text>{formatDuration(duration)}</Text>}
     </LinearGradient>
    </View>
  );
};

export default AudioPlayComponent;

// Utility function to format duration in seconds to HH:mm:ss format
export const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const formattedHours = hours > 0 ? `${hours}:` : '';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };
  
const styles = StyleSheet.create({
    // photoVideoContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    receive: {
        alignSelf: "flex-start",
        // backgroundColor: colors.primary,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        // borderRadius: 10,
        width: "75%"
      },
      send: {
       
        alignSelf: "flex-end",
        // backgroundColor: "#2c4957",
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        // borderRadius: 10,
        width: "75%"
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
    downloadButton:{
        position:"absolute",
        top:7,
        right:5
    },
    overlayText: {
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
        position: 'absolute', 
        bottom: 45, 
        left: 27, 
      },
});
