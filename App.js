import { useEffect, useState } from "react"
import { StyleSheet, Dimensions,Image, Text, TextInput, View, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider, useSelector } from "react-redux"
import { store } from "./app/redux/store"
import image from "./assets/3.png"
import { wp, hp } from "./app/config/dimensions"
import Toast from "react-native-toast-message"
import MainNavigator from "./app/navigators/MainNavigaton"
import { SocketProvider } from "./app/component/socket/SocketProvider"
import { EventProvider } from "react-native-outside-press"
import { SafeAreaView } from "react-native"
import colors from "./app/config/colors"
const Stack = createNativeStackNavigator()

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {}
    Text.defaultProps.allowFontScaling = false
    TextInput.defaultProps = TextInput.defaultProps || {}
    TextInput.defaultProps.allowFontScaling = false
    View.defaultProps = View.defaultProps || {}
    View.defaultProps.allowFontScaling = false

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <LinearGradient
      colors={["#121111", "#131A1D", "#131A1D"]}
      style={styles.splashContainer}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 1, y: 1 }}
      useAngle={true}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </LinearGradient>
    )
  }
  console.log(Dimensions.get("window").width,"qqqq")
  return (
    <>
      <StatusBar backgroundColor={colors.themeColor} />
      <Provider store={store}>
        <SocketProvider>
          {/* <LinearGradient
            colors={["#121111", "#131A1D"]}
            style={styles.container}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0.3 }}> */}
          {/* <ProtectedAuth /> */}
          <EventProvider>
            <MainNavigator />
          </EventProvider>
          {/* </LinearGradient> */}
          <Toast />
        </SocketProvider>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginBottom: hp(12),
    width: wp(30),
    height: hp(18)
  }
})

// const ProtectedAuth = () => {
//   const { isLoggedIn } = useSelector(state => state.auth)
//   return isLoggedIn ? <MyTabs /> : <WelcomeStack />
// }
