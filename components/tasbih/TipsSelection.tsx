import React from 'react'

interface TipsSelectionProps{
    isDark: boolean;
}

export default function TipsSelection({ isDark }: TipsSelectionProps) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 mt-6 ${
        isDark
          ? "bg-linear-to-r from-emerald-900 to-teal-900"
          : "bg-linear-to-r from-emerald-50 to-teal-50"
      }`}
    >
      <h3 className="text-xl font-bold mb-3">💡 Tips Berdzikir</h3>
      <ul className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        <li>• Berdzikirlah dengan khusyu dan penuh konsentrasi</li>
        <li>• Pahami makna dari dzikir yang Anda ucapkan</li>
        <li>• Rutinkan berdzikir setelah sholat</li>
        <li>
          • Dzikir Subhanallah, Alhamdulillah, dan Allahu Akbar masing-masing
          33x setelah sholat adalah amalan yang sangat dianjurkan
        </li>
      </ul>
    </div>
  );
}
