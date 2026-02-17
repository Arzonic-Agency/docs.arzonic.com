"use client";

import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/client";
import { useTranslation } from "react-i18next";

const FEEDBACK_STORAGE_KEY = "doc_feedback_submitted";

export default function FeedbackWidget() {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<
    "up" | "down" | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (submitted) {
      setHasSubmitted(true);
      setSelectedFeedback(submitted as "up" | "down");
    }
  }, []);

  const saveFeedbackToDb = async (
    isPositive: boolean,
    message: string = "",
  ) => {
    const supabase = createClient();

    try {
      const { error } = await supabase.from("doc_feedback").insert({
        is_positive: isPositive,
        message: message || null,
      });

      if (error) {
        console.error("Error saving feedback to database:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error saving feedback:", error);
      return false;
    }
  };

  const handleThumbsUp = async () => {
    if (hasSubmitted || isSubmitting) return;

    setIsSubmitting(true);
    setSelectedFeedback("up");

    // Save to localStorage immediately for instant UI feedback
    localStorage.setItem(FEEDBACK_STORAGE_KEY, "up");
    setHasSubmitted(true);

    // Save to database
    await saveFeedbackToDb(true);

    setShowToast(true);
    setIsSubmitting(false);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleThumbsDown = () => {
    if (hasSubmitted) return;

    setSelectedFeedback("down");
    setShowModal(true);
  };

  const handleSubmitFeedback = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setShowModal(false);

    // Save to localStorage immediately for instant UI feedback
    localStorage.setItem(FEEDBACK_STORAGE_KEY, "down");
    setHasSubmitted(true);

    // Save to database with message
    await saveFeedbackToDb(false, feedbackText);

    setShowToast(true);
    setIsSubmitting(false);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Reset feedback text
    setFeedbackText("");
  };

  const handleCancelFeedback = () => {
    setShowModal(false);
    setSelectedFeedback(null);
    setFeedbackText("");
  };

  return (
    <>
      <div className="flex items-center gap-2 my-8">
        <div
          className="tooltip"
          data-tip={
            hasSubmitted
              ? t("feedback.tooltipSubmitted")
              : t("feedback.tooltip")
          }
        >
          <div className="join bg-base-100">
            <button
              onClick={handleThumbsUp}
              disabled={hasSubmitted || isSubmitting}
              className={`btn btn-sm join-item ${
                selectedFeedback === "up"
                  ? "bg-success/20 text-success "
                  : "btn-ghost"
              }`}
              aria-label={t("feedback.ariaThumbsUp")}
            >
              <FaThumbsUp className="text-lg" />
            </button>
            <button
              onClick={handleThumbsDown}
              disabled={hasSubmitted || isSubmitting}
              className={`btn btn-sm join-item  ${
                selectedFeedback === "down"
                  ? "btn-error btn-soft "
                  : "btn-ghost"
              }`}
              aria-label={t("feedback.ariaThumbsDown")}
            >
              <FaThumbsDown className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for negative feedback */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold mb-4">{t("feedback.modalTitle")}</h3>
            <p className="text-sm text-base-content/70 mb-4">
              {t("feedback.modalBody")}
            </p>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder={t("feedback.placeholder")}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleCancelFeedback}>
                {t("feedback.cancel")}
              </button>
              <button
                className="btn btn-primary btn-square"
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
                aria-label={t("feedback.ariaSubmit")}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-success">
            <span>{t("feedback.toastThanks")}</span>
          </div>
        </div>
      )}
    </>
  );
}
