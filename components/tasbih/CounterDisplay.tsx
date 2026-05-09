import React from "react";
import ProgressBar from "./ProgressBar";

interface DhikrPreset {
  id?: string;
  name: string;
  arabic: string;
  translation: string;
  targetDefault?: number;
  userId?: string;
}

interface CounterDisplayProps {
  count: number;
  target: number;
  animate: boolean;
  onIncrement: () => void;
  isDark: boolean;
  selectedDhikr: DhikrPreset | null;
  onReset: () => void;
  showHistory: boolean;
  onToggleHistory: () => void;
}

export default function CounterDisplay({
  count,
  target,
  animate,
  onIncrement,
  isDark,
  selectedDhikr,
  onReset,
  showHistory,
  onToggleHistory,
}: CounterDisplayProps) {
  return (
    <>
    <div
      className={`rounded-2xl shadow-2xl p-8 mb-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Selected Dhikr Display */}
      {selectedDhikr ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold mb-4 text-emerald-500">
              {selectedDhikr.arabic}
            </h2>
            <p className="text-2xl font-semibold mb-2">{selectedDhikr.name}</p>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {selectedDhikr.translation}
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar count={count} target={target} isDark={isDark} />

          {/* Counter Display */}
          <div
            className={`text-center mb-8 transition-transform duration-200 ${
              animate ? "scale-110" : "scale-100"
            }`}
          >
            <div
              className={`text-8xl font-bold ${
                count >= target ? "text-emerald-500" : "text-teal-500"
              }`}
            >
              {count}
            </div>
          </div>

          {/* Main Counter Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={onIncrement}
              className={`w-64 h-64 rounded-full text-white font-bold text-2xl shadow-2xl transform transition-all duration-200 active:scale-95 ${
                count >= target
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  : "bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">👆</span>
                <span>TAP</span>
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onReset}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Reset
            </button>
            <button
              onClick={onToggleHistory}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {showHistory ? "Sembunyikan" : "Lihat"} History
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Tidak ada dzikir tersedia
          </p>
        </div>
      )}
      </div>
      
    </>
  );
}
