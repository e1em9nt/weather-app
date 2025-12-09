"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { useCities } from "@/lib/context/CitiesContext";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { addCity } = useCities();

  function handleSubmit() {
    addCity(searchValue);
    setSearchValue(""); // optional: clear input
  }

  return (
    <header className="header">
      <Link href="/" className="header__logo">
        Home
      </Link>
      <div className="header__actions">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
