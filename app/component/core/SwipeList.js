import React, { useEffect, useRef, useState } from 'react';
import { Animated,Dimensions, Image, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import profile from "../../../assets/profile.png"
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
const leftButtons = ['btn1', ];
const rightButtons = ['btn1', ];
const btnWidth = 80;
const offset = [-btnWidth * rightButtons.length, btnWidth * leftButtons.length];


console.log(offset);
export default function SwipableItem({handleDelete,onPress,list,setList,data,index,open}) {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [pinlist, setPinList] = useState();
  let isOpenState = useRef(false).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const screenPercentage = 1.0; // 100% of the screen width

  const itemTranslate = pan.x.interpolate({
    inputRange: [-screenWidth * screenPercentage, 0, screenWidth * screenPercentage],
    outputRange: [-screenWidth * screenPercentage, 0, screenWidth * screenPercentage],
    extrapolate: 'clamp',
  });
  const translateLeftBtns = pan.x.interpolate({
    inputRange: [-screenWidth * screenPercentage, 0],
    outputRange: [-leftButtons.length * screenWidth * screenPercentage, 0],
    extrapolate: 'clamp',
  });
  const translateRightBtns = pan.x.interpolate({
    inputRange: [0, screenWidth * screenPercentage],
    outputRange: [0, rightButtons.length * screenWidth * screenPercentage],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        const swipeThreshold = screenWidth * 0.6;

        if (gestureState.dx < -swipeThreshold) {
          handleDelete(index);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
 
    return (
        <View key={index} >
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateLeftBtns }],  }]}>
                {leftButtons.map(btn => (
                    <View key={btn} style={[styles.btn, { backgroundColor: '#2b8fbe' }]}>
                        <MaterialCommunityIcons name="pin-outline" size={24} color="white" />
                    </View>
                ))}
            </Animated.View>
            <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateRightBtns }] , alignSelf: 'flex-end' }]}>
                {rightButtons.map(btn => (
                  
                    <View key={btn} style={[styles.btn2, { backgroundColor: 'red' }]}>
                        <AntDesign name="delete" size={24} color="white" />
                    </View>
                ))}
            </Animated.View>
            <Animated.View  style={[styles.item, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
               <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Image source={profile} style={{width:30,height:30,marginRight:10}}/>
                <AppText bold style={{color:colors.white}}>{data.name}</AppText>
               </View>
               <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} >
                
                <AppText style={{marginRight:10}}>4 min</AppText>
                {(pinlist==index)&&<SimpleLineIcons name="pin" size={15} color="#2b8fbe" />}
               </View>
               </View>
               <TouchableOpacity onPress={()=>onPress()}>
               <View style={{paddingVertical:5}}>
                <AppText style={{color:colors.white}}>{data.message}</AppText>
               </View>
               </TouchableOpacity>
               {open&&
                [1, 2, 3, 4, 5].map(x => (
                    <Text key={x} style={styles.subItem}>
                        - SOME DATA
                    </Text>
                ))}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        marginBottom: 10,
    },
    item: {
        // height: '100%',
        width: '100%',
        padding:15,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.header,
        borderRadius:10,
        marginVertical:5
    },
    btnContainer: {
       
        marginVertical:5,
        position: 'absolute',
        flexDirection: 'row'
    },
    txt: {
        color: '#fff',
        letterSpacing: 1
    },
    btn: {
        borderRadius:10,
        height: '100%',
        width:"100%",
        // width: btnWidth,
        backgroundColor: 'red',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: 'flex-start',
        marginVertical:5,
        padding:20,
        justifyContent: 'center'
    },
    btn2: {
        borderRadius:10,
        height: '100%',
        width:"100%",
        padding:20,
        // width: btnWidth,
        backgroundColor: 'red',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: 'flex-end',
        marginVertical:5,
        justifyContent: 'center'
    }
})