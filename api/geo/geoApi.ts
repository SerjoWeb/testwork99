import axios from "axios";
import toast from "react-hot-toast";

import { GEO_API_URL } from "./constants";
import type { IGEORequest, IGEOResponse } from "./interfaces";

const getGeo = async (params: IGEORequest): Promise<IGEOResponse | null> => {
  try {
    const url = `${GEO_API_URL}?q=${params.q}&api_key=${process.env.NEXT_PUBLIC_OPEN_GEO_API_KEY}`;

    const response = await axios.get(url);
    const result: IGEOResponse = await response.data[0];

    return result;
  } catch (error: any) {
    toast(error.message);
    return null;
  }
};

export {
  getGeo
};
