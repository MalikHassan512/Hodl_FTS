import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../component/core/Screen";
import AppText from "../../component/core/AppText";
import OtpInput from "../../component/core/OtpInput";
import image from "../../../assets/3.png";
import colors from "../../config/colors";
import AppButton from "../../component/core/AppButton";
import AppFormField from "../../component/forms/AppFormField";
import AppForm from "../../component/forms/AppForm";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../../component/core/SubmitButton";
import * as Yup from "yup";
import apiClient from "../../api/client";
import Toast from "react-native-toast-message";
import { wp } from "../../config/dimensions";
import fonts from "../../../assets/fonts";
const TokenScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Screen style={styles.container}>
        <View style={styles.topContainer}></View>
        <View style={styles.imageContainer}>
          <Image source={image} />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <AppText
            textCenter
            xl
            bold
            style={{ color: colors.white, paddingTop: 20 }}
          >
            Validate Token
          </AppText>
          <AppText
            textCenter
            md
            style={{
              color: colors.primary,
              marginTop: 10,
              color: colors.white,
              marginTop: 10,
              fontFamily: fonts.light,
              fontWeight: "400",
              width: wp(60),
              alignSelf: "center",
              marginVertical: wp(5),
            }}
          >
            Write your email and we'll send you a link to redefine your password
          </AppText>
        </View>
        {/* <View style={{marginTop:15}}> */}
        <AppForm
          initialValues={{ token: "" }}
          onSubmit={async (values) => {
            console.log(values);
            const result = await apiClient.post(
              "password_reset/validate_token/",
              values
            );

            if (!result.ok) {
              Object.keys(result.data).forEach((key) => {
                const errorMessage = result.data[key]; // Get the first error message for the field
                console.log(errorMessage);
                Toast.show({
                  type: "error",
                  text2: errorMessage,
                });
              });
              return;
            }
            navigation.navigate("NewPassword", { token: values.token });
          }}
          validationSchema={Yup.object().shape({
            token: Yup.string().required().label("Token"),
          })}
        >
          <AppFormField
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 24,
              height: 36,
              paddingHorizontal: 10,
              color: "#666666",
            }}
            icon="email"
            title={"Token"}
            autoCapitalize="none"
            autoCorrect={false}
            name="token"
            // keyboardType="email-address"
            placeholderTextColor={colors.light}
          />
          <View style={styles.buttonContainer}>
            <SubmitButton title="Send" />
          </View>
        </AppForm>
        {/* </View> */}

        {/* </View> */}
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    alignItems: "center",
    marginVertical: 50,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 15,

    width: "100%",
    // paddingVertical: 40,
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

export default TokenScreen;
