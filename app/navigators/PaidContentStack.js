import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChannelContent from '../screens/PaidContent/ChannelContent';
const PaidContentStack = ({navigation,route}) => {
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator>
    <Stack.Screen name="PaidHome" component={ChannelContent}   options={{ headerShown: false }} />
   
    </Stack.Navigator>
  )
}

export default PaidContentStack

const styles = StyleSheet.create({})