"use client";

import React, { useState } from "react";

interface CustomDhikrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    name: string,
    arabic: string,
    meaning: string,
    target: number,
  ) => void;
  isDark: boolean;
}

export default function CustomDhikrModal({
  isOpen,
  onClose,
  onSave,
  isDark,
}: CustomDhikrModalProps) {
  const [name, setName] = useState("");
  const [arabic, setArabic] = useState("");
  const [meaning, setMeaning] = useState("");
  const [target, setTarget] = useState("33");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && arabic && meaning && target) {
      onSave(name, arabic, meaning, parseInt(target));
      setName("");
      setArabic("");
      setMeaning("");
      setTarget("33");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-2xl shadow-2xl p-6 max-w-md w-full ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tambah Dzikir Custom</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nama Dzikir
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Tahlil"
              className={`w-full px-4 py-3 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Tulisan Arab
            </label>
            <input
              type="text"
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              placeholder="لَا إِلٰهَ إِلَّا اللّٰهُ"
              className={`w-full px-4 py-3 rounded-lg text-2xl ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Arti</label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Tiada Tuhan selain Allah"
              className={`w-full px-4 py-3 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Target Default
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="33"
              className={`w-full px-4 py-3 rounded-lg ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              min="1"
              max="10000"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
