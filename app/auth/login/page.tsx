"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AlertError from "@/components/ui/error";
import AlertSuccess from "@/components/ui/success";
import Field from "@/components/ui/field";

export default function LoginPage() {
  const { isDark } = useTheme();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const registered = searchParams.get("registered");
    if (registered === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuccessMessage("Register berhasil! Silakan login untuk melanjutkan.");
      Router.replace("/auth/login");
    }
  }, [searchParams, Router]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleGoogleSignIn = () => {
    signIn("google", { redirect: true, callbackUrl: "/dashboard" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    Router.push("/dashboard");
  };

  return (
    <>
      {error && <AlertError errorMessage={error} />}
      {successMessage && (
        <AlertSuccess
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

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
        <Field
          id="email"
          title="Email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          isDark={isDark}
          required
        />

        {/* Password Input */}
        <Field
          id="password"
          title="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          isDark={isDark}
          required
          rightAction={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none"
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
          }
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
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
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "Loading..." : "Login"}
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
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
        </div>
      </div>

      {/* Sign Up Link */}
      <div
        className={`mt-8 text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Belum punya akun?{" "}
        <a
          href="/auth/register"
          className={`font-medium ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} transition-colors`}
        >
          Daftar sekarang
        </a>
      </div>
    </>
  );
}
