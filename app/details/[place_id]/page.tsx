"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { cityStore } from "@/store/cityStore";

import styles from "./weather.module.scss";
import type { IGEOResponse } from "@/api/geo/interfaces";

interface Params {
  params: {
    place_id: number;
  };
}

const Details = ({ params: { place_id }}: Params): React.ReactElement => {
  if (!place_id) {
    redirect("/favorites");
  }

  const { cityList } = cityStore();

  const [hydrated, setHydrated] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<IGEOResponse | null | undefined>(undefined);

  // HELPERS

  const extractTimeFromDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const generateHourlyForecast = (): { time: string; temperature_2m: string; }[] => {
    const hourlyForecast: { time: string; temperature_2m: string; }[] = [];
    
    if (currentCity && currentCity.weather) {
      for (let i = 0; i < currentCity.weather.hourly.time.length; i++) {
        hourlyForecast.push({
          time: extractTimeFromDateTime(currentCity.weather.hourly.time[i] as string),
          temperature_2m: `${currentCity.weather.hourly.temperature_2m[i]} ${currentCity.weather.hourly_units.temperature_2m}`
        });
      }
    }

    return hourlyForecast;
  };

  const generateDailyForecast = (): { date: string; temperature_2m_max: string; temperature_2m_min: string; }[] => {
    const dailyForecast: { date: string; temperature_2m_max: string; temperature_2m_min: string; }[] = [];
    
    if (currentCity && currentCity.weather) {
      for (let i = 0; i < currentCity.weather.daily.time.length; i++) {
        dailyForecast.push({
          date: currentCity.weather.daily.time[i],
          temperature_2m_max: `${currentCity.weather.daily.temperature_2m_max[i]} ${currentCity.weather.daily_units.temperature_2m_max}`,
          temperature_2m_min: `${currentCity.weather.daily.temperature_2m_min[i]} ${currentCity.weather.daily_units.temperature_2m_min}`
        });
      }
    }

    return dailyForecast;
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      setCurrentCity(cityList.find(city => Number(city.place_id) === Number(place_id)));
    }
  }, [hydrated]);

  return (
    <main className="p-4">
      <div className="container">
        {currentCity && (
          <div className={styles.weather}>
            <div className={styles.currentWeather}>
              <h1 className={styles.h1}>
                {currentCity?.display_name}
              </h1>
              <h2 className={styles.h2}>
                {`${currentCity.weather!.current.temperature_2m} ${currentCity.weather!.current_units.temperature_2m}`}
              </h2>
            </div>
            <h3>Hourly forecast</h3>
            <div className={styles.hourlyTemperature}>
              {generateHourlyForecast().map((hforecast, idx) => (
                <div key={idx} className={styles.hourlyItem}>
                  <p className={styles.ptime}>{hforecast.time}</p>
                  <p className={styles.ptemp}>{hforecast.temperature_2m}</p>
                </div>
              ))}
            </div>
            <h3>Daily forecast</h3>
            <div className={styles.hourlyTemperature}>
              {generateDailyForecast().map((dforecast, idx) => (
                <div key={idx} className={styles.hourlyItem}>
                  <p className={styles.ptime}>{dforecast.date}</p>
                  <p className={styles.ptemp}>{`H ${dforecast.temperature_2m_max} : L ${dforecast.temperature_2m_min}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Details;
