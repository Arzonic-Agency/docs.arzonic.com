import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface SectionsPaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
}

const SectionsPagination = ({ page, setPage, total }: SectionsPaginationProps) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(total / 6);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="join bg-base-100">
      <button
        className="join-item btn bg-base-100"
        onClick={handlePrevious}
        disabled={page === 1}
        aria-label={t("aria.sectionsPagination.previousPage")}
      >
        <FaAngleLeft />
      </button>
      <span className="join-item btn bg-base-100">
        {t("site")} {page}
      </span>
      <button
        className="join-item btn bg-base-100"
        onClick={handleNext}
        disabled={page >= totalPages}
        aria-label={t("aria.sectionsPagination.nextPage")}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default SectionsPagination;
