import Link from "next/link";

import type { IGEOResponse } from "@/api/geo/interfaces";
import { cityStore } from "@/store/cityStore";

import styles from "./favorites.module.scss";

const FavoriteCityItem = ({ city }: { city: IGEOResponse; }): React.ReactElement => {
  const { removeFromFavorites } = cityStore();
  
  const onHandleRemoveFromFavorite = (): void => {
    removeFromFavorites(city);
  };

  return (
    <div className={styles.favoriteItem}>
      <div className={styles.currentWeather}>
        <h1 className={styles.h1}>
          {city.display_name}
        </h1>
        {city.weather && (
          <h2 className={styles.h2}>
            {`${city.weather.current.temperature_2m} ${city.weather.current_units.temperature_2m}`}
          </h2>
        )}
      </div>
      <div className={styles.actions}>
        <div className="btn-group" role="group" aria-label="Actions">
          <button type="button" className="btn btn-primary" onClick={onHandleRemoveFromFavorite}>
            Remove city from favorites
          </button>
          <Link href={`/details/${city.place_id}`}>See more detailed forecast</Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCityItem;
