"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <header>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <ThemeToggle />
    </header>
  );
}
