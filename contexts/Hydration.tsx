"use client";

import * as React from "react";

import { cityStore } from "@/store/cityStore";

const Hydration = () => {
  React.useEffect(() => {
    cityStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
