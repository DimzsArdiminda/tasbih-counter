"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAlert } from "@/hooks/useAlert";
import DhikrCard from "@/components/tasbih/DhikrCard";
import CounterDisplay from "@/components/tasbih/CounterDisplay";
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
  id?: string;
  name: string;
  arabic: string;
  translation: string;
  targetDefault: number;
  userId?: string;
}

const targetOptions = [33, 99, 100, 1000];

export default function TasbihPage() {
  const { isDark } = useTheme();
  const { data: session } = useSession();
  const { success, error, confirm } = useAlert();
  const [count, setCount] = useState(0);
  const [allDhikrs, setAllDhikrs] = useState<DhikrPreset[]>([]);
  const [dzikirById, setDzikirById] = useState<DhikrPreset[]>([]);
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset | null>(null);
  const [target, setTarget] = useState(33);
  const [customTarget, setCustomTarget] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [records, setRecords] = useState<DhikrRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [showCustomDhikrModal, setShowCustomDhikrModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "custom">("all");

  const handleAddCustomDhikr = async (
    name: string,
    arabic: string,
    translation: string,
    targetDefault: number,
  ) => {
    if (!session?.user?.id) {
      throw new Error("Anda harus login terlebih dahulu");
    }

    try {
      const response = await fetch("/api/dzikir/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          arabic,
          translation,
          targetDefault,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menambahkan dzikir");
      }

      const newDzikir = await response.json();
      const newDhikr: DhikrPreset = {
        id: newDzikir.id,
        name: newDzikir.name,
        arabic: newDzikir.arabic,
        translation: newDzikir.translation,
        targetDefault: newDzikir.targetDefault,
        userId: session?.user?.id,
      };

      setAllDhikrs((prev) => [...prev, newDhikr]);
    } catch (error) {
      console.error("Error adding custom dzikir:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dzikir/all");
        if (!response.ok) {
          throw new Error("Failed to fetch dzikir");
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setAllDhikrs([]);
          return;
        }

        const apiDhikrs: DhikrPreset[] = data.map((d: DhikrPreset) => ({
          id: d.id,
          name: d.name,
          arabic: d.arabic,
          translation: d.translation,
          targetDefault: d.targetDefault,
          userId: d.userId,
        }));

        setAllDhikrs(apiDhikrs);

        if (apiDhikrs.length > 0) {
          setSelectedDhikr(apiDhikrs[0]);
          setTarget(apiDhikrs[0].targetDefault);
        }
      } catch (error) {
        console.error("Error fetching dzikir:", error);
        setAllDhikrs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/dzikir/byid");
        if (!response.ok) {
          throw new Error("Failed to fetch user dzikir");
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setDzikirById([]);
          return;
        }

        const apiDhikrs: DhikrPreset[] = data.map((d: DhikrPreset) => ({
          id: d.id,
          name: d.name,
          arabic: d.arabic,
          translation: d.translation,
          targetDefault: d.targetDefault,
          userId: d.userId,
        }));

        setDzikirById(apiDhikrs);
      } catch (error) {
        console.error("Error fetching user dzikir:", error);
        setDzikirById([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const savedRecords = localStorage.getItem("tasbih-records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("tasbih-records", JSON.stringify(records));
    }
  }, [records]);

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
      navigator.vibrate(200);
    }
  };

  const handleIncrement = () => {
    if (!selectedDhikr) return;

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
        success(
          "Alhamdulillah!",
          `Anda telah menyelesaikan ${target}x ${selectedDhikr.name}`,
        );
      }, 100);
    }
  };

  const handleReset = () => {
    if (count > 0) {
      confirm(
        "Reset Dzikir?",
        "Apakah Anda ingin menyimpan progress ini sebelum reset?",
      ).then((result) => {
        if (result.isConfirmed) {
          saveRecord(false);
        }
        setCount(0);
      });
    } else {
      setCount(0);
    }
  };

  const saveRecord = (completed: boolean) => {
    if (!selectedDhikr) return;

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
    confirm("Hapus Semua History?", "Tindakan ini tidak dapat dibatalkan").then(
      (result) => {
        if (result.isConfirmed) {
          setRecords([]);
          localStorage.removeItem("tasbih-records");
          success("Berhasil", "Semua history telah dihapus");
        }
      },
    );
  };

  const handleDhikrChange = (preset: DhikrPreset) => {
    setSelectedDhikr(preset);
    setTarget(preset.targetDefault);
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

  const deleteDzikir = async (id: string | undefined) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/dzikir/byid/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDzikirById((prev) => prev.filter((d) => d.id !== id));
        setAllDhikrs((prev) => prev.filter((d) => d.id !== id));
        success("Berhasil", "Dzikir berhasil dihapus");
      } else {
        const errorData = await response.json();
        error("Gagal Menghapus", errorData.message);
      }
    } catch (err) {
      console.error("Error deleting dzikir:", err);
      error("Terjadi Kesalahan", "Gagal menghapus dzikir. Silakan coba lagi");
    }
  };

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
          <CounterDisplay
            count={count}
            target={target}
            animate={animate}
            onIncrement={handleIncrement}
            isDark={isDark}
            selectedDhikr={selectedDhikr}
            onReset={handleReset}
            showHistory={showHistory}
            onToggleHistory={() => setShowHistory(!showHistory)}
          />
        </div>

        {/* Dhikr Selection with Tabs */}
        <DhikrCard
          allDhikrs={allDhikrs}
          dzikirById={dzikirById}
          selectedDhikr={selectedDhikr}
          activeTab={activeTab}
          isDark={isDark}
          onTabChange={setActiveTab}
          onDhikrChange={handleDhikrChange}
          onShowCustomModal={setShowCustomDhikrModal}
          onDeleteDzikir={deleteDzikir}
        />

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
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
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
                  ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
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
                className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600"
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
              ? "bg-linear-to-r from-emerald-900 to-teal-900"
              : "bg-linear-to-r from-emerald-50 to-teal-50"
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
