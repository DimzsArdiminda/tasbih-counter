"use client";

import React from "react";
import { useTheme } from "@/lib/contexts/theme";
import DhikrCard from "@/privcomp/tasbih/components/DhikrCard";
import CounterDisplay from "@/privcomp/tasbih/components/CounterDisplay";
import HistoryCard from "@/privcomp/tasbih/components/HistoryCard";
import SettingsToggle from "@/privcomp/tasbih/components/SettingsToggle";
import CustomDhikrModal from "@/privcomp/tasbih/components/CustomDhikrModal";
import TargetSelection from "@/privcomp/tasbih/components/TargetSelection";
import TipsSelection from "@/privcomp/tasbih/components/TipsSelection";
import { useTasbih } from "@/services/dzikir/useTasbih";

export default function TasbihPage() {
  const { isDark } = useTheme();
  const {
    session,
    count,
    allDhikrs,
    dzikirById,
    selectedDhikr,
    target,
    allTarget,
    customTarget,
    showCustomInput,
    records,
    showHistory,
    soundEnabled,
    vibrationEnabled,
    animate,
    showCustomDhikrModal,
    activeTab,
    setCustomTarget,
    setShowCustomInput,
    setShowHistory,
    setSoundEnabled,
    setVibrationEnabled,
    setShowCustomDhikrModal,
    setActiveTab,
    handleIncrement,
    handleReset,
    handleDhikrChange,
    handleTargetChange,
    handleAddCustomDhikr,
    handleAddCustomTarget,
    handleDeleteRecord,
    handleClearAllRecords,
    handleDeleteDzikir,
    handleDeleteCustomTarget,
  } = useTasbih();

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
          onDeleteDzikir={handleDeleteDzikir}
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
          targetOptions={allTarget
            .filter((t) => t.userId !== session?.user?.id)
            .map((t) => t.target)}
          userTargets={allTarget.filter((t) => t.userId === session?.user?.id)}
          onTargetChange={handleTargetChange}
          onShowCustomInput={setShowCustomInput}
          onCustomTargetChange={setCustomTarget}
          onSetCustomTarget={() => handleAddCustomTarget(Number(customTarget))}
          onDeleteCustomTarget={handleDeleteCustomTarget}
        />

        {/* History Section */}
        {showHistory && (
          <HistoryCard
            records={records}
            isDark={isDark}
            onDelete={handleDeleteRecord}
            onClearAll={handleClearAllRecords}
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
