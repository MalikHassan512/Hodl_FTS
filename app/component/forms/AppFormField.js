import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import TextInput from "./../core/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppText from "../core/AppText";
import defaultStyles from "../../config/defaultStyles";
import { hp, wp } from "../../config/dimensions";
import { fontSize } from "../../config/fontSize";
import fonts from "../../../assets/fonts";

function AppFormField({
  title,
  name,
  width,
  multiline,
  AppTextInput = TextInput,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  return (
    <>
      <AppText
        style={[{
          fontSize: 16,
          fontFamily: fonts.regular,
          fontWeight: "400",
          
        }]}
        pStyle={{ paddingHorizontal: wp(6), }}
      >
        {title}
      </AppText>
      <AppTextInput
        width={width}
        {...otherProps}
        multiline={multiline}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

function AppDateField({
  title,
  name,
  width,
  AppTextInput = TextInput,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <AppText
        style={{
          fontSize:16,
          color: "#666666",
          paddingHorizontal: wp(2),
       
        }}
      >
        {title}
      </AppText>
      <AppTextInput
        width={width}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChange={(text) => setFieldValue(name, text)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
export { AppDateField };
export default AppFormField;
const styles = StyleSheet.create({});
