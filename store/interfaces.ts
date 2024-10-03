import type { IGEOResponse } from "@/api/geo/interfaces";
import type { IWeatherResponse } from "@/api/weather/interfaces";

export interface ICityStore {
  cityList: IGEOResponse[];
  addToCityList: (city: IGEOResponse) => void;
  addToFavorites: (city: IGEOResponse) => void;
  removeFromFavorites: (city: IGEOResponse) => void;
  updateWeather: (city: IGEOResponse, weather: IWeatherResponse | null) => void;
}
