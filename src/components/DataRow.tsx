import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CSS, { Property } from "csstype";

import { theme } from "../theme";

interface Props {
  label: string;
  value: string;
}

const DataRow: React.FC<Props> = React.memo(({ label, value }) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
});

Value.defaultProps = {
  flavor: "default",
};

const styles = StyleSheet.create({
  default: {
    fontSize: 24,
    fontWeight: "600",
  },
  small: {
    fontWeight: "600",
  },
  // &.slim {
  //   // none
  // }
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.title.color,
  },
});

export default DataRow;
