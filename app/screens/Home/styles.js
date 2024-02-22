import fonts from "../../../assets/fonts"
import colors from "../../config/colors"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"

export const styles = {
  container: {
    paddingHorizontal: 5
  },
  title: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fontSize.smallx11
  },
  calling: {
    fontFamily: fonts.regular,
    fontSize: fontSize.vtinyx1,
    color: colors.primary,
    marginLeft: 5
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: fontSize.tiny,
    color: colors.primary,
    marginRight: 10
  },
  item: {
    flexDirection: "row",
    alignItems: "center"
  },
  image1: {
    width: 30,
    height: 30
  },

  detail: {
    marginLeft: wp(1),
    // paddingVertical:7
  },
  name: {
    fontFamily: fonts.regular,
    fontSize: fontSize.tiny,
    fontWeight:"400"
  },
  buttonContainer1: {
    position: "absolute",
    flexDirection: "row",
    bottom: hp(5),
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  button1: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 60,
    borderRadius: 10
  },
  button12: {
    height: hp(6),
    justifyContent: "center",
    width: wp(45),
    alignItems: "center",
    // paddingHorizontal: 60,
    borderRadius: 10
  },
  createChat: {
    height: hp(6),
    justifyContent: "center",
    width: wp(95),
    alignItems: "center",
    // paddingHorizontal: 60,
    borderRadius: 10
  },
  itemChecked: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 3,
    backgroundColor: "#2DA1D7",
    borderRadius: 5,
    borderRadius: 50
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  ModalStyle: {
    marginTop:hp(6),
    backgroundColor: "#222222",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1
  },
  list: {
    paddingVertical: hp(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
}
