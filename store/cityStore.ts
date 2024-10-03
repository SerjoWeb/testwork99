import { create } from "zustand";
import { persist } from "zustand/middleware";

import { addCityToList, addRemoveFromFavorites, saveWeatherForSearchedCity } from "@/helpers/cityHelper";
import { LOCAL_STORAGE_KEY } from "./constants";

import type { IGEOResponse } from "@/api/geo/interfaces";
import type { ICityStore } from "./interfaces";
import { IWeatherResponse } from "@/api/weather/interfaces";

const setDefaultValue = (): IGEOResponse[] => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) : [];
  }

  return [];
};

const setLocalStorage = (updatedList: IGEOResponse[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
  }
};

export const cityStore = create<ICityStore>()(persist((set, get) => ({
  cityList: setDefaultValue(),
  addToCityList: (city: IGEOResponse) => {
    const list = get().cityList;
    const updatedList = addCityToList(list, city);

    setLocalStorage(updatedList);
    set({ cityList: updatedList });
  },
  addToFavorites: (city: IGEOResponse) => {
    const list = get().cityList;
    const updatedList = addRemoveFromFavorites(list, city, "add");

    if (updatedList) {
      setLocalStorage(updatedList);
      set({ cityList: updatedList });
    }
  },
  removeFromFavorites: (city: IGEOResponse) => {
    const list = get().cityList;
    const updatedList = addRemoveFromFavorites(list, city, "remove");

    if (updatedList) {
      setLocalStorage(updatedList);
      set({ cityList: updatedList });
    }
  },
  updateWeather: (city: IGEOResponse, weather: IWeatherResponse | null) => {
    if (weather) {
      const list = get().cityList;
      const updatedList = saveWeatherForSearchedCity(list, city, weather);

      if (updatedList) {
        setLocalStorage(updatedList);
        set({ cityList: updatedList });
      }
    }
  }
}), {
  name: "city-store"
}));
