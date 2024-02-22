import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fontSize } from "../../config/fontSize";
import colors from "../../config/colors";
import AppText from "./AppText";
import fonts from "../../../assets/fonts";

function AppButton({
  title,
  onPress,
  textStyle,
  color = "primary",
  loading,
  rounded = false,
  bold = false,
  border = false,
  buttonWidth = "100%",
  center,
  style,
  icon,
  iconStyle,
  iconSize,
  opacity = 1,
  iconBackGround,
  ...otherProps
}) {
  if (otherProps.disabled) opacity = 0.4975;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        rounded && {
          borderRadius: 50,
        },
        border && {
          border: 1,
        },
        center && {
          alignSelf: "center",
        },
        { opacity },
        loading && { padding: 10, opacity: 0.8 },
        { backgroundColor: "#666"},
        buttonWidth && { width: buttonWidth },
        style,
      ]}
      disabled={loading ? true : false}
      onPress={onPress}
      {...otherProps}
    >
      {!loading ? (
        <>
          {icon !== undefined ? (
            <View style={[styles.container]}>
              <View style={{ marginRight: 10 }}>{icon}</View>
              <AppText style={[styles.text, textStyle]}>{title}</AppText>
            </View>
          ) : (
            <AppText style={[styles.text, textStyle,{fontWeight:"700"}]}>{title}</AppText>
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </TouchableOpacity>
  );
}

export default AppButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingStart: 20,
    paddingEnd: 1,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.small,
    fontFamily: fonts.medium,
  },
  icon: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
