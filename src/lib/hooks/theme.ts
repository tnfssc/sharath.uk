import { $theme } from "@/lib/store/theme";
import { useMemo, useEffect } from "react";
import { useStore } from "@nanostores/react";

const toggle = (v?: "dark" | "light") => {
  const newValue = v ?? ($theme.get() === "dark" ? "light" : "dark");
  localStorage.setItem("theme", newValue);
  $theme.set(newValue);
  document.documentElement.classList.toggle("dark", newValue === "dark");
};

export function useTheme(): { toggle: typeof toggle; value: typeof $theme.value } {
  const theme = useStore($theme);
  useEffect(() => $theme.set(localStorage.getItem("theme") !== "light" ? "dark" : "light"), []);
  return useMemo(() => ({ toggle, value: theme }), [theme]);
}
