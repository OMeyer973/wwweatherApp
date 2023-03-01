import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { theme } from '../theme';

import { Dimensions, StatusBar } from 'react-native'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomePage() {
  const isKeyboardVisible = useKeyboardVisible();
  // console.log(isKeyboardVisible)
  return (
    // <ScrollView >
    <View style={styles.home} >

      {/* <View style={styles.home}> */}
      <View style={styles.title}>
        {/* <h1> */}
        <Text style={styles.title}>Wind
          {'\n'}
          Waves
          {'\n'}
          Weather</Text>
        {/* </h1> */}
        {/* <p> */}
        {/* <Label> */}
        <Text style={styles.subTitle}>get forecast quick, go ride now!</Text>
        {/* </Label> */}
        {/* </p> */}
      </View>

      <View style={{ width: "100%", ...(isKeyboardVisible ? { height: "100%", position: "absolute", marginTop: StatusBar.currentHeight + 8 } : {}) }}>
        <View style={{ ...styles.container, height: isKeyboardVisible ? "100%" : "auto", }}>
          {/* <View style={{ paddingLeft: 12 }}> */}

          {isKeyboardVisible &&
            <Text style={{
              paddingBottom: 8, fontWeight: "900", fontSize: 24
            }}>Wind waves weather</Text>
          }
          <Text style={{ paddingBottom: 8 }}>Find a spot</Text>
          {/* </Label> */}
          {/* </View> */}
          <SearchBar placeholder="Kourou" />
        </View>
      </View>

      <View style={styles.credits}>
        {/* <p> */}
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

