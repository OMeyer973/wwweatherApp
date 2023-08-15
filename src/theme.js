import { StyleSheet } from "react-native";

// constants
const titleColor = "#262626";
// const titleFont = "Poppins", sans-serif; // todo

const dataColor = "#000";

const labelColor = "rgba(0, 0, 0, 0.7)";
const labelBgColor = "#e3e7e8";

const buttonColor = "#fff";
const buttonBgColor = "#e7501e";
const buttonBgColorSecondary = "#177d92";

const tabColor = "#fff";
const tabColorSecondary = "rgba(255, 255, 255, 0.8)";

// theme
const buttonPrimary = StyleSheet.create({
  backgroundColor: buttonBgColor,
  text: {
    fontFamily: "poppinsSemiBold",
    color: "#ffffff",
  }
});

const buttonSecondary = StyleSheet.create({
  ...buttonPrimary,
  backgroundColor: buttonBgColorSecondary
});

const cardPrimary = StyleSheet.create({
  backgroundColor: tabColor,
  paddingHorizontal: 24,
  paddingVertical: 24,
});

const cardSecondary = StyleSheet.create({
  ...cardPrimary,
  backgroundColor: tabColorSecondary
});

const cardTransparent = StyleSheet.create({
  ...cardPrimary,
  backgroundColor: null
});

const magnet = StyleSheet.create({
  margin: "auto",
  // todo
  //   padding: 0.25em 0.5em;
  //   border - radius: 1em;
  // box - shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
});

const magnetPrimary = StyleSheet.create({
  // todo
  // color: $buttonColor;
  // background: $buttonBgColor;
});

const magnetSecondary = StyleSheet.create({
  // todo
  // color: $buttonColor;
  // background: $buttonBgColorSecondary;
});


// 
export const theme = {
  title: {
    fontFamily: "poppinsRegular",
    color: titleColor,
    fontSize: 24,
  },

  label: {
    fontFamily: "poppinsRegular",
    fontSize: 16,
    color: labelColor,
  },

  value: {
    fontFamily: "poppinsSemiBold",
    // letterSpacing: -0.2,
    color: labelColor,
    fontSize: 24,
  },
  valueSmall: {
    fontFamily: "poppinsSemiBold",
    color: labelColor,
  },
  valueSlim: {
    fontFamily: "poppinsRegular",
    color: labelColor,
  },
  valueTitle: {
    fontFamily: "poppinsSemiBold",
    // letterSpacing: -0.1,
    fontSize: 24,
    color: titleColor,
  },

  data: {
    color: "#000"
  },

  input: {
    color: "rgba(0, 0, 0, 0.7)",
    backgroundColor: "#EDF1F2"
  },

  flexUtil: {
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  buttonPrimary,
  buttonSecondary,
  cardPrimary,
  cardSecondary,
  cardTransparent,
  magnetPrimary,
  magnetSecondary,

  labelBgColor,
};
