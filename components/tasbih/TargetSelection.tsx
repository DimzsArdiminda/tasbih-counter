import React from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { useAlert } from "@/hooks/useAlert";
import { useState } from "react";

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
  targetOptions: number[]; // global/public options (not user's own)
  userTargets: CustomTarget[]; // targets created by current user

  onTargetChange: (newTarget: number) => void;
  onShowCustomInput: (show: boolean) => void;
  onCustomTargetChange: (value: string) => void;
  onSetCustomTarget: () => void;

  // optional delete action
  onDeleteCustomTarget?: (id: string) => void;
}

export default function TargetSelection({
  target,
  userTargets,
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
  const { confirm, success } = useAlert();
  const [activeTab, setActiveTab] = useState<"default" | "custom">("default");

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

      {/* Tabs */}
      <div
        className={`flex p-1 rounded-2xl mb-6 ${
          isDark ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <button
          onClick={() => setActiveTab("default")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "default"
              ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md"
              : isDark
                ? "text-gray-300"
                : "text-gray-600"
          }`}
        >
          Target Dzikir
        </button>

        <button
          onClick={() => setActiveTab("custom")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            activeTab === "custom"
              ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : isDark
                ? "text-gray-300"
                : "text-gray-600"
          }`}
        >
          Custom Dzikir
        </button>
      </div>

      {/* Default Target */}
      {activeTab === "default" && (
        <div className="flex flex-wrap gap-3 animate-in fade-in duration-300">
          {targetOptions.map((option) => {
            const isSelected = target === option;

            return (
              <button
                key={option}
                onClick={() => onTargetChange(option)}
                className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                  isSelected
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white border-transparent scale-105 shadow-lg shadow-emerald-500/20"
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
      )}

      {/* Custom Target */}
      {activeTab === "custom" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-wrap gap-3">
            {userTargets.length === 0 && (
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Belum ada target custom.
              </div>
            )}

            {userTargets.map((t) => {
              const isSelected = target === t.target;

              return (
                <div key={t.id} className="relative">
                  <button
                    onClick={() => onTargetChange(t.target)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border ${
                      isSelected
                        ? "bg-linear-to-r from-purple-500 to-pink-500 text-white border-transparent scale-105 shadow-lg shadow-purple-500/20"
                        : isDark
                          ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {t.target}
                  </button>

                  {onDeleteCustomTarget && t.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        confirm(
                          "Hapus Target",
                          "Apakah Anda yakin ingin menghapus target ini?",
                        ).then((res) => {
                          if (res.isConfirmed) {
                            onDeleteCustomTarget(t.id!);
                          }
                        });
                      }}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Custom */}
          <div className="space-y-4">
            <button
              onClick={() => onShowCustomInput(!showCustomInput)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all ${
                showCustomInput
                  ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Plus size={18} />

              {showCustomInput ? "Tutup Input" : "Tambah Target Custom"}
            </button>

            {showCustomInput && (
              <div className="flex flex-col sm:flex-row gap-3">
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
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />

                <button
                  onClick={onSetCustomTarget}
                  className="px-6 py-3 rounded-2xl font-semibold bg-linear-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all shadow-lg"
                >
                  Simpan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
