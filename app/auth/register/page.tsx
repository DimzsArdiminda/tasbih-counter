"use client";
import Field from "@/components/ui/field";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import AlertError from "@/components/ui/error";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RegisterDataType, RegisterSchema } from "@/app/schemas/register";

export default function Register() {
  const { isDark } = useTheme();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (formData: RegisterDataType) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.nama,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Register gagal");
      }

      return data;
    },
    onMutate: () => {
      setError("");
    },
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (mutationError) => {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "Terjadi kesalahan",
      );
    },
  });

  const onSubmit = (formData: RegisterDataType) => {
    registerMutation.mutate(formData);
  };

  const firstValidationError =
    errors.nama?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message;
  const validationErrorMessage = firstValidationError
    ? String(firstValidationError)
    : "";

  return (
    <>
      {error && <AlertError errorMessage={error} />}
      {!error && validationErrorMessage && (
        <AlertError errorMessage={validationErrorMessage} />
      )}

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="nama"
          control={control}
          render={({ field }) => (
            <Field
              id="nama"
              title="Nama Lengkap"
              type="text"
              placeholder="Fulan Al Fulan"
              value={field.value}
              onChange={field.onChange}
              icon={User}
              isDark={isDark}
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field
              id="email"
              title="Email"
              type="email"
              placeholder="nama@email.com"
              value={field.value}
              onChange={field.onChange}
              icon={Mail}
              isDark={isDark}
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Field
              id="password"
              title="Password"
              type="password"
              placeholder="Masukkan password"
              value={field.value}
              onChange={field.onChange}
              icon={Lock}
              isDark={isDark}
              required
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Field
              id="confirm-password"
              title="Confirm Password"
              type="password"
              placeholder="Ulangi Password"
              value={field.value}
              onChange={field.onChange}
              icon={Lock}
              isDark={isDark}
              required
            />
          )}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </>
  );
}
