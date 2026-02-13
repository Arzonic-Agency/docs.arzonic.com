"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/client/searchData";
import Language from "./Language";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = () => {
      setIsMobileOpen((prev) => !prev);
    };

    window.addEventListener("sidebar:toggle", handleSidebarToggle);

    return () => {
      window.removeEventListener("sidebar:toggle", handleSidebarToggle);
    };
  }, []);

  const handleNavigation = (sectionId: string) => {
    const event = new CustomEvent("sidebar:navigate", {
      detail: { sectionId },
    });
    window.dispatchEvent(event);
    // Close mobile sidebar after navigation
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`w-68 fixed top-16 bottom-0 bg-base-100 shadow-xl p-4 pt-10 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="menu space-y-4 flex-1 overflow-y-auto">
          {sections.map((section) => (
            <li key={section.label}>
              <button
                onClick={() => handleNavigation(section.id)}
                className="font-bold text-base link link-hover text-left"
              >
                {section.label}
              </button>
              <ul className="ml-3 mt-1 space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className="link link-hover text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Language and Theme toggles at bottom */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-base-300">
          <Language />
          <ThemeToggle />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-68 h-screen fixed md:top-25.25 bg-base-100 shadow-lg p-4 overflow-y-auto hidden md:block z-40">
        <ul className="menu space-y-4">
          {sections.map((section) => (
            <li key={section.label}>
              <button
                onClick={() => handleNavigation(section.id)}
                className="font-bold text-base link link-hover text-left"
              >
                {section.label}
              </button>
              <ul className="ml-3 mt-1 space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className="link link-hover text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-20 z-40 md:hidden top-16"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
