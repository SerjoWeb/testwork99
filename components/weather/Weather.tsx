"use client";

import { Fragment, useEffect, useState } from "react";
import { getWeather } from "@/api/weather/weatherApi";
import { cityStore } from "@/store/cityStore";

import { IWeatherResponse } from "@/api/weather/interfaces";
import type { IGEOResponse } from "@/api/geo/interfaces";

import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "../ui/spinner/Spinner";
import styles from "./weather.module.scss";

const Weather = ({ citySearch }: { citySearch: IGEOResponse | null; }): React.ReactElement => {
  const { addToFavorites, removeFromFavorites, updateWeather } = cityStore();

  const [weather, setWeather] = useState<IWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favCity, setFavCity] = useState<boolean>(citySearch ? citySearch.favorite! : false);

  const requestWeatherbyApi = async (): Promise<void> => {
    if (citySearch) {
      try {
        setLoading(true);

        const weatherResult = await getWeather({ latitude: Number(citySearch.lat), longitude: Number(citySearch.lon) });

        if (weatherResult) {
          setWeather(weatherResult);
          updateWeather(citySearch, weatherResult);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error: any) {
        toast(error.message);
        setLoading(false);
      }
    }
  };

  const onHandleToggleFavorite = (value: boolean): void => {
    if (citySearch) {
      setFavCity(value);

      if (value) {
        addToFavorites(citySearch);
      } else {
        removeFromFavorites(citySearch);
      }
    }
  };

  useEffect(() => {
    requestWeatherbyApi();
  }, [citySearch]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : weather ? (
        <div className={styles.weather}>
          <div className={styles.currentWeather}>
            <h1 className={styles.h1}>
              {citySearch?.display_name}
            </h1>
            <h2 className={styles.h2}>
              {`${weather.current.temperature_2m} ${weather.current_units.temperature_2m}`}
            </h2>
          </div>
          <div className={styles.actions}>
            <div className="btn-group" role="group" aria-label="Actions">
              <button type="button" className="btn btn-primary" onClick={() => onHandleToggleFavorite(!favCity)}>
                {favCity ? "Remove city from favorites" : "Add city to favorites"}
              </button>
              {citySearch && (
                <Link href={`/details/${citySearch.place_id}`}>See more detailed forecast</Link>
              )}
            </div>
          </div>
        </div>
      ) : <></>}
    </Fragment>
  );
};

export default Weather;
