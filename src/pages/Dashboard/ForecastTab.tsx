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

import Value from "../../components/Value";
import { theme } from "../../theme.js";
import { Location, WindData, WavesData, WWWData } from "types";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { angleToCardinal, clamp } from "../../utils";
import { Svg, SvgUri } from "react-native-svg";
import SimpleDropdown from "../../common/SimpleDropdown";
import { oneHour } from "../../constants";

// import { Magnet } from "../../components/atoms/Magnet";

export type GraphType = "wind" | "waves" | "weather";

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

// const isTouchEnabled = () =>
//   "ontouchstart" in window ||
//   navigator.maxTouchPoints > 0 ||
//   navigator.msMaxTouchPoints > 0;

// const useResize = (myRef: any) => {
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setWidth(myRef.current.offsetWidth);
//       setHeight(myRef.current.offsetHeight);
//     };
//     window.addEventListener("resize", throttle(handleResize, 200));
//     return () => {
//       window.removeEventListener("resize", throttle(handleResize, 200));
//     };
//   }, [myRef]);
//   return { width, height };
// };

export interface Props {
  predictions: WWWData[];
  currentPredictionId: number;
  setCurrentPredictionId: React.Dispatch<React.SetStateAction<number>>;
}

export const ForecastTab: React.FC<Props> = ({
  predictions,
  currentPredictionId,
  setCurrentPredictionId,
}) => {
  // const [graphType, setGraphType] = useState<GraphType>("wind");

  const options = ["Wind forecast", "Waves forecast", "Weather forecast"];

  const graphContainerWidthRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const graphContainer = useRef(null);
  // useResize(graphContainer);
  // const graphContainerWidth = graphContainer.current
  //   ? graphContainer.current.offsetWidth
  //   : 0;
  // const graphWidth: number = isTouchEnabled()
  //   ? Math.max(800, graphContainerWidth)
  //   : graphContainerWidth;

  const currTime = predictions[currentPredictionId].time;

  const onGraphTouch = (e) => {
    if (e.nativeEvent.locationX) {
      setCurrentPredictionId(
        clamp(
          Math.floor(
            (e.nativeEvent.locationX / graphWidth) * predictions.length
          ),
          0,
          predictions.length - 1
        )
      );
    }
  };
  const graphWidth = 800; // todo make dynamic?

  const primaryCursorPosition =
    (currentPredictionId / predictions.length) * graphWidth;
  const secondaryCursorPosition =
    (predictions.findIndex(
      (item) => Math.abs(item.time.valueOf() - Date.now()) < oneHour
    ) /
      predictions.length) *
    graphWidth;

  // const handleScroll = (event) => {
  //   scrollOffsetRef.current = event.nativeEvent.contentOffset.x;
  //   setScrollOffset(event.nativeEvent.contentOffset.x);
  //   console.log(event.nativeEvent.contentOffset.x);
  // };

  return (
    <View style={styles.tab}>
      <SimpleDropdown
        defaultValue={"Wind forecast"}
        options={options}
        dropdownTextStyle={theme.title as ViewStyle}
        dropUp={true}
        onChange={(e) => console.log("todo change graph ", e)}
      />
      <ScrollView
        style={styles.graphHolder}
        horizontal={true}
        ref={graphContainer}
        // onScroll={handleScroll}
        onTouchStart={onGraphTouch}
      >
        <View // FORECAST GRAH GOES HERE
          style={{
            backgroundColor: "#aef",
            width: graphWidth,
            height: s(90),
          }}
        ></View>
        <View
          style={{
            ...styles.cursorPrimary,
            left: primaryCursorPosition,
          }}
        ></View>
        <View
          style={{
            ...styles.cursorSecondary,
            left: secondaryCursorPosition,
          }}
        ></View>
        {/* <ForecastGraph
          predictions={predictions}
          graphType={graphType}
          graphWidth={graphWidth}
          onMouseMove={setPredictionFromMouseEvent}
        /> */}
        {/* 
        <BoundedLabel
          minX={0}
          maxX={graphWidth}
          centerX={secondaryCursorPosition}
          style = {styles.graphLabel}
        >
          <Magnet color="secondary">Now </Magnet>
        </BoundedLabel>

        <BoundedLabel
          size={{ width: 120, height: 100 }} // non mandatory, prevents flickering
          minX={0}
          maxX={graphWidth}
          centerX={primaryCursorPosition}
          style = {styles.graphLabel}
        >
          <Magnet>
            {weekDays[(currTime.getDay() + 6) % 7] +
              " " +
              months[currTime.getMonth()].toLowerCase() +
              " " +
              currTime.getDate() +
              " " +
              ("00" + currTime.getHours()).slice(-2) +
              ":" +
              ("00" + currTime.getMinutes()).slice(-2)}
          </Magnet>
          <br />
          <label style = {styles.label}>
            {" (" + makeRelativeTimeLabel(currTime) + ")"}
          </label>
        </BoundedLabel> */}
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  tab: {
    ...(theme.cardPrimary as ViewStyle),
  },
  graphHolder: {
    marginTop: s(24),
  },
  cursorPrimary: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: s(3),
    backgroundColor: theme.buttonBgColor,
    // marginLeft: "50%",
  },
  cursorSecondary: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: s(3),
    backgroundColor: theme.buttonBgColorSecondary,
  },
});
export default ForecastTab;
