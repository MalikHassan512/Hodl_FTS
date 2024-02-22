import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { wp } from "../../config/dimensions";
const OtpInput = ({ setOtp }) => {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleTextChange = (text, index) => {
    const newValues = [...inputValues];
    newValues[index] = text;
    setInputValues(newValues);

    if (text.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const getCombinedString = () => {
    setOtp(inputValues.join(""));
    return inputValues.join("");
  };
  getCombinedString();
  return (
    <View style={[styles.container]}>
      {inputRefs.map((ref, index) => (
        <TextInput
        autoCapitalize="sentences"
          key={index}
          style={styles.input}
          ref={ref}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleTextChange(text, index)}
          value={inputValues[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",

    width: wp(90),
  },
  input: {
    width: wp(14),
    height: 78,
    margin: wp(2.2),
    textAlign: "center",
    fontSize: 30,
    borderColor: colors.primary,
    borderWidth: 1,
    //   backgroundColor: colors.white,
    borderRadius: 10,
    fontWeight: "bold",
    color: "white",
  },
});

export default OtpInput;
