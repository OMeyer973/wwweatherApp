

export const theme = {
  colors: {
    titleColor: "#262626",
    // titleFont: ""Poppins", sans- serif",

    dataColor: "#000",

    labelColor: "rgba(0, 0, 0, 0.7)",
    labelBgColor: "#e3e7e8",

    buttonColor: "#fff",
    buttonBgColor: "#e7501e",
    buttonBgColorSecondary: "#177d92",

    tabColor: "#fff",
    tabColorSecondary: "rgba(255, 255, 255, 0.8)",
  }
};

export const mixins = {
  tab: {
    padding: 24,
    backgroundColor: theme.colors.tabColor,

    //   @include breakpoint(medium) {
    //   padding: 2em;
    // }
  }
}