"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Language from "./Language";
import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { FaBars } from "react-icons/fa6";
import { FaSearch, FaTimes } from "react-icons/fa";
import Search from "./Search";
import { motion, AnimatePresence, Variants } from "framer-motion";

const slideSearch: Variants = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", damping: 25, stiffness: 200 },
      opacity: { delay: 0.2, duration: 0.2 },
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      opacity: { duration: 0.1 }, // 👈 hurtigere fade ud
      x: { type: "spring", damping: 25, stiffness: 200 },
    },
  },
};

const Header = () => {
  const { t } = useTranslation();
  const [isLight, setIsLight] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const toggleSidebar = () => {
    const event = new CustomEvent("sidebar:toggle");
    window.dispatchEvent(event);
  };

  return (
    <div className="navbar fixed top-0 inset-x-0 z-50 max-w-[1536px] mx-auto md:px-5 md:py-5 py-7 bg-base-100 shadow">
      <div className="navbar-start flex items-center gap-2 pl-4">
        {/* Hamburger menu button - only visible on mobile */}
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-ghost text-xl md:hidden relative z-50"
          aria-label="Åbn menu"
        >
          <FaBars />
        </button>
        <Link
          href="https://arzonic.com"
          className={`flex items-center gap-2 ${isSearchOpen ? "hidden" : "block"}`}
          aria-label={t("aria.navigation.linkToHome")}
        >
          <Image
            src="/icon-192x192.png"
            alt={t("Header.logoAlt")}
            width={60}
            height={60}
            className={`h-10 w-10 md:h-14 md:w-14 rounded-full`}
            priority
          />
          <span className="font-bold text-2xl md:text-3xl tracking-wider">
            {t("Header.brandName")}
          </span>
          <span className="text-secondary font-medium pt-2">Docs</span>
        </Link>
      </div>
      <div className="ml-30 navbar-center hidden md:flex md:w-56 lg:w-80">
        <Search />
      </div>
      <div className="navbar-end flex items-center gap-0 md:gap-2 ">
        {/* Search overlay - only on mobile */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              variants={slideSearch}
              initial="initial"
              animate="animate"
              exit="exit"
              className=" bg-base-100 flex items-center px-4 md:hidden z-40 "
            >
              <div className=" w-60">
                <Search />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="btn btn-sm btn-ghost text-xl md:hidden relative z-50"
          aria-label="Søg"
        >
          {isSearchOpen ? <FaTimes /> : <FaSearch />}
        </button>
        <div className="hidden md:flex items-center gap-2">
          <Language />
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost text-xl"
            aria-label="Skift tema"
          >
            {isLight ? <HiOutlineMoon /> : <HiOutlineSun />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
