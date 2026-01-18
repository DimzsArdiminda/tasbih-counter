"use client";

import React, { useState } from "react";
import { Moon, Sun, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function LoginPage() {
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", { email, password, rememberMe });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"} transition-colors`}
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
            className={`p-12 rounded-2xl ${isDark ? "bg-gradient-to-br from-blue-900 to-purple-900" : "bg-gradient-to-br from-blue-500 to-purple-500"}`}
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

            {/* Feature List */}
            {/* <div className="space-y-4">
              {[
                "Akses ke semua fitur premium",
                "Dashboard analytics lengkap",
                "Support 24/7 dari tim kami",
                "Keamanan data terjamin",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div> */}

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

          <div className="mb-8">
            <h2
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Login
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Masukkan kredensial Anda untuk melanjutkan
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    size={20}
                    className={isDark ? "text-gray-500" : "text-gray-400"}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className={isDark ? "text-gray-500" : "text-gray-400"}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      className={
                        isDark
                          ? "text-gray-500 hover:text-gray-400"
                          : "text-gray-400 hover:text-gray-600"
                      }
                    />
                  ) : (
                    <Eye
                      size={20}
                      className={
                        isDark
                          ? "text-gray-500 hover:text-gray-400"
                          : "text-gray-400 hover:text-gray-600"
                      }
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Ingat saya
                </span>
              </label>
              <a
                href="#"
                className={`text-sm font-medium ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} transition-colors`}
              >
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-3 rounded-lg font-semibold ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors shadow-lg hover:shadow-xl`}
            >
              Login
            </button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center`}>
                <div
                  className={`w-full border-t ${isDark ? "border-gray-700" : "border-gray-300"}`}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${isDark ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"}`}
                >
                  Atau lanjutkan dengan
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`py-3 px-4 rounded-lg border ${
                  isDark
                    ? "border-gray-600 hover:bg-gray-700 text-white"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                } font-medium transition-colors flex items-center justify-center gap-2`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-lg border ${
                  isDark
                    ? "border-gray-600 hover:bg-gray-700 text-white"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                } font-medium transition-colors flex items-center justify-center gap-2`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div
            className={`mt-8 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Belum punya akun?{" "}
            <a
              href="#"
              className={`font-medium ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} transition-colors`}
            >
              Daftar sekarang
            </a>
          </div>
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
