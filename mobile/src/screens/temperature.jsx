import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TemperatureItem } from "../components/temperature-item";
import { TemperatureStatus } from "../components/temperature-status";
import { getCurrentTemperature } from "../services/weather";
import { useTemperature } from "../store/temperatura";
import { theme } from "../theme";

export function Temperature() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const insideTemperature = useTemperature((s) => s.insideTemperature);
  const maxInsideTemperature = useTemperature((s) => s.maxInsideTemperature);
  const presence = useTemperature((s) => s.presence);

  const [outsideTemperature, setOutsideTemperature] = useState({
    temp: 0,
    temp_max: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const currentTemp = await getCurrentTemperature();
      setOutsideTemperature(currentTemp);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Animated.View style={[styles.content, { marginLeft: width / 3.5 }]}>
        <View style={{ gap: 24, marginBottom: "auto" }}>
          <View>
            <Text style={styles.title}>Dentro do carro</Text>
            <View style={[styles.temperatureContainer]}>
              <TemperatureItem
                title="Atual"
                value={insideTemperature ?? "N/A"}
              />
              <TemperatureItem title="Máxima" value={maxInsideTemperature} />
            </View>
          </View>

          <View>
            <Text style={styles.title}>Fora do carro</Text>
            <View style={[styles.temperatureContainer]}>
              <TemperatureItem title="Atual" value={outsideTemperature.temp} />
              <TemperatureItem
                title="Máxima"
                value={outsideTemperature.temp_max}
              />
            </View>
          </View>
        </View>

        <TemperatureStatus
          temperature={insideTemperature ?? 0}
          presence={presence}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors["main-900"],
    paddingHorizontal: 16,
  },
  content: {
    justifyContent: "center",
  },
  temperatureText: {
    fontSize: 48,
    color: theme.colors["secondary-600"],
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    color: theme.colors["secondary-600"],
    fontSize: theme.fontSize["text-sm"],
    fontFamily: theme.fontFamily.medium,
    paddingLeft: 3,
  },
  temperatureContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
