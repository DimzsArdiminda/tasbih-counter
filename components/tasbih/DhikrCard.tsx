import React from "react";

interface DhikrPreset {
  id?: string;
  name: string;
  arabic: string;
  translation: string;
  targetDefault: number;
  userId?: string;
}

interface IndividualDhikrCardProps {
  name: string;
  arabic: string;
  meaning: string;
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
}

interface DhikrSelectionProps {
  allDhikrs: DhikrPreset[];
  dzikirById: DhikrPreset[];
  selectedDhikr: DhikrPreset | null;
  activeTab: "all" | "custom";
  isDark: boolean;
  onTabChange: (tab: "all" | "custom") => void;
  onDhikrChange: (dhikr: DhikrPreset) => void;
  onShowCustomModal: (show: boolean) => void;
  onDeleteDzikir: (id?: string) => void;
}

// Individual card component
export function DhikrCardItem({
  name,
  arabic,
  meaning,
  isSelected,
  onClick,
  isDark,
}: IndividualDhikrCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg text-left transition-all ${
        isSelected
          ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
          : isDark
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div className="font-semibold">{name}</div>
      <div className="text-xs opacity-80">{meaning}</div>
    </button>
  );
}

// Dhikr Selection Section with Tabs
export default function DhikrCard({
  allDhikrs,
  dzikirById,
  selectedDhikr,
  activeTab,
  isDark,
  onTabChange,
  onDhikrChange,
  onShowCustomModal,
  onDeleteDzikir,
}: DhikrSelectionProps) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 mb-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Tab Header with Underline */}
      <div
        className="flex justify-between items-center mb-6 border-b"
        style={
          isDark ? { borderColor: "#4B556300" } : { borderColor: "#E5E7EB00" }
        }
      >
        <div className="flex gap-8">
          <button
            onClick={() => onTabChange("all")}
            className={`pb-3 font-semibold transition-colors relative ${
              activeTab === "all"
                ? isDark
                  ? "text-emerald-500"
                  : "text-emerald-600"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-600"
            }`}
          >
            Semua Dzikir
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500"></div>
            )}
          </button>
          <button
            onClick={() => onTabChange("custom")}
            className={`pb-3 font-semibold transition-colors relative ${
              activeTab === "custom"
                ? isDark
                  ? "text-emerald-500"
                  : "text-emerald-600"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-600"
            }`}
          >
            Dzikir Saya
            {activeTab === "custom" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500"></div>
            )}
          </button>
        </div>
        <button
          onClick={() => onShowCustomModal(true)}
          className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 flex items-center gap-2 mb-3"
        >
          <span>+</span>
          <span>Custom</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDhikrs.map((preset) => {
            const isCustom = !preset.id;
            return (
              <div key={preset.name} className="relative">
                <DhikrCardItem
                  name={preset.name}
                  arabic={preset.arabic}
                  meaning={preset.translation}
                  isSelected={selectedDhikr?.name === preset.name}
                  onClick={() => onDhikrChange(preset)}
                  isDark={isDark}
                />
                {isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDzikir(preset.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Hapus dzikir custom"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "custom" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dzikirById.length > 0 ? (
            dzikirById.map((preset) => {
              return (
                <div key={preset.name} className="relative">
                  <DhikrCardItem
                    name={preset.name}
                    arabic={preset.arabic}
                    meaning={preset.translation}
                    isSelected={selectedDhikr?.name === preset.name}
                    onClick={() => onDhikrChange(preset)}
                    isDark={isDark}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteDzikir(preset.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center"
                    title="Hapus dzikir custom"
                  >
                    ×
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Belum ada dzikir custom. Buat yang baru dengan klik tombol
                &quot; Custom &quot; di atas
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
