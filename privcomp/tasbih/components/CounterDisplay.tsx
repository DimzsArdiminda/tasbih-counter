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
    <div
      className={`
        rounded-3xl
        shadow-2xl
        mb-6
        border
        overflow-hidden
        backdrop-blur-sm
        ${isDark ? "bg-gray-800 border-gray-800" : "bg-white border-gray-100"}
      `}
    >
      {selectedDhikr ? (
        <>
          {/* ================= HEADER ================= */}
          <div
            className={`
              px-6
              md:px-10
              pt-10
              pb-8
              text-center
              border-b
              ${isDark ? "border-gray-800" : "border-gray-100"}
            `}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-semibold mb-6">
              <span>📿</span>
              <span>Dzikir Aktif</span>
            </div>

            {/* Arabic */}
            <h2
              className={`
                text-4xl
                md:text-6xl
                leading-loose
                font-bold
                mb-4
                ${isDark ? "text-emerald-400" : "text-emerald-600"}
              `}
            >
              {selectedDhikr.arabic}
            </h2>

            {/* Name */}
            <p className="text-2xl md:text-3xl font-bold mb-3">
              {selectedDhikr.name}
            </p>

            {/* Translation */}
            <p
              className={`
                max-w-2xl
                mx-auto
                leading-relaxed
                text-sm
                md:text-base
                ${isDark ? "text-gray-400" : "text-gray-600"}
              `}
            >
              {selectedDhikr.translation}
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="p-6 md:p-10">
            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Progress Dzikir
                </p>

                <p className="text-sm font-semibold text-emerald-500">
                  {Math.min(Math.round((count / target) * 100), 100)}%
                </p>
              </div>

              <ProgressBar count={count} target={target} isDark={isDark} />
            </div>

            {/* Counter */}
            <div className="text-center mb-10">
              <div
                className={`
                  inline-flex
                  flex-col
                  items-center
                  justify-center
                  w-52
                  h-52
                  md:w-64
                  md:h-64
                  rounded-full
                  shadow-inner
                  border
                  transition-all
                  duration-300
                  ${animate ? "scale-105" : "scale-100"}
                  ${
                    count >= target
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400"
                      : "bg-gradient-to-br from-teal-500 to-cyan-600 border-cyan-400"
                  }
                `}
              >
                <span className="text-white/80 text-sm mb-2">Jumlah</span>

                <span className="text-6xl md:text-7xl font-bold text-white">
                  {count}
                </span>

                <span className="text-white/80 text-sm mt-2">
                  dari {target}
                </span>
              </div>
            </div>

            {/* Main Tap Button */}
            <div className="flex justify-center mb-10">
              <button
                onClick={onIncrement}
                className={`
                  group
                  relative
                  overflow-hidden
                  w-full
                  max-w-md
                  rounded-3xl
                  py-6
                  px-8
                  text-white
                  font-bold
                  shadow-2xl
                  transition-all
                  duration-300
                  active:scale-95
                  hover:scale-[1.02]
                  ${
                    count >= target
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                  }
                `}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-center justify-center gap-4">
                  <span className="text-3xl">👆</span>

                  <div className="text-left">
                    <p className="text-2xl font-bold">TAP DZIKIR</p>
                    <p className="text-sm text-white/80">
                      Tekan untuk menambah hitungan
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onReset}
                className={`
                  px-6
                  py-4
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  ${
                    isDark
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }
                `}
              >
                🔄 Reset Counter
              </button>

              <button
                onClick={onToggleHistory}
                className={`
                  px-6
                  py-4
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                `}
              >
                📜 {showHistory ? "Sembunyikan History" : "Lihat History"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="py-20 px-6 text-center">
          <div className="text-6xl mb-6">📿</div>

          <h2 className="text-2xl font-bold mb-3">Belum Ada Dzikir</h2>

          <p
            className={`max-w-md mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Pilih dzikir terlebih dahulu untuk mulai menghitung dan melacak
            progress dzikirmu.
          </p>
        </div>
      )}
    </div>
  );
}
