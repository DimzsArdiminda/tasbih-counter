import React from "react";

interface SettingsToggleItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SettingsProps {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  isDark: boolean;
  onSoundChange: (checked: boolean) => void;
  onVibrationChange: (checked: boolean) => void;
}

// Individual toggle component
export function SettingsToggleItem({
  label,
  checked,
  onChange,
}: SettingsToggleItemProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="font-medium">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors relative checked:bg-emerald-500 bg-gray-400"
      />
    </label>
  );
}

// Settings section component
export default function SettingsToggle({
  soundEnabled,
  vibrationEnabled,
  isDark,
  onSoundChange,
  onVibrationChange,
}: SettingsProps) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 mb-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Pengaturan</h3>
      <div className="space-y-3">
        <SettingsToggleItem
          label="Sound Effect"
          checked={soundEnabled}
          onChange={onSoundChange}
        />
        <SettingsToggleItem
          label="Vibration"
          checked={vibrationEnabled}
          onChange={onVibrationChange}
        />
      </div>
    </div>
  );
}
