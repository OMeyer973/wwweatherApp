import { StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from 'react-native-size-matters';

// constants
const titleColor = "#262626";
// const titleFont = "Poppins", sans-serif; // todo

const valueColor = "#000";

const labelColor = "rgba(0, 0, 0, 0.7)";
const labelBgColor = "#e3e7e8";

const buttonColor = "#fff";
const buttonBgColor = "#e7501e";
const buttonBgColorSecondary = "#177d92";

const tabColor = "#fff";
const tabColorSecondary = "rgba(255, 255, 255, 0.8)";

const inputBgColor = "#EDF1F2";
const separatorColor = "#c7cbcc";

const inputFontSize = s(15.5);

// theme
const buttonPrimary = ScaledSheet.create({
  backgroundColor: buttonBgColor,
  fontFamily: "poppinsBold",
  color: "#ffffff",
  fontSize: s(14),
  borderRadius: s(26),
  paddingHorizontal: s(12),
  paddingTop: s(8),
  paddingBottom: s(6),
});

const buttonSecondary = ScaledSheet.create({
  ...buttonPrimary,
  backgroundColor: buttonBgColorSecondary
});

const cardPrimary = ScaledSheet.create({
  backgroundColor: tabColor,
  paddingHorizontal: s(24),
  paddingVertical: s(24),
});

const cardSecondary = ScaledSheet.create({
  ...cardPrimary,
  backgroundColor: tabColorSecondary
});

const cardTransparent = ScaledSheet.create({
  ...cardPrimary,
  backgroundColor: null
});

const magnet = ScaledSheet.create({
  margin: "auto",
  fontFamily: "poppinsRegular",
  fontSize: s(14),
  paddingTop: s(3),
  paddingHorizontal: s(8),
  borderRadius: 1000,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,

  // todo
  //   padding: 0.25em 0.5em;
  //   border - radius: 1em;
  // box - shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
});

const magnetPrimary = ScaledSheet.create({
  ...magnet,
  color: buttonColor,
  backgroundColor: buttonBgColor,
});

const magnetSecondary = ScaledSheet.create({
  ...magnet,
  color: buttonColor,
  backgroundColor: buttonBgColorSecondary,
});


// 
export const theme = {
  title: {
    fontFamily: "poppinsRegular",
    color: titleColor,
    fontSize: s(20),
  },

  label: {
    fontFamily: "poppinsRegular",
    fontSize: s(14),
    color: labelColor,
    marginBottom: s(8),
  },

  value: {
    fontFamily: "poppinsSemiBold",
    // letterSpacing: -0.2,
    color: valueColor,
    fontSize: s(20),
  },
  valueSmall: {
    fontFamily: "poppinsSemiBold",
    color: valueColor,
    fontSize: s(14),
  },
  valueSlim: {
    fontFamily: "poppinsRegular",
    color: valueColor,
    fontSize: s(14),
  },
  valueTitle: {
    fontFamily: "poppinsSemiBold",
    // letterSpacing: -0.1,
    fontSize: s(20),
    color: titleColor,
  },

  data: {
    color: "#000"
  },

  input: {
    color: "rgba(0, 0, 0, 0.7)",
    backgroundColor: inputBgColor,
    borderRadius: s(16),
  },

  flexUtil: {
    display: "flex",
    gap: s(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  buttonSecondary,
  buttonPrimary,
  cardPrimary,
  cardSecondary,
  cardTransparent,
  magnetPrimary,
  magnetSecondary,

  labelBgColor,
  buttonBgColor,

  inputFontSize,
  inputBgColor,

  separatorColor,
};
