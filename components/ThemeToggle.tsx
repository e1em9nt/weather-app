"use client";

import { useThemeContext } from "@/lib/context/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleThemeMode } = useThemeContext();

  return (
    <label className="theme-toggle" aria-label="Toggle dark mode">
      {/* Sun */}
      <svg
        className="theme-toggle__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={"var(--fc)"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      <div className="theme-toggle__track">
        {/* knob */}
        <span
          aria-hidden="true"
          className={`theme-toggle__knob ${
            isDarkMode ? "theme-toggle__knob--dark" : ""
          }`}
        />
        <input
          type="checkbox"
          className="theme-toggle__input"
          checked={isDarkMode}
          onChange={toggleThemeMode}
          role="switch"
          aria-checked={isDarkMode}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        />
      </div>

      {/* Moon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={"var(--fc)"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="theme-toggle__icon"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
}
