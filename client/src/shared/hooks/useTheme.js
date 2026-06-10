import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      else return "light";
    });

    document.body.classList.toggle("dark");
  };

  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  useEffect(() => {
    if (theme === "dark" && !document.body.classList.contains("dark"))
      document.body.classList.add("dark");
    else if (theme === "light" && document.body.classList.contains("dark"))
      document.body.classList.remove("dark");
  }, []);

  return { theme, toggleTheme };
};
