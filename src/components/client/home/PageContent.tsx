"use client";

import { useEffect, useState } from "react";
import GetStarted from "../pages/GetStarted";
import NewsPosts from "../pages/NewsPosts";
import SupportContact from "../pages/SupportContact";
import UserManagement from "../pages/UserManagement";

type TopicId =
  | "get-started"
  | "news-post"
  | "support-contact"
  | "user-management";

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

type TopicsData = Record<string, Record<string, any>>;

const PageContent = ({ topicsData }: { topicsData?: TopicsData }) => {
  const [activeSection, setActiveSection] = useState<TopicId>("get-started");

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
    switch (activeSection) {
      case "get-started":
        const getStartedSections = topicsData?.["get-started"];
        return <GetStarted sections={getStartedSections} />;
      case "news-post":
        const newsPostSections = topicsData?.["news-post"];
        return <NewsPosts sections={newsPostSections} />;
      case "support-contact":
        const supportSections = topicsData?.["support-contact"];
        return <SupportContact sections={supportSections} />;
      case "user-management":
        const userSections = topicsData?.["user-management"];
        return <UserManagement sections={userSections} />;
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default PageContent;
