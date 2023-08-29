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
import { makeRelativeTimeLabel } from "./TimeTab";

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

const graphHeight = s(120);

const boundedTranslate = (displacement, componentSize, containerSize) =>
  Math.min(
    Math.max(0, displacement - componentSize / 2),
    containerSize - componentSize
  );

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

  const [primaryMagnetWidth, setPrimaryMagnetWidth] = useState<number>(0);
  const [secondaryMagnetWidth, setSecondaryMagnetWidth] = useState<number>(0);

  console.log(primaryMagnetWidth);
  const graphContainer = useRef(null);
  // useResize(graphContainer);
  // const graphContainerWidth = graphContainer.current
  //   ? graphContainer.current.offsetWidth
  //   : 0;
  // const graphWidth: number = isTouchEnabled()
  //   ? Math.max(800, graphContainerWidth)
  //   : graphContainerWidth;

  const currTime = predictions[currentPredictionId].time;

  const [touchLocation, setTouchLocation] = useState<any>(null);

  const onTouchStart = (e) => {
    setTouchLocation({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    });
  };
  const onTouchEnd = (e) => {
    if (
      Math.abs(touchLocation.x - e.nativeEvent.locationX) +
        Math.abs(touchLocation.y - e.nativeEvent.locationY) <
      5
    ) {
      onGraphTouch(e);
    }
  };

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
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <View // FORECAST GRAH GOES HERE
          style={{
            backgroundColor: "#aef",
            width: graphWidth,
            height: graphHeight,
            marginBottom: s(54),
          }}
        />

        <View
          style={{
            ...styles.cursorSecondary,
            left: secondaryCursorPosition - s(1.5),
          }}
        />
        {/* <ForecastGraph
          predictions={predictions}
          graphType={graphType}
          graphWidth={graphWidth}
          onMouseMove={setPredictionFromMouseEvent}
        /> */}
        <View
          style={{
            position: "absolute",
            top: graphHeight + s(4),
            // left: boundedTranslate(
            //   secondaryCursorPosition,
            //   secondaryMagnetWidth,
            //   graphWidth
            // ),
            transform: [
              {
                translateX: boundedTranslate(
                  secondaryCursorPosition,
                  secondaryMagnetWidth,
                  graphWidth
                ),
              },
            ],
            zIndex: 1,
          }}
          onLayout={(e) =>
            secondaryMagnetWidth != Math.round(e.nativeEvent.layout.width)
              ? setSecondaryMagnetWidth(Math.round(e.nativeEvent.layout.width))
              : ""
          } // todo find a better way... this may cause infinite render. rounding helps but still not great
        >
          <Text style={{ ...theme.magnetSecondary }}>Now </Text>
        </View>

        <View
          style={{
            ...styles.cursorPrimary,
            left: primaryCursorPosition - s(1.5),
          }}
        />
        <View
          style={{
            position: "absolute",
            top: graphHeight + s(4),
            // left: boundedTranslate(
            //   primaryCursorPosition,
            //   primaryMagnetWidth,
            //   graphWidth
            // ),
            transform: [
              {
                translateX: boundedTranslate(
                  primaryCursorPosition,
                  primaryMagnetWidth,
                  graphWidth
                ),
              },
            ],

            zIndex: 1,
          }}
          onLayout={(e) =>
            primaryMagnetWidth != Math.round(e.nativeEvent.layout.width)
              ? setPrimaryMagnetWidth(Math.round(e.nativeEvent.layout.width))
              : ""
          } // todo find a better way... this may cause infinite render. rounding helps but still not great
        >
          <Text style={{ ...theme.magnetPrimary }}>
            {weekDays[(currTime.getDay() + 6) % 7] +
              " " +
              months[currTime.getMonth()].toLowerCase() +
              " " +
              currTime.getDate() +
              " " +
              ("00" + currTime.getHours()).slice(-2) +
              ":" +
              ("00" + currTime.getMinutes()).slice(-2)}
          </Text>
          <Text style={{ ...theme.label, width: "100%", textAlign: "center" }}>
            {" (" + makeRelativeTimeLabel(currTime) + ")"}
          </Text>
        </View>
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
    height: graphHeight,
    width: s(3),
    backgroundColor: theme.buttonBgColor,
    // marginLeft: "50%",
  },
  cursorSecondary: {
    position: "absolute",
    zIndex: 1,
    height: graphHeight,
    width: s(3),
    backgroundColor: theme.buttonBgColorSecondary,
  },
});
export default ForecastTab;
