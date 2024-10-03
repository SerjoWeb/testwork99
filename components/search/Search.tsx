"use client";

import { Fragment, useState } from "react";
import type { IGEOResponse } from "@/api/geo/interfaces";

import SearchInput from "../ui/searchInput/SearchInput";
import Weather from "../weather/Weather";

const Search = (): React.ReactElement => {
  const [citySearch, setCitySearch] = useState<IGEOResponse | null>(null);

  return (
    <Fragment>
      <SearchInput setCitySearch={setCitySearch} />
      <Weather citySearch={citySearch} />
    </Fragment>
  );
};

export default Search;
