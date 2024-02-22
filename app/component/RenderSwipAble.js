import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './core/AppText';

const RenderSwipAble = ({ item,screenWidth, handleDelete, onPress }) => {
    console.log(item,"first")
    // const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const rightActions = (progress, dragX) => {
        const swipeThreshold = -screenWidth*0.4; // Adjust this value as needed for your 50% screen swipe
    
        let initialTrans = dragX.interpolate({
          inputRange: [-screenWidth * 1, 0],
          outputRange: [-screenWidth * 1, 0],
          extrapolate: 'clamp',
      });
      
      let trans = initialTrans;
        const comparisonResult = trans.__getValue() < swipeThreshold;
        let deleteHandled = false;
        if (comparisonResult && !deleteHandled) {
          handleDelete(item.id);
          // trans = initialTrans
      } 
    
            return (
            
                <LinearGradient
              colors={['#222222','#E51F26']}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
                <Text style={{ color: 'white', paddingHorizontal: 20 }}>Delete</Text>
                </LinearGradient>
              
            );
          };
          const leftActions = (progress, dragX) => {
            const swipeThreshold = screenWidth * 0.4; // Adjust this value as needed for your 50% screen swipe
        
            let initialTrans = dragX.interpolate({
              inputRange: [0, screenWidth * 1],
              outputRange: [0, screenWidth * 1],
              extrapolate: 'clamp',
            });
        
            let trans = initialTrans;
            const comparisonResult = trans.__getValue() > swipeThreshold;
            // Define your left swipe action handling here
            let someLeftHandled = false;
            if (comparisonResult && !someLeftHandled) {
              // Handle left swipe action
            }
        
            return (
              <LinearGradient
              colors={['#2DA1D7','#222222',]}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
                <Text style={{ color: 'white', paddingHorizontal: 20 }}>Pin</Text>
              </LinearGradient>
            );
          };
    
        return (
          <Swipeable renderLeftActions={leftActions} renderRightActions={rightActions}>
           <View  style={styles.item}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                   <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Image source={profile} style={{width:30,height:30,marginRight:10}}/>
                    <AppText bold style={{color:colors.white}}>{item.name}</AppText>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}} >
                    
                    <AppText style={{marginRight:10}}>4 min</AppText>
                    {/* {(pinlist==index)&&<SimpleLineIcons name="pin" size={15} color="#2b8fbe" />} */}
                   </View>
                   </View>
                   <TouchableOpacity onPress={()=>onPress()}>
                   <View style={{paddingVertical:5}}>
                    <AppText style={{color:colors.white}}>{item.message}</AppText>
                   </View>
                   </TouchableOpacity>
                   {/* {open&&
                    [1, 2, 3, 4, 5].map(x => (
                        <Text key={x} style={styles.subItem}>
                            - SOME DATA
                        </Text>
                    ))} */}
                </View>
          </Swipeable>
        );
}

export default RenderSwipAble

const styles = StyleSheet.create({})