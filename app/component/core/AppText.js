import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import styles from "../../config/colors";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { fontSize } from "../../config/fontSize";

function AppText({
  style,
  pStyle,
  center,
  end,
  textCenter,
  textEnd,
  bold,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  primary,
  secondary,
  medium,
  white,
  black,
  children,
  ...otherProps
}) {
  const combinedTextStyle = StyleSheet.flatten([
    defaultTextStyle,
    center && { alignSelf: "center" },
    end && { alignSelf: "flex-end" },
    textCenter && { textAlign: "center" },
    textEnd && { textAlign: "right" },
    primary && { color: colors.primary }, // Assuming colors is defined
    secondary && { color: colors.secondary },
    medium && { color: colors.medium },
    white && { color: colors.white },
    black && { color: colors.black },
    bold && { fontWeight: "bold" },
    sm && { fontSize: 10 }, // You can directly assign specific font sizes here
    md && { fontSize: 15 },
    lg && { fontSize: fontSize.small }, //20
    xl && { fontSize: 25 },
    xxl && { fontSize: 30 },
    xxxl && { fontSize: 40 },
    style,
  ]);

  // Get the screen width
  const screenWidth = Dimensions.get("window").width;

  // Calculate font size based on screen width
  const calculateFontSize = (baseSize) => {
    const scaleFactor = screenWidth / 375; // 375 is a reference screen width
    const newSize = baseSize * scaleFactor;
    return Math.round(newSize);
  };

  return (
    <View style={pStyle}>
      <Text style={combinedTextStyle} {...otherProps}>
        {children}
      </Text>
    </View>
  );
}

export default AppText;
const defaultTextStyle = {
  color: colors.primary,
  // fontFamily: 'Open Sans',
  fontSize: fontSize.tiny,
  fontStyle: "normal",
  fontWeight: "400",
  // marginBottom:0,
  // lineHeight: 20, // You can adjust the line height as needed
};
