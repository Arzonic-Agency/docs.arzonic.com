"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { deleteSection } from "@/lib/server/actions";
import UpdateSection from "./updateSection/UpdateCase";

interface SectionsListProps {
  view: "cards" | "list";
  page: number;
  setTotal: (total: number) => void;
  onEditSection: (sectionId: number) => void;
}

interface SectionItem {
  id: number;
  company: string;
  desc: string;
  image: string | null;
}

const FALLBACK_IMAGE = "/demo.jpg";

const SectionsList = ({ view, page, setTotal, onEditSection }: SectionsListProps) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sectionItems, setSectionItems] = useState<SectionItem[]>([]);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [deletingSectionId, setDeletingSectionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sections?page=${page}&lang=${i18n.language}`);
      if (!res.ok) throw new Error("Failed to load sections");
      const { sections, total } = await res.json();
      setSectionItems(sections);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
      setSectionItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, setTotal, i18n.language]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const truncate = (text: string | null | undefined, max: number) =>
    text && text.length > max ? text.slice(0, max) + "…" : text || "";

  const handleSectionUpdated = () => {
    setEditingSectionId(null);
    fetchSections();
  };

  const handleDelete = async () => {
    if (deletingSectionId == null) return;
    try {
      await deleteSection(deletingSectionId);
      setDeletingSectionId(null);
      setIsModalOpen(false);
      fetchSections();
    } catch (err) {
      console.error("Failed to delete section:", err);
    }
  };

  const closeModal = () => {
    setDeletingSectionId(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center gap-3 items-center w-full">
        <span className="loading loading-spinner loading-md h-40" />
        {t("loading_sections")}
      </div>
    );
  }

  if (sectionItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg text-gray-500">{t("no_sections")}</p>
      </div>
    );
  }

  if (editingSectionId) {
    return (
      <UpdateSection sectionId={editingSectionId} onSectionUpdated={handleSectionUpdated} />
    );
  }

  return (
    <div className="w-full">
      {view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectionItems.map((item) => (
            <div
              key={item.id}
              className="card card-compact shadow-md bg-base-300 rounded-lg ring-base-300 ring-3 md:ring-5"
            >
              <figure className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={`Section for ${item.company}`}
                  fill
                  priority={page === 1}
                  className="object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{item.company}</h2>
                <p className="text-xs">{truncate(item.desc, 100)}</p>
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => onEditSection(item.id)}
                  >
                    <FaPen /> {t("edit")}
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setDeletingSectionId(item.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaTrash /> {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {sectionItems.map((item) => (
            <li key={item.id}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="relative w-12 h-10 rounded-md overflow-hidden">
                    <Image
                      src={item.image || FALLBACK_IMAGE}
                      alt={`Section for ${item.company}`}
                      fill
                      priority={page === 1}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xs hidden sm:block">
                    {item.company}
                  </h3>
                  <h3 className="font-semibold text-xs block sm:hidden">
                    {truncate(item.company, 20)}
                  </h3>
                </div>
                <div className="flex gap-5 md:gap-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => onEditSection(item.id)}
                  >
                    <FaPen />{" "}
                    <span className="md:flex hidden">{t("edit")}</span>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setDeletingSectionId(item.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaTrash />{" "}
                    <span className="md:flex hidden">{t("delete")}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && deletingSectionId != null && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {t("delete_section_confirmation")}
            </h3>
            <p className="py-4">{t("delete_section_prompt")}</p>
            <p className="text-sm text-warning">{t("delete_section_warning")}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                {t("cancel")}
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionsList;
