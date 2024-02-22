import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from '../../config/dimensions'
import colors from "../../config/colors"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import defaultStyles from "../../config/defaultStyles"
const TitleBar=({ title,containerStyle,btnStyle, ...props})=> {
    const navigation=useNavigation()
    const handleGoBack=() =>{
        if(props.specificBack){
            navigation.navigate(props.specificBack)

        }
        else{
            navigation.goBack()
        }
    }
    return (

        <View style={[{flexDirection:"row",alignItems:"center",marginTop:hp(1),paddingHorizontal:wp(3)},containerStyle]}>
        <TouchableOpacity style={[{padding:10},btnStyle]} onPress={handleGoBack}>
        <BackArrow   style={{color:"red"}}/>
        </TouchableOpacity>
       <Text style={styles.settingHead}>{title}</Text>
      </View>
   
    )
}
export default TitleBar
const styles = StyleSheet.create({
    settingHead:{
        color:colors.white,
        fontFamily:fonts.medium,
        fontSize: wp(5),
        // width:wp(25),
        textAlign:"center"
      },
})