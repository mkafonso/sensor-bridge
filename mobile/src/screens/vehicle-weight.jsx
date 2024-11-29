import { Text, View, StyleSheet } from "react-native";
import BackgroundSvg from "../assets/background.svg";
import { theme } from "../theme";

export function VehicleWeight() {
  return (
    <View style={styles.container}>
      <Text>VehicleWeight</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["main-900"],
    paddingHorizontal: 16,
  },
});
