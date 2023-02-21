import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import { mixins } from '../constants';

export default function HomePage() {
  return (
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

      <KeyboardAvoidingView behavior='position' style={{ width: "100%" }}>
        <View style={styles.container}>

          {/* <Label> */}
          <Text>Find a spot</Text>
          {/* </Label> */}
          <SearchBar placeholder="Kourou" />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.credits}>
        {/* <p> */}
        <Text>Made with &#127940; by Myro</Text>
        {/* <a href="http://myrograph.github.io">
            <Text>Myro</Text></a> */}
        {/* </p> */}
      </View>
    </View >
  )
};

const styles = StyleSheet.create({
  home: {
    // flex: 1,
    padding: 24,
    paddingTop: 96,
    alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%',
    // overflow: "hidden",
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
    ...mixins.tab,
    borderRadius: 24,
    // backgroundColor: "red",
    maxWidth: 448,
    width: "100%",
  },
  credits: {
    marginTop: 48
  },
});

