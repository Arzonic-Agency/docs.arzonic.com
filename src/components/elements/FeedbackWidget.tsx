"use client";

import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { saveFeedbackToDb } from "@/lib/client/actions";

const FEEDBACK_STORAGE_PREFIX = "doc_feedback_";

interface FeedbackWidgetProps {
  topic: string;
}

export default function FeedbackWidget({ topic }: FeedbackWidgetProps) {
  const { t } = useTranslation();
  const FEEDBACK_STORAGE_KEY = `${FEEDBACK_STORAGE_PREFIX}${topic}`;
  const [showToast, setShowToast] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<
    "up" | "down" | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  useEffect(() => {
    const submitted = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!submitted) return;

    try {
      const parsed = JSON.parse(submitted) as {
        feedback?: "up" | "down";
        id?: string | null;
      };

      if (parsed.feedback === "up" || parsed.feedback === "down") {
        setHasSubmitted(true);
        setSelectedFeedback(parsed.feedback);
        setFeedbackId(parsed.id ?? null);
        return;
      }
    } catch {
      // Fallback for legacy stored values
    }

    if (submitted === "up" || submitted === "down") {
      setHasSubmitted(true);
      setSelectedFeedback(submitted as "up" | "down");
    }
  }, []);

  const persistFeedback = (feedback: "up" | "down", id: string | null) => {
    localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify({ feedback, id }),
    );
  };

  const handleThumbsUp = async () => {
    if (isSubmitting) return;
    if (hasSubmitted && selectedFeedback === "up") return;

    setIsSubmitting(true);
    setSelectedFeedback("up");
    setHasSubmitted(true);
    setFeedbackText("");

    persistFeedback("up", feedbackId);

    const result = await saveFeedbackToDb({
      feedbackId,
      isPositive: true,
      message: null,
      topic,
    });

    if (result?.id) {
      setFeedbackId(result.id);
      persistFeedback("up", result.id);
    }

    setShowToast(true);
    setIsSubmitting(false);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleThumbsDown = () => {
    if (isSubmitting) return;

    setSelectedFeedback("down");
    setShowModal(true);
  };

  const handleSubmitFeedback = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setShowModal(false);
    setSelectedFeedback("down");
    setHasSubmitted(true);

    persistFeedback("down", feedbackId);

    const result = await saveFeedbackToDb({
      feedbackId,
      isPositive: false,
      message: feedbackText,
      topic,
    });

    if (result?.id) {
      setFeedbackId(result.id);
      persistFeedback("down", result.id);
    }

    setShowToast(true);
    setIsSubmitting(false);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Reset feedback text
    setFeedbackText("");
  };

  const handleSkipFeedback = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setShowModal(false);
    setSelectedFeedback("down");
    setHasSubmitted(true);

    persistFeedback("down", feedbackId);

    const result = await saveFeedbackToDb({
      feedbackId,
      isPositive: false,
      message: null,
      topic,
    });

    if (result?.id) {
      setFeedbackId(result.id);
      persistFeedback("down", result.id);
    }

    setShowToast(true);
    setIsSubmitting(false);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Reset feedback text
    setFeedbackText("");
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 my-8">
        <span className="text-sm">{t("feedback.tooltip")}</span>
        {hasSubmitted ? (
          <div
            className="tooltip tooltip-right"
            data-tip={t("feedback.tooltipUpdate")}
          >
            <div className="join bg-base-100">
              <button
                onClick={handleThumbsUp}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
        ) : (
          <div className="join bg-base-100">
            <button
              onClick={handleThumbsUp}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
        )}
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
              <button
                className="btn btn-ghost"
                onClick={handleSkipFeedback}
                disabled={isSubmitting}
              >
                {t("feedback.skip")}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitFeedback}
                disabled={isSubmitting || feedbackText.trim().length === 0}
                aria-label={t("feedback.ariaSubmit")}
              >
                {t("feedback.submit")}
                <FaPaperPlane />
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
