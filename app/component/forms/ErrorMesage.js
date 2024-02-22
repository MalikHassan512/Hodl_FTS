import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../core/AppText";

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <AppText style={styles.text}>{error}</AppText>;
};

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
});

export default ErrorMessage;
