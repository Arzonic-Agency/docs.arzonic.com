"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import GetStarted from "../pages/GetStarted";
import NewsPosts from "../pages/NewsPosts";
import SupportContact from "../pages/SupportContact";
import UserManagement from "../pages/UserManagement";

const sections = [
  {
    id: "get-started",
    label: "Kom godt i gang",
    under: [
      { id: "intro", label: "Introduktion", content: <GetStarted /> },
      {
        id: "flow",
        label: "Sådan fungerer det",
        content: <div>Flow-beskrivelse</div>,
      },
    ],
  },
  {
    id: "news-post",
    label: "Nyhedsopslag",
    under: [
      { id: "create", label: "Opret opslag", content: <NewsPosts /> },
      {
        id: "upload",
        label: "Upload billeder/video",
        content: <div>Upload komponent</div>,
      },
    ],
  },
  {
    id: "support-contact",
    label: "Support og kontakt",
    under: [
      { id: "contact", label: "Kontakt os", content: <SupportContact /> },
      { id: "faq", label: "FAQ / Hjælp", content: <div>FAQ indhold</div> },
    ],
  },
  {
    id: "user-management",
    label: "Brugerhåndtering",
    under: [
      {
        id: "manage",
        label: "Brugeradministration",
        content: <UserManagement />,
      },
      {
        id: "roles",
        label: "Roller og tilladelser",
        content: <div>Roller-indhold</div>,
      },
    ],
  },
];

const NavContent = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("get-started");

  const activeSection = sections.find((section) => section.id === activeTab);

  return (
    <div className="flex w-full min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="w-64 mt-20 fixed top-0 left-0 bg-base-100 border-r border-base-300 p-4 overflow-y-auto hidden md:block z-40">
        <ul className="menu space-y-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveTab(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-base-200 transition ${
                  activeTab === section.id ? "bg-base-300 font-semibold" : ""
                }`}
              >
                {section.label}
              </button>

              {/* Underpunkter for aktiv side */}
              {activeTab === section.id && (
                <ul className="ml-3 mt-1 space-y-1">
                  {section.under.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`#${item.id}`}
                        className="link link-hover text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content shifted right to make room for fixed sidebar */}
      <main className="ml-64 flex-1 p-6 space-y-16">
        {activeSection?.under.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className="scroll-mt-24 bg-base-200 rounded-lg shadow-md p-5 md:p-7"
          >
            <h2 className="text-xl font-semibold mb-3">{item.label}</h2>
            {item.content}
          </section>
        ))}
      </main>
    </div>
  );
};

export default NavContent;
