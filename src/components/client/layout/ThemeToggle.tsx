"use client";

import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const LIGHT_THEME = "arzoniclight";
  const DARK_THEME = "arzonicdark";
  const THEME_CHANGE_EVENT = "theme:change";

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const initializeTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      const currentTheme =
        storedTheme ??
        document.documentElement.getAttribute("data-theme") ??
        DARK_THEME;

      const themeToApply =
        currentTheme === LIGHT_THEME ? LIGHT_THEME : DARK_THEME;

      document.documentElement.setAttribute("data-theme", themeToApply);
      setIsLight(themeToApply === LIGHT_THEME);
    };

    initializeTheme();

    // Listen for theme changes from other instances
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsLight(customEvent.detail.isLight);
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = isLight ? DARK_THEME : LIGHT_THEME;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    const newIsLight = !isLight;
    setIsLight(newIsLight);

    // Notify other instances of the theme change
    window.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, {
        detail: { isLight: newIsLight },
      }),
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm btn-ghost text-xl"
      aria-label="Skift tema"
    >
      {isLight ? <HiOutlineMoon /> : <HiOutlineSun />}
    </button>
  );
};

export default ThemeToggle;
