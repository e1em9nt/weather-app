"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleThemeMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setTheme(stored as Theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme as Theme);
    document.documentElement.setAttribute("data-theme", theme as Theme);
  }, [theme]);

  const toggleThemeMode = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

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
