import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Value from "~components/Value";
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
        <Text>{location}</Text>
        {/* <Value flavor="title">{location}</Value> */}

        <Text>{country}</Text>
        {/* <Value flavor="slim">{country}</Value> */}
      </View>
      {/* todo : "share" button ? */}
    </View>
  );
};

export default LocationTab;
