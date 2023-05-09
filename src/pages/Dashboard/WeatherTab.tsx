import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Value from "../../components/Value";
import { theme } from "../../theme";
import { WeatherData } from "types";

import { clamp } from "utils";

// import { SearchBar } from "~components/molecules/SearchBar";

export interface Props {
  weatherData: WeatherData;
}

const WeatherTab: React.FC<Props> = ({ weatherData }) => {
  return (
    <View>
      <View style={theme.cardPrimary}>
        <Value flavor="title">{weatherData?.cloudCover}</Value>
        <Value flavor="title">{weatherData?.riskOfRain}</Value>
        <Value flavor="title">{weatherData?.temperature}</Value>
      </View>
    </View>
  );
};

export default WeatherTab;
