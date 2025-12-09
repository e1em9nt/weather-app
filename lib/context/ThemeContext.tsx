"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleThemeMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorageState<Theme>("light", "theme");

  useEffect(() => {
    if (!theme) return;

    document.documentElement.setAttribute("data-theme", theme as Theme);
  }, [theme]);

  const toggleThemeMode = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode: theme === "dark", toggleThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("ThemeContext must be used within ThemeProvider");

  return context;
}
