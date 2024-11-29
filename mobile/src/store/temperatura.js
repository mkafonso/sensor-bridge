import { create } from "zustand";

export const useTemperature = create((set) => ({
  insideTemperature: 0,

  setInsideTemperature: (t) => set({ insideTemperature: t }),
}));
