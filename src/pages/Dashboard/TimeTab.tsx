import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CloseIcon from "../../../assets/icons/UI/CloseIcon";

import { theme } from "../../theme";
import { AstroData, TideData, WWWData } from "~types";
import { oneDay, oneHour } from "../../constants";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nth = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

export const makeRelativeTimeLabel = (time: Date) => {
  const hoursDifference = Math.round(
    (new Date(time).valueOf() - new Date().valueOf()) / oneHour
  );
  if (Math.abs(hoursDifference) <= 12) {
    if (Math.abs(hoursDifference) < 1) return "now";
    if (hoursDifference > 0)
      return "in " + hoursDifference.toFixed(0) + " hours";
    return (-hoursDifference).toFixed(0) + " hours ago";
  }

  const daysDifference = Math.round(
    (new Date(time).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) /
      oneDay
  );
  if (daysDifference === 0) return "today";
  if (daysDifference === +1) return "tomorrow";
  if (daysDifference > 1) return "in " + daysDifference.toFixed(0) + " days";
  if (daysDifference === -1) return "yesterday";
  if (daysDifference < -1) return (-daysDifference).toFixed(0) + " days ago";
};

export interface Props {
  currentHourId: number;
  astroData: AstroData[];
  tideData: TideData[];
  weatherPredictionsByHour: WWWData[];
  onMinus3hours: () => void;
  onPlus3hours: () => void;
}

export const TimeTab: React.FC<Props> = ({
  currentHourId,
  astroData,
  tideData,
  weatherPredictionsByHour,
  onMinus3hours,
  onPlus3hours,
}) => {
  const [showTimetable, setShowTimetable] = useState<boolean>(false);
  const [currentDayId, setCurrentDayId] = useState(0);

  useEffect(() => {
    // console.log("TimeTab - useEffect [currentHourId] " + currentHourId);
    setCurrentDayId(Math.floor(currentHourId / 24));
  }, [currentHourId]);

  const time = weatherPredictionsByHour[currentHourId].time;

  return (
    <View className="time-tab">
      <View className="main">
        <View className="time-info">
          <Text style={theme.valueSlim}>
            {weekDays[(time.getDay() + 6) % 7] +
              ", " +
              months[time.getMonth()].toLowerCase() +
              " " +
              time.getDate() +
              nth[time.getDate() % 10]}
          </Text>
          <Text style={theme.value}>
            {("00" + time.getHours()).slice(-2) +
              ":" +
              ("00" + time.getMinutes()).slice(-2)}
          </Text>
          <Text style={theme.valueSlim}>({makeRelativeTimeLabel(time)})</Text>
        </View>
        <TouchableOpacity
          style={theme.buttonPrimary}
          // className="btn-minus-3h"
          onPress={onMinus3hours}
        >
          <Text>-3h</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={theme.buttonPrimary}
          // className="btn-plus-3h"
          onPress={onPlus3hours}
        >
          <Text>+3h</Text>
        </TouchableOpacity>
      </View>
      <>
        <TouchableOpacity
          style={theme.buttonsecondary}
          onPress={() => setShowTimetable(!showTimetable)}
          // className="show-timetable"
        >
          <Text>{`${showTimetable ? "hide" : "show"} timetable`}</Text>
        </TouchableOpacity>
        {/* {showTimetable ? (
            <Timetable
              currentHourId={currentHourId}
              astroData={astroData}
              tideData={tideData}
              weatherPredictionsByHour={weatherPredictionsByHour}
            />
          ) : (
            ""
          )} */}
      </>
    </View>
  );
};

const styles = ScaledSheet.create({
  tab: { ...theme.flexUtil, alignItems: "flex-start" },
  weatherData: {
    alignItems: "center",
    maxWidth: 448,
    // width: "100%",
    // height: "100%",
  },
  searchButton: {
    // from HomePage.jsx
    padding: 10,
    margin: -10,
    borderRadius: 24,
  },
});
export default TimeTab;
