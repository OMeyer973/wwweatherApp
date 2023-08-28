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
import { ScaledSheet } from "react-native-size-matters";
import SearchBar from "../components/SearchBar";
import { useKeyboardVisible } from "../hooks/useKeyboardVisible";
import { theme } from "../theme";

import { Dimensions, StatusBar } from "react-native";
import { useState } from "react";
import RightArrowIcon from "../../assets/icons/UI/RightArrowIcon";
import { SearchQuery } from "../types";
import { statusBarHeight } from "../constants";
import { s, vs, ms, mvs } from "react-native-size-matters";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export interface Props {
  // location: Location | null;
  setLocation: any; // todo
}

const HomePage: React.FC<Props> = ({ setLocation }) => {
  const onSearch = async (searchString: String) => {
    setSearchQuery({ ...searchQuery, query: [searchString] });
    console.log("searchString ", searchString);
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
      <View style={{ paddingTop: s(120) }}>
        <Text style={styles.title}>Wind</Text>
        <Text style={styles.title}>Waves</Text>
        <Text style={{ ...styles.title, marginBottom: s(-10) }}>Weather</Text>
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
          <View
            style={{
              paddingHorizontal: theme.cardPrimary.paddingHorizontal,
              marginBottom: s(8),
            }}
          >
            {isSearchUp && (
              <Text style={theme.valueTitle}>Wind waves weather</Text>
            )}

            <Text style={theme.label}>Find a spot</Text>
            <SearchBar
              onSearch={onSearch}
              onClear={onClear}
              style={{ marginBottom: 6 }}
            />
          </View>
          {!searchQuery?.features?.length ? (
            <></>
          ) : (
            <ScrollView>
              <View
                style={{
                  paddingHorizontal: theme.cardPrimary.paddingHorizontal,
                  paddingBottom: theme.cardPrimary.paddingVertical,
                }}
              >
                {searchQuery?.features?.map((feature, key) => (
                  <View key={key}>
                    <View style={styles.searchResult}>
                      <TouchableOpacity
                        style={{
                          // borderRadius: 0,
                          // padding: 10,
                          margin: s(-5),
                          borderRadius: s(24),
                          marginLeft: s(4),
                          marginRight: 0,
                        }}
                        onPress={() => setLocation(searchQuery?.features[key])}
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
                                // letterSpacing: -0.2,
                              }}
                            >
                              {feature.region}
                            </Text>
                          </Text>
                          <View>
                            <RightArrowIcon />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
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

const styles = ScaledSheet.create({
  home: {
    alignItems: "center",
    maxWidth: s(448),
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: s(64),
    lineHeight: s(80),
    marginBottom: s(-20),
    textAlign: "right",
    fontFamily: "poppinsBold",
  },
  subTitle: {
    fontSize: s(16),
    textAlign: "right",
    marginBottom: s(48),
  },
  container: {
    ...theme.cardPrimary,
    paddingHorizontal: 0,
    borderRadius: s(24),
  } as ViewStyle,
  searchResult: {
    ...theme.input,
    marginHorizontal: s(-12),
    paddingHorizontal: s(12),
    paddingVertical: s(12),
    marginTop: s(8),
  } as ViewStyle,
  credits: {
    marginTop: s(48),
  },
});

export default HomePage;
