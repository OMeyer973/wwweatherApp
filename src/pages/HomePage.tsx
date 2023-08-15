import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";
import { theme } from "../theme";

import { Dimensions, StatusBar } from "react-native";
import { useState } from "react";
import RightArrowIcon from "../../assets/icons/UI/RightArrowIcon";
import { SearchQuery } from "../types";
import { statusBarHeight } from "../constants";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export interface Props {
  // location: Location | null;
  setLocation: any; // todo
}

const HomePage: React.FC<Props> = ({ setLocation }) => {
  const onSearch = async (searchString: String) => {
    setSearchQuery({ ...searchQuery, query: [searchString] });
    console.log("searchString", searchString);
    if (
      !searchString ||
      searchString == "" ||
      (searchQuery?.query[0] == searchString &&
        searchQuery?.features?.length > 0)
    )
      return null;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=pk.eyJ1Ijoic2hhbWFya2luIiwiYSI6ImNra2d2aGxydjAzYTUyb21tY3IzazNzamkifQ.lahFmUNO07-YoSdAFi0ZSA`,
      {}
    );
    const data = await res.json();

    const features = data?.features.map((feature) => {
      const name = feature.place_name?.split(", ")[0];
      const region = feature.place_name
        ?.split(", ")
        .reduce(
          (acc, namePart, id, array) =>
            acc +
            (id == 0 ? "" : namePart + (id < array.length - 1 ? ", " : "")),
          ""
        );
      const [lng, lat] = feature.center;
      console.log("region", region);
      return {
        name: name,
        region: region,
        coordinates: { longitude: lng, latitude: lat },
      };
    });
    // console.log(data);
    setSearchQuery({ features: features, query: data.query });
  };

  const onClear = () => {
    setSearchQuery({ features: [], query: [] });
  };

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    features: [],
    query: [],
  });

  const isSearchUp =
    useKeyboardVisible() || Boolean(searchQuery?.query?.length);
  console.log("isSearchUp", isSearchUp);
  return (
    // <ScrollView >
    <View style={styles.home}>
      <View style={styles.title}>
        <Text style={styles.title}>
          Wind
          {"\n"}
          Waves
          {"\n"}
          Weather
        </Text>
        <Text style={styles.subTitle}>get forecast quick, go ride now!</Text>
      </View>

      <View
        style={{
          width: "100%",
          ...(isSearchUp
            ? {
                height: "100%",
                zIndex: 1,
                position: "absolute",
                marginTop: statusBarHeight,
              }
            : {}),
        }}
      >
        <View
          style={{ ...styles.container, height: isSearchUp ? "100%" : "auto" }}
        >
          {isSearchUp && (
            <Text
              style={{
                paddingBottom: 8,
                fontFamily: "poppinsSemiBold",
                fontSize: 24,
              }}
            >
              Wind waves weather
            </Text>
          )}

          <Text style={{ paddingBottom: 8 }}>Find a spot</Text>
          <SearchBar
            onSearch={onSearch}
            onClear={onClear}
            style={{ marginBottom: 6 }}
          />

          {searchQuery?.features?.map((feature, key) => (
            <View key={key}>
              <View
                style={{
                  ...theme.input,
                  marginHorizontal: -12,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  paddingVertical: 12,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    ...theme.flexUtil,
                    width: "100%",
                    maxWidth: "100%",
                    // overflow: "scroll"
                  }}
                >
                  <Text style={{ flexShrink: 1 }}>
                    <Text
                      style={{
                        fontFamily: "poppinsSemiBold",
                        // letterSpacing: -0.2,
                      }}
                    >
                      {feature.name}
                    </Text>
                    {feature.region && (
                      <Text
                        style={{
                          color: "grey",
                          fontFamily: "poppinsRegular",
                          // letterSpacing: -0.2,
                        }}
                      >
                        {", "}
                      </Text>
                    )}
                    <Text
                      style={{
                        color: "grey",
                        fontFamily: "poppinsRegular",
                        letterSpacing: -0.2,
                      }}
                    >
                      {feature.region}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={{
                      // borderRadius: 0,
                      // padding: 10,
                      margin: -5,
                      borderRadius: 24,
                      marginLeft: 4,
                      marginRight: 0,
                    }}
                    onPress={() => setLocation(searchQuery?.features[key])}
                  >
                    <RightArrowIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.credits}>
        <Text>Made with &#127940; by Myro</Text>
        {/* <a href="http://myrograph.github.io">
            <Text>Myro</Text></a> */}
        {/* </p> */}
      </View>
    </View>
    // </ScrollView >
  );
};

const styles = StyleSheet.create({
  home: {
    alignItems: "center",
    maxWidth: 448,
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 48,
    textAlign: "right",
    fontSize: 64,
    fontFamily: "poppinsSemiBold",
    lineHeight: 64,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 48,
  },
  container: {
    ...theme.cardPrimary,
    borderRadius: 24,
  } as ViewStyle,
  credits: {
    marginTop: 48,
  },
});

export default HomePage;
