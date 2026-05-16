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
import { useRouter } from "next/navigation";

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

interface CustomTarget {
  id?: string;
  target: number;
  userId?: string;
}

// const targetOptions = [33, 99, 100, 2000];

export default function TasbihPage() {
  const { isDark } = useTheme();
  const { data: session } = useSession();
  const { success, error, confirm } = useAlert();
  const [count, setCount] = useState(0);
  const [allDhikrs, setAllDhikrs] = useState<DhikrPreset[]>([]);
  const [dzikirById, setDzikirById] = useState<DhikrPreset[]>([]);
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPreset | null>(null);
  const [target, setTarget] = useState<number>(33);
  const [targetById, setTargetById] = useState<CustomTarget | null>(null);
  const [allTarget, setAllTarget] = useState<CustomTarget[]>([]);
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
  const router = useRouter();

  // add some custom dzikir
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
      router.refresh();
    } catch (error) {
      console.error("Error adding custom dzikir:", error);
      throw error;
    }
  };

  // get target by user id
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/dzikir/targetcount/byid");

        if (!response.ok) {
          throw new Error("Failed to fetch user dzikir");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setTargetById({
            id: data[0].id,
            target: data[0].target,
            userId: data[0].userId,
          });
        } else {
          setTargetById(null);
        }
      } catch (error) {
        console.error("Error fetching user dzikir:", error);
        setTargetById(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.id]);

  // add some target
    const handleAddCustomTarget = async (target: number) => {
      if (!session?.user?.id) {
        throw new Error("Anda harus login terlebih dahulu");
      }

      try {
        const response = await fetch("/api/dzikir/targetcount/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            target,
            userId: session.user.id,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Gagal menambahkan target");
        }

        const newTarget = await response.json();
        const newCustomTarget: CustomTarget = {
          id: newTarget.id,
          target: newTarget.target,
          userId: session?.user?.id,
        };

        setAllTarget((prev) => [...prev, newCustomTarget]);
        setTarget(newCustomTarget.target);
        router.refresh();
      } catch (error) {
        console.error("Error adding custom dzikir:", error);
        throw error;
      }
    };

  // get all target
  useEffect(() => {
    const fetchAllTarget = async () => {
      try {
        const response = await fetch("/api/dzikir/targetcount/all");

        if (!response.ok) {
          throw new Error("Failed to fetch target");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setTarget(33);
          return;
        }

        const apiTarget: CustomTarget[] = data.map((d: CustomTarget) => ({
          id: d.id,
          target: d.target,
          userId: d.userId,
        }));

        // save all target
        setAllTarget(apiTarget);

        // set target default
        if (apiTarget.length > 0) {
          setTarget(apiTarget[0].target);
        }
      } catch (error) {
        console.error("Error fetching target:", error);
        setTarget(33);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTarget();
  }, []);

  // get all dzikir
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

  // get dzikir by user id
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
          targetById={targetById}
          target={target}
          customTarget={customTarget}
          showCustomInput={showCustomInput}
          isDark={isDark}
          targetOptions={allTarget.map((t) => t.target)}
          onTargetChange={handleTargetChange}
          onShowCustomInput={setShowCustomInput}
          onCustomTargetChange={setCustomTarget}
          onSetCustomTarget={() => handleAddCustomTarget(Number(customTarget))}
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

        {/* Settings */}
        <SettingsToggle
          soundEnabled={soundEnabled}
          vibrationEnabled={vibrationEnabled}
          isDark={isDark}
          onSoundChange={setSoundEnabled}
          onVibrationChange={setVibrationEnabled}
        />

        {/* Tips Section */}
        <TipsSelection isDark={isDark} />
      </div>
    </div>
  );
}
