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

// =========================
// CARD ITEM
// =========================
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
      className={`
        group
        relative
        w-full
        h-full
        rounded-2xl
        p-5
        text-left
        transition-all
        duration-300
        border
        overflow-hidden
        ${
          isSelected
            ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-xl scale-[1.02]"
            : isDark
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-emerald-500/40"
              : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-lg"
        }
      `}
    >
      {/* Glow effect */}
      {isSelected && (
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      )}

      <div className="flex flex-col gap-4 relative z-10">
        {/* Header */}
        <div>
          <h3 className="font-bold text-lg leading-snug">{name}</h3>

          <div
            className={`mt-2 h-1 w-14 rounded-full transition-all duration-300 ${
              isSelected
                ? "bg-white"
                : "bg-linear-to-r from-emerald-500 to-teal-500"
            }`}
          />
        </div>

        {/* Arabic */}
        <p
          className={`
            text-right
            text-2xl
            leading-loose
            font-arabic
            ${
              isSelected
                ? "text-white"
                : isDark
                  ? "text-emerald-300"
                  : "text-emerald-700"
            }
          `}
        >
          {arabic}
        </p>

        {/* Meaning */}
        <p
          className={`text-sm leading-relaxed ${
            isSelected
              ? "text-white/90"
              : isDark
                ? "text-gray-300"
                : "text-gray-600"
          }`}
        >
          {meaning}
        </p>
      </div>
    </button>
  );
}

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
  const renderCards = (data: DhikrPreset[], isCustomTab = false) => {
    if (data.length === 0) {
      return (
        <div
          className={`
            col-span-full
            rounded-2xl
            border
            border-dashed
            p-10
            text-center
            ${
              isDark
                ? "border-gray-700 bg-gray-900/40"
                : "border-gray-300 bg-gray-50"
            }
          `}
        >
          <div className="text-5xl mb-4">📿</div>

          <h3 className="text-lg font-semibold mb-2">
            Belum ada dzikir custom
          </h3>

          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Klik tombol{" "}
            <span className="font-semibold text-emerald-500">Custom</span> untuk
            membuat dzikir baru
          </p>
        </div>
      );
    }

    return data.map((preset) => (
      <div key={preset.id} className="relative group">
        <DhikrCardItem
          name={preset.name}
          arabic={preset.arabic}
          meaning={preset.translation}
          isSelected={selectedDhikr?.id === preset.id}
          onClick={() => onDhikrChange(preset)}
          isDark={isDark}
        />

        {/* Delete button */}
        {isCustomTab && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteDzikir(preset.id);
            }}
            className="
              absolute
              top-3
              right-3
              w-8
              h-8
              rounded-full
              bg-red-500
              hover:bg-red-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-200
            "
            title="Hapus dzikir"
          >
            ×
          </button>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`
        rounded-3xl
        shadow-xl
        border
        p-6
        mb-6
        md:p-8
        backdrop-blur-sm
        ${isDark ? "bg-gray-800 border-gray-900" : "bg-white border-gray-100"}
      `}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        {/* Tabs */}
        <div
          className={`
            flex
            items-center
            gap-2
            rounded-2xl
            p-1
            w-fit
            ${isDark ? "bg-gray-800" : "bg-gray-100"}
          `}
        >
          <button
            onClick={() => onTabChange("all")}
            className={`
              px-5
              py-2.5
              rounded-xl
              font-semibold
              transition-all
              duration-300
              ${
                activeTab === "all"
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : isDark
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-white"
              }
            `}
          >
            Semua Dzikir
          </button>

          <button
            onClick={() => onTabChange("custom")}
            className={`
              px-5
              py-2.5
              rounded-xl
              font-semibold
              transition-all
              duration-300
              ${
                activeTab === "custom"
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : isDark
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-white"
              }
            `}
          >
            Dzikir Saya
          </button>
        </div>

        {/* Add button */}
        <button
          onClick={() => onShowCustomModal(true)}
          className="
            px-5
            py-3
            rounded-2xl
            bg-linear-to-r
            from-purple-500
            to-pink-500
            hover:from-purple-600
            hover:to-pink-600
            text-white
            font-semibold
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.02]
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <span className="text-lg">+</span>
          <span>Tambah Dzikir</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {activeTab === "all"
          ? renderCards(allDhikrs)
          : renderCards(dzikirById, true)}
      </div>
    </div>
  );
}
