import { StatusBar } from "react-native";
import { Dimensions } from "react-native";
import {
  TimetableData,
  WeatherData,
  WindData,
  WavesData,
  WWWData,
  Tide,
} from "./types";

export const oneDay = 86400000;
export const oneHour = 3600000;

export const startDate = new Date(new Date().setHours(0, 0, 0, 0) - oneDay);
export const numberDaysPredicted = 10;

export const placeholderWWWData: WWWData = {
  time: new Date(),
  weatherData: {
    cloudCover: 0,
    riskOfRain: 0,
    temperature: 0,
  },
  windData: {
    direction: 0,
    speed: 0,
    gusts: 0,
  },
  wavesData: {
    direction: 180,
    height: 0,
    tide: "low",
  },
};

// style
export const statusBarHeight = StatusBar.currentHeight + 4;

export const windowWidth = Dimensions.get('window').width;