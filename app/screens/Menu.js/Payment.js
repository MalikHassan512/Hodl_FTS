import { Text, TouchableOpacity, Switch, Image, View, ScrollView, StatusBar } from "react-native"
import React, { useCallback, useState } from "react"
import { styles } from "./styles"
import colors from "../../config/colors"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import Lock from "../../../assets/icons/iconss/Lock.svg"
import VedioIcon from "../../../assets/icons/iconss/vedioIcon.svg"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import AppButton from "../../component/core/AppButton"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import MoneyWithDrawModal from "./MoneyWithDrawModal"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Payment = () => {
  const [moneyWithDrawModal, setMoneyWithDrawModal] = useState(false)
  const navigation = useNavigation()
  const handleGoBack = () => {
    navigation.goBack() // Go back to the previous screen
  }

  return (
    // <AppWrapper color={colors.themeColor2}>
    //   <StatusBar backgroundColor={colors.themeColor2} />
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
           <View style={[Platform.OS === 'ios' ? { marginTop: hp(5) } : null]}/>
          <TitleBar title={"Payment"} />

          <View style={{ paddingHorizontal: wp(3), marginTop: hp(2) }}>
            {/* <TouchableOpacity onPress={()=>setProfileModal(true)}> */}
            <LinearGradient
              colors={["#686868", "rgba(37, 37, 37, 0.00)"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
              // locations={[0.0804, 1.1449]}
              useAngle={true}
              angle={131}
              style={[styles.header, { height: hp(18), paddingVertical: hp(1), borderRadius: 10 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.paymentText]}>Balance</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.paymentCur}> $</Text>
                  <Text style={[styles.paymentAmount]}> 67.98</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: hp(1),
              paddingHorizontal: wp(3)
            }}>
            <AppButton title={"Withdraw money"} onPress={() => setMoneyWithDrawModal(true)} />
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2),
                paddingHorizontal: wp(4.7)
              }}>
              <Text style={styles.history}>History</Text>
            </View>
            {/* first */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2),
                paddingHorizontal: wp(4.7)
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.medium,
                  fontSize: fontSize.vtinyx1,
                  textAlign: "center"
                }}>
                Today, 20 Oct
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: hp(2.5),
                paddingHorizontal: wp(4.7)
              }}
              onPress={() => navigation.navigate("Account")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Lock style={{ marginRight: 10 }} />
                <Text style={[styles.paymentText]}>John Travis subscribed your channel</Text>
              </View>
              <View>
                <Text style={[styles.paymentTextNum, { fontWeight: 600 }]}>+ 4,99</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "rgba(102, 102, 102, 0.40)" }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: hp(2.5),
                paddingHorizontal: wp(4.7)
              }}
              onPress={() => navigation.navigate("Account")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Lock style={{ marginRight: 10 }} />
                <Text style={[styles.paymentText]}>Carlos Gomes subscribed your channel</Text>
              </View>
              <View>
                <Text style={[styles.paymentTextNum, { fontWeight: 600 }]}>+ 4,99</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "rgba(102, 102, 102, 0.40)" }}
            />

            {/* Second */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(2),
                paddingHorizontal: wp(4.7)
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.medium,
                  fontSize: fontSize.vtinyx1,
                  textAlign: "center"
                }}>
                Yesterday, 19 Oct
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: hp(2.5),
                paddingHorizontal: wp(4.7)
              }}
              onPress={() => navigation.navigate("Account")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Lock style={{ marginRight: 10 }} />
                <Text style={[styles.paymentText]}>Joy Bright subscribed your channel</Text>
              </View>
              <View>
                <Text style={[styles.paymentTextNum, { fontWeight: 600 }]}>+ 4,99</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "rgba(102, 102, 102, 0.40)" }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: hp(2.5),
                paddingHorizontal: wp(4.7)
              }}
              onPress={() => navigation.navigate("Account")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Lock style={{ marginRight: 10 }} />
                <Text style={[styles.paymentText]}>Mary Smith paid for your video</Text>
              </View>
              <View>
                <Text style={[styles.paymentTextNum, { fontWeight: 600 }]}>+ 0,99</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "rgba(102, 102, 102, 0.40)" }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: hp(2.5),
                paddingHorizontal: wp(4.7)
              }}
              onPress={() => navigation.navigate("Account")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <VedioIcon style={{ marginRight: 10 }} />
                <Text style={[styles.paymentText]}>Mary Smith paid for your video</Text>
              </View>
              <View>
                <Text style={[styles.paymentTextNum, { fontWeight: 600 }]}>+ 0,99</Text>
              </View>
            </View>
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "rgba(102, 102, 102, 0.40)" }}
            />
          </ScrollView>
          {moneyWithDrawModal && (
            <MoneyWithDrawModal
              isDrawerVisible={moneyWithDrawModal}
              onHide={() => setMoneyWithDrawModal(false)}
            />
          )}
        </LinearGradient>
      </View>
    // </AppWrapper>
  )
}

export default Payment
