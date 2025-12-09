"use client";

import { useCities } from "@/lib/context/CitiesContext";
import Card from "./Card";

export default function CardList() {
  const { cities, removeCity } = useCities();

  if (!cities.length)
    return <h3>Nothing to show yet. Search for a city to get its weather.</h3>;

  return (
    <ul className="cities-list">
      {cities.map((city) => {
        return (
          <li key={city} className="cities-list__city">
            <Card cityName={city} onRemove={() => removeCity(city)} />
          </li>
        );
      })}
    </ul>
  );
}
