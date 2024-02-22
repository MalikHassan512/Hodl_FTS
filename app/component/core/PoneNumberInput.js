import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, } from "react-native";
import colors from "../../config/colors";
import { useFormikContext } from "formik";
import ErrorMessage from "../forms/ErrorMessage";
import AppText from "./AppText";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { wp } from "../../config/dimensions";
import {CountryPicker} from "react-native-country-codes-picker";
import { fonts } from "react-native-elements/dist/config";


const PoneNumberInput = ({ name, title }) => {
  const [limit, setLimit] = useState(14);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCross, setShowCross] = useState(false);
  const [valuesPhone, setValuesPhone] = useState({
    phone: "",
  });
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryFlag, setCountryFlag] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isFieldTouched, setIsFieldTouched] = useState(false);
  const { values } = useFormikContext();

  useEffect(() => {
    values['phone'] = valuesPhone;

  }, [valuesPhone]);




    const handlePhoneInputChange = (text) => {
    if(text.lenght > 14){
      setErrorMessage("Phone number is not valid");
    }
   
  }

  const requireError = () => {
    if (valuesPhone[name] === "") {
      setErrorMessage("Phone number is required");
    } else {
      setErrorMessage("");
    }
  };


    const handleCountryPicker = (Item) => {
      setSelectedCountry(Item);
      setCountryFlag(Item?.flag);
      setCountryCode(Item?.dial_code);
      setShow(false);
      setShowCross(false);
    }


if(show){
setTimeout(() => {
  setShowCross(true);
}
, 1500);
}


  return(
    <>
    <AppText
            style={styles.appText}
            pStyle={styles.pStyle}
          >
            Phone Number
          </AppText>
    <View  style={styles.inputContainer} >
      <View style={styles.row}>
 
                 <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
          style={styles.flagAndCodeContainer}
          >
            
          <Text style={styles.flag}>
          {countryFlag ? countryFlag : "🇺🇸"}
          </Text>
          <Text style={styles.dailCode}>{
          countryCode ? countryCode : "+1"
          }</Text>
          </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        
        keyboardType="numeric"
        onChangeText={(text) => {
          handlePhoneInputChange(text);
          setValuesPhone({ ...valuesPhone, phone: text });
        }}
        value={valuesPhone[name]}
        onBlur={() =>{ setIsFieldTouched(true);
        requireError() }}
        maxLength={limit}

      />
    </View>
    </View>

      <ErrorMessage error={errorMessage} visible={isFieldTouched} />

      {show && (
         <Modal
         transparent
         animationType="slide"
          visible={show}
          onRequestClose={() => {
            setShow(false);
            setShowCross(false);
          }}
       >
         <View style={styles.modalContainer}>
           <TouchableOpacity
             style={styles.redArea}
             activeOpacity={1}
             onPress={() => {
                setShow(false);
                setShowCross(false);
              }}
           />
   
            
            <CountryPicker
              show={show}
              pickerButtonOnPress={(Item) => handleCountryPicker(Item)}
              enableModalAvoiding={true}
              style={{
                modal: styles.pickerModal,
                itemsList: styles.secondaryColor,
                line: styles.secondaryColor,
                countryButtonStyles: styles.secondaryColor,
                countryName: styles.countryName,
                dialCode: styles.dialCodeInModal,
                flag: styles.flagInModal
      
              }}
      
        
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setShow(false);
                setShowCross(false);
              }
              }
              onBackdropPress	={() =>{ setShow(false);
                setShowCross(false);}}
        

      
              />
              
         </View>
         {/* {show && showCross && (
          <TouchableOpacity
          onPress={() => {
            setShow(false);
            showCross(false);
          }}
          style={styles.crossContainer}
          >
          <Entypo name="cross" size={16} color="white" />
          </TouchableOpacity>
          )} */}

       </Modal>
      )}


    </>
  )


};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.dark,
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 10,
    // paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    height: 36,
    color: "#666666",
    alignItems: "center",
  },
  phoneContainer: {
    backgroundColor: colors.secondary,
  },

  textInput: {
    paddingVertical: 0,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  redArea: {
    flex: 0.12, // 20% of the screen height
    backgroundColor: 'transparent'
  },
  blackArea: {
    flex: 0.88, // 80% of the screen height
    backgroundColor: 'transparent',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,  },
    appText: {
      fontSize: 16,
      fontFamily: fonts.regular,
      fontWeight: "400",
      marginBottom: 4, 
    },
    pStyle: { paddingHorizontal: wp(6), },
    inputContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
      height: 36,
      paddingHorizontal: 10,
      color: colors.white,
      marginHorizontal:wp(4.1),
      justifyContent:'center',
    },
    row:{flexDirection:'row'},
    flagAndCodeContainer:{
      flexDirection:'row',    
      alignItems:'center',},
      flag:{  fontSize: 24,  },
      dailCode:{ color: colors.white, fontSize: 14, fontWeight: "400", },
      textInput:{ width:'100%',height:'100%', marginLeft:5, color: "#fff", fontSize: 14, fontWeight: "400",},
      pickerModal:{
        backgroundColor: colors.header,
        height: "85%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
      }, 
      secondaryColor:{
        backgroundColor: colors.secondary,
      }, 
      countryName:{
        color: colors.white,
        fontSize: 16,
      },
      dialCodeInModal:{
        color: colors.white,
        fontSize: 16,
      },
      flagInModal:{
        fontSize: 20,
      },
      crossContainer:{
        position: "absolute",
        right: 20,
        top: 120,
        backgroundColor: colors.primary,
        borderRadius: 15,
      },
});

export default PoneNumberInput;
