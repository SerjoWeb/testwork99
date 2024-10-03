import axios from "axios";
import toast from "react-hot-toast";

import { WEATHER_API_URL } from "./constants";
import type { IWeatherRequest, IWeatherResponse } from "./interfaces";

const getWeather = async (params: IWeatherRequest): Promise<IWeatherResponse | null> => {
  try {
    const url = `${WEATHER_API_URL}?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min`;
    const response = await axios.get(url);
    const result = await response.data;

    return result;
  } catch (error: any) {
    toast(error.message);
    return null;
  }
};

export {
  getWeather
};
