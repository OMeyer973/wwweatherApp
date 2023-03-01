import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { padding } from '../helper';
import SearchIcon from '../../assets/icons/UI/SearchIcon';
import { useRef, useState } from 'react';
import CloseIcon from '../../assets/icons/UI/CloseIcon';
// import { useKeyboardVisible } from '../hooks/useKeyboardVisible';

export default function SearchBar() {
  // buttonIsActive = useKeyboardVisible();

  // to keep the value to send to API
  const [searchInput, setSearchInput] = useState("");

  // just to clear on click
  const inputRef = useRef("");

  const onClear = () => {
    inputRef.current.clear();
    setSearchInput("");
  }

  const buttonIsActive = Boolean(searchInput);
  return (
    <View className="search-bar" style={styles.searchBar}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        type="text"
        name="location"
        placeholder="Kourou"
        required
        size={20}
        onChangeText={(value) => {
          inputRef.current.value = value;
          setSearchInput(value)
        }}
      />
      {buttonIsActive &&
        <TouchableOpacity style={{ ...styles.searchButton, marginRight: 8 }} onPress={onClear}>
          <CloseIcon
            size={20}
          />
        </TouchableOpacity >
      }
      <TouchableOpacity style={{ ...styles.searchButton, ...(buttonIsActive ? { ...styles.searchButton.active } : {}) }}>
        <SearchIcon color={buttonIsActive ? "white" : ""} />
      </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    ...theme.input,
    marginHorizontal: -12,
    flexDirection: 'row',
    borderRadius: 16,
  },
  input: {
    // ...padding(2.4, 12, 2.4, 30),
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexGrow: 1,
    marginRight: 4
  },
  searchButton: {
    borderRadius: 0,
    padding: 10,
    margin: -5,
    borderRadius: 24,
    marginRight: 0,
    active: {
      ...theme.buttonPrimary,
      margin: -6,
      padding: 12
    }
  }
})
