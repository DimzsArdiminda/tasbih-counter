import React from "react";

interface AlertSuccessProps {
  message: string;
  onClose: () => void;
}

export default function AlertSuccess({ message, onClose }: AlertSuccessProps) {
  return (
    <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 flex items-center gap-2">
      <svg
        className="text-green-600"
        width={20}
        height={20}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <p className="text-green-700 text-sm flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-green-600 hover:text-green-800"
      >
        ✕
      </button>
    </div>
  );
}
