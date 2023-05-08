import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/HomePage';
import { useEffect, useState } from 'react';
import Dashboard from './src/pages/DashBoard';

export default function App() {
  const [showHomePage, setShowHomePage] = useState(true)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (location?.name) {
      setShowHomePage(false);
    } else {
      setShowHomePage(true);
    }
  }, [location])

  return (
    <LinearGradient
      colors={['rgba(0, 211, 255, 0.3)', 'rgba(255, 63, 0, 0.3)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.body}
    >
      <StatusBar style="auto" />
      {showHomePage
        ? <HomePage setLocation={setLocation} />
        : <Dashboard location={location} setLocation={setLocation} />
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    // height: "100%",
  },
});
