import { create } from "zustand";

export const useFuelStore = create((set) => ({
  fuelQuality: "0",
  setFuelQuality: (quality) => set({ fuelQuality: quality }),
}));
