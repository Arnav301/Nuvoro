import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("nuvoro-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("nuvoro-theme", theme);
    set({ theme });
  },
}));