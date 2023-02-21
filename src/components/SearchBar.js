import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../constants';
import { padding } from '../helper';


export default function SearchBar() {
  return (
    <View className="search-bar"
    >
      <TextInput
        style={styles.input}
        type="text"
        name="location"
        // placeholder={placeholder}
        required
        size={20}
      />
      {/* // todo : decompose input & btn into atoms ? */}
      <Button title="search" className="search-icon" type="submit" value="submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: theme.colors.labelColor,
    backgroundColor: theme.colors.labelBgColor,
    borderRadius: 18,
    // ...padding(2.4, 12, 2.4, 30),
    paddingVertical: 2.4,
    paddingHorizontal: 12,
    // height: 500,
  },
})
