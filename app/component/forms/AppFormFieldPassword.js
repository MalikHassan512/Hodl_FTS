import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import TextInput from "./../core/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppText from "../core/AppText";
import PasswordTextInput from "../core/PasswordTextInput";

function AppFormFieldPassword({
  name,
  width,
  AppTextInput = TextInput,
  ...otherProps
})

 {
   const { setFieldTouched, setFieldValue, values, errors, touched } =  useFormikContext();
  return (
    <>
    <AppText pStyle={{ paddingHorizontal: 20 }} style={{color:"#666666",marginBottom:0}} >{name}</AppText>
      <PasswordTextInput 
        width={width}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

function AppDateField({
  name,
  width,
  AppTextInput = TextInput,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  return (
    <>
      <AppTextInput
        width={width}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChange={(text) => setFieldValue(name, text)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
export { AppDateField };
export default AppFormFieldPassword;
const styles = StyleSheet.create({});
