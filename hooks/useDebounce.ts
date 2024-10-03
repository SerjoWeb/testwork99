import { useEffect, useState } from "react";

export const useDebounce = (value: unknown, delay: number): unknown => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debouncedValue;
};
