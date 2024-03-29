import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Dimensions,
  RotateTransform,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from "react-native-size-matters";

import Value from "../../components/Value";
import { theme } from "../../theme.js";
import { Location, WindData, WavesData } from "types";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { angleToCardinal, clamp } from "../../utils";
import { Svg, SvgUri } from "react-native-svg";
// import { DataColumn } from "~components/molecules/DataColumn";

// import { Magnet } from "~/components/atoms/Magnet";

import WindArrow from "../../../assets/icons/wind-kite-arrow.svg";
import WavesArrow from "../../../assets/icons/waves-kite-arrow.svg";

export interface Props {
  location: Location | null;
  windData: WindData;
  wavesData: WavesData | undefined;
}

export const MapTab: React.FC<Props> = ({ location, windData, wavesData }) => {
  const [bearing, setBearing] = useState(-10);

  const [mapCamera, setMapCamera] = useState({
    center: {
      latitude: location?.coordinates?.latitude || 0,
      longitude: location?.coordinates?.longitude || 0,
    },
    heading: 0,
    pitch: 0,
    zoom: 10,
  });

  const mapViewRef = useRef(null);

  useEffect(() => {
    setMapCamera({
      center: {
        latitude: location?.coordinates?.latitude || 0,
        longitude: location?.coordinates?.longitude || 0,
      },
      heading: 0,
      pitch: 0,
      zoom: 10,
    });
  }, [location]);

  const invertTags = () => {
    if (!wavesData || !windData) return false;
    const wi = (windData.direction - bearing + 360) % 360;
    const wa = (wavesData.direction - bearing + 360) % 360;
    return !(
      (wa < wi && wi < 180) ||
      (180 < wi && wi < wa) ||
      ((wa < 90 || wa > 270) && 90 < wi && wi < 270)
    );
    // ;
  };

  return (
    <View style={styles.tab}>
      {!location || !location.coordinates ? (
        ""
      ) : (
        <View style={styles.compassHolder}>
          <View
            // https://stackoverflow.com/questions/75772025/react-native-invalid-prop-transform-of-type-string-supplied-expected-an-ar
            style={{
              ...styles.compass,
              transform: [{ rotate: `${-bearing}deg` }],
            }}
          >
            <View
              // style={[styles.cardinalGrid, styles.cardinalsPrimary]}
              style={[styles.cardinalGrid]}
            >
              <View style={[styles.cardinalTop]}>
                <Text
                  style={[
                    styles.cardinalText,
                    { transform: [{ rotate: `${bearing}deg` }] },
                  ]}
                >
                  N
                </Text>
              </View>
              <View style={[styles.cardinalLeft]}>
                <Text
                  style={[
                    styles.cardinalText,
                    { transform: [{ rotate: `${bearing}deg` }] },
                  ]}
                >
                  O
                </Text>
              </View>
              <View style={[styles.cardinalRight]}>
                <Text
                  style={[
                    styles.cardinalText,
                    { transform: [{ rotate: `${bearing}deg` }] },
                  ]}
                >
                  E
                </Text>
              </View>
              <View style={[styles.cardinalDown]}>
                <Text
                  style={[
                    styles.cardinalText,
                    { transform: [{ rotate: `${bearing}deg` }] },
                  ]}
                >
                  S
                </Text>
              </View>
            </View>

            <View
              // style={[styles.cardinalGrid, styles.cardinalsSecondary]}
              style={[
                styles.cardinalGrid,
                { transform: [{ rotate: "-45deg" }] },
              ]}
            >
              <View style={[styles.cardinalTop]}>
                <Text
                  style={[
                    styles.cardinalTextSecondary,
                    { transform: [{ rotate: `${bearing + 45}deg` }] },
                  ]}
                >
                  NO
                </Text>
              </View>

              <View style={[styles.cardinalLeft]}>
                <Text
                  style={[
                    styles.cardinalTextSecondary,
                    { transform: [{ rotate: `${bearing + 45}deg` }] },
                  ]}
                >
                  SO
                </Text>
              </View>
              <View style={[styles.cardinalRight]}>
                <Text
                  style={[
                    styles.cardinalTextSecondary,
                    { transform: [{ rotate: `${bearing + 45}deg` }] },
                  ]}
                >
                  NE
                </Text>
              </View>
              <View style={[styles.cardinalDown]}>
                <Text
                  style={[
                    styles.cardinalTextSecondary,
                    { transform: [{ rotate: `${bearing + 45}deg` }] },
                  ]}
                >
                  SE
                </Text>
              </View>
            </View>
            <View style={styles.mapContainer}>
              <View
                style={{
                  width: "100%",
                  aspectRatio: 1,
                  borderRadius: 10000,
                  overflow: "hidden",
                }}
              >
                <MapView
                  provider={PROVIDER_GOOGLE}
                  ref={mapViewRef}
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: [{ rotate: `${bearing}deg` }],
                  }}
                  camera={mapCamera}
                  showsCompass={false}
                  scrollDuringRotateOrZoomEnabled={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  onRegionChangeComplete={(region, details) => {
                    mapViewRef?.current?.getCamera()?.then((info) => {
                      // console.log("info", info);
                      setMapCamera({
                        ...info,
                        center: {
                          longitude: location.coordinates.longitude,
                          latitude: location.coordinates.latitude,
                          // hack to force update...
                          zz: new Date().getMilliseconds(),
                        },
                        // mapCamera.center
                      });
                    });
                  }}
                  onRegionChange={() => {
                    mapViewRef?.current?.getCamera()?.then((info) => {
                      setBearing(info.heading);
                      // console.log("info", info);
                    });
                  }}
                />
              </View>
            </View>

            <View
            // style={styles.compassTicks}
            // style={styles.map__overlay}
            ></View>

            <View
              pointerEvents={"none"}
              style={[
                styles.arrowHolder,
                {
                  transform: [
                    { rotate: "" + windData.direction + "deg" },
                    { translateY: -55 },
                  ],
                },
              ]}
            >
              <WindArrow height={s(52)} width={s(52)} />
              <View
                style={{
                  transform: [
                    { translateY: -40 },
                    { rotate: "" + (bearing - windData.direction) + "deg" },
                    { translateY: invertTags() ? -45 : 45 },
                  ],
                }}
              >
                <Text style={{ ...theme.magnetPrimary }}>
                  Wind {windData.speed.toFixed(0)} kts
                </Text>
              </View>
            </View>
            {!wavesData ? (
              ""
            ) : (
              <View
                pointerEvents={"none"}
                style={[
                  styles.arrowHolder,
                  {
                    transform: [
                      { rotate: "" + wavesData.direction + "deg" },
                      { translateY: -55 },
                    ],
                  },
                ]}
              >
                <WavesArrow height={s(52)} width={s(52)} />
                <View
                  style={{
                    transform: [
                      { translateY: -40 },
                      { rotate: "" + (bearing - wavesData.direction) + "deg" },
                      { translateY: invertTags() ? 45 : -45 },
                    ],
                  }}
                >
                  <Text style={{ ...theme.magnetSecondary }}>
                    Waves {wavesData.height.toFixed(1)} m
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  tab: {
    ...(theme.cardPrimary as ViewStyle),
    ...(theme.flexUtil as ViewStyle),
    paddingHorizontal: 0,
    paddingBottom: 0, // cf media query from original scss
    paddingTop: s(56), // cf media query from original scss
  },
  compassHolder: {
    position: "relative",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 0,
    marginLeft: 0,
    width: "100%",
    borderRadius: 1000,
    // padding: s(3.2),
    backgroundColor: theme.labelBgColor,
    // background: linear-gradient(
    //   24deg,
    //   rgb(255, 242, 231) 0%,
    //   rgb(186, 184, 199) 40%,
    //   rgb(250, 241, 234) 90%
    // );
  },
  compass: {
    position: "relative",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 0,
    marginLeft: 0,
    // padding: 28.8,
    borderRadius: 1000,
    width: "100%",
    // background: linear-gradient(
    //   14deg,
    //   #ffffff00 40%,
    //   #ffffff80 50%,
    //   #ffffff00 60%
    // );
  },
  cardinalGrid: {
    // text-shadow: 0 0 0.2em #ffffff, 0 0 0.2em #ffffff;
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: s(1),
    // paddingRight: s(2),
    // backgroundColor: "rgba(0,0,255,.1)",
    top: 0,
    left: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    pointerEvents: "none",
  },

  cardinalText: {
    fontFamily: "poppinsRegular",
    fontSize: s(20),
    lineHeight: s(25),
    width: s(24),
    height: s(24),
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 1000,

    /* background-color: pink; */
  },
  cardinalTextSecondary: {
    fontFamily: "poppinsLight",
    fontSize: s(14),
    lineHeight: s(25),
    width: s(24),
    height: s(24),
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 1000,

    /* background-color: pink; */
  } as TextStyle,

  cardinalTop: {
    width: "100%",
    height: "33.333%",
    display: "flex",
    alignItems: "center",
  },
  cardinalLeft: {
    width: "50%",
    height: "33.333%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardinalRight: {
    width: "50%",
    height: "33.333%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cardinalDown: {
    height: "33.333%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  arrowHolder: {
    // text-shadow: 0 0 0.2em #ffffff, 0 0 0.2em #ffffff;
    width: "100%",
    height: "100%",
    position: "absolute",
    paddingLeft: s(2),
    paddingRight: s(2),
    // backgroundColor: "rgba(0,0,255,.1)",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  mapContainer: {
    padding: s(24),
  },
});
export default MapTab;
