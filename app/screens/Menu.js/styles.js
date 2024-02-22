import fonts from "../../../assets/fonts"
import colors from "../../config/colors"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"

export const styles = {
  container: {
    flex: 1,
  },
  userCon: {
    backgroundColor: colors.header,
    height: hp(7),
    justifyContent: "center"
  },
  header: {
    paddingHorizontal: wp(4.7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
  },
  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red",
    // height: hp(3)
  },
  userText: {
    marginLeft: wp(2),
    fontSize: fontSize.regular1,
    fontWeight: "600",
    color: colors.white,
    fontFamily: fonts.medium
  },
  profImage: {
    width: wp(10),
    height: hp(6),
    borderRadius: 5
  },
  buttonCon: {
    borderRadius: 10,
    // borderTopWidth:0.5,
    // borderLeftWidth:0.5,
    // borderColor:"rgba(45, 161, 215, 0.51)",
    // borderWidth:0.5,
    // borderTopColor:"rgba(45, 161, 215, 0.51)",
    // borderLeftColor:"rgba(45, 161, 215, 0.51)",
    // borderRightColor:colors.primary,
    // borderBottomColor:colors.primary,

    // shadowColor: '#000',
    // shadowOffset: { width: 3, height: 0 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: Platform.OS === 'android' ? 5 : 0,
    width: wp(27.5),
    height: wp(27.5),
    justifyContent: "center",
    // alignItems:"center",
    backgroundColor: colors.header,
    // marginHorizontal:wp(3),
    // marginVertical:hp(1.5),
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontWeight: "600",
    fontSize: fontSize.tiny,
    // width:wp(25),
    // paddingHorizontal:5,
    textAlign: "center"
  },
  history: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.regular1,
    textAlign: "center"
  },
  paymentText: {
    color: "#979797",
    fontFamily: fonts.regular,
    fontSize: fontSize.tiny,
    textAlign: "center"
  },
  AwardText: {
    color: "#FFB905",
    fontFamily: fonts.medium,
    fontSize: fontSize.tinyx1,
    fontWeight: 600,
    textAlign: "center"
  },
  AwardText1: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.tinyx1,
    fontWeight: 600,
    textAlign: "center"
  },
  paymentAmount: {
    color: "#FFF",
    fontFamily: fonts.bold,
    fontSize: fontSize.xlarge,
    fontWeight: 600,
    textAlign: "center"
  },
  addWallet: {
    color: "#FFF",
    fontFamily: fonts.bold,
    fontSize: fontSize.tiny,
    fontWeight: 600,
    textAlign: "center"
  },
  paymentCur: {
    color: "#FFF",
    fontFamily: fonts.bold,
    fontSize: fontSize.large,
    fontWeight: 600,
    textAlign: "center"
  },
  settingHead: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.normal,
    width: wp(25),
    textAlign: "center"
  },
  suggestionHead: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.normal,
    // width:wp(30),
    textAlign: "center"
  },
  buttonIcon: {
    bottom: hp(2)
  },
  settingText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: fontSize.tiny,
    textAlign: "center"
  },
  WalletHead: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: fontSize.smallx1,
    // textAlign:"center"
  },
  WalletTextHead: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fontSize.smallx11,
    // textAlign:"center"
  },
  paymentText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: fontSize.tiny,
    textAlign: "center"
  },
  paymentTextNum: {
    color: "#2DA1D7",
    fontFamily: fonts.medium,
    fontSize: fontSize.tiny,
    textAlign: "center"
  },
  settingdeleteText: {
    color: colors.red,
    fontFamily: fonts.medium,
    fontSize: fontSize.tinyx1,
    textAlign: "center"
  },
  settingLowerText: {
    color: "#2DA1D7",
    fontFamily: fonts.regular,
    fontSize: fontSize.tinyx1,
    textAlign: "center"
  },
  awardLowerText: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: fontSize.vtinyx1,
    textAlign: "center"
  },
  AwardNum: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fontSize.xlarge,
    textAlign: "center"
  },
  itemContainer: { flexDirection: "row", alignItems: "center" },
}
