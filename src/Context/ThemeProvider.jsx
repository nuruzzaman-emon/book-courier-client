import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("book-courier-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("book-courier-theme", theme);
    } catch {
      // The selected theme still applies for this session if storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const themeInfo = { theme, toggleTheme };
  return <ThemeContext value={themeInfo}>{children}</ThemeContext>;
};

export default ThemeProvider;
