import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";

export function Avatar() {
  return <TouchableOpacity style={styles.container}></TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: theme.colors["main-500"],
  },
});
