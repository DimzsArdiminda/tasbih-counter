import React from "react";

interface SettingsToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingsToggle({
  label,
  checked,
  onChange,
}: SettingsToggleProps) {
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
