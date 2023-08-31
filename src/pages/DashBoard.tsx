import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
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
import { MapTab } from "./Dashboard/MapTab";
import TimeTab from "./Dashboard/TimeTab";
import { theme } from "../theme";
import { SimpleDropdown } from "../common/SimpleDropdown";
import ForecastTab from "./Dashboard/ForecastTab";

// start yesterday at midnight (local time)

const placeholderWeatherPredictionsByHour: WWWData[] = [placeholderWWWData];

const makeDummyRawWeatherData = () => {
  // correct the times of the dummy data
  return {
    ...dummyRawWeatherData,
    hours: dummyRawWeatherData.hours.map((hour, id) => {
      var time = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
      time.setHours(0, 0, 0, 0);
      time = new Date(time.getTime() + 1000 * 60 * 60 * id);
      return {
        ...hour,
        time,
      };
    }),
  };
};

const weatherKeys = [
  // "a9a8d62a-409f-11ee-92e6-0242ac130002-a9a8d68e-409f-11ee-92e6-0242ac130002",
  // "746e3610-6106-11eb-8ed6-0242ac130002-746e367e-6106-11eb-8ed6-0242ac130002",
  // "3ab4f248-40a0-11ee-a26f-0242ac130002-3ab4f2e8-40a0-11ee-a26f-0242ac130002",
  // "5ccc86d8-40a1-11ee-a26f-0242ac130002-5ccc8746-40a1-11ee-a26f-0242ac130002",
  // "8d4a9656-40a1-11ee-86b2-0242ac130002-8d4a96b0-40a1-11ee-86b2-0242ac130002",
  // "a2fa695e-40a1-11ee-8b7f-0242ac130002-a2fa6a1c-40a1-11ee-8b7f-0242ac130002",
  // "bd3fea3c-40a1-11ee-a654-0242ac130002-bd3feab4-40a1-11ee-a654-0242ac130002",
  "d009d7f4-40a1-11ee-a654-0242ac130002-d009d858-40a1-11ee-a654-0242ac130002",
  // "e69317ce-40a1-11ee-86b2-0242ac130002-e693183c-40a1-11ee-86b2-0242ac130002",
  // "f5c4d00c-40a1-11ee-8b7f-0242ac130002-f5c4d138-40a1-11ee-8b7f-0242ac130002",
  // "05ce77f0-40a2-11ee-a26f-0242ac130002-05ce785e-40a2-11ee-a26f-0242ac130002",
  // "160bfb06-40a2-11ee-86b2-0242ac130002-160bfb92-40a2-11ee-86b2-0242ac130002",
  // "323dd358-40a2-11ee-a654-0242ac130002-323dd3c6-40a2-11ee-a654-0242ac130002",
  // "4bffcb98-40a2-11ee-8d52-0242ac130002-4bffd07a-40a2-11ee-8d52-0242ac130002",
  // "72cf0040-40a2-11ee-a654-0242ac130002-72cf00a4-40a2-11ee-a654-0242ac130002",
  // "85bcd394-40a2-11ee-a654-0242ac130002-85bcd416-40a2-11ee-a654-0242ac130002",
  // "9de9655e-40a2-11ee-a26f-0242ac130002-9de965c2-40a2-11ee-a26f-0242ac130002",
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
  }
  const rawWeatherData =
    weatherFromServer.hours === undefined
      ? makeDummyRawWeatherData()
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
  // console.log("received astro data:", data);
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
  // console.log("received tide data");
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
    // console.log("Dashboard - useEffect [location]");
    if (location && location.coordinates) {
      getWeatherPredictions(location.coordinates).then(
        (newPredictions: WWWData[]) => {
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
    <View style={styles.dashboardHolder}>
      <ScrollView>
        <View style={styles.dashboard}>
          <LocationTab
            location={location ? location.name : ""}
            country={location ? location.region : ""}
            setLocation={setLocation}
          />
          <TimeTab
            // time={predictions[currentPredictionId].time}
            currentHourId={currentHourId}
            astroData={astroData}
            tideData={tideData}
            weatherPredictionsByHour={weatherPredictionsByHour}
            onMinus3hours={() => {
              // console.log(
              //   "onMinus3hours " +
              //     currentHourId +
              //     " " +
              //     Math.max(0, currentHourId - 3)
              // );
              setCurrentHourId(Math.max(0, currentHourId - 3));
            }}
            onPlus3hours={() => {
              // console.log(
              //   "onPlus3hours " +
              //     currentHourId +
              //     " " +
              //     Math.min(0, currentHourId + 3)
              // );
              setCurrentHourId(
                Math.min(
                  weatherPredictionsByHour?.length - 1,
                  currentHourId + 3
                )
              );
            }}
          />
          <MapTab
            location={location}
            windData={
              weatherPredictionsByHour &&
              weatherPredictionsByHour[currentHourId]?.windData
            }
            wavesData={
              weatherPredictionsByHour &&
              weatherPredictionsByHour[currentHourId]?.wavesData
            }
          />
          {/* {console.log("weatherPredictionsByHour", weatherPredictionsByHour)}
        {console.log("currentHourId", currentHourId)} */}
          <WeatherTab
            weatherData={
              weatherPredictionsByHour &&
              weatherPredictionsByHour[currentHourId]?.weatherData
            }
          />
          <WindWavesTab
            windData={
              weatherPredictionsByHour &&
              weatherPredictionsByHour[currentHourId]?.windData
            }
            wavesData={
              weatherPredictionsByHour &&
              weatherPredictionsByHour[currentHourId]?.wavesData
            }
          />

          <ForecastTab
            predictions={weatherPredictionsByHour}
            currentPredictionId={currentHourId}
            setCurrentPredictionId={setCurrentHourId}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  dashboardHolder: {
    marginTop: statusBarHeight,
  },
  dashboard: {
    // backgroundColor: theme.tabColor,
    // backgroundColor: "#00ff00",
    // height: "100%",
    // width: "100%",
    maxWidth: 900,
    // margin: margin(32, "auto"),
    // border: 0.125em solid rgba(0, 0, 0, 0);
    borderRadius: s(24),
    marginTop: s(12),
    marginBottom: s(12),
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "rgba(0, 0, 0, 0)",

    overflow: "hidden",
    // filter: drop-shadow(0px 0.2em 2em rgba(0, 0, 0, 0.1));
  },
});

export default Dashboard;
