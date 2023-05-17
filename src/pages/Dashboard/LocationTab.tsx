import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
}

const LocationTab: React.FC<Props> = ({ location, country }) => {
  return (
    <View>
      <View style={theme.cardPrimary}>
        <Text style={theme.valueTitle}>{location}</Text>
        <Text style={theme.valueSlim}>{country}</Text>
      </View>
    </View>
  );
};

export default LocationTab;
