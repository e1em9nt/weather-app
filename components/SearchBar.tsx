"use client";

import { useRef } from "react";
import SearchIcon from "./SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <input
        className="search-bar__input"
        type="search"
        ref={inputRef}
        placeholder="City name..."
        pattern="[a-zA-Z ,]+"
        title="Only letters, spaces, and commas are allowed"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <SearchIcon
        className="search-bar__icon"
        onClick={() => inputRef.current?.focus()}
        role="button"
        aria-label="Focus search input"
      />
    </form>
  );
}
