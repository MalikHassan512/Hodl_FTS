import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from '../core/AppText';
import { fontSize } from '../../config/fontSize';

const GradientButton = ({ title, onPress, colors,textStyle,containerStyle,gradientStyle,opacity=1,...otherProps }) => {
  if (otherProps.disabled) opacity = 0.4975;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,{opacity},containerStyle]} {...otherProps}>
        <LinearGradient 
          start={{ x: 1, y: 0.9 }} // Left top
          end={{ x: 0, y: 0.3}}
        colors={colors} style={[{alignItems:"center"},gradientStyle]} >
        <Text style={[styles.text,textStyle]} >{title}</Text>
</LinearGradient>
      
    </TouchableOpacity>
  );
};
export default GradientButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding:10,
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: fontSize.tinyx1,
    fontWeight: 'bold',
  },
});