import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WeightQualityCard } from "../components/weight-quality-card";
import { useVehicleStore } from "../store/vehicle";
import { useWeightStore } from "../store/weight";
import { theme } from "../theme";

export function VehicleWeight() {
  const insets = useSafeAreaInsets();
  const vehicle = useVehicleStore((s) => s.vehicle);
  const weightQuality = useWeightStore((t) => t.weightQuality);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <WeightQualityCard type="quality" value={weightQuality} />
      <WeightQualityCard type="brand" value={vehicle.brand || "N/A"} />
      {/* <WeightQualityCard type="model" value={vehicle.model || "N/A"} /> */}
      {/* <WeightQualityCard type="year" value={vehicle.year || "N/A"} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["main-900"],
    paddingHorizontal: 16,
    flexWrap: "wrap",
    gap: 16,
    flex: 1,
    padding: 8,
  },
});
