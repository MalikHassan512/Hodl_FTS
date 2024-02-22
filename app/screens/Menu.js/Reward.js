import { Text, TouchableOpacity, Switch, Image, View, ScrollView } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"
import colors from "../../config/colors"
import BackArrow from "../../../assets/icons/iconss/BackArrow.svg"
import { hp, wp } from "../../config/dimensions"
import pik from "../../../assets/icons/iconss/pik.png"
import bag from "../../../assets/icons/iconss/bag.png"
import VedioIcon from "../../../assets/icons/iconss/vedioIcon.svg"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import AppButton from "../../component/core/AppButton"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
import MoneyWithDrawModal from "./MoneyWithDrawModal"
import { Card } from "react-native-paper"
import defaultStyles from "../../config/defaultStyles"
import RewardModal from "./RewardModal"
import TitleBar from "../../component/core/TitleBar"
import AppWrapper from "../../component/AppWrapper/Wrapper"
const Reward = () => {
  const [rewardModal, setRewardModal] = useState(false)
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
          <TitleBar title={"Rewards"} />
          <View
            style={{
              flexDirection: "row",
              marginTop: hp(2),
              paddingHorizontal: wp(4.7),
              justifyContent: "space-between"
            }}>
            <View style={{ width: "47%"}}>
              <View
                style={{
                  borderWidth: 1,
                  justifyContent: "center",
                  borderColor: colors.primary,
                  borderRadius: 10,
                  height: hp(12)
                }}>
                <Text style={[styles.AwardNum, { textAlign: "center" }]}>2</Text>
                <Text style={[styles.awardLowerText, { textAlign: "center" }]}>
                  Rewards to claim
                </Text>
              </View>
            </View>
            <View style={{ width: "47%"}}>
              <View
                style={{
                  borderWidth: 1,
                  justifyContent: "center",
                  borderColor: colors.primary,
                  borderRadius: 10,
                  height: hp(12)
                }}>
                <Text style={[styles.AwardNum, { textAlign: "center", marginBottom: 0 }]}>27</Text>
                <Text style={[styles.awardLowerText, { textAlign: "center" }]}>
                  Friends to unlock new
                </Text>
              </View>
            </View>
          </View>

          <ScrollView>
            <View
              style={{
                paddingHorizontal: wp(4.7),
                flexDirection: "row",
                marginTop:hp(2),
                justifyContent: "space-between"
              }}>
              <TouchableOpacity
                onPress={() => setRewardModal(true)}
                style={{
                  backgroundColor: colors.header,
                  width: "48%",
                  borderRadius: 10,
                  height: hp(16)
                }}>
                <Image
                  source={bag}
                  style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10,width:"100%", height: hp(12) }}
                />
                <Text
                  style={{
                    top: 6,
                    left: 4,
                    position: "absolute",
                    fontWeight: 600,
                    fontFamily: fonts.bold,
                    fontSize: fontSize.regular1,
                    padding:wp(2),
                    color: "white"
                  }}>
                  50 friends joining Hodl
                </Text>
                <View style={{ padding: 10,borderRadius:10, backgroundColor: colors.header }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: fonts.medium,
                      fontSize: fontSize.tiny,
                      fontWeight: 600,
                      color: "#FFB905"
                    }}>
                    1 HODL T-shirt
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRewardModal(true)}
                style={{
                  backgroundColor: colors.header,
                  width: "48%",
                  borderRadius: 10,
                  height: hp(16)
                }}>
                <Image
                  source={pik}
                  style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, width:"100%",height: hp(12) }}
                />
                <Text
                  style={{
                    top: 6,
                    left: 4,
                    position: "absolute",
                    fontWeight: 600,
                    padding:wp(2),
                    fontFamily: fonts.bold,
                    fontSize: fontSize.regular1,
                    color: "white"
                  }}>
                  10 paid content shared
                </Text>
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: fonts.medium,
                      fontSize: fontSize.tiny,
                      color: "#FFB905",
                      borderRadius:10,
                      fontWeight: 600
                    }}>
                    1 HODL Tote bag
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: wp(4.7), marginTop: hp(1) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(3),
                  backgroundColor: colors.header,
                  height: hp(8),
                  borderRadius: 10,
                  marginTop: hp(1)
                }}>
                <Text style={styles.AwardText1}>Invite +10 friends</Text>
                <Text style={styles.AwardText}>1 week premium</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(3),
                  backgroundColor: colors.header,
                  height: hp(8),
                  borderRadius: 10,
                  marginTop: hp(1)
                }}>
                <Text style={styles.AwardText1}>Add 1 wallet</Text>
                <Text style={styles.AwardText}>1 day Premium</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(3),
                  backgroundColor: colors.header,
                  height: hp(8),
                  borderRadius: 10,
                  marginTop: hp(1)
                }}>
                <Text style={styles.AwardText1}>Add 1 wallet</Text>
                <Text style={styles.AwardText}>1 day Premium</Text>
              </View>
            </View>
          </ScrollView>
          {rewardModal && (
            <RewardModal isDrawerVisible={rewardModal} onHide={() => setRewardModal(false)} />
          )}
        </LinearGradient>
      </View>
    </AppWrapper>
  )
}

export default Reward
