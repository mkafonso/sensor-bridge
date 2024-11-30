import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  name: "",
  avatarUri: "",

  setUser: async (name, avatarUri) => {
    set({ name, avatarUri });
    await AsyncStorage.setItem("sensorbridge::user_name", name);
    await AsyncStorage.setItem("sensorbridge::user_avatar", avatarUri);
  },

  loadUser: async () => {
    const storedName = await AsyncStorage.getItem("sensorbridge::user_name");
    const storedAvatarUri = await AsyncStorage.getItem(
      "sensorbridge::user_avatar"
    );

    if (storedName && storedAvatarUri) {
      set({ name: storedName, avatarUri: storedAvatarUri });
    }
  },

  resetUser: () => set({ name: "", avatarUri: "" }),
}));
