"use client";

import { Moon, Sun, Menu, X } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export default function Header({
  isDark,
  sidebarOpen,
  toggleTheme,
  toggleSidebar,
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Do-Dzikir & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg ${isDark ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}
              >
                <span className="text-white font-bold">L</span>
              </div>
              <span
                className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Do-Dzikir
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Beranda
            </a>
            <a
              href="#"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Tentang
            </a>
            <a
              href="#"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Layanan
            </a>
            <a
              href="#"
              className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
            >
              Kontak
            </a>
          </nav>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <button
              className={`hidden sm:block px-4 py-2 rounded-lg ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white font-medium transition-colors`}
            >
              Mulai
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
