"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import DhikrCard from "@/components/tasbih/DhikrCard";
import CounterDisplay from "@/components/tasbih/CounterDisplay";
import ProgressBar from "@/components/tasbih/ProgressBar";
import HistoryCard from "@/components/tasbih/HistoryCard";
import SettingsToggle from "@/components/tasbih/SettingsToggle";
import CustomDhikrModal from "@/components/tasbih/CustomDhikrModal";

interface DhikrRecord {
  id: string;
  dhikrName: string;
  count: number;
  target: number;
  date: string;
  completed: boolean;
}

interface DhikrPreset {
  name: string;
  arabic: string;
  meaning: string;
  defaultTarget: number;
}

const dhikrPresets: DhikrPreset[] = [
  {
    name: "Subhanallah",
    arabic: "سُبْحَانَ اللّٰهِ",
    meaning: "Maha Suci Allah",
    defaultTarget: 33,
  },
  {
    name: "Alhamdulillah",
    arabic: "اَلْحَمْدُ لِلّٰهِ",
    meaning: "Segala Puji Bagi Allah",
    defaultTarget: 33,
  },
  {
    name: "Allahu Akbar",
    arabic: "اَللّٰهُ اَكْبَرُ",
    meaning: "Allah Maha Besar",
    defaultTarget: 33,
  },
  {
    name: "La ilaha illallah",
    arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ",
    meaning: "Tiada Tuhan Selain Allah",
    defaultTarget: 100,
  },
  {
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللّٰهَ",
    meaning: "Aku Memohon Ampun kepada Allah",
    defaultTarget: 100,
  },
  {
    name: "Salawat",
    arabic: "اَللَّهُمَّ صَلِّ عَلٰى مُحَمَّدٍ",
    meaning: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad",
    defaultTarget: 100,
  },
];

const targetOptions = [33, 99, 100, 1000];

export default function TasbihPage() {
  const { isDark } = useTheme();
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(dhikrPresets[0]);
  const [target, setTarget] = useState(33);
  const [customTarget, setCustomTarget] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [records, setRecords] = useState<DhikrRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [customDhikrs, setCustomDhikrs] = useState<DhikrPreset[]>([]);
  const [showCustomDhikrModal, setShowCustomDhikrModal] = useState(false);

  // Load records and custom dhikrs from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("tasbih-records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }

    const savedCustomDhikrs = localStorage.getItem("custom-dhikrs");
    if (savedCustomDhikrs) {
      setCustomDhikrs(JSON.parse(savedCustomDhikrs));
    }
  }, []);

  // Save records to localStorage
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("tasbih-records", JSON.stringify(records));
    }
  }, [records]);

  // Save custom dhikrs to localStorage
  useEffect(() => {
    if (customDhikrs.length > 0) {
      localStorage.setItem("custom-dhikrs", JSON.stringify(customDhikrs));
    }
  }, [customDhikrs]);

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiToIGGS56+iYSgoSVKzn8LJnHgU7k9r0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0yH8yBSh+zPLaizsIG2S45+iVSQoRU6vn8LJnHgU7lNr0",
      );
      audio.play().catch(() => {});
    }
  };

  const vibrate = () => {
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
    playSound();
    vibrate();

    if (count + 1 === target) {
      // Save completed record
      saveRecord(true);
      // Show completion message
      setTimeout(() => {
        alert(
          `Alhamdulillah! Anda telah menyelesaikan ${target}x ${selectedDhikr.name}`,
        );
      }, 100);
    }
  };

  const handleReset = () => {
    if (count > 0) {
      const confirmReset = confirm(
        "Apakah Anda ingin menyimpan progress ini sebelum reset?",
      );
      if (confirmReset) {
        saveRecord(false);
      }
    }
    setCount(0);
  };

  const saveRecord = (completed: boolean) => {
    const newRecord: DhikrRecord = {
      id: Date.now().toString(),
      dhikrName: selectedDhikr.name,
      count: completed ? target : count,
      target: target,
      date: new Date().toISOString(),
      completed: completed,
    };
    setRecords((prev) => [newRecord, ...prev].slice(0, 50)); // Keep last 50 records
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const clearAllRecords = () => {
    if (confirm("Hapus semua history?")) {
      setRecords([]);
      localStorage.removeItem("tasbih-records");
    }
  };

  const handleDhikrChange = (preset: DhikrPreset) => {
    setSelectedDhikr(preset);
    setTarget(preset.defaultTarget);
    setCount(0);
  };

  const handleTargetChange = (newTarget: number) => {
    setTarget(newTarget);
    setShowCustomInput(false);
    if (count > newTarget) {
      setCount(0);
    }
  };

  const handleCustomTarget = () => {
    const value = parseInt(customTarget);
    if (value && value > 0 && value <= 10000) {
      handleTargetChange(value);
      setCustomTarget("");
    }
  };

  const handleAddCustomDhikr = (
    name: string,
    arabic: string,
    meaning: string,
    defaultTarget: number,
  ) => {
    const newDhikr: DhikrPreset = {
      name,
      arabic,
      meaning,
      defaultTarget,
    };
    setCustomDhikrs((prev) => [...prev, newDhikr]);
  };

  const handleDeleteCustomDhikr = (name: string) => {
    setCustomDhikrs((prev) => prev.filter((d) => d.name !== name));
    // Update localStorage after deletion
    const updatedDhikrs = customDhikrs.filter((d) => d.name !== name);
    if (updatedDhikrs.length === 0) {
      localStorage.removeItem("custom-dhikrs");
    } else {
      localStorage.setItem("custom-dhikrs", JSON.stringify(updatedDhikrs));
    }

    // If deleted dhikr was selected, switch to first preset
    if (selectedDhikr.name === name) {
      handleDhikrChange(dhikrPresets[0]);
    }
  };

  const allDhikrs = [...dhikrPresets, ...customDhikrs];

  return (
    <div
      className={`min-h-screen py-8 ${isDark ? "text-white" : "text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Tasbih Digital</h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Hitung dzikir Anda dengan mudah
          </p>
        </div>

        {/* Main Counter Section */}
        <div
          className={`rounded-2xl shadow-2xl p-8 mb-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Selected Dhikr Display */}
          <div className="text-center mb-8">
            <h2 className="text-6xl font-bold mb-4 text-emerald-500">
              {selectedDhikr.arabic}
            </h2>
            <p className="text-2xl font-semibold mb-2">{selectedDhikr.name}</p>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {selectedDhikr.meaning}
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar count={count} target={target} isDark={isDark} />

          {/* Counter Display */}
          <CounterDisplay
            count={count}
            target={target}
            animate={animate}
            onIncrement={handleIncrement}
            isDark={isDark}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {showHistory ? "Sembunyikan" : "Lihat"} History
            </button>
          </div>
        </div>

        {/* Dhikr Selection */}
        <div
          className={`rounded-2xl shadow-xl p-6 mb-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Pilih Dzikir</h3>
            <button
              onClick={() => setShowCustomDhikrModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
            >
              <span>+</span>
              <span>Custom</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allDhikrs.map((preset, index) => {
              const isCustom = index >= dhikrPresets.length;
              return (
                <div key={preset.name} className="relative">
                  <DhikrCard
                    name={preset.name}
                    arabic={preset.arabic}
                    meaning={preset.meaning}
                    isSelected={selectedDhikr.name === preset.name}
                    onClick={() => handleDhikrChange(preset)}
                    isDark={isDark}
                  />
                  {isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCustomDhikr(preset.name);
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
        </div>

        {/* Custom Dhikr Modal */}
        <CustomDhikrModal
          isOpen={showCustomDhikrModal}
          onClose={() => setShowCustomDhikrModal(false)}
          onSave={handleAddCustomDhikr}
          isDark={isDark}
        />

        {/* Target Selection */}
        <div
          className={`rounded-2xl shadow-xl p-6 mb-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Target Hitungan</h3>
          <div className="flex flex-wrap gap-3">
            {targetOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleTargetChange(option)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  target === option
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                    : isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                showCustomInput
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Custom
            </button>
          </div>

          {showCustomInput && (
            <div className="mt-4 flex gap-2">
              <input
                type="number"
                value={customTarget}
                onChange={(e) => setCustomTarget(e.target.value)}
                placeholder="Masukkan target (1-10000)"
                className={`flex-1 px-4 py-3 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                min="1"
                max="10000"
              />
              <button
                onClick={handleCustomTarget}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600"
              >
                Set
              </button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div
          className={`rounded-2xl shadow-xl p-6 mb-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Pengaturan</h3>
          <div className="space-y-3">
            <SettingsToggle
              label="Sound Effect"
              checked={soundEnabled}
              onChange={setSoundEnabled}
            />
            <SettingsToggle
              label="Vibration"
              checked={vibrationEnabled}
              onChange={setVibrationEnabled}
            />
          </div>
        </div>

        {/* History Section */}
        {showHistory && (
          <div
            className={`rounded-2xl shadow-xl p-6 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">History Dzikir</h3>
              {records.length > 0 && (
                <button
                  onClick={clearAllRecords}
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
                  <HistoryCard
                    key={record.id}
                    record={record}
                    onDelete={deleteRecord}
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
                        (records.filter((r) => r.completed).length /
                          records.length) *
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
        )}

        {/* Tips Section */}
        <div
          className={`rounded-2xl shadow-xl p-6 mt-6 ${
            isDark
              ? "bg-gradient-to-r from-emerald-900 to-teal-900"
              : "bg-gradient-to-r from-emerald-50 to-teal-50"
          }`}
        >
          <h3 className="text-xl font-bold mb-3">💡 Tips Berdzikir</h3>
          <ul
            className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            <li>• Berdzikirlah dengan khusyu dan penuh konsentrasi</li>
            <li>• Pahami makna dari dzikir yang Anda ucapkan</li>
            <li>• Rutinkan berdzikir setelah sholat</li>
            <li>
              • Dzikir Subhanallah, Alhamdulillah, dan Allahu Akbar
              masing-masing 33x setelah sholat adalah amalan yang sangat
              dianjurkan
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
