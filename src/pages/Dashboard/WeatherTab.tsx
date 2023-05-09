import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Value from "../../components/Value";
import { theme } from "../../theme.js";
import { WeatherData } from "types";

import { clamp } from "../../utils";
import { Svg, SvgUri } from "react-native-svg";

// import { DataColumn } from "~components/molecules/DataColumn";

import DayCloud0 from "../../../assets/icons/weather/day-cloud-0.svg";
import DayCloud1 from "../../../assets/icons/weather/day-cloud-1.svg";
import DayCloud2 from "../../../assets/icons/weather/day-cloud-2.svg";
import DayCloud3 from "../../../assets/icons/weather/day-cloud-3.svg";
import DayCloud4 from "../../../assets/icons/weather/day-cloud-4.svg";

import Rain0 from "../../../assets/icons/weather/rain-0.svg";
import Rain1 from "../../../assets/icons/weather/rain-1.svg";
import Rain2 from "../../../assets/icons/weather/rain-2.svg";
import Rain3 from "../../../assets/icons/weather/rain-3.svg";

// import thermometer from "../../../assets/icons/weather/thermometer.svg";

const rainIcons = [<Rain0 />, <Rain1 />, <Rain2 />, <Rain3 />];
const cloudIcons = [
  <DayCloud0 />,
  <DayCloud1 />,
  <DayCloud2 />,
  <DayCloud3 />,
  <DayCloud4 />,
];

export interface Props {
  weatherData: WeatherData;
}

const WeatherTab: React.FC<Props> = ({ weatherData }) => {
  console.log("weatherData", weatherData);
  return (
    <View>
      <View style={theme.cardPrimary}>
        {rainIcons}
        {cloudIcons}
        <Value flavor="title">{weatherData?.cloudCover}</Value>
        <Value flavor="title">{weatherData?.riskOfRain}</Value>
        <Value flavor="title">{weatherData?.temperature}</Value>
      </View>
    </View>
  );
};

export default WeatherTab;
