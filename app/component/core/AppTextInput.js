import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import colors from "../../config/colors";
import defaultStyles from "../../config/colors";
// import FieldIcon from "../forms/FieldIcon";

function AppTextInput({
  icon,
  pStyle,
  sm,
  md,
  lg,
  IconLibrary,
  width = "100%",
  rounded = false,
  multiline,
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.container,
        rounded && {
          borderRadius: 50,
        },
        sm && { height: 30 },
        md && { height: 40 },
        lg && { height: 50 },

        { width },
        ,
        { marginTop: -6 },
        pStyle,
      ]}
    >
      {/* {icon && (
        <FieldIcon
          name={icon}
          size={25}
          style={styles.icon}
          color={colors.light}
          IconLibrary={IconLibrary}
        />
      )} */}

      <View style={{ flex: 1 }}>
        <TextInput
          style={[
            defaultStyles.text,
            { flex: 1, width: "100%", marginRight: 10 },
          ]}
          multiline={multiline}
          {...otherProps}
        />
      </View>
    </View>
  );
}

export default AppTextInput;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.dark,
    borderRadius: 10,
    flexDirection: "row",
    // marginVertical: 10,
    paddingHorizontal: 15,
    height: 55,
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
