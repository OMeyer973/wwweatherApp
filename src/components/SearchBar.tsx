import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";
import { padding } from "../utils";
import SearchIcon from "../../assets/icons/UI/SearchIcon";
import { useRef, useState } from "react";
import CloseIcon from "../../assets/icons/UI/CloseIcon";
import { ScaledSheet } from "react-native-size-matters";
import { s, vs, ms, mvs } from "react-native-size-matters";

// import { useKeyboardVisible } from '../hooks/useKeyboardVisible';

const SearchBar = ({ onSearch, onClear, ...props }) => {
  // buttonIsActive = useKeyboardVisible();

  // to keep the value to send to API
  const [searchInput, setSearchInput] = useState("");

  // just to clear on click
  const inputRef = useRef<any>("");

  const _onClear = () => {
    inputRef.current.clear();
    setSearchInput("");
    onClear();
  };

  const buttonIsActive = Boolean(searchInput);
  return (
    <View
      {...props}
      // className="search-bar"
      style={{ ...styles.searchBar, ...props.style }}
    >
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Kourou"
        onChangeText={(value) => {
          inputRef.current.value = value;
          setSearchInput(value);
          if (value == "") _onClear();
        }}
        onSubmitEditing={() => onSearch(searchInput)}
      />
      {buttonIsActive && (
        <TouchableOpacity
          style={{ ...styles.searchButton, marginRight: 8 }}
          onPress={_onClear}
        >
          <CloseIcon size={20} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          ...styles.searchButton,
          ...(buttonIsActive ? { ...styles.searchButton.active } : {}),
        }}
        onPress={() => onSearch(searchInput)}
      >
        <SearchIcon color={buttonIsActive ? "white" : ""} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  searchBar: {
    ...theme.input,
    marginHorizontal: s(-12),
    flexDirection: "row",
    borderRadius: s(16),
  },
  input: {
    // ...padding(2.4, 12, 2.4, 30),
    fontFamily: "poppinsRegular",
    paddingVertical: s(4),
    paddingHorizontal: s(12),
    flexGrow: 1,
    marginRight: s(4),
  },
  searchButton: {
    // borderRadius: 0,
    padding: s(10),
    margin: s(-5),
    borderRadius: s(24),
    marginRight: 0,
    active: {
      ...theme.buttonPrimary,
      margin: s(-6),
      padding: s(12),
    },
  },
});

export default SearchBar;
