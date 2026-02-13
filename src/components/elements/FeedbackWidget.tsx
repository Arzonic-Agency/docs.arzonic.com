"use client";

import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";

export default function FeedbackWidget() {
  const [showToast, setShowToast] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<
    "up" | "down" | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const handleThumbsUp = () => {
    setSelectedFeedback("up");
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // TODO: Send feedback to backend/analytics
    console.log("Feedback: up");
  };

  const handleThumbsDown = () => {
    setSelectedFeedback("down");
    setShowModal(true);
  };

  const handleSubmitFeedback = () => {
    setShowModal(false);
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // TODO: Send feedback to backend/analytics
    console.log("Feedback: down", feedbackText);

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
        <div className="tooltip" data-tip="Was this helpful?">
          <div className="join">
            <button
              onClick={handleThumbsUp}
              className={`btn btn-sm join-item ${
                selectedFeedback === "up" ? "btn-success" : "btn-ghost"
              }`}
              aria-label="Thumbs up"
            >
              <FaThumbsUp className="text-lg" />
            </button>
            <button
              onClick={handleThumbsDown}
              className={`btn btn-sm join-item ${
                selectedFeedback === "down" ? "btn-error" : "btn-ghost"
              }`}
              aria-label="Thumbs down"
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
            <h3 className="font-bold text-lg mb-4">What could be better?</h3>
            <p className="text-sm text-base-content/70 mb-4">
              Please tell us what we can improve to make this more helpful.
            </p>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Your feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={handleCancelFeedback}>
                Cancel
              </button>
              <button
                className="btn btn-primary btn-square"
                onClick={handleSubmitFeedback}
                aria-label="Submit feedback"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast toast-bottom toast-end">
          <div className="alert alert-success">
            <span>Thank you for your feedback! ✓</span>
          </div>
        </div>
      )}
    </>
  );
}
