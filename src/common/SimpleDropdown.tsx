import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  ScaledSize,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CloseIcon from "../../assets/icons/UI/CloseIcon";

import { theme } from "../theme";
import {
  AstroData,
  TideData,
  TidesToday,
  WWWData,
  WavesMinMax,
  WindMinMax,
} from "~types";
import {
  oneDay,
  oneHour,
  placeholderWWWData,
  startDate,
  numberDaysPredicted,
} from "../constants";
import { s } from "react-native-size-matters";
import { isSameDay } from "../utils";
import DownArrowIcon from "../../assets/icons/UI/DownArrowIcon";

export interface Props {
  options: string[];
  onChange: (value: string) => any;
  defaultValue: string;
  placeHolder: string;
  dropdownStyle: ViewStyle;
  dropdownTextStyle: ViewStyle;
  optionStyle: ViewStyle;
  optionTextStyle: ViewStyle;
}

export const SimpleDropdown: React.FC<Props> = React.memo(
  ({
    options,
    onChange,
    defaultValue,
    placeHolder,
    dropdownStyle,
    dropdownTextStyle,
    optionStyle,
    optionTextStyle,
  }) => {
    const [value, setValue] = useState(
      defaultValue ? defaultValue : placeHolder
    );

    const [isOpen, setisOpen] = useState(false);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setisOpen(!isOpen)}>
          <View style={{ ...styles.dropdown, ...dropdownStyle }}>
            <Text
              style={{
                ...theme.valueSlim,
                marginBottom: 0,
                fontSize: theme.inputFontSize,
                ...dropdownTextStyle,
              }}
            >
              {value}
            </Text>
            <View>
              <DownArrowIcon
                style={{
                  transform: isOpen ? [{ rotate: "180deg" }] : [],
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.options}>
            {options?.map((option, id) => (
              <View key={id}>
                <TouchableOpacity
                  style={{
                    ...styles.option,
                    ...optionStyle,
                    backgroundColor:
                      option == value ? theme.inputBgColor : undefined,
                  }}
                  onPress={() => {
                    setValue(option);
                    onChange && onChange(option);
                    setisOpen(false);
                  }}
                >
                  <Text
                    style={{
                      ...theme.valueSlim,
                      marginBottom: 0,
                      fontSize: theme.inputFontSize,
                      ...optionTextStyle,
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
                {id != options.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
);

const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    marginHorizontal: s(-12),
  } as ViewStyle,
  dropdown: {
    ...theme.input,
    ...theme.flexUtil,
    paddingHorizontal: s(12),
    paddingVertical: s(12),
  } as ViewStyle,
  options: {
    zIndex: 1,
    position: "absolute",
    top: "100%",
    width: "100%",
    overflow: "hidden",
    borderColor: theme.inputBgColor,
    borderWidth: s(2),
    borderRadius: s(16),
    marginTop: s(8),
  } as ViewStyle,
  option: {
    paddingHorizontal: s(12),
    paddingVertical: s(14),
    marginVertical: s(-2),
  } as ViewStyle,
  separator: {
    height: s(2),
    backgroundColor: theme.inputBgColor,
    marginHorizontal: s(12),
  } as ViewStyle,
});
export default SimpleDropdown;
