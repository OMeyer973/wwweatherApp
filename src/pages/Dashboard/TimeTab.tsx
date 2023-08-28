import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CloseIcon from "../../../assets/icons/UI/CloseIcon";

import { theme } from "../../theme";
import { AstroData, TideData, WWWData } from "~types";
import { oneDay, oneHour } from "../../constants";
import { s } from "react-native-size-matters";
import Timetable from "./TimeTab/Timetable";

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

  const time =
    weatherPredictionsByHour && weatherPredictionsByHour[currentHourId]?.time
      ? weatherPredictionsByHour[currentHourId].time
      : new Date();

  return (
    <View style={styles.tab}>
      <View style={styles.main}>
        <TouchableOpacity onPress={onMinus3hours}>
          <Text style={styles.btnMinus3h}>-3h</Text>
        </TouchableOpacity>
        <View style={styles.timeInfo}>
          <Text style={{ ...theme.valueSlim, textAlign: "center" }}>
            {weekDays[(time.getDay() + 6) % 7] +
              ", " +
              months[time.getMonth()].toLowerCase() +
              " " +
              time.getDate() +
              nth[time.getDate() % 10]}
          </Text>
          <Text style={{ ...theme.value, textAlign: "center" }}>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={{ ...theme.valueSlim, textAlign: "center" }}>
            ({makeRelativeTimeLabel(time)})
          </Text>
        </View>
        <TouchableOpacity onPress={onPlus3hours}>
          <Text style={styles.btnPlus3h}>+3h</Text>
        </TouchableOpacity>
      </View>
      {showTimetable ? (
        <Timetable
          currentHourId={currentHourId}
          astroData={astroData}
          tideData={tideData}
          weatherPredictionsByHour={weatherPredictionsByHour}
        />
      ) : (
        ""
      )}
      <TouchableOpacity onPress={() => setShowTimetable(!showTimetable)}>
        <Text style={styles.showTimetable}>{`${
          showTimetable ? "hide" : "show"
        } timetable`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  tab: {
    ...theme.cardSecondary,
    ...theme.flexUtil,
    flexDirection: "column",
    zIndex: 1, // to make sure showTimeTable button is over the next tab
  } as ViewStyle,
  main: {
    ...theme.flexUtil,
    width: "100%",
    justifyContent: "space-between",
    textAlign: "center",
  } as ViewStyle,
  timeInfo: {
    flexShrink: 1,
  },
  btnMinus3h: {
    ...theme.buttonPrimary,
    marginLeft: s(-10),
  },
  btnPlus3h: {
    ...theme.buttonPrimary,
    marginRight: s(-10),
  },
  showTimetable: {
    ...theme.buttonSecondary,
    textAlign: "center",
    marginBottom: s(-30),
    transform: [{ translateY: s(13) }],
  },
});
export default TimeTab;
