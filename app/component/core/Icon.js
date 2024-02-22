import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
function Icon({name,size=40,color="white",backgroundColor="",IconLibrary=MaterialCommunityIcons,style,...otherProps}) {
    return (
      <View style={[{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      },
      style

        ]}>
<IconLibrary name={name}  size={size*0.5} color={color}  {...otherProps} />
         
      </View>
    );
}

function IconOnly({name,style,size=40,color="black",IconLibrary=MaterialCommunityIcons,...otherProps}) {
  return (

<IconLibrary style={style} name={name}  size={size*0.5} color={color} {...otherProps} />
       
  );
}
export default Icon;
export {IconOnly}
const styles = StyleSheet.create({

    container:{


    }
    
})
