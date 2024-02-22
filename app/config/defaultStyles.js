import { Platform } from "react-native";

import colors from "./colors";
import { fontSize } from "./fontSize";
import fonts from "../../assets/fonts";

export default {
  colors,
  text: {
    color: colors.light,
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  test: {
    borderWidth: 3,
    borderColor: "red",
  },
  textLogin: {
    color: "#2DA1D7",
    //fontfamily: fonts.lato,
    fontSize: fontSize.tiny,
  },
};
