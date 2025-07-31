"use client";

import React, { useEffect, useState } from "react";
import GetStarted from "../pages/GetStarted";
import NewsPosts from "../pages/NewsPosts";
import SupportContact from "../pages/SupportContact";
import UserManagement from "../pages/UserManagement";

type SectionId =
  | "get-started"
  | "news-post"
  | "support-contact"
  | "user-management";

// Mapping fra individuelle ID'er til sections
const itemToSectionMap: Record<string, SectionId> = {
  // Section headers
  introduction: "get-started",
  news: "news-post",
  support: "support-contact",
  users: "user-management",
  // Individual items
  intro: "get-started",
  flow: "get-started",
  create: "news-post",
  upload: "news-post",
  contact: "support-contact",
  faq: "support-contact",
  manage: "user-management",
  roles: "user-management",
};

const PageContent = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("get-started");

  // Lyt til custom events fra SidebarNav
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const itemId = e.detail.sectionId;
      const sectionId = itemToSectionMap[itemId];

      if (sectionId) {
        setActiveSection(sectionId);

        // Kun scroll til specifikt element hvis det er et item (ikke en section header)
        const isSectionHeader = [
          "introduction",
          "news",
          "support",
          "users",
        ].includes(itemId);

        if (!isSectionHeader) {
          // Scroll til det specifikke element efter kort delay
          setTimeout(() => {
            const element = document.getElementById(itemId);
            if (element) {
              const elementPosition = element.offsetTop;
              const offsetPosition = elementPosition - 120; // 120px offset for header space

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }, 100);
        } else {
          // For section headers, scroll to top of page
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };

    window.addEventListener("sidebar:navigate", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar:navigate", handler as EventListener);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "get-started":
        return <GetStarted />;
      case "news-post":
        return <NewsPosts />;
      case "support-contact":
        return <SupportContact />;
      case "user-management":
        return <UserManagement />;
      default:
        return null;
    }
  };

  return <main className="p-6 pt-12 md:pt-6">{renderContent()}</main>;
};

export default PageContent;
