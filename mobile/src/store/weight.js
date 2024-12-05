import { create } from "zustand";

export const useWeightStore = create((set) => ({
  weightQuality: "0",
  setWeightQuality: (quality) => set({ weightQuality: quality }),
}));
