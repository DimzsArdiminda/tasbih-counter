"use client";
import Field from "@/components/ui/field";
import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import AlertError from "@/components/ui/error";

export default function Register() {
  const { isDark } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nama }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      router.push("/auth/login");
    } catch(error){
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  return (
    <>
      {error && <AlertError errorMessage={error} />}

      <div className="mb-8">
        <h2
          className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Register
        </h2>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Buat akun baru untuk memulai perjalanan Anda dengan Do-Dzikir
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field
          id="nama"
          title="Nama Lengkap"
          type="text"
          placeholder="Fulan Al Fulan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          icon={User}
          isDark={isDark}
          required
        />

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

        <Field
          id="password"
          title="Password"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          isDark={isDark}
          required
        />

        <Field
          id="confirm-password"
          title="Confirm Password"
          type="password"
          placeholder="Ulangi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={Lock}
          isDark={isDark}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </>
  );
}
