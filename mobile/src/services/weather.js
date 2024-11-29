import * as Location from "expo-location";

const API_KEY = "718411043b53891e19b92247327a6fcb";

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permissão de localização negada.");
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

export async function getCurrentTemperature() {
  try {
    const { latitude, longitude } = await getCurrentLocation();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    return {
      temp: Number(data.main.temp).toFixed(2) ?? 0,
      temp_max: Number(data.main.temp_max).toFixed(2) ?? 0,
    };
  } catch (error) {
    console.error("Erro ao obter temperatura:", error);
    throw error;
  }
}
