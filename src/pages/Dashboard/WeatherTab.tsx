import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

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

import Thermometer from "../../../assets/icons/weather/thermometer.svg";

const iconStyle = {
  objectFit: "contain",
  width: 64,
  height: 64,
};
const rainIcons = [
  <Rain0 height={64} width={64} />,
  <Rain1 height={64} width={64} />,
  <Rain2 height={64} width={64} />,
  <Rain3 height={64} width={64} />,
];
const cloudIcons = [
  <DayCloud0 height={64} width={64} />,
  <DayCloud1 height={64} width={64} />,
  <DayCloud2 height={64} width={64} />,
  <DayCloud3 height={64} width={64} />,
  <DayCloud4 height={64} width={64} />,
];

export interface Props {
  weatherData: WeatherData;
}

const WeatherTab: React.FC<Props> = ({ weatherData }) => {
  // console.log("weatherData", weatherData);
  return (
    <View>
      <View style={{ ...(theme.cardPrimary as ViewStyle), ...styles.tab }}>
        <View style={styles.weatherData}>
          <Text style={theme.label}>Cloud cover</Text>
          {
            cloudIcons[
              Math.floor(
                (clamp(weatherData?.cloudCover, 0, 99) / 100) *
                  cloudIcons.length
              )
            ]
          }
          {/* <Icon src={icon} size="large" /> */}
          <Text style={theme.value}>
            {weatherData?.cloudCover.toFixed(0) + " %"}
          </Text>
        </View>

        <View style={styles.weatherData}>
          <Text style={theme.label}>Risk of rain</Text>
          {
            rainIcons[
              Math.floor(
                (clamp(weatherData?.riskOfRain, 0, 99) / 100) * rainIcons.length
              )
            ]
          }
          {/* <Icon src={icon} size="large" /> */}
          <Text style={theme.value}>
            {weatherData?.riskOfRain.toFixed(0) + " %"}
          </Text>
        </View>

        <View style={styles.weatherData}>
          <Text style={theme.label}>Temperature</Text>
          {/* <Thermometer /> */}
          <Thermometer height={64} width={64} />
          {/* <Icon src={icon} size="large" /> */}
          <Text style={theme.value}>
            {weatherData?.temperature.toFixed(0) + "°C"}
          </Text>
        </View>

        {/* {rainIcons}
        {cloudIcons}
        <Value flavor="title">{weatherData?.cloudCover}</Value>
        <Value flavor="title">{weatherData?.riskOfRain}</Value>
        <Value flavor="title">{weatherData?.temperature}</Value> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: { ...theme.flexUtil },
  weatherData: {
    alignItems: "center",
    maxWidth: 448,
    // width: "100%",
    // height: "100%",
  },
});
export default WeatherTab;
