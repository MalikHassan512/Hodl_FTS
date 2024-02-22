import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchHome from '../screens/Search/SearchHome';
const Stack = createNativeStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchHome}   options={{ headerShown: false }} />
  </Stack.Navigator>
  )
}

export default SearchStack

const styles = StyleSheet.create({})