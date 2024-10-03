"use client";

import { Fragment, useState, useEffect } from "react";
import { cityStore } from "@/store/cityStore";

import FavoriteCityItem from "./FavoriteCityItem";
import styles from "./favorites.module.scss";

const FavoriteCityList = (): React.ReactElement => {
  const { cityList } = cityStore();

  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <Fragment>
      {hydrated && (
        <Fragment>
          {cityList.length ? (
            <div className={styles.favoriteList}>
              {cityList.filter((city) => city.favorite).map((city) => (
                <FavoriteCityItem key={city.place_id} city={city} />
              ))}
            </div>
          ) : (
            <div>
              <p>There are no favorite cities in the list yet!</p>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default FavoriteCityList;
