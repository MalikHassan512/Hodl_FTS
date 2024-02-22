import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import TextInput from "../core/AppTextInput";
import ErrorMessage from "./ErrorMessage";
import AppText from "../core/AppText";
import defaultStyles from "../../config/defaultStyles";

function AppFormFieldMultiline({
  title,
  name,
  width,
  AppTextInput = TextInput,
  ...otherProps
})

 {
   const { setFieldTouched, setFieldValue, values, errors, touched } =  useFormikContext();
  return (
    <>
    
    <AppText style={{fontSize:14}}  pStyle={{ paddingHorizontal: 20}}  >{title}</AppText>
      <AppTextInput 
        width={width}
        multiline={true}
        numberOfLines={5}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
      />
     
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}


export default AppFormFieldMultiline;
const styles = StyleSheet.create({});
