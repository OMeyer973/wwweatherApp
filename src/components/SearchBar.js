import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { padding } from '../helper';
// import SearchIcon from "../../assets/icons/search.svg"

export default function SearchBar() {
  return (
    <View className="search-bar" style={styles.searchBar}>
      <TextInput
        style={styles.input}
        type="text"
        name="location"
        // placeholder={placeholder}
        required
        size={20}
      />

      <TouchableOpacity style={styles.searchButton}>
        {/* <SearchIcon /> */}
        <Text style={theme.buttonPrimary.text}>Search</Text>
      </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: -12,
    flexDirection: 'row'
  },
  input: {
    ...theme.label,
    borderRadius: 16,
    // ...padding(2.4, 12, 2.4, 30),
    paddingTop: 4,
    paddingBottom: 3,
    paddingHorizontal: 12,
    // height: 500,
    flexGrow: 1,
    marginRight: 8
  },
  searchButton: {
    // ...theme.label,
    borderRadius: 16,
    ...theme.buttonPrimary,
    // ...padding(2.4, 12, 2.4, 30),
    paddingTop: 7,
    paddingBottom: 0,
    paddingHorizontal: 12,
  }
})
