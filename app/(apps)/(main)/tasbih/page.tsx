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
import TargetSelection from "@/components/tasbih/TargetSelection";
import TipsSelection from "@/components/tasbih/TipsSelection";

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
        <TargetSelection
          target={target}
          customTarget={customTarget}
          showCustomInput={showCustomInput}
          isDark={isDark}
          targetOptions={targetOptions}
          onTargetChange={handleTargetChange}
          onShowCustomInput={setShowCustomInput}
          onCustomTargetChange={setCustomTarget}
          onSetCustomTarget={handleCustomTarget}
        />

        {/* Settings */}
        <SettingsToggle
          soundEnabled={soundEnabled}
          vibrationEnabled={vibrationEnabled}
          isDark={isDark}
          onSoundChange={setSoundEnabled}
          onVibrationChange={setVibrationEnabled}
        />

        {/* History Section */}
        {showHistory && (
          <HistoryCard
            records={records}
            isDark={isDark}
            onDelete={deleteRecord}
            onClearAll={clearAllRecords}
          />
        )}

        {/* Tips Section */}
        <TipsSelection isDark={isDark} />
      </div>
    </div>
  );
}
