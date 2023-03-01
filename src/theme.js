
const buttonPrimary = {
  backgroundColor: "#e7501e",
  text: {
    color: "#ffffff",
    fontWeight: "900",
  }
}

const buttonSecondary = {
  ...buttonPrimary,
  backgroundColor: "#177d92"
}

const cardPrimary = {
  backgroundColor: "#fff",
  borderRadius: 24,
  paddingHorizontal: 26,
  paddingVertical: 24,
}

const cardSecondary = {
  ...cardPrimary,
  backgroundColor: "rgba(255, 255, 255, 0.8)"
}

const cardTransparent = {
  ...cardPrimary,
  backgroundColor: null
}

export const theme = {
  title: {
    color: "#262626",
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
