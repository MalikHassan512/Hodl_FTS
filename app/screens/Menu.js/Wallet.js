import { Text, TouchableOpacity, Switch, Image, View, ScrollView } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"
import colors from "../../config/colors"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import Lock from "../../../assets/icons/iconss/Lock.svg"
import Meta from "../../../assets/icons/iconss/meta.png"
import Meta2 from "../../../assets/icons/iconss/meta2.png"
import AddMeta from "../../../assets/icons/iconss/AddMeta.svg"
import Cross from "../../../assets/icons/iconss/cross2.svg"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import AppButton from "../../component/core/AppButton"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import MoneyWithDrawModal from "./MoneyWithDrawModal"
import WalletModal from "./WalletModal"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Wallet = () => {
  const [walletModal, setWalletModal] = useState(false)
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }
  return (
    <AppWrapper color={colors.themeColor2}>
      <View style={[styles.container]}>
        <LinearGradient
          colors={["#121111", "#131A1D"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.container}
          //   start={{ x: 1, y: 0.5 }}
          //   end={{ x: 1, y: 1 }}
          //   useAngle={true}
        >
          <TitleBar title={"Wallet"} />
          <View style={{ paddingHorizontal: wp(4.7), marginTop: hp(2) }}>
            <Text style={styles.WalletHead}>
              Access the decentralized communities of the NFTs you own
            </Text>
          </View>

          <ScrollView style={{ paddingHorizontal: wp(4.7) }}>
            {/* first */}

            <View style={{ marginTop: hp(2) }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(1),
                  alignItems: "center",
                  backgroundColor: "#454545",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  height: hp(7.5),
                  paddingHorizontal: wp(3)
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={Meta} style={{ width: 30, height: 30, marginRight: wp(2) }} />
                  <View>
                    <Text style={[styles.WalletTextHead]}>MetaMask</Text>
                    <Text style={[styles.paymentText]}>j5h8e2r4m1y9c3o7dj5h8e2r4m1y9c3o7d</Text>
                  </View>
                </View>
                <View>
                  <Cross />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: hp(1),
                  alignItems: "center",
                  backgroundColor: "#454545",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  height: hp(7.5),
                  paddingHorizontal: wp(3)
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={Meta2} style={{ width: 30, height: 30, marginRight: wp(2) }} />
                  <View>
                    <Text style={[styles.WalletTextHead]}>Phantom</Text>
                    <Text style={[styles.paymentText]}>j5h8e2r4m1y9c3o7dj5h8e2r4m1y9c3o7d</Text>
                  </View>
                </View>
                <View>
                  <Cross />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setWalletModal(true)}
              style={{
                flexDirection: "row",
                marginTop: hp(2),
                alignItems: "center",
                backgroundColor: "transparent",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.primary,
                justifyContent: "space-between",
                height: hp(7.5),
                paddingHorizontal: wp(2)
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AddMeta style={{ marginRight: 10 }} />

                <Text style={[styles.addWallet]}>Add wallet</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          {walletModal && (
            <WalletModal isDrawerVisible={walletModal} onHide={() => setWalletModal(false)} />
          )}
        </LinearGradient>
      </View>
    </AppWrapper>
  )
}

export default Wallet
