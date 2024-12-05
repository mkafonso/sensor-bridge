import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Loading } from "./src/components";
import { Navigation } from "./src/navigation";
import { useFuelStore } from "./src/store/fuel";
import { useTemperature } from "./src/store/temperatura";
import { theme } from "./src/theme";
import { useWeightStore } from "./src/store/weight";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const [maxLocalInsideTemperature, setMaxLocalInsideTemperature] = useState(
    -Infinity
  );
  const setInsideTemperature = useTemperature((t) => t.setInsideTemperature);
  const setMaxInsideTemperature = useTemperature(
    (t) => t.setMaxInsideTemperature
  );
  const setPresence = useTemperature((t) => t.setPresence);
  const setWeightQuality = useWeightStore((t) => t.setWeightQuality);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.15.187:4001");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        let data = JSON.parse(event.data);

        console.log({"data.temperature": data.temperature})

        if (data.temperature) {
          data = data.temperature.split(",");

          const temperature = data[0];
          const presence = data[1];


        console.log({temperature});
        console.log({presence});

          setInsideTemperature(temperature);

          setMaxLocalInsideTemperature((prevMax) => {
            const newMax = Math.max(prevMax, temperature);
            setMaxInsideTemperature(newMax);
            return newMax;
          });

          setPresence(presence);
        }

        if (data.weight) {
          setWeightQuality(data.weight);
        }
      } catch (err) {
        console.error("Error parsing WebSocket data:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors["main-900"] }}
      >
        <Navigation />
        <StatusBar style="inverted" translucent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
