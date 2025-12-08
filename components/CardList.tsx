//import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardList() {
  const cities = ["London", "Lviv", "Paris"];
  return (
    <ul className="cities-list">
      {cities.map((city) => {
        return (
          <li key={city} className="cities-list__city">
            <Card cityName={city} />
          </li>
        );
      })}
    </ul>
  );
}
