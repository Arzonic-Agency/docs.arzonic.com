"use client";

import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      setIsLight(true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      setIsLight(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      setIsLight(false);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
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
