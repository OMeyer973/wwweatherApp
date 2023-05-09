import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Value from "../../components/Value";
// import { SearchBar } from "~components/molecules/SearchBar";

export interface Props {
  location: string;
  country: string;
}

const LocationTab: React.FC<Props> = ({ location, country }) => {
  return (
    // <View className="location-tab">
    <View>
      <View>
        {/* <Text>{location}</Text> */}
        <Value flavor="title">{location}</Value>

        <Value flavor="slim">{country}</Value>
      </View>
      {/* todo : "share" button ? */}
    </View>
  );
};

export default LocationTab;
