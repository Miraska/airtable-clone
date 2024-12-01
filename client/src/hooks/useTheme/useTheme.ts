import { create } from "zustand";

interface ITheme {
  isDark: boolean;
  setDark: (state: boolean) => void
}

export const useTheme = create<ITheme>((set) => ({
  isDark: true,
  setDark: (state: boolean) => set({isDark: state})
}))