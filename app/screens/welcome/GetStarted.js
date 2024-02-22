import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import Screen from "../../component/core/Screen";
import image from "../../../assets/3.png";
import AppText from "../../component/core/AppText";
import AppButton from "../../component/core/AppButton";
import { useNavigation } from "@react-navigation/native";
import defaultStyles from "../../config/defaultStyles";
import { hp, wp } from "../../config/dimensions";
import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
const GetStarted = () => {
  const navigation = useNavigation();
  const {user}  = useSelector(state => state.auth)
  console.log(user, "username")

  return (
    
    <Screen>
      <View style={[styles.mainContainer]}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={[styles.ButtonContainer]}>
        <View>
          <AppButton
            title={"Create account"}
            textStyle={{ fontFamily: fonts.medium ,fontWeight:"600"}}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <View style={{paddingVertical:hp(1.5), flexDirection: "row", justifyContent: "center" }}>
          <AppText bold lg style={{ color: colors.primary }}>
            OR
          </AppText>
        </View>
        <View>
          <AppButton
            title={"Sign In"}
            textStyle={{ fontFamily: fonts.medium ,fontWeight:"600"}}
            onPress={() => navigation.navigate(user?"LoginTemp":"Login")}
          />
        </View>
      </View>
    </Screen>
  );
};

export default GetStarted;
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop:hp(3),
    flex: 0.5,
  },
  ButtonContainer: {
    marginTop: hp(12),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    flex: 0.5,
  },
  image: {
    // width: wp(37),
    // height: hp(25),
    width:175.189,
    height:203
  },
  text: {
    letterSpacing: 1.5,
    marginTop: 10,
  },

  bottomText: {
    padding: 30,
    marginVertical: 30,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  corner: {
    backgroundColor: colors.secondary,
    width: 30,
    height: 30,
    position: "absolute",
    top: -5,
    left: -5,
  },
  textStyle: {
    color: colors.white,
    margin: "auto",
  },
});
