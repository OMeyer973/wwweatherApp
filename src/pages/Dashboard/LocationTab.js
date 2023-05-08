import React from "react";
import { View, Text } from "react-native";
// import "./LocationTab.scss";

// import { Value } from "~components/atoms/Value";
// import { SearchBar } from "~components/molecules/SearchBar";


const LocationTab = ({ location, country }) => {
  return (
    <View className="location-tab">
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