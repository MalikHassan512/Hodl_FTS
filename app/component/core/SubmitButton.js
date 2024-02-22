import React from "react";
import { useFormikContext } from "formik";

import AppButton from "./AppButton";

const SubmitButton = ({ title, titleTextStyle, style }) => {
  const { handleSubmit,errors,touched,values } = useFormikContext();
  function isFilled(){

    for (const key in values) {
     if(!values[key])
     return false 
    }

    return true
  }
  return (
    <AppButton
      style={style}
      title={title}
      disabled={!isFilled()}
      onPress={handleSubmit}
      textStyle={titleTextStyle}
    />
  );
};

export default SubmitButton;
export const SubmitButtonRegister = ({ title, titleTextStyle, style,disabled }) => {
  const { handleSubmit,errors,touched,values } = useFormikContext();
  function isFilled(){

    for (const key in values) {
      console.log('key::>>', key, values[key])
     if(!values[key])
     return false 
    }


    return true
  }
  return (
    <AppButton
      style={style}
      title={title}
      disabled={!isFilled()||disabled}
      onPress={handleSubmit}
      textStyle={titleTextStyle}
    />
  );
};

