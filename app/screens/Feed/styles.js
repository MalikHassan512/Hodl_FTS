import fonts from "../../../assets/fonts"
import colors from "../../config/colors"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"

export const styles = {
  container: {
    flex: 1,
  },
  container1: {
   
      paddingHorizontal: 10,
      paddingBottom:50
 
  },
  feedName:{
    fontFamily:fonts.medium,
    fontSize:fontSize.tinyx1,
    color:colors.white,
    
  },
  feedTime:{
    fontFamily:fonts.regular,
    fontSize:fontSize.vtinyx1,
    color:colors.primary
  },
  feedIcon:{
    fontFamily:fonts.regular,
    fontSize:fontSize.vtinyx1,
    color:colors.white
  },
  feedText:{
    marginTop:hp(0.7),
    fontFamily:fonts.regular,
    fontSize:fontSize.tiny,
    color:colors.white,
    textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 21,
  textShadowColor: 'rgba(0, 0, 0, 0.3)',
  }
}