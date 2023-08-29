import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CloseIcon from "../../../../assets/icons/UI/CloseIcon";

import { theme } from "../../../theme";
import {
  AstroData,
  TideData,
  TidesToday,
  WWWData,
  WavesMinMax,
  WindMinMax,
} from "~types";
import {
  oneDay,
  oneHour,
  placeholderWWWData,
  startDate,
  numberDaysPredicted,
} from "../../../constants";
import { s } from "react-native-size-matters";
import { isSameDay } from "../../../utils";

const daysPredicted = Array(numberDaysPredicted)
  .fill(0)
  .map((item, id) => new Date(startDate.valueOf() + oneDay * id));

const makeTidesByDay: (tideData: TideData[]) => TidesToday[] = (tideData) =>
  daysPredicted.map((date: Date) => ({
    lowTides: !tideData?.length
      ? []
      : tideData.filter(
          (tideItem: TideData) =>
            isSameDay(new Date(tideItem.time), date) && tideItem.type == "low"
        ),

    highTides: !tideData?.length
      ? []
      : tideData.filter(
          (tideItem: TideData) =>
            isSameDay(new Date(tideItem.time), date) && tideItem.type == "high"
        ),
  }));

const makeWindMinmaxsByDay: (predictions: WWWData[]) => WindMinMax[] = (
  predictions
) =>
  daysPredicted.map((date: Date) => {
    const todaysPredictions = !predictions?.length
      ? []
      : predictions.filter((item) => isSameDay(item.time, date));
    return {
      fastestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed >=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
      slowestWind: todaysPredictions.reduce(
        (prev, current) =>
          prev.windData.gusts + prev.windData.speed <=
          current.windData.speed + current.windData.gusts
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
    };
  });

const makeWavesMinmaxsByDay: (predictions: WWWData[]) => WavesMinMax[] = (
  predictions
) => {
  if (!predictions || !predictions[0] || !predictions[0].wavesData) return [];
  return daysPredicted.map((date: Date) => {
    const todaysPredictions = predictions.filter((item) =>
      isSameDay(item.time, date)
    );
    return {
      highestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev?.wavesData?.height >= current?.wavesData?.height
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
      lowestWaves: todaysPredictions.reduce(
        (prev, current) =>
          prev?.wavesData?.height <= current?.wavesData?.height
            ? prev
            : current,
        todaysPredictions[0] ? todaysPredictions[0] : placeholderWWWData
      ),
    };
  });
};

export interface Props {
  currentHourId: number;
  astroData: AstroData[];
  tideData: TideData[];
  weatherPredictionsByHour: WWWData[];
}

export const Timetable: React.FC<Props> = React.memo(
  ({ currentHourId, astroData, tideData, weatherPredictionsByHour }) => {
    const [currentDayId, setCurrentDayId] = useState(0);

    useEffect(() => {
      setCurrentDayId(Math.floor(currentHourId / 24));
    }, [currentHourId]);

    const astroDataByDay = astroData;
    const tidesByDay = makeTidesByDay(tideData);
    const windMinmaxsByDay = makeWindMinmaxsByDay(weatherPredictionsByHour);
    const wavesMinmaxsByDay = makeWavesMinmaxsByDay(weatherPredictionsByHour);

    // const time = weatherPredictionsByHour[currentHourId].time;
    return (
      <View id="timetable">
        <View style={{ ...theme.flexUtil, width: "100%" }}>
          {!astroDataByDay[currentDayId] ? (
            ""
          ) : (
            <View style={{ flex: 1, marginBottom: s(16) }}>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Dawn</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    astroData[currentDayId].civilDawn
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Dusk</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    astroData[currentDayId].civilDusk
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
              </View>
            </View>
          )}
          {!tidesByDay[currentDayId] ? (
            <></>
          ) : (
            <View style={{ flex: 1, marginBottom: s(16) }}>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Low Tide</Text>
                {/* <Br under="tiny" />{" "} */}
                <Text style={theme.valueSmall}>
                  {tidesByDay[currentDayId].lowTides.map(
                    (item, id, array) =>
                      new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + (id < array.length - 1 ? " | " : "")
                  )}
                </Text>
              </View>
              <View style={styles.labelValue}>
                <Text style={theme.label}>High Tide</Text>
                {/* <Br under="tiny" />{" "} */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {tidesByDay[currentDayId].highTides.map(
                    (item, id, array) =>
                      new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + (id < array.length - 1 ? " | " : "")
                  )}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={theme.flexUtil}>
          {!windMinmaxsByDay[currentDayId] ? (
            ""
          ) : (
            <View style={{ flex: 1 }}>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Fastest Wind</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    windMinmaxsByDay[currentDayId]?.fastestWind?.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Slowest Wind</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    windMinmaxsByDay[currentDayId]?.slowestWind?.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          )}
          {!wavesMinmaxsByDay[currentDayId] ? (
            ""
          ) : (
            <View style={{ flex: 1 }}>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Highest Waves</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    wavesMinmaxsByDay[currentDayId]?.highestWaves?.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View style={styles.labelValue}>
                <Text style={theme.label}>Lowest Waves</Text>
                {/* <Br under="tiny" /> */}
                <Text style={theme.valueSmall}>
                  {" "}
                  {new Date(
                    wavesMinmaxsByDay[currentDayId]?.lowestWaves?.time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
);

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
  } as ViewStyle,
  labelValue: {
    ...theme.flexUtil,
    flexWrap: "wrap",
    rowGap: 0,
  } as ViewStyle,
});
export default Timetable;
