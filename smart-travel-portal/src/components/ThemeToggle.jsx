import { useEffect } from "react";
import useLocalStorage from "../utils/useLocalStorage.js";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("wanderly-theme", "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button className="btn ghost small" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "Dark mode" : "Light mode"}
    </button>
  );
}