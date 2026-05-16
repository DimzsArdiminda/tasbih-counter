import React from "react";

interface ProgressBarProps {
  count: number;
  target: number;
  isDark: boolean;
}

export default function ProgressBar({
  count,
  target,
  isDark,
}: ProgressBarProps) {
  const progress = (count / target) * 100;

  return (
    <div className="mb-6">
      <div
        className={`h-3 rounded-full overflow-hidden ${
          isDark ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
          {count} / {target}
        </span>
        <span className="text-emerald-500 font-semibold">
          {progress >= 100 ? "100" : progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
