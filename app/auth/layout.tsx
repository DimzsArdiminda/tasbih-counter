"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { AlertCircle } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${isDark ? "bg-gray-900" : "bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"} transition-colors`}
    >
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-lg ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} shadow-lg transition-all z-50`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-gray-700" />
        )}
      </button>

      {/* Login Container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block">
          <div
            className={`p-12 rounded-2xl ${isDark ? "bg-linear-to-br from-blue-900 to-purple-900" : "bg-linear-to-br from-blue-500 to-purple-500"}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-12 h-12 rounded-xl ${isDark ? "bg-white" : "bg-white"} flex items-center justify-center shadow-lg`}
              >
                <span className="text-blue-600 font-bold text-2xl">L</span>
              </div>
              <span className="font-bold text-3xl text-white">Do-Dzikir</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Selamat Datang Kembali!
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Login untuk mengakses dashboard dan semua fitur platform kami.
            </p>

            {/* Decorative Elements */}
            <div className="mt-12 relative">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 bg-opacity-20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div
          className={`p-8 sm:p-12 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-2xl`}
        >
          {/* Mobile Do-Dzikir */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div
              className={`w-10 h-10 rounded-lg ${isDark ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}
            >
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span
              className={`font-bold text-2xl ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Do-Dzikir
            </span>
          </div>
          {children}
        </div>
      </div>

      {/* Info Banner - Optional */}
      <div
        className={`fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md p-4 rounded-lg ${isDark ? "bg-blue-900 border-blue-800" : "bg-blue-50 border-blue-200"} border shadow-lg hidden sm:block`}
      >
        <div className="flex items-start gap-3">
          <AlertCircle
            className={`shrink-0 mt-0.5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
            size={20}
          />
          <div className="flex-1">
            <h3
              className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Tips Keamanan
            </h3>
            <p
              className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Jangan pernah membagikan password Anda kepada siapapun.
            </p>
          </div>
          <button
            onClick={(e) =>
              e.currentTarget.parentElement?.parentElement?.remove()
            }
            className={`shrink-0 p-1 rounded hover:bg-opacity-10 ${isDark ? "hover:bg-white" : "hover:bg-black"} transition-colors`}
            aria-label="Close"
          >
            <svg
              className={isDark ? "text-gray-300" : "text-gray-600"}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 4L4 12M4 4l8 8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
