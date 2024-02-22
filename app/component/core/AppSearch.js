import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import { hp } from "../../config/dimensions";

const AppSearch = ({setSearch}) => {
  
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={30} color={colors.primary} />
      <TextInput style={styles.input}  placeholder="Search... "
      onChangeText={(text) => setSearch(text)}
      autoCapitalize="sentences"
      placeholderTextColor="#666666" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // width:"100%",
    alignItems: "center",
    // backgroundColor: "#EDEDED",
    borderRadius: 24,
    // paddingVertical:hp(0.7),
    borderWidth:0.5,
    borderColor:colors.primary,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color:colors.primary,
    marginLeft: 10,
    fontFamily:"Open Sans",
    height:36,
    fontSize: 16,
  },
});

export default AppSearch;
