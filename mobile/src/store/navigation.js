import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  currentPage: "/",
  previousPage: null,
  previousPagePosition: 0,

  setCurrentPage: (page, position) =>
    set((state) => ({
      previousPage: state.currentPage,
      previousPagePosition: position,
      currentPage: page,
    })),
}));
