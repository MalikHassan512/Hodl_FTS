import Login from "../screens/welcome/Login";
import GetStarted from "../screens/welcome/GetStarted";
import Register from "../screens/welcome/Register";
import OtpScreen from "../screens/welcome/OtpScreen";
import LoginTemp from "../screens/welcome/LoginTemp";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabButton from "../component/core/TabButton";
import HomeScreen from "../screens/Home/HomeScreen";
import CallScreen from "../screens/Home/CallScreen";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function HomeStack({navigation,route}) {
//   useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     console.log(navigation.options);
//     if (routeName === "Call"){
//       navigation.setOptions({tabBarStyle: {display: 'none'}});
//     }else {
//         navigation.setOptions({tabBarStyle: { borderTopWidth: 0,height: 60, backgroundColor: 'rgba(18, 17, 17, 0.3)',paddingBottom:10 }});
//     }
// }, [navigation, route]);
  return (
      
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
    <Stack.Screen name="Call" component={CallScreen}   options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
  </Stack.Navigator>
  );
}
