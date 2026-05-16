import React from "react";

interface CustomTarget {
  id?: string;
  target: number;
  userId?: string;
}

interface TargetSelectionProps {
  target: number;
  customTarget: string;
  showCustomInput: boolean;
  isDark: boolean;
  targetOptions: number[];
  targetById: CustomTarget | null;

  onTargetChange: (newTarget: number) => void;
  onShowCustomInput: (show: boolean) => void;
  onCustomTargetChange: (value: string) => void;
  onSetCustomTarget: () => void;
}

export default function TargetSelection({
  target,
  targetById,
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
      className={`rounded-2xl shadow-xl p-6 mb-6 transition-all ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Target Hitungan</h3>

        <p
          className={`text-sm mt-1 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Pilih target dzikir atau gunakan target custom
        </p>
      </div>

      {/* Target Options */}
      <div className="flex flex-wrap gap-3">
        {targetOptions.map((option) => {
          const isSelected = target === option;

          return (
            <button
              key={option}
              onClick={() => onTargetChange(option)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg scale-105"
                  : isDark
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-100 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className={`my-6 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      />

      {/* Custom Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Target Custom</h2>

          {targetById && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg w-fit ${
                isDark
                  ? "bg-emerald-900/30 text-emerald-300"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <span className="text-sm">Target custom saat ini:</span>

              <span className="font-bold text-lg">{targetById.target}</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => onShowCustomInput(!showCustomInput)}
          className={`px-5 py-3 rounded-xl font-semibold transition-all ${
            showCustomInput
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {showCustomInput ? "Tutup Custom Target" : "Tambah Custom Target"}
        </button>

        {/* Input */}
        {showCustomInput && (
          <div className="flex flex-col sm:flex-row gap-3 animate-in fade-in duration-200">
            <input
              type="number"
              value={customTarget}
              onChange={(e) => onCustomTargetChange(e.target.value)}
              placeholder="Masukkan target (1 - 10000)"
              className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              min="1"
              max="10000"
            />

            <button
              onClick={onSetCustomTarget}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md"
            >
              Set Target
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
