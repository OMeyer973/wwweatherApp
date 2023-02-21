import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/HomePage';

export default function App() {
  return (
    <LinearGradient
      colors={['rgba(0, 211, 255, 0.3)', 'rgba(255, 63, 0, 0.3)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.body}
    >
      <StatusBar style="auto" />
      <HomePage />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
