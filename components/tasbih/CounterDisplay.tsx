import React from "react";

interface CounterDisplayProps {
  count: number;
  target: number;
  animate: boolean;
  onIncrement: () => void;
  isDark: boolean;
}

export default function CounterDisplay({
  count,
  target,
  animate,
  onIncrement,
  isDark,
}: CounterDisplayProps) {
  return (
    <>
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
    </>
  );
}
