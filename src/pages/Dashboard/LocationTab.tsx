import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CloseIcon from "../../../assets/icons/UI/CloseIcon";

import Value from "../../components/Value";
import { theme } from "../../theme";
// import { SearchBar } from "~components/molecules/SearchBar";

import { clamp } from "../../utils";

// import { DataColumn } from "~components/molecules/DataColumn";

// import dayCloud0 from "~/components/atoms/icons/weather/day-cloud-0.svg";
// import dayCloud1 from "~/components/atoms/icons/weather/day-cloud-1.svg";
// import dayCloud2 from "~/components/atoms/icons/weather/day-cloud-2.svg";
// import dayCloud3 from "~/components/atoms/icons/weather/day-cloud-3.svg";
// import dayCloud4 from "~/components/atoms/icons/weather/day-cloud-4.svg";

// import rain0 from "~/components/atoms/icons/weather/rain-0.svg";
// import rain1 from "~/components/atoms/icons/weather/rain-1.svg";
// import rain2 from "~/components/atoms/icons/weather/rain-2.svg";
// import rain3 from "~/components/atoms/icons/weather/rain-3.svg";

// import thermometer from "~/components/atoms/icons/weather/thermometer.svg";

// const rainIcons = [rain0, rain1, rain2, rain3];
// const cloudIcons = [dayCloud0, dayCloud1, dayCloud2, dayCloud3, dayCloud4];

export interface Props {
  location: string;
  country: string;
  setLocation;
}

const LocationTab: React.FC<Props> = ({ location, country, setLocation }) => {
  const onClose = () => {
    return setLocation(null);
  };

  return (
    <View style={theme.cardPrimary}>
      <View style={styles.tab}>
        <View style={{ flexShrink: 1 }}>
          <Text style={theme.valueTitle}>{location}</Text>
          <Text style={theme.valueSlim}>{country}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => onClose()}
          >
            <CloseIcon />
          </TouchableOpacity>
        </View>
      </View>
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
export default LocationTab;
