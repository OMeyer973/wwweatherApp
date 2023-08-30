import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ScrollView,
  TextStyle,
  Dimensions,
  RotateTransform,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from "react-native-size-matters";
// import { AreaChart, XAxis, YAxis, CartesianGrid, Area } from "recharts";

import Color from "color";

import Value from "../../../components/Value";
import { theme } from "../../../theme.js";
import { Location, WindData, WavesData, WWWData } from "types";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { angleToCardinal, clamp } from "../../../utils";
import { Svg, SvgUri, Line, Path } from "react-native-svg";
import SimpleDropdown from "../../../common/SimpleDropdown";
import { oneHour } from "../../../constants";
import { makeRelativeTimeLabel } from "../TimeTab";
import { Gradient } from "../../../common/Gradient";

export type GraphType = "wind" | "waves" | "weather";

export interface GraphColorScheme {
  gradient: Gradient;
  strokeColor: Color;
  opacity: number;
  fatStroke?: boolean;
}

export interface GraphProperties {
  colors: GraphColorScheme[];
  maxY: number;
}

export interface GraphDataPoint {
  value0: number;
  value1: number;
  value2: number;
  time: Date;
}

export interface GridPoint {
  position: number;
  label: string;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const windColors = new Gradient(
  Color("#ffffff"),
  Color("#ffa200"),
  Color("#ff6000"),
  Color("#c30017"),
  Color("#45002d"),
  Color("#000000")
);

const windSpeedColorScheme: GraphColorScheme = {
  gradient: windColors,
  strokeColor: new Color("#c30017"),
  opacity: 0.9,
};

const windGustsColorScheme: GraphColorScheme = {
  gradient: windColors,
  strokeColor: new Color("#45002d"),
  opacity: 1,
};

const wavesGraphColors = new Gradient(
  Color("#ffffff"),
  Color("#88eaff"),
  Color("#00ff7e"),
  Color("#177d92"),
  Color("#171792"),
  Color("#000000")
);

const wavesHeightColorScheme: GraphColorScheme = {
  gradient: wavesGraphColors,
  strokeColor: new Color("#177d92"),
  opacity: 1,
};

const seaLevelColorScheme: GraphColorScheme = {
  gradient: wavesGraphColors,
  strokeColor: new Color("#177d92"),
  opacity: 0.8,
};

const cloudsColorScheme: GraphColorScheme = {
  gradient: new Gradient(
    Color("#fdff5f"),
    Color("#8f9e8f"),
    Color("#737385"),
    Color("#4a444e")
  ),
  strokeColor: new Color("#4a444e"),
  opacity: 0.7,
};

const rainColorScheme: GraphColorScheme = {
  gradient: new Gradient(
    Color("#fdff5f"),
    Color("#6aacb0"),
    Color("#1c4b85"),
    Color("#152f4e")
  ),
  strokeColor: new Color("#006E9E"),
  opacity: 1,
};

const temperatureColorScheme: GraphColorScheme = {
  // gradient: new Gradient(
  //   Color("#00162e"),
  //   Color("#2e47ff"),
  //   Color("#a31fa3"),
  //   Color("#b82828"),
  //   Color("#3c0d1d")
  // ),
  gradient: windColors,
  strokeColor: new Color("#a31fa3"),
  opacity: 0,
  fatStroke: true,
};

export interface Props {
  graphType: GraphType;
  predictions: WWWData[];
  graphWidth: number;
  graphHeight: number;
  onMouseMove?: any;
}

export const ForecastGraph: React.FC<Props> = ({
  graphType,
  predictions,
  graphWidth,
  graphHeight,
  onMouseMove,
}) => {
  const graphProperties: GraphProperties =
    graphType === "wind"
      ? { colors: [windSpeedColorScheme, windGustsColorScheme], maxY: 40 }
      : graphType === "waves"
      ? { colors: [wavesHeightColorScheme, seaLevelColorScheme], maxY: 8 }
      : graphType === "weather"
      ? {
          colors: [temperatureColorScheme, rainColorScheme, cloudsColorScheme],
          maxY: 110,
        }
      : { colors: [], maxY: 0 };

  const graphData: GraphDataPoint[] =
    predictions === undefined
      ? []
      : predictions
          .filter((prediction) => prediction.time.getHours() % 3 === 0)
          .map((prediction) => ({
            value0:
              graphType === "wind"
                ? prediction.windData.speed
                : graphType === "waves"
                ? prediction.wavesData.height
                : graphType === "weather"
                ? prediction.weatherData.temperature * 2
                : 0,

            value1:
              graphType === "wind"
                ? prediction.windData.gusts
                : graphType === "waves"
                ? 0 // todo : sea level (!= prediction.wavesData.tide)
                : graphType === "weather"
                ? prediction.weatherData.riskOfRain
                : 0,

            value2:
              graphType === "wind"
                ? 0
                : graphType === "waves"
                ? 0
                : graphType === "weather"
                ? prediction.weatherData.cloudCover
                : 0,

            time: prediction.time,
          }));

  // console.log("graphData ", graphData);
  const svgHeight = (value) =>
    graphHeight - (value * graphHeight) / graphProperties.maxY;

  const gridData: GridPoint[] = graphData
    .map((item, id, array) => ({
      label:
        weekDays[(item.time.getDay() + 6) % 7] +
        "\xa0" +
        item.time.getMonth() +
        "/" +
        item.time.getDate(),
      position:
        id < 1
          ? -2
          : item.time.getHours() === 0
          ? ((id - 0.5) * graphWidth) / (array.length - 1)
          : -1,
    }))
    .filter((item) => item.position != -1);
  return React.useMemo(() => {
    return (
      <View className="forecast-graph">
        <Svg
          className="fprecast-graph"
          width={graphWidth}
          height={graphHeight}
          viewBox={`0 0 ${graphWidth} ${graphHeight}`}
          // style={{ backgroundColor: "#afe" }}
        >
          {gridData.map((item) => {
            return (
              <Line
                // vertical grid
                strokeDasharray={s(5) + " " + s(5.5)}
                stroke="#ccc"
                strokeWidth={s(2)}
                fill="none"
                x1={item.position}
                y1={graphHeight}
                x2={item.position}
                y2={0}
              />
            );
          })}

          {graphProperties.colors.map((_, id, array) => {
            const graphId = array.length - id - 1;
            const item = array[graphId];
            // return (
            //   <Area
            //     key={graphId}
            //     type="monotone"
            //     dataKey={"value" + graphId}
            //     stroke={
            //       item.fatStroke
            //         ? "url(#value" + graphId + ")"
            //         : item.strokeColor.hex()
            //     }
            //     strokeWidth={item.fatStroke ? 4 : 2}
            //     fillOpacity={item.opacity}
            //     fill={"url(#value" + graphId + ")"}
            //   />
            // );
            return (
              <Path
                fillOpacity="1"
                strokeWidth={item.fatStroke ? s(4) : s(2)}
                fill="#000"
                stroke={graphProperties.colors[0].strokeColor.hex()}
                // fill="url(#value1)"
                // width="730"
                // height="68"
                // stroke="none"
                // opacity={graphProperties.colors[0].opacity}
                d={
                  "M-10," +
                  (graphHeight + 10) +
                  "L-10," +
                  svgHeight(graphData.length ? graphData[0].value0 : 0) +
                  graphData.reduce(
                    (acc, dataPoint, i) =>
                      acc +
                      "L" +
                      (i * graphWidth) / graphData.length +
                      "," +
                      svgHeight(dataPoint.value0) +
                      " ",
                    ""
                  ) +
                  "L" +
                  graphWidth +
                  10 +
                  "," +
                  graphHeight +
                  10 +
                  "L" +
                  graphWidth +
                  10 +
                  "," +
                  graphHeight +
                  10
                }
                // width={console.log(
                //   graphData.reduce(
                //     (acc, dataPoint, i) =>
                //       acc +
                //       "L " +
                //       (i * graphWidth) / graphData.length +
                //       " " +
                //       dataPoint.value0 +
                //       " ",
                //     ""
                //   )
                // )}
              />
            );
          })}
        </Svg>
        {/* <AreaChart
          onMouseMove={onMouseMove}
          width={graphWidth}
          height={100}
          data={graphData}
          margin={{ top: 2, right: 0, left: 1, bottom: 0 }}
        >
          <defs>
            {graphProperties.colors.map((item, graphId: number) => (
              <linearGradient
                key={graphId}
                id={"value" + graphId}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                {graphData.map((item, id) => (
                  <stop
                    key={id}
                    offset={"" + (id / graphData.length) * 100 + "%"}
                    stopColor={graphProperties.colors[graphId].gradient
                      .eval(
                        graphProperties.maxY == 0
                          ? 0
                          : graphData[id]["value" + graphId] /
                              graphProperties.maxY
                      )
                      .hex()}
                  />
                ))}
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="time" ticks={[0]} />
          <YAxis
            domain={[
              0,
              (dataMax: number) => Math.max(graphProperties.maxY, dataMax),
            ]}
            hide={true}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            verticalPoints={gridData.map((item) => item.position)}
            style={{ strokeWidth: "0.1em", stroke: "rgba(0, 0, 0, 0.7)" }}
          />
          {graphProperties.colors.map((_, id, array) => {
            const graphId = array.length - id - 1;
            const item = array[graphId];
            return (
              <Area
                key={graphId}
                type="monotone"
                dataKey={"value" + graphId}
                stroke={
                  item.fatStroke
                    ? "url(#value" + graphId + ")"
                    : item.strokeColor.hex()
                }
                strokeWidth={item.fatStroke ? 4 : 2}
                fillOpacity={item.opacity}
                fill={"url(#value" + graphId + ")"}
              />
            );
          })}
        </AreaChart> */}
        <View style={styles.gridLabels}>
          {gridData.map((item) => {
            return (
              <Text
                style={{ ...styles.gridLabel, left: item.position + s(4) }}
                key={item.label}
              >
                {item.label}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }, [graphType, predictions, graphWidth]);
};
const styles = ScaledSheet.create({
  gridLabels: {
    position: "relative",
    height: 30,
    // ...(theme.cardPrimary as ViewStyle),
  },
  gridLabel: {
    ...theme.label,
    position: "absolute",
    top: 0,
  },
});

export default ForecastGraph;
