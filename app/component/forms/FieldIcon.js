import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
function FieldIcon({
  name,
  size = 40,
  color = colors.white,
  IconLibrary = MaterialCommunityIcons,
  style,
}) {
  return (
    <>
      <IconLibrary name={name} size={size} color={color} style={[style]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FieldIcon;
