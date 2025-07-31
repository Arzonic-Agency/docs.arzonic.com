"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    id: "introduction",
    label: "Introduktion",
    items: [
      { id: "intro", label: "kom godt i gang" },
      { id: "flow", label: "Sådan fungerer det" },
    ],
  },
  {
    id: "news",
    label: "Nyhedsopslag",
    items: [
      { id: "create", label: "Opret opslag" },
      { id: "upload", label: "Upload billeder/video" },
    ],
  },
  {
    id: "support",
    label: "Support og kontakt",
    items: [
      { id: "contact", label: "Kontakt os" },
      { id: "faq", label: "FAQ / Hjælp" },
    ],
  },
  {
    id: "users",
    label: "Brugerhåndtering",
    items: [
      { id: "manage", label: "Brugeradministration" },
      { id: "roles", label: "Roller og tilladelser" },
    ],
  },
];

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
        className={`w-64 h-screen fixed top-[64px] bg-base-100 shadow-xl p-4 pt-10 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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

      {/* Desktop sidebar */}
      <aside className="w-64 h-screen fixed md:top-[101px] bg-base-100 shadow-xl p-4 overflow-y-auto hidden md:block z-40">
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
          className="fixed inset-0 bg-black/30 bg-opacity-20 z-40 md:hidden top-[64px]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
