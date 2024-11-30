import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useEmergencyContactStore = create((set) => ({
  emergencyContact: {
    name: "",
    phone: "",
    message: "",
  },

  setEmergencyContact: async (name, phone, message) => {
    set({ emergencyContact: { name, phone, message } });
    await AsyncStorage.setItem("sensorbridge::emergency::name", name);
    await AsyncStorage.setItem("sensorbridge::emergency::phone", phone);
    await AsyncStorage.setItem("sensorbridge::emergency::message", message);
  },

  loadEmergencyContact: async () => {
    const name = await AsyncStorage.getItem("sensorbridge::emergency::name");
    const phone = await AsyncStorage.getItem("sensorbridge::emergency::phone");
    const message = await AsyncStorage.getItem(
      "sensorbridge::emergency::message"
    );

    if (name && phone && message) {
      set({
        emergencyContact: {
          name: name,
          phone: phone,
          message: message,
        },
      });
    }
  },
}));
