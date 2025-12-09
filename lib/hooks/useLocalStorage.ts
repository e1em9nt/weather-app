"use client";
import { useState, useEffect, useCallback } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialState);

  // load once
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch {
      setValue(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // stable setter
  const setAndStore = useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (update) => {
      setValue((prev) => {
        const newValue = update instanceof Function ? update(prev) : update;
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(newValue));
          }
        } catch {}
        return newValue;
      });
    },
    [key] // depends only on key
  );

  return [value, setAndStore];
}
