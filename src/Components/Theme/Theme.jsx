import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../Context/ThemeContext";

const Theme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={`group relative flex h-10 w-[76px] items-center rounded-full p-1 shadow-inner transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-200 ${
        isDark
          ? "bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-800 hover:shadow-violet-500/30"
          : "bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-400 hover:shadow-amber-400/40"
      }`}
    >
      <span className="absolute left-2.5 text-amber-100 transition-opacity duration-300" aria-hidden="true">
        <FaMoon size={13} />
      </span>
      <span className="absolute right-2.5 text-orange-700 transition-opacity duration-300" aria-hidden="true">
        <FaSun size={14} />
      </span>
      <span
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-out group-hover:rotate-12 ${
          isDark
            ? "translate-x-9 bg-slate-100 text-violet-700"
            : "translate-x-0 bg-white text-amber-500"
        }`}
        aria-hidden="true"
      >
        {isDark ? <FaMoon size={14} /> : <FaSun size={15} />}
      </span>
    </button>
  );
};

export default Theme;
