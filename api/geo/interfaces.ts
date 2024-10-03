import { IWeatherResponse } from "../weather/interfaces";

export interface IGEORequest {
  q: string;
}

export interface IGEOResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: (string | number)[];
  lat: string | number;
  lon: string | number;
  display_name: string;
  class: string
  type: string;
  importance: number;
  favorite?: boolean;
  weather?: IWeatherResponse | null;
}
