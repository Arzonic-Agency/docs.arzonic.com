import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface SectionsListChangeProps {
  onViewChange: (view: "cards" | "list") => void;
}

const SectionsListChange = ({ onViewChange }: SectionsListChangeProps) => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<"cards" | "list">("cards");

  const handleViewChange = (view: "cards" | "list") => {
    setActiveView(view);
    onViewChange(view);
  };

  return (
    <div role="tablist" className="tabs tabs-border">
      <a
        role="tab"
        className={`tab ${
          activeView === "cards" ? "tab-active rounded-lg" : ""
        }`}
        onClick={() => handleViewChange("cards")}
        aria-label={t("aria.sectionsListChange.cardsView")}
      >
        {t("cards")}
      </a>
      <a
        role="tab"
        className={`tab ${
          activeView === "list" ? "tab-active tab-active rounded-lg" : ""
        }`}
        onClick={() => handleViewChange("list")}
        aria-label={t("aria.sectionsListChange.listView")}
      >
        {t("list")}
      </a>
    </div>
  );
};

export default SectionsListChange;
