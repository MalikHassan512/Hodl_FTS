import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../component/core/Screen";
import AppText from "../../component/core/AppText";
import OtpInput from "../../component/core/OtpInput";
import image from "../../../assets/3.png";
import colors from "../../config/colors";
import AppButton from "../../component/core/AppButton";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import apiClient from "../../api/client";
import { login } from "../../redux/authSlice";
import Toast from "react-native-toast-message";
import defaultStyles from "../../config/defaultStyles";
import { fontSize } from "../../config/fontSize";
import { hp, wp } from "../../config/dimensions";
import fonts from "../../../assets/fonts";
const OtpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const route = useRoute();
  const { id } = route.params;
  // useEffect(() => {
  //   let interval;
  //   if (time > 0) {
  //     interval = setInterval(() => {
  //       setTime(prevTime => prevTime - 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // }, [time]);

  // Format the time to display as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  console.log(otp);
  const handleSubmit = async () => {
    console.log(id, "id");
    const result = await apiClient.put(`activate/${id}/`, {
      token: otp,
    });
    console.log(result, "result");
    if (!result.ok) {
      Object.keys(result.data).forEach((key) => {
        const errorMessage = result.data[key][0]; // Get the first error message for the field
        Toast.show({
          type: "error",
          text2: errorMessage,
        });
      });
      return;
    }
    console.log(result, "result");
    dispatch(login({ token: result.data.token }));
  };
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageContainer}>
          <Image source={image} />
        </View>
        <View style={[styles.otpContainer]}>
          <View style={{ paddingHorizontal: 20 }}>
            <AppText
              textCenter
              style={{
                color: colors.white,
                fontFamily:fonts.bold,
                fontSize: 29,
                fontWeight: 600,
                width: wp(80),
              }}
            >
              We sent a verification code for your Email.
            </AppText>
            <AppText
              textCenter
              style={{
                color: "#fff",
                marginTop: hp(2.9),
                fontSize: 18,
                fontFamily: fonts.light,
                fontWeight: "300",
              }}
            >
              Please paste it here.
            </AppText>
          </View>
          <View style={{ marginTop: hp(1) }}>
            <OtpInput setOtp={setOtp} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Confirm"
            disabled={!otp}
            onPress={() => handleSubmit()}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // backgroundColor: colors.secondary,
  },
  topContainer: {
    padding: 10,
  },
  backicon: {
    position: "absolute",
    top: -10,
    left: 10,
    width: 70,
    height: 70,
    padding: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    flex: 1,
    paddingHorizontal: 15,
    //  justifyContent:"center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",

    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: colors.white,
  },
  icon: {
    borderRadius: 25,
    padding: 5,
  },
});

export default OtpScreen;
