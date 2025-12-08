"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type CardVariant = "summary" | "detailed";

export interface Weather {
  name: string;
  main: { temp: number; humidity: number };
  weather: [{ main: string; icon: string }];
  wind: { speed: number };
}

interface CardProps {
  cityName: string;
  variant?: CardVariant;
}

export default function Card({ cityName, variant = "summary" }: CardProps) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`api/weather?cityName=${cityName}`);

        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch weather");

        const fetchedData = (await response.json()) as Weather;
        setData(fetchedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Some error occured");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [cityName]);

  console.log(data);

  function handleClick() {
    if (variant === "summary")
      router.push(`/city/${encodeURIComponent(cityName)}`);
  }
  /* const response = await fetch(
    `/api/weather?cityName=${encodeURIComponent(cityName)}`
  );

  if (!response.ok) throw new Error("Failed to fetch"); */

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>{error}</div>; //notFound()

  const iconCode = data.weather[0].icon;
  const iconUrl =
    iconCode && `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return (
    <div
      className="weather-card"
      role={variant === "summary" ? "button" : undefined}
      onClick={handleClick}
    >
      <div className="weather-card__info">
        <div className="weather-card__header">
          <h1 className="weather-card__city">{data.name}</h1>
          <p className="weather-card__condition">{data.weather[0]?.main}</p>
        </div>

        <div className="weather-card__stats">
          <p className="weather-card__stat">
            <span className="weather-card__stat--label">Humidity: </span>
            <span className="weather-card__stat--value">
              {data.main.humidity}&#37;
            </span>
          </p>

          <p className="weather-card__stat">
            <span className="weather-card__stat--label">Wind: </span>
            <span className="weather-card__stat--value">
              {data.wind.speed}km&#47;h
            </span>
          </p>
        </div>
      </div>

      <div className="weather-card__main">
        <div className="weather-card__icon--wrapper">
          <Image
            src={iconUrl}
            alt="weather icon"
            width={70}
            height={70}
            className="weather-card__icon"
          />
        </div>

        <p className="weather-card__temperature">
          <span className="weather-card__temperature--value">
            {Math.trunc(data.main.temp)}{" "}
          </span>
          <span className="weather-card__temperature--unit">&#8451;</span>
        </p>
      </div>
    </div>
  );
}
