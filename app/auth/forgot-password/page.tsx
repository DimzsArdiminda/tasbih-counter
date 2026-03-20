"use client";

import { Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Field from "@/components/ui/field";
import { useState } from "react";
import AlertError from "@/components/ui/error";
import AlertSuccess from "@/components/ui/success";
import { useMutation } from "@tanstack/react-query";

export default function ForgotPasswordPage() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: async (emailValue: string) => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send reset email");
      }

      return response.json();
    },
    onSuccess: () => {
      setSuccessMessage(
        "Email reset password telah dikirim. Silakan cek email Anda.",
      );
      setEmail("");
      setError("");
    },
    onError: (error) => {
      setError((error as Error).message || "Terjadi kesalahan");
      setSuccessMessage("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Email harus diisi");
      return;
    }

    forgotPasswordMutation.mutate(email);
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
          className={`text-3xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Lupa Password
        </h2>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Masukan email Anda untuk menerima instruksi reset password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className={`w-full py-3 rounded-lg font-semibold ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {forgotPasswordMutation.isPending
            ? "Mengirim..."
            : "Kirim Link Reset"}
        </button>

        <p
          className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Ingat password Anda?{" "}
          <a
            href="/auth/login"
            className={`font-medium ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            } transition-colors`}
          >
            Kembali ke login
          </a>
        </p>
      </form>
    </>
  );
}
