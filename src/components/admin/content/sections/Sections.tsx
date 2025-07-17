"use client";

import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import SectionsPagination from "./SectionsPagination";
import SectionsListChange from "./SectionsListChange";
import SectionsList from "./SectionsList";
import { useTranslation } from "react-i18next";
import CreateSection from "./createSection/CreateCase";
import UpdateSection from "./updateSection/UpdateCase";

const Sections = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<"cards" | "list">("cards");
  const [showCreateSection, setShowCreateSection] = useState(false);
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const handleViewChange = (view: "cards" | "list") => {
    setView(view);
  };

  const handleSectionCreated = () => {
    setShowCreateSection(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSectionUpdated = () => {
    setShowUpdateSection(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col md:items-start gap-7">
      {showCreateSection ? (
        <div className="flex flex-col items-start gap-5">
          <button
            onClick={() => setShowCreateSection(false)}
            className="btn btn-ghost"
            aria-label={t("aria.sections.back")}
          >
            <FaAngleLeft />
            {t("back")}
          </button>
          <CreateSection onSectionCreated={handleSectionCreated} />
        </div>
      ) : showUpdateSection && selectedSectionId !== null ? (
        <div className="flex flex-col items-start gap-5">
          <button
            onClick={() => setShowUpdateSection(false)}
            className="btn btn-ghost"
            aria-label={t("aria.sections.back")}
          >
            <FaAngleLeft />
            {t("back")}
          </button>
          <UpdateSection
            sectionId={selectedSectionId}
            onSectionUpdated={handleSectionUpdated}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => setShowCreateSection(true)}
              className="btn btn-primary"
              aria-label={t("aria.sections.createSection")}
            >
              {t("create")} Section
            </button>
            <SectionsListChange onViewChange={handleViewChange} />
          </div>
          <SectionsList
            view={view}
            page={page}
            setTotal={setTotal}
            onEditSection={(sectionId: number) => {
              setSelectedSectionId(sectionId);
              setShowUpdateSection(true);
            }}
          />
          <div className="flex w-full justify-center">
            {total > 6 && (
              <SectionsPagination page={page} setPage={setPage} total={total} />
            )}
          </div>
        </>
      )}
      {showToast && (
        <div className="toast bottom-20 md:bottom-0 toast-end">
          <div
            className="alert alert-success text-neutral-content"
            aria-label={
              showCreateSection
                ? t("aria.sections.sectionCreated")
                : t("aria.sections.sectionUpdated")
            }
          >
            <span className="text-base md:text-lg">
              {showCreateSection ? t("section_created") : t("section_updated")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections;
