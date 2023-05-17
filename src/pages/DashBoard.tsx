import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";

import { Dimensions, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import RightArrowIcon from "../../assets/icons/UI/RightArrowIcon";
import {
  numberDaysPredicted,
  oneDay,
  oneHour,
  placeholderWWWData,
  startDate,
  statusBarHeight,
} from "../constants";
import { makeWWWData, margin } from "../utils";

import dummyRawWeatherData from "../dummyRawWeatherData.json";
import { Location, Coordinates, WWWData } from "../types";
import LocationTab from "./Dashboard/LocationTab";
import WeatherTab from "./Dashboard/WeatherTab";
import WindWavesTab from "./Dashboard/WindWavesTab";

// start yesterday at midnight (local time)

const placeholderWeatherPredictionsByHour: WWWData[] = [placeholderWWWData];

const weatherKeys = [
  // "8ea1e1a8-ae72-11eb-849d-0242ac130002-8ea1e248-ae72-11eb-849d-0242ac130002",
  "746e3610-6106-11eb-8ed6-0242ac130002-746e367e-6106-11eb-8ed6-0242ac130002",

  // "66b43972-ae8e-11eb-8d12-0242ac130002-66b439ea-ae8e-11eb-8d12-0242ac130002",
  // "2c7517f8-ae8f-11eb-9f40-0242ac130002-2c7518fc-ae8f-11eb-9f40-0242ac130002",
  // "025354a6-b1e3-11eb-9f40-0242ac130002-0253551e-b1e3-11eb-9f40-0242ac130002",
  // "941a0b2a-b1e6-11eb-8d12-0242ac130002-941a0ba2-b1e6-11eb-8d12-0242ac130002",
  // "0b3a1686-b1f2-11eb-849d-0242ac130002-0b3a16fe-b1f2-11eb-849d-0242ac130002",
  // "bfd056a6-b1f6-11eb-8d12-0242ac130002-bfd0571e-b1f6-11eb-8d12-0242ac130002",
  // "5393b808-b1fa-11eb-8d12-0242ac130002-5393b880-b1fa-11eb-8d12-0242ac130002",
  // "3ebcf5e6-b1fc-11eb-80d0-0242ac130002-3ebcf65e-b1fc-11eb-80d0-0242ac130002",
  // "c85bc6b4-b2a7-11eb-80d0-0242ac130002-c85bc72c-b2a7-11eb-80d0-0242ac130002",
  // "03ccbf6e-b2ad-11eb-849d-0242ac130002-03ccbffa-b2ad-11eb-849d-0242ac130002",
];
const fetchWeatherData = async (coordinates: Coordinates) => {
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  // console.log("fetching WWW Data");
  const res = await fetch(
    `https://api.stormglass.io/v2/weather/point?start=${startDate.toISOString()}&lat=${lat}&lng=${lng}&params=${"airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windDirection20m,windDirection30m,windDirection40m,windDirection50m,windDirection80m,windDirection100m,windSpeed,windSpeed20m,windSpeed30m,windSpeed40m,windSpeed50m,windSpeed80m,windSpeed100m"}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  console.log(weatherKeys[Date.now() % weatherKeys.length]);
  const data = await res.json();
  return data;
};

const getWeatherPredictions: (coordinates: Coordinates) => any = async (
  coordinates
) => {
  const weatherFromServer = await fetchWeatherData(coordinates);
  if (weatherFromServer.hours === undefined) {
    console.error("weatherFromServer", weatherFromServer);
    console.error(
      "couldn't fetch data from weather api, fallback to dummy data"
    );
    return;
  }
  const rawWeatherData =
    weatherFromServer.hours === undefined
      ? dummyRawWeatherData
      : weatherFromServer;

  return rawWeatherData.hours.map((hour: any) => makeWWWData(hour));
};

const fetchAstroData = async (coordinates: Coordinates) => {
  const endDate = new Date(
    startDate.valueOf() + numberDaysPredicted * oneDay - oneHour
  );
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  // console.log("fetching astro Data");
  const res = await fetch(
    `https://api.stormglass.io/v2/astronomy/point?start=${startDate.toISOString()}&end=${endDate.toISOString()}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  const data = await res.json();
  return data;
};

const fetchTideData = async (coordinates: Coordinates) => {
  // further end date than astro data bc astro returns one data object per day vs one per tide here
  const endDate = new Date(
    startDate.valueOf() + numberDaysPredicted * oneDay + oneHour
  );
  const lat = coordinates.latitude;
  const lng = coordinates.longitude;
  // console.log("fetching tide Data");
  const res = await fetch(
    `https://api.stormglass.io/v2/tide/extremes/point?start=${startDate.toISOString()}&end=${endDate.toISOString()}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        Authorization: weatherKeys[Date.now() % weatherKeys.length],
      },
    }
  );
  const data = await res.json();
  return data;
};

export interface Props {
  location: Location | null;
  setLocation: any; // todo
}

const Dashboard: React.FC<Props> = ({ location, setLocation }) => {
  const [weatherPredictionsByHour, setWeatherPredictionsByHour] = useState(
    placeholderWeatherPredictionsByHour
  ); // todo make null & fix errors
  const [currentHourId, setCurrentHourId] = useState(0);
  const [astroData, setAstroData] = useState([]);
  const [tideData, setTideData] = useState([]);

  useEffect(() => {
    if (location && location.coordinates) {
      getWeatherPredictions(location.coordinates).then(
        (newPredictions: WWWData[]) => {
          if (newPredictions.hours === undefined) {
            return;
          }
          setWeatherPredictionsByHour(newPredictions);
          setCurrentHourId(
            newPredictions?.findIndex(
              (item: WWWData) =>
                Math.abs(item.time.valueOf() - Date.now()) < oneHour
            )
          );
        }
      );

      fetchAstroData(location.coordinates).then((newAstroData) =>
        setAstroData(newAstroData.data)
      );
      fetchTideData(location.coordinates).then((newTideData) =>
        setTideData(newTideData.data)
      );
    }
  }, [location]);

  return (
    <>
      <View style={styles.dashboard}>
        <LocationTab
          location={location ? location.name : ""}
          country={location ? location.region : ""}
        />
        {/* <TimeTab
          // time={predictions[currentPredictionId].time}
          currentHourId={currentHourId}
          astroData={astroData}
          tideData={tideData}
          weatherPredictionsByHour={weatherPredictionsByHour}
          onMinus3hours={() => {
            console.log(currentHourId);
            console.log(Math.max(0, currentHourId - 3));
            setCurrentHourId(Math.max(0, currentHourId - 3));
          }}
          onPlus3hours={() => {
            console.log(currentHourId);
            setCurrentHourId(
              Math.min(weatherPredictionsByHour.length - 1, currentHourId + 3)
            );
          }}
        />

        <MapTab
          location={location}
          windData={weatherPredictionsByHour[currentHourId].windData}
          wavesData={weatherPredictionsByHour[currentHourId].wavesData}
        />*/}
        {/* {console.log("weatherPredictionsByHour", weatherPredictionsByHour)}
        {console.log("currentHourId", currentHourId)} */}
        <WeatherTab
          weatherData={
            weatherPredictionsByHour &&
            weatherPredictionsByHour[currentHourId] &&
            weatherPredictionsByHour[currentHourId].weatherData
          }
        />
        <WindWavesTab
          windData={
            weatherPredictionsByHour &&
            weatherPredictionsByHour[currentHourId] &&
            weatherPredictionsByHour[currentHourId].windData
          }
          wavesData={
            weatherPredictionsByHour &&
            weatherPredictionsByHour[currentHourId] &&
            weatherPredictionsByHour[currentHourId].wavesData
          }
        />

        {/*<ForecastTab
          predictions={weatherPredictionsByHour}
          currentPredictionId={currentHourId}
          setCurrentPredictionId={setCurrentHourId}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    marginTop: statusBarHeight,
    // height: "100%",
    // width: "100%",
    maxWidth: 900,
    // margin: margin(32, "auto"),
    // border: 0.125em solid rgba(0, 0, 0, 0);
    borderRadius: 24,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "rgba(0, 0, 0, 0)",

    overflow: "hidden",
    // filter: drop-shadow(0px 0.2em 2em rgba(0, 0, 0, 0.1));
  },
});

export default Dashboard;
