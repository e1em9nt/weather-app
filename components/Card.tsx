"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MouseEvent } from "react";

import Loading from "./Loading";
import UpdateButton from "./UpdateButton";
import { formatDate, formatTime } from "@/lib/formatters";

type CardVariant = "summary" | "detailed";

interface Weather {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  weather: [{ main: string; icon: string }];
  wind: { speed: number };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  dt: number;
}

interface CardProps {
  cityName: string;
  variant?: CardVariant;
  onRemove?: () => void;
}

export default function Card({
  cityName,
  variant = "summary",
  onRemove,
}: CardProps) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/weather?cityName=${encodeURIComponent(cityName)}`
      );

      if (!response.ok) throw new Error("Failed to fetch weather");

      const fetchedData = (await response.json()) as Weather;
      setData(fetchedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Some error occured");
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  function handleClick() {
    if (variant === "summary")
      router.push(`/city/${encodeURIComponent(cityName)}`);
  }

  function handleUpdateClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    loadWeather();
  }

  if (loading) return <Loading />;
  if (error || !data) return <div>{error}</div>;

  const iconCode = data.weather[0].icon;
  const iconUrl =
    iconCode && `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  if (variant === "summary")
    return (
      <div className="card  summary-card" role="button" onClick={handleClick}>
        <div className="summary-card__content">
          <div className="summary-card__info">
            <div className="summary-card__header">
              <h1 className="summary-card__city">{data.name}</h1>
              <p className="summary-card__condition">{data.weather[0]?.main}</p>
            </div>

            <div className="summary-card__stats">
              <p className="summary-card__stat">
                <span className="summary-card__stat--label">Humidity: </span>
                <span className="summary-card__stat--value">
                  {data.main.humidity}&#37;
                </span>
              </p>

              <p className="summary-card__stat">
                <span className="summary-card__stat--label">Wind: </span>
                <span className="summary-card__stat--value">
                  {data.wind.speed}km&#47;h
                </span>
              </p>
            </div>
          </div>

          <div className="summary-card__main">
            {onRemove && (
              <div className="summary-card__btn--wrapper">
                <button
                  className="summary-card__btn summary-card__btn--close"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                >
                  x
                </button>
              </div>
            )}

            <div className="summary-card__icon--wrapper">
              <Image
                src={iconUrl}
                alt="weather icon"
                width={70}
                height={70}
                className="summary-card__icon"
              />
            </div>

            <p className="summary-card__temperature">
              <span className="summary-card__temperature--value">
                {Math.trunc(data.main.temp)}
              </span>
              <span className="summary-card__temperature--unit">&#8451;</span>
            </p>
          </div>
        </div>

        <div className="summary-card__footer">
          <UpdateButton
            onClick={(e) => {
              handleUpdateClick(e);
            }}
          />
        </div>
      </div>
    );

  return (
    <>
      <div className="detailed-card">
        <div className="card detailed-card__header">
          <h1 className="detailed-card__city">{cityName}</h1>
          <h2 className="detailed-card__time">
            {formatTime(data.dt, data.timezone)}
          </h2>
          <p className="detailed-card__date">
            {formatDate(data.dt, data.timezone)}
          </p>
        </div>

        <div className="card detailed-card__main">
          <div className="detailed-card__column detailed-card__column--first">
            <p className="detailed-card__temperature">
              {Math.trunc(data.main.temp)}&#8451;
            </p>
            <p className="detailed-card__feels-like">
              <span className="detailed-card__label">Feels like: </span>
              <span className="detailed-card__value">
                {Math.trunc(data.main.feels_like)}&#8451;
              </span>
            </p>

            <ul className="detailed-card__list">
              <li className="detailed-card__sunrise detailed-card__list--item">
                <span className="detailed-card__label">Sunrise: </span>
                <span className="detailed-card__value">
                  {formatTime(data.sys.sunrise, data.timezone)} AM
                </span>
              </li>
              <li className="detailed-card__sunset detailed-card__list--item">
                <span className="detailed-card__label">Sunset: </span>
                <span className="detailed-card__value">
                  {formatTime(data.sys.sunset, data.timezone)} PM
                </span>
              </li>
            </ul>
          </div>

          <div className="detailed-card__column detailed-card__column--secondary">
            <div className="detailed-card__icon--wrapper">
              <Image
                src={iconUrl}
                alt="weather icon"
                width={120}
                height={120}
                className="detailed-card__icon"
              />
            </div>
            <p className="detailed-card__condition">{data.weather[0].main}</p>
          </div>

          <ul className="detailed-card__column  detailed-card__column--third detailed-card__list detailed-card__stats">
            <li className="detailed-card__stat detailed-card__list--item">
              <span className="detailed-card__label">Humidity: </span>
              <span className="detailed-card__value">
                {data.main.humidity}&#37;
              </span>
            </li>
            <li className="detailed-card__stat detailed-card__list--item">
              <span className="detailed-card__label">Wind Speed: </span>
              <span className="detailed-card__value">
                {data.wind.speed}km&#47;h
              </span>
            </li>
            <li className="detailed-card__stat detailed-card__list--item">
              <span className="detailed-card__label">Pressure: </span>
              <span className="detailed-card__value">
                {data.main.pressure}hPa
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="detailed-card__footer">
        <UpdateButton
          onClick={(e) => {
            handleUpdateClick(e);
          }}
        />
      </div>
    </>
  );
}
