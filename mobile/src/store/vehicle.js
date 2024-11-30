import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useVehicleStore = create((set) => ({
  vehicle: {
    brand: "",
    model: "",
    year: "",
  },

  setVehicle: async (brand, model, year) => {
    set({ vehicle: { brand, model, year } });
    await AsyncStorage.setItem("sensorbridge::vehicle::brand", brand);
    await AsyncStorage.setItem("sensorbridge::vehicle::model", model);
    await AsyncStorage.setItem("sensorbridge::vehicle::year", year);
  },

  loadVehicle: async () => {
    const brand = await AsyncStorage.getItem("sensorbridge::vehicle::brand");
    const model = await AsyncStorage.getItem("sensorbridge::vehicle::model");
    const year = await AsyncStorage.getItem("sensorbridge::vehicle::year");

    if (brand && model && year) {
      set({
        vehicle: {
          brand: brand,
          model: model,
          year: year,
        },
      });
    }
  },

  resetVehicle: () =>
    set({
      vehicle: {
        brand: "",
        model: "",
        year: "",
      },
    }),
}));
