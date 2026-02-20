import React from "react";
import { LucideIcon } from "lucide-react";

interface FieldProps {
  id: string;
  title: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  isDark?: boolean;
  rightAction?: React.ReactNode;
}

export default function Field({
  id,
  title,
  placeholder = "",
  type = "text",
  required = false,
  value,
  onChange,
  icon: Icon,
  isDark = false,
  rightAction,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {title}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              size={20}
              className={isDark ? "text-gray-500" : "text-gray-400"}
            />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} ${rightAction ? "pr-12" : "pr-4"} py-3 rounded-lg border ${
            isDark
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
        />
        {rightAction && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
}
