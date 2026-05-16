import React from "react";
import { X, Plus, Sparkles } from "lucide-react";

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

  // optional delete action
  onDeleteCustomTarget?: (id: string) => void;
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
  onDeleteCustomTarget,
}: TargetSelectionProps) {
  return (
    <div
      className={`rounded-3xl shadow-xl border p-6 transition-all duration-300 ${
        isDark
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-emerald-500" />

          <h3 className="text-2xl font-bold">Target Dzikir</h3>
        </div>

        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Pilih target dzikir harian Anda
        </p>
      </div>

      {/* Target Buttons */}
      <div className="flex flex-wrap gap-3">
        {targetOptions.map((option) => {
          const isSelected = target === option;

          return (
            <button
              key={option}
              onClick={() => onTargetChange(option)}
              className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent scale-105 shadow-lg shadow-emerald-500/20"
                  : isDark
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* User Custom Target */}
      {targetById && (
        <div className="mt-6">
          <p
            className={`text-sm mb-3 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Target custom milik Anda
          </p>

          <div
            className={`relative flex items-center justify-between px-5 py-4 rounded-2xl border transition-all ${
              target === targetById.target
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                : isDark
                  ? "bg-gray-700 border-gray-600"
                  : "bg-purple-50 border-purple-200"
            }`}
          >
            <button
              onClick={() => onTargetChange(targetById.target)}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                ✨
              </div>

              <div>
                <p className="font-semibold">Target Custom</p>

                <p className="text-sm opacity-80">{targetById.target} dzikir</p>
              </div>
            </button>

            {/* Delete Button */}
            {targetById.id && onDeleteCustomTarget && (
              <button
                onClick={() => onDeleteCustomTarget(targetById.id!)}
                className="ml-4 w-9 h-9 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div
        className={`my-7 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      />

      {/* Add Custom */}
      <div className="space-y-4">
        <button
          onClick={() => onShowCustomInput(!showCustomInput)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all ${
            showCustomInput
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Plus size={18} />

          {showCustomInput ? "Tutup Input" : "Tambah Target Custom"}
        </button>

        {/* Input Area */}
        {showCustomInput && (
          <div className="flex flex-col sm:flex-row gap-3 animate-in fade-in duration-300">
            <input
              type="number"
              required
              value={customTarget}
              onChange={(e) => onCustomTargetChange(e.target.value)}
              placeholder="Masukkan target (1 - 10000)"
              min="1"
              max="10000"
              className={`flex-1 px-4 py-3 rounded-2xl border transition-all ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />

            <button
              onClick={onSetCustomTarget}
              className="px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
            >
              Simpan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
