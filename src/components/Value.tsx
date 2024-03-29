import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import CSS, { Property } from "csstype";

import { theme } from "../theme";

type Flavor = "default" | "title" | "small" | "slim";

export interface Props {
  children: React.ReactNode;
  flavor?: Flavor;
  style?: CSS.Properties;
}

const Value: React.FC<Props> = React.memo(({ children, flavor, style }) => {
  // console.log("flavor", flavor);
  // console.log("style", { ...styles.common, ...styles[flavor as Flavor] });
  return <Text style={styles[flavor as Flavor]}>{children}</Text>;
});

Value.defaultProps = {
  flavor: "default",
};

const styles = ScaledSheet.create({
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

export default Value;
