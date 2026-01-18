import React from "react";

interface DhikrCardProps {
  name: string;
  arabic: string;
  meaning: string;
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
}

export default function DhikrCard({
  name,
  arabic,
  meaning,
  isSelected,
  onClick,
  isDark,
}: DhikrCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg text-left transition-all ${
        isSelected
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
          : isDark
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <div className="text-2xl mb-1">{arabic}</div>
      <div className="font-semibold">{name}</div>
      <div className="text-xs opacity-80">{meaning}</div>
    </button>
  );
}
