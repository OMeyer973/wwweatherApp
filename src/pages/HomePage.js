import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { theme } from '../theme';

import { Dimensions, StatusBar } from 'react-native'
import { useState } from 'react';
import RightArrowIcon from '../../assets/icons/UI/RightArrowIcon';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const HomePage = () => {
  const onSearch = async (searchString) => {
    setSearchQuery({ ...searchQuery, query: [searchString] });
    console.log(searchString)
    if (!searchString || searchString == "" || (searchQuery?.query[0] == searchString && earchQuery?.features?.length > 0)) return null;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?access_token=pk.eyJ1Ijoic2hhbWFya2luIiwiYSI6ImNra2d2aGxydjAzYTUyb21tY3IzazNzamkifQ.lahFmUNO07-YoSdAFi0ZSA`,
      {}
    );
    const data = await res.json();
    console.log(data);
    setSearchQuery(data);
  };

  const onClear = () => {
    setSearchQuery({ features: [], query: [] });
  }

  const [searchQuery, setSearchQuery] = useState({ features: [], query: [] });

  const isSearchUp = useKeyboardVisible() || Boolean(searchQuery?.query?.length);
  // console.log(isKeyboardVisible)
  return (
    // <ScrollView >
    <View style={styles.home} >
      <View style={styles.title}>
        <Text style={styles.title}>Wind
          {'\n'}
          Waves
          {'\n'}
          Weather</Text>
        <Text style={styles.subTitle}>get forecast quick, go ride now!</Text>
      </View>

      <View style={{ width: "100%", ...(isSearchUp ? { height: "100%", zIndex: 1, position: "absolute", marginTop: StatusBar.currentHeight + 8 } : {}) }}>
        <View style={{ ...styles.container, height: isSearchUp ? "100%" : "auto", }}>

          {isSearchUp &&
            <Text style={{
              paddingBottom: 8, fontWeight: "900", fontSize: 24
            }}>Wind waves weather</Text>
          }

          <Text style={{ paddingBottom: 8 }}>Find a spot</Text>
          <SearchBar onSearch={onSearch} onClear={onClear} style={{ marginBottom: 6 }} />

          {searchQuery?.features?.map((feature, key) => <View key={key}>
            <View style={{
              ...theme.input,
              marginHorizontal: -12,
              paddingHorizontal: 12,
              borderRadius: 16,
              paddingVertical: 12,
              marginTop: 8
            }}><View style={{
              flexDirection: 'row',
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "100%",
              // overflow: "scroll"
            }}>
                <Text style={{ flexShrink: 1 }}>{
                  feature.place_name
                    ?.split(", ")
                    .map((namePart, id, array) => {
                      if (id == 0) {
                        return <Text key={id} style={{ fontWeight: "bold" }}>{namePart + (id < array.length - 1 ? ", " : "")}</Text>
                      }
                      return <Text key={id} style={{ color: "grey" }}>{namePart + (id < array.length - 1 ? ", " : "")}</Text>
                    })
                }</Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 0,
                    // padding: 10,
                    margin: -5,
                    borderRadius: 24,
                    marginLeft: 4,
                    marginRight: 0,
                  }}
                  onPress={() => console.log("todo")}
                >
                  <RightArrowIcon />
                </TouchableOpacity >
              </View>
            </View>
          </View>
          )}
        </View>
      </View>

      <View style={styles.credits}>
        <Text>Made with &#127940; by Myro</Text>
        {/* <a href="http://myrograph.github.io">
            <Text>Myro</Text></a> */}
        {/* </p> */}
      </View>
    </View >
    // </ScrollView >
  )
};

const styles = StyleSheet.create({
  home: {
    // flex: 1,
    paddingTop: 96,
    alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    // overflow: "hidden",
    maxWidth: 448,
    width: "100%",
  },
  title: {
    // backgroundColor: "red",
    textAlign: "right",
    // width: "100%",
    fontSize: 64, //min(5rem, 20vw);
    fontWeight: "900",
    lineHeight: 64,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 48,
  },
  container: {
    ...theme.cardPrimary,
    // width: "100%"
    // height: "100%"
    // backgroundColor: "red",
  },
  credits: {
    marginTop: 48
  },
});

export default HomePage;