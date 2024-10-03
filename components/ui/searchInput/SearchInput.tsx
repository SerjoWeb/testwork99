"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cityStore } from "@/store/cityStore";
import { getGeo } from "@/api/geo/geoApi";

import type { IGEOResponse } from "@/api/geo/interfaces";
import type { Dispatch, SetStateAction } from "react";

import styles from "./searchInput.module.scss";
import toast from "react-hot-toast";

const SearchInput = ({
  setCitySearch
}: {
  setCitySearch: Dispatch<SetStateAction<IGEOResponse | null>>;
}): React.ReactElement => {
  const { cityList, addToCityList } = cityStore();

  const searchRef = useOutsideClick(() => {
    if (cityList.length) {
      setHintsShowed(false);
    }
  });

  const [hydrated, setHydrated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hintsShowed, setHintsShowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const requestCitybyApi = async (): Promise<IGEOResponse | undefined> => {
    let result: IGEOResponse | undefined = undefined;
    
    if (searchTerm !== "") {
      try {
        setLoading(true);

        const geoResult = await getGeo({ q: searchTerm });

        if (geoResult) {
          result = geoResult;

          addToCityList(geoResult);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        toast(error.message);
      }
    }

    return result;
  };

  const handleSearch = async (): Promise<void> => {
    try {
      let city: IGEOResponse | undefined = undefined;

      if (cityList.length) {
        city = cityList.find((city) => city.display_name.includes(searchTerm) || city.display_name === searchTerm);
      }

      if (!city) {
        city = await requestCitybyApi();
      }

      if (city) {
        setCitySearch(city);
      }
    } catch (error: any) {
      toast(error.message);
    }
  };

  const handleShowHints = (): void => {
    if (cityList.length) {
      setHintsShowed(true);
    }
  };

  const onSetSearchValue = (value: string): void => {
    if (searchRef && searchRef.current) {
      setSearchTerm(value);
      setHintsShowed(false);
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className={styles.smartSearch} ref={searchRef}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type city to get know the weather"
          aria-label="City Search"
          aria-describedby="city-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleShowHints}
          disabled={loading}
        />
        <span
          className="input-group-text"
          id="city-search"
        >
          {!loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </span>
      </div>
      {hydrated ? (cityList && cityList.length && !loading) && (
        <div className={`${styles.hints} ${hintsShowed && styles.hintsShown}`}>
          <ul className={styles.list}>
            {cityList.map(({ display_name }, idx) => (
              <li
                key={idx}
                className={styles.item}
                onClick={() => onSetSearchValue(display_name)}
              >
                {display_name}
              </li>
            ))}
          </ul>
        </div>
      ) : ""}
    </div>
  );
};

export default SearchInput;
