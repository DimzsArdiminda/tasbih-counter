import React from "react";

interface TargetSelectionProps {
  target: number;
  customTarget: string;
  showCustomInput: boolean;
  isDark: boolean;
  targetOptions: number[];

  onTargetChange: (newTarget: number) => void;
  onShowCustomInput: (show: boolean) => void;
  onCustomTargetChange: (value: string) => void;

  onSetCustomTarget: () => void;
}

export default function TargetSelection({
  target,
  customTarget,
  showCustomInput,
  isDark,
  targetOptions,
  onTargetChange,
  onShowCustomInput,
  onCustomTargetChange,
  onSetCustomTarget,
}: TargetSelectionProps) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 mb-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Target Hitungan</h3>
      <div className="flex flex-wrap gap-3">
        {targetOptions.map((option) => (
          <button
            key={option}
            onClick={() => onTargetChange(option)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              target === option
                ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                : isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={() => onShowCustomInput(!showCustomInput)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            showCustomInput
              ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
              : isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Custom
        </button>
      </div>

      {showCustomInput && (
        <div className="mt-4 flex gap-2">
          <input
            type="number"
            value={customTarget}
            onChange={(e) => onCustomTargetChange(e.target.value)}
            placeholder="Masukkan target (1-10000)"
            className={`flex-1 px-4 py-3 rounded-lg ${
              isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            min="1"
            max="10000"
          />
          <button
            onClick={onSetCustomTarget}
            className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600"
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
}
