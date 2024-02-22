import { View, Text,TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React,{useState} from 'react'
import { styles } from './styles'
import ButtonAdd from "../../../assets/icons/iconss/ButtonAdd.svg"
import Buy from "../../../assets/icons/iconss/BuyTag.svg"
import Hodl from "../../../assets/icons/iconss/Hodel.svg"
import Payement from "../../../assets/icons/iconss/payement.svg"
import Setting from "../../../assets/icons/iconss/setting.svg"
import Bulb from "../../../assets/icons/iconss/Bulb.svg"
import Crpto from "../../../assets/icons/iconss/Crpto.svg"
import ManueCall from "../../../assets/icons/iconss/manueCall.svg"
import Verified from "../../../assets/icons/iconss/Verifieds.svg"
import Rewards from "../../../assets/icons/iconss/Reward.svg"
import { hp, wp } from '../../config/dimensions'
import InviteModal from './InviteModal'
import { useNavigation } from "@react-navigation/native"
import defaultStyles from '../../config/defaultStyles'
import LinearGradient from 'react-native-linear-gradient'
const Button = () => {
  
  const navigation=useNavigation()
  const [inviteModal,setInviteModal]= useState(false)
    const data=[
        {
            icon:<ButtonAdd style={styles.buttonIcon}/>,
            text:"Invite Friends",
           
        },
        {
            icon:<Buy style={styles.buttonIcon}/>,
            text:"Buy/Sell usernames",
            screen:"BuySellUsernames"
        },
        {
            icon:<Hodl style={styles.buttonIcon}/>,
            text:"HODL Premium",
            screen:"HODLPremium"
        },
        // {
        //     icon:<Payement style={styles.buttonIcon}/>,
        //     text:"Payments"
        // },
        {
            icon:<Payement style={styles.buttonIcon}/>,
            text:"Payments",
            screen:"Payments"
          
        },
        {
            icon:<Setting style={styles.buttonIcon}/>,
            text:"Settings",
            screen:"Settings"
        },
        {
            icon:<Bulb style={styles.buttonIcon}/>,
            text:"Suggestions",
            screen:"Suggestions"
        },
        {
            icon:<Crpto style={styles.buttonIcon}/>,
            text:"Crypto Wallet",
            screen:"CryptoWallet"
        },
        {
            icon:<Verified style={styles.buttonIcon}/>,
            text:"Verified Badge",
            screen:"badgeEntry"
        },
        {
            icon:<Rewards style={styles.buttonIcon}/>,
            text:"Rewards",
            screen:"Rewards"
        },
        {
            icon:<ManueCall style={styles.buttonIcon}/>,
            text:"Calls history",
            screen:"CallHistory"
        },
       
        
    ]
    const renderItem = ( { item, index } ) => {
     
      const x=item
      const handlePress = () => {
        if (index === 0) {
          setInviteModal(true);
        } else {
          // Handle navigation or other actions for other items
          if(item.screen)
          navigation.navigate(item.screen||item.text)
          console.log(`Pressed item ${index}: ${item.text}`);
        }
      };
        return (
          <LinearGradient
          
          colors={["#2DA1D782", "#4E4E4E73"]}
          // colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
          start={{x: 0, y: 0}} end={{x: 1.0, y: 1.0}}
          style={{ height: wp(28.5),borderRadius:10, width: wp(28.5), alignItems: 'center', justifyContent: 'center', }}
        >
          <TouchableOpacity style={styles.buttonCon} onPress={handlePress}>
            <View style={[{justifyContent:"center",flexDirection:"row",alignItems:"baseline"}]}> 
          {x.icon}
          </View>
        <Text style={[styles.buttonText,{marginTop:30}]}>{x.text}</Text>
      </TouchableOpacity>
      </LinearGradient>
        )}
        
  return (
    <View style={{paddingHorizontal:wp(4.7)}}>
    <FlatList numColumns={3}
        showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={{ justifyContent:"space-between"}}
      contentContainerStyle={{ marginTop:hp(2),paddingBottom: hp(2),gap:16 }}
    />
   {inviteModal&& <InviteModal isDrawerVisible={inviteModal} onHide={()=>setInviteModal(false)}/>}
    </View>
  )
}

export default Button