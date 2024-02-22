import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgeForm1 from '../screens/Menu.js/Badges/BadgeForm1';
import BadgeForm2 from '../screens/Menu.js/Badges/BadgeForm2';
import BadgeForm3 from '../screens/Menu.js/Badges/BadgeForm3';
import BadgeFormFinal from '../screens/Menu.js/Badges/BadgeFormFinal';
const Stack = createNativeStackNavigator();
const BadgeStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="indexBadge" component={BadgeForm1}   options={{ headerShown: false }} />
    <Stack.Screen name="BadgeForm2" component={BadgeForm2}   options={{ headerShown: false }} />
    <Stack.Screen name="BadgeForm3" component={BadgeForm3}   options={{ headerShown: false }} />
    <Stack.Screen name="BadgeFormFinal" component={BadgeFormFinal}   options={{ headerShown: false }} />
   </Stack.Navigator>
  )
}

export default BadgeStack
