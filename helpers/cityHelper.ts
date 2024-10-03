import type { IGEOResponse } from "@/api/geo/interfaces";
import type { TFavoriteActions } from "./types";
import type { IWeatherResponse } from "@/api/weather/interfaces";

export const getCityFromList = (list: IGEOResponse[], city: IGEOResponse): IGEOResponse | undefined => {
  if (!list || (list && !list.length)) {
    return undefined;
  }

  const result = list.find(cityFromList => cityFromList.place_id === city.place_id);
  return result;
};

export const addCityToList = (list: IGEOResponse[], cityToAdd: IGEOResponse): IGEOResponse[] => {
  let updatedList: IGEOResponse[] = [];
  const existedCity = getCityFromList(list, cityToAdd);

  if (!existedCity) {
    updatedList = [...list, cityToAdd];
  } else {
    updatedList = list;
  }

  return updatedList;
};

export const addRemoveFromFavorites = (
  list: IGEOResponse[],
  city: IGEOResponse,
  action: TFavoriteActions
): IGEOResponse[] | undefined => {
  if (!list || (list && !list.length)) {
    return undefined;
  }

  const copyList: IGEOResponse[] = JSON.parse(JSON.stringify(list));

  if (action === "add") {
    copyList.forEach((c) => {
      if (c.place_id === city.place_id) {
        c.favorite = true;
      }
    });
  } else if (action === "remove") {
    copyList.forEach((c) => {
      if (c.place_id === city.place_id) {
        c.favorite = false;
      }
    });
  }

  return copyList;
};

export const saveWeatherForSearchedCity = (
  list: IGEOResponse[],
  city: IGEOResponse,
  weather?: IWeatherResponse | null
): IGEOResponse[] | undefined => {
  if (!list || (list && !list.length)) {
    return undefined;
  }

  const copyList: IGEOResponse[] = JSON.parse(JSON.stringify(list));

  copyList.forEach((c) => {
    if (c.place_id === city.place_id) {
      c.weather = weather ? weather : null
    }
  });

  return copyList;
};
