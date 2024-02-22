import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
// import FieldIcon from "../forms/FieldIcon";

function PasswordTextInput({
  icon,
  IconLibrary,
  width = "100%",
  rounded = false,
  ...otherProps
}) {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={[
          styles.container,
          rounded && {
            borderRadius: 50,
          },
          { marginTop: 3 },
          { width },
        ]}
      >
        {/* <FieldIcon
        name={icon}
        size={25}
        style={styles.icon}
        color={colors.light}
        IconLibrary={IconLibrary}
      /> */}

        <View style={{ flex: 1 }}>
          <TextInput
            style={[defaultStyles.text, { flex: 1 }]}
            {...otherProps}
            secureTextEntry={showPass}
            placeholderTextColor={"#fff"}
          />
        </View>
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <MaterialCommunityIcons
            name={showPass ? "eye" : "eye-off"}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PasswordTextInput;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.dark,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    height: 36,
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
