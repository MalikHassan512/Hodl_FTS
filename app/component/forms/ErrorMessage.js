import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "./../core/AppText";
import { wp } from "../../config/dimensions";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={styles.text}>{error}</AppText>;
}

export default ErrorMessage;
const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    paddingHorizontal:wp(4),
    color: colors.danger,
  },
});
