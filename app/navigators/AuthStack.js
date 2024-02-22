import Login from "../screens/welcome/Login"
import GetStarted from "../screens/welcome/GetStarted"
import Register from "../screens/welcome/Register"
import OtpScreen from "../screens/welcome/OtpScreen"
import LoginTemp from "../screens/welcome/LoginTemp"
import { createNativeStackNavigator, TransitionPresets } from "@react-navigation/native-stack"
import ForgetPassword from "../screens/welcome/ForgetPassword"
import ForgetConfirmation from "../screens/welcome/ForgetConfirmation"
import TokenScreen from "../screens/welcome/TokenScreen"
import NewPasswordScreen from "../screens/welcome/NewPasswordScreen"
import LoginTempPassword from "../screens/welcome/LoginTempPasswrd"

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false
      }}>
      <Stack.Screen name="Welcome" component={GetStarted} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginTemp" component={LoginTemp} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordTemp" component={LoginTempPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Forget" component={ForgetPassword} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgetConfirm"
        component={ForgetConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TokenScreen" component={TokenScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="NewPassword"
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
