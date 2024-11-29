import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export function TemperatureItem(props) {
  const { title, value } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{`${value}°C`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors["main-700"],
    width: "46%",
    margin: 4,
    borderRadius: 4,
    padding: 8,
  },
  title: {
    fontSize: 10,
    color: theme.colors["main-400"],
    fontFamily: theme.fontFamily["regular"],
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: theme.fontSize["text-xl"],
    color: theme.colors["main-200"],
    fontFamily: theme.fontFamily["regular"],
  },
});
