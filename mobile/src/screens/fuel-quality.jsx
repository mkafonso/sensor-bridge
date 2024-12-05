import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FuelQualityCard } from "../components";
import { useVehicleStore } from "../store/vehicle";
import { theme } from "../theme";
import { useFuelStore } from "../store/fuel";

export function FuelQuality() {
  const insets = useSafeAreaInsets();
  const vehicle = useVehicleStore((s) => s.vehicle);
  const fuelQuality = useFuelStore((t) => t.fuelQuality);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <FuelQualityCard type="quality" value={fuelQuality} />
      <FuelQualityCard type="brand" value={vehicle.brand || "N/A"} />
      <FuelQualityCard type="model" value={vehicle.model || "N/A"} />
      <FuelQualityCard type="year" value={vehicle.year || "N/A"} />
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
