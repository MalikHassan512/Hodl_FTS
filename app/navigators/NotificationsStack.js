import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationsHome, ChatAndCalls, Activity, Recomendation, FromHodl, Others } from '../screens/Menu.js/Notifications';

const Stack = createNativeStackNavigator();

const NotificationsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="NotificationsHome" component={NotificationsHome} />
            <Stack.Screen name="ChatAndCalls" component={ChatAndCalls} />
            <Stack.Screen name="Activity" component={Activity} />
            <Stack.Screen name="Recomendation" component={Recomendation} />
            <Stack.Screen name="FromHodl" component={FromHodl} />
            <Stack.Screen name="Others" component={Others} />
        </Stack.Navigator>
    )
}

export default NotificationsStack