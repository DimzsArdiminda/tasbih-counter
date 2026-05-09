import React from "react";

interface DhikrRecord {
  id: string;
  dhikrName: string;
  count: number;
  target: number;
  date: string;
  completed: boolean;
}

interface HistoryCardItemProps {
  record: DhikrRecord;
  onDelete: (id: string) => void;
  isDark: boolean;
}

interface HistoryCardProps {
  records: DhikrRecord[];
  isDark: boolean;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

// Individual history card component
export function HistoryCardItem({
  record,
  onDelete,
  isDark,
}: HistoryCardItemProps) {
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

// History section component
export default function HistoryCard({
  records,
  isDark,
  onDelete,
  onClearAll,
}: HistoryCardProps) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">History Dzikir</h3>
        {records.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-red-500 hover:text-red-600 text-sm font-semibold"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="text-center py-8">
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Belum ada history. Mulai berdzikir sekarang!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {records.map((record) => (
            <HistoryCardItem
              key={record.id}
              record={record}
              onDelete={onDelete}
              isDark={isDark}
            />
          ))}
        </div>
      )}

      {/* Statistics */}
      {records.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-600">
          <h4 className="font-bold mb-3">Statistik</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-4 rounded-lg text-center ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="text-2xl font-bold text-emerald-500">
                {records.length}
              </div>
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Total Sesi
              </div>
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="text-2xl font-bold text-emerald-500">
                {records.filter((r) => r.completed).length}
              </div>
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Selesai
              </div>
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="text-2xl font-bold text-emerald-500">
                {records.reduce((sum, r) => sum + r.count, 0)}
              </div>
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Total Dzikir
              </div>
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="text-2xl font-bold text-emerald-500">
                {Math.round(
                  (records.filter((r) => r.completed).length / records.length) *
                    100,
                )}
                %
              </div>
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Tingkat Selesai
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
