"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Language from "./Language";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Check if we're on mobile (md breakpoint is 768px)
        if (window.innerWidth < 768) {
          setIsSearchOpen(true);
          setTimeout(() => mobileSearchRef.current?.focus(), 100);
        } else {
          desktopSearchRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile search when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const event = new CustomEvent("sidebar:toggle");
    window.dispatchEvent(event);
  };

  return (
    <div className="navbar fixed top-0 inset-x-0 z-50 max-w-384 mx-auto md:px-5 md:py-5 h-24 md:h-auto bg-base-100 shadow">
      <div className="navbar-start flex items-center gap-2 md:pl-4">
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-ghost text-xl md:hidden relative z-50"
          aria-label={t("header.openMenu")}
        >
          <FaBars />
        </button>
        <Link
          href="https://arzonic.com"
          className={`flex items-center gap-2 ${isSearchOpen ? "hidden min-[600px]:flex" : ""}`}
          aria-label={t("aria.navigation.linkToHome")}
        >
          <Image
            src="/icon-192x192.png"
            alt={t("header.logoAlt")}
            width={60}
            height={60}
            className={`h-10 w-10 md:h-14 md:w-14 rounded-full`}
            priority
          />
          <span className="font-bold text-2xl md:text-3xl tracking-wider">
            {t("header.brandName")}
          </span>
          <span className="text-secondary font-medium pt-2">
            {t("header.docsLabel")}
          </span>
        </Link>
      </div>
      <div className="ml-30 navbar-center hidden md:flex md:w-72 lg:w-96">
        <Search ref={desktopSearchRef} />
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
              className="absolute top-1/2 -translate-y-1/2 right-12 bg-base-100 flex items-center px-4 md:hidden z-40"
            >
              <div className="w-60">
                <Search ref={mobileSearchRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            const opening = !isSearchOpen;
            setIsSearchOpen(opening);
            if (opening) {
              setTimeout(() => mobileSearchRef.current?.focus(), 600);
            }
          }}
          className="btn btn-sm btn-ghost text-xl md:hidden relative z-50"
          aria-label={t("search.placeholder")}
        >
          {isSearchOpen ? <FaTimes /> : <FaSearch />}
        </button>
        <div className="hidden md:flex items-center gap-2">
          <Language />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
