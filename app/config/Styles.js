import { StyleSheet } from "react-native";
import COLOR from "../config/colors";
import { fontSize } from "./fontSize";

const SHADOWS = StyleSheet.create({
  shadowLg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  shadowMd: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  shadowSm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

const PADDING = StyleSheet.create({
  p0: {
    padding: 0,
  },
  p2: {
    padding: 2,
  },
  p4: {
    padding: 4,
  },
  p6: {
    padding: 6,
  },
  p8: {
    padding: 8,
  },
  p10: {
    padding: 10,
  },
  p12: {
    padding: 12,
  },
  p14: {
    padding: 14,
  },
  p16: {
    padding: 16,
  },
  p18: {
    padding: 18,
  },
  p20: {
    padding: 20,
  },
  v0: {
    paddingVertical: 0,
  },
  v2: {
    paddingVertical: 2,
  },
  v4: {
    paddingVertical: 4,
  },
  v6: {
    paddingVertical: 6,
  },
  v8: {
    paddingVertical: 8,
  },
  v10: {
    paddingVertical: 10,
  },
  v12: {
    paddingVertical: 12,
  },
  v14: {
    paddingVertical: 14,
  },
  v16: {
    paddingVertical: 16,
  },
  v18: {
    paddingVertical: 18,
  },
  v20: {
    paddingVertical: 20,
  },
  v22: {
    paddingVertical: 22,
  },
  v24: {
    paddingVertical: 24,
  },
  v26: {
    paddingVertical: 26,
  },
  v28: {
    paddingVertical: 28,
  },
  v30: {
    paddingVertical: 30,
  },

  H0: {
    paddingHorizontal: 0,
  },
  H2: {
    paddingHorizontal: 2,
  },
  H4: {
    paddingHorizontal: 4,
  },
  H6: {
    paddingHorizontal: 6,
  },
  H8: {
    paddingHorizontal: 8,
  },
  H10: {
    paddingHorizontal: 10,
  },
  H12: {
    paddingHorizontal: 12,
  },
  H14: {
    paddingHorizontal: 14,
  },
  H16: {
    paddingHorizontal: 16,
  },
  H18: {
    paddingHorizontal: 18,
  },
  H20: {
    paddingHorizontal: 20,
  },
  H22: {
    paddingHorizontal: 22,
  },
  H24: {
    paddingHorizontal: 24,
  },
});

const MARGINS = StyleSheet.create({
  m0: {
    margin: 0,
  },
  m2: {
    margin: 2,
  },
  m4: {
    margin: 4,
  },
  m6: {
    margin: 6,
  },
  m8: {
    margin: 8,
  },
  m10: {
    margin: 10,
  },
  m12: {
    margin: 12,
  },
  m14: {
    margin: 14,
  },
  v0: {
    marginVertical: 0,
  },
  v2: {
    marginVertical: 2,
  },
  v4: {
    marginVertical: 4,
  },
  v6: {
    marginVertical: 6,
  },
  v8: {
    marginVertical: 8,
  },
  v10: {
    marginVertical: 10,
  },
  v12: {
    marginVertical: 12,
  },
  v14: {
    marginVertical: 14,
  },
  v16: {
    marginVertical: 16,
  },
  v18: {
    marginVertical: 18,
  },
  v20: {
    marginVertical: 20,
  },
  v22: {
    marginVertical: 22,
  },
  v24: {
    marginVertical: 24,
  },
  v26: {
    marginVertical: 26,
  },
  v28: {
    marginVertical: 28,
  },
  v30: {
    marginVertical: 30,
  },
  H0: {
    marginHorizontal: 0,
  },
  H2: {
    marginHorizontal: 2,
  },
  H4: {
    marginHorizontal: 4,
  },
  H6: {
    marginHorizontal: 6,
  },
  H8: {
    marginHorizontal: 8,
  },
  H10: {
    marginHorizontal: 10,
  },
  H12: {
    marginHorizontal: 12,
  },
  H14: {
    marginHorizontal: 14,
  },
  H32: {
    marginHorizontal: 32,
  },
});

const HEADINGS = StyleSheet.create({
  H1: {
    fontSize: 20,
    fontWeight: "700",
  },
  H2: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  H3: {
    fontSize: 16,
    fontWeight: "500",
  },
  H4: {
    fontSize: fontSize.tiny,
    fontWeight: "400",
  },
  p: {
    fontSize: fontSize.tiny,
    fontWeight: "400",
    color: "#333333",
  },
  p1: {
    fontSize: 12,
    fontWeight: "400",
    color: "#333333",
  },
  tabBar: {
    fontSize: 10,
    fontWeight: "400",
    color: "#333333",
  },
  underline: {
    textDecorationLine: "underline",
  },
  colorPrimary: {
    color: COLOR.primary,
  },
  colorBlack: {
    color: COLOR.black,
  },
  colorWhite: {
    color: COLOR.white,
  },
});

const FLEX_STYLE = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  rap: {
    flexWrap: "wrap",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  one: {
    flex: 1,
  },
});

const BORDER_STYLE = StyleSheet.create({
  bdRsm: {
    borderRadius: 10,
  },
  bdRmd: {
    borderRadius: 15,
  },
  bdRlg: {
    borderRadius: 20,
  },
  bdRxl: {
    borderRadius: 25,
  },
});

function roundedCircleStyle(radius) {
  return {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
  };
}
export {
  FLEX_STYLE,
  HEADINGS,
  BORDER_STYLE,
  MARGINS,
  PADDING,
  SHADOWS,
  roundedCircleStyle,
};
