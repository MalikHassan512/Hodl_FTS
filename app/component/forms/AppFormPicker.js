import React from "react";
import { View, StyleSheet } from "react-native";
import { AppPicker } from "../core";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMesage";

const AppFormPicker = ({ items, name, placeholder }) => {
  const { touched, setFieldValue, errors, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectedItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({});

export default AppFormPicker;
