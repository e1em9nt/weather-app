"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorage";

type CitiesContextType = {
  cities: string[];
  addCity: (name: string) => void;
  removeCity: (name: string) => void;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useLocalStorageState<string[]>(
    ["paris"],
    "weather_cities"
  );

  function addCity(rawName: string) {
    const name = rawName.trim().toLowerCase();

    if (!name) return;
    if (cities.includes(name)) return;

    setCities((prev) => [...prev, name]);
  }

  function removeCity(name: string) {
    setCities((prev) => prev.filter((city) => city !== name));
  }

  return (
    <CitiesContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);

  if (!context) throw new Error("useCities must be used within CitiesProvider");

  return context;
}
