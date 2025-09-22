"use client";

import React, { useEffect, useState } from "react";
import GetStarted from "../pages/GetStarted";
import NewsPosts from "../pages/NewsPosts";
import SupportContact from "../pages/SupportContact";
import UserManagement from "../pages/UserManagement";

type TopicId =
  | "get-started"
  | "news-post"
  | "support-contact"
  | "user-management";

// Mapping mellem item-slugs og dine komponent-sektioner
const sectionsToTopicsMap: Record<string, TopicId> = {
  introduction: "get-started",
  news: "news-post",
  support: "support-contact",
  users: "user-management",
  intro: "get-started",
  flow: "get-started",
  create: "news-post",
  upload: "news-post",
  contact: "support-contact",
  faq: "support-contact",
  manage: "user-management",
  roles: "user-management",
};

type SectionsMap = Record<string, any>;
type TopicsData = Record<string, Record<string, any>>;

const PageContent = ({
  sections,
  topicsData,
}: {
  sections?: SectionsMap;
  topicsData?: TopicsData;
}) => {
  const [activeSection, setActiveSection] = useState<TopicId>("get-started");

  console.log("📄 PageContent - Received sections:", sections);
  console.log("📄 PageContent - Received topicsData:", topicsData);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const itemId = e.detail.sectionId;
      const sectionId = sectionsToTopicsMap[itemId];

      if (sectionId) {
        setActiveSection(sectionId);

        const isSectionHeader = [
          "introduction",
          "news",
          "support",
          "users",
        ].includes(itemId);

        if (!isSectionHeader) {
          setTimeout(() => {
            const element = document.getElementById(itemId);
            if (element) {
              const elementPosition = element.offsetTop;
              const offsetPosition = elementPosition - 120;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          }, 100);
        } else {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 100);
        }
      }
    };

    window.addEventListener("sidebar:navigate", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar:navigate", handler as EventListener);
  }, []);

  const renderContent = () => {
    console.log("🎨 Rendering content for section:", activeSection);

    switch (activeSection) {
      case "get-started":
        const getStartedSections = topicsData?.["get-started"] || {};
        console.log(
          "📚 Rendering GetStarted with sections:",
          getStartedSections
        );
        return <GetStarted sections={getStartedSections} />;
      case "news-post":
        const newsPostSections = topicsData?.["news-post"] || {};
        console.log("📰 Rendering NewsPosts with sections:", newsPostSections);
        return <NewsPosts sections={newsPostSections} />;
      case "support-contact":
        const supportSections = topicsData?.["support-contact"] || {};
        console.log(
          "🎧 Rendering SupportContact with sections:",
          supportSections
        );
        return <SupportContact sections={supportSections} />;
      case "user-management":
        const userSections = topicsData?.["user-management"] || {};
        console.log("👥 Rendering UserManagement with sections:", userSections);
        return <UserManagement sections={userSections} />;
      default:
        return null;
    }
  };

  return <main className="p-6 pt-12 md:pt-6">{renderContent()}</main>;
};

export default PageContent;
