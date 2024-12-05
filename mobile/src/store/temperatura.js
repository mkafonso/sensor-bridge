import { create } from "zustand";

export const useTemperature = create((set) => ({
  insideTemperature: 0,
  maxInsideTemperature: 0,
  presence: false,

  setInsideTemperature: (t) => set({ insideTemperature: t }),
  setMaxInsideTemperature: (t) => set({ maxInsideTemperature: t }),
  setPresence: (presence) => set({ presence }),
}));
