import React from "react";
import { StyleSheet, Text, View, ViewStyle, Dimensions } from "react-native";

import Value from "../../components/Value";
import { theme } from "../../theme.js";
import { WindData, WavesData } from "types";

import { angleToCardinal, clamp } from "../../utils";
import { Svg, SvgUri } from "react-native-svg";
// import { DataColumn } from "~components/molecules/DataColumn";

import WindArrow from "../../../assets/icons/wind-kite-arrow.svg";
import WavesArrow from "../../../assets/icons/waves-kite-arrow.svg";

export interface Props {
  windData: WindData;
  wavesData: WavesData | undefined;
}

const WindWavesTab: React.FC<Props> = ({ wavesData, windData }) => {
  const windowWidth = Dimensions.get("window").width;
  console.log(windowWidth);
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <View style={styles.header}>
          <Text style={styles.title}>Wind</Text>
          <WindArrow
            height={32}
            width={32}
            style={{
              transform: [{ rotate: "" + windData?.direction + "deg" }],
            }}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={theme.label}>Speed</Text>
          <Text style={theme.value}>{windData?.speed.toFixed(0) + " kts"}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={theme.label}>Gusts</Text>
          <Text style={theme.value}>{windData?.gusts.toFixed(0) + " kts"}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={theme.label}>Direction</Text>
          <Text style={theme.value}>
            {angleToCardinal(windData?.direction) +
              " / " +
              windData?.direction.toFixed(0) +
              "°"}
          </Text>
        </View>
      </View>
      <View style={styles.tab}>
        <View style={styles.header}>
          <Text style={styles.title}>Waves</Text>
          <WavesArrow
            height={32}
            width={32}
            style={{
              transform: [{ rotate: "" + wavesData?.direction + "deg" }],
            }}
          />
        </View>

        <View style={styles.dataRow}>
          <Text style={theme.label}>Height</Text>
          <Text style={theme.value}>{wavesData?.height.toFixed(1) + " m"}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={theme.label}>Tide</Text>
          <Text style={theme.value}>{wavesData?.tide}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={theme.label}>Direction</Text>
          <Text style={theme.value}>
            {angleToCardinal(wavesData?.direction) +
              " / " +
              wavesData?.direction.toFixed(0) +
              "°"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.flexUtil,
    width: "100%",
  },
  tab: {
    ...(theme.cardPrimary as ViewStyle),
    flexGrow: 1,
    flexShrink: 1,
  },
  header: {
    ...theme.flexUtil,
    marginBottom: 40,
    // width: "100%",
  },
  title: {
    fontSize: 24,
  },
  dataRow: { ...theme.flexUtil, marginBottom: 16, flexWrap: "wrap" },
  WindWavesData: {
    alignItems: "center",
    maxWidth: 448,
  },
});
export default WindWavesTab;
