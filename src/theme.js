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
    color: "#ffffff",
    fontWeight: "900",
  }
});

const buttonSecondary = StyleSheet.create({
  ...buttonPrimary,
  backgroundColor: buttonBgColorSecondary
});

const cardPrimary = StyleSheet.create({
  backgroundColor: tabColor,
  borderRadius: 24,
  paddingHorizontal: 26,
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

// 
export const theme = {
  title: {
    color: titleColor,
    // Font: ""Poppins", sans- serif",
  },

  data: {
    color: "#000"
  },

  input: {
    color: "rgba(0, 0, 0, 0.7)",
    backgroundColor: "#EDF1F2"
  },

  buttonPrimary,
  buttonSecondary,
  cardPrimary,
  cardSecondary,
  cardTransparent
};
