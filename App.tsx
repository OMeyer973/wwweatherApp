import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import HomePage from "./src/pages/HomePage";
import Dashboard from "./src/pages/DashBoard";
import { Location } from "./src/types";
import { useFonts } from "expo-font";
import { ScaledSheet } from "react-native-size-matters";

export default function App() {
  const windowWidth = Dimensions.get("window").width;

  const [showHomePage, setShowHomePage] = useState(true);
  // const [location, setLocation] = useState<Location | null>({
  //   coordinates: { latitude: 5.15812, longitude: -52.64263 },
  //   name: "Kourou",
  //   region: "French Guiana",
  // });
  const [location, setLocation] = useState<Location | null>({
    coordinates: { latitude: 5.15812, longitude: -52.64263 },
    name: "Kourou",
    region: "French Guiana",
  });
  // const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (location?.name) {
      setShowHomePage(false);
    } else {
      setShowHomePage(true);
    }
    console.log(location);
  }, [location]);

  const [loaded] = useFonts({
    poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    poppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    poppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    poppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient
      colors={["rgba(0, 211, 255, 0.3)", "rgba(255, 63, 0, 0.3)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ ...styles.body, width: windowWidth }}
    >
      <StatusBar style="auto" />
      {showHomePage ? (
        <HomePage setLocation={setLocation} />
      ) : (
        <Dashboard location={location} setLocation={setLocation} />
      )}
    </LinearGradient>
  );
}

const styles = ScaledSheet.create({
  body: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#fff",
    // height: "100%",
  },
});
