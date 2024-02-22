import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { fontSize } from '../../config/fontSize';
import { hp } from '../../config/dimensions';

const EuroInput = ({containerStyle}) => {
  const [euroAmount, setEuroAmount] = useState('');
  const handleEuroChange = (text) => {
    // Format the input to include commas at the second index
    const formattedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const commaFormattedText = formattedText.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,'); // Add comma at the second index
    setEuroAmount(commaFormattedText);
  };

  return (
<View style={[{flexDirection:"row",alignItems:"flex-end",justifyContent:"center"},containerStyle]}>

      <TextInput
       autoCapitalize="sentences"
        style={styles.input}
        keyboardType="numeric"
        placeholder="0,00"
        placeholderTextColor="gray"
        selectionColor="white"
        value={euroAmount}
        onChangeText={handleEuroChange}
      />
            <Text style={styles.placeholder}>EUR</Text>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  placeholder: {
    marginRight: 10,
    marginBottom:15,
    color: 'white',
    fontSize:  hp(2),
  },
  input: {
//   width:"50%",
    fontSize: hp(7),
    color:"white",
    padding: 10,
  },
});

export default EuroInput;
