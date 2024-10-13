import { useMemo, useState, useEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem("theme") !== "dark" ? "light" : "dark",
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") htmlElement.classList.add("dark");
    else htmlElement.classList.remove("dark");
  }, [theme]);

  const toggle = useCallback((v?: "dark" | "light") => {
    setTheme((prev) => {
      const newValue = v ?? (prev === "dark" ? "light" : "dark");
      localStorage.setItem("theme", newValue);
      return newValue;
    });
  }, []);

  const hookValue = useMemo(() => {
    return { toggle, value: theme };
  }, [theme, toggle]);

  return hookValue;
}
