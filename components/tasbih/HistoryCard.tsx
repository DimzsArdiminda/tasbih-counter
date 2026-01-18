import React from "react";

interface DhikrRecord {
  id: string;
  dhikrName: string;
  count: number;
  target: number;
  date: string;
  completed: boolean;
}

interface HistoryCardProps {
  record: DhikrRecord;
  onDelete: (id: string) => void;
  isDark: boolean;
}

export default function HistoryCard({
  record,
  onDelete,
  isDark,
}: HistoryCardProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        isDark ? "bg-gray-700" : "bg-gray-50"
      } ${record.completed ? "border-l-4 border-emerald-500" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-lg">{record.dhikrName}</h4>
            {record.completed && (
              <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">
                ✓ Selesai
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-emerald-500">
            {record.count}{" "}
            {record.count < record.target && `/ ${record.target}`}
          </p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {new Date(record.date).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <button
          onClick={() => onDelete(record.id)}
          className="text-red-500 hover:text-red-600 p-2"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
