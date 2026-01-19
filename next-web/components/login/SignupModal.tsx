"use client";

import { useEffect, useCallback } from "react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  formUrl?: string;
}

export default function SignupModal({
  isOpen,
  onClose,
  formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScIbH7GaqazZkbjeq-dwWh0h672N6bU-UFWRmnZGpBpFUZbqg/viewform?embedded=true",
}: SignupModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full max-w-4xl max-h-[90vh] mx-4 my-4 rounded-lg shadow-xl animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-lg font-semibold">Sign Up</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Google Form Iframe */}
        <div className="flex-1 p-4 min-h-0">
          <iframe
            src={formUrl}
            className="w-full h-full border-0 rounded"
            title="Sign Up Form"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  );
}
