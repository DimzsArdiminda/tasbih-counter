"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Profile() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!id) {
      setError("Profile ID tidak ditemukan");
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(`/api/profile/${id}`);

        if (!resp.ok) {
          const payload = await resp.json().catch(() => null);
          throw new Error(payload?.message || "Gagal memuat profil");
        }

        const data = await resp.json();

        setProfile(data);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat profil",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id) {
      setError("Profile ID tidak ditemukan");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password baru minimal 6 karakter");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Konfirmasi password tidak sesuai");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const resp = await fetch(`/api/profile/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      const payload = await resp.json().catch(() => null);

      if (!resp.ok) {
        throw new Error(payload?.message || "Gagal memperbarui password");
      }

      setSuccess(payload?.message || "Password berhasil diperbarui");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal memperbarui password",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const joinedDate = profile
    ? new Date(profile.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const initials = profile
    ? profile.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("")
    : "U";

  if (loading) {
    return (
      <div className="min-h-[60vh] rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-pulse rounded-4xl border border-white/70 bg-white/70 p-6 shadow-sm">
            <div className="h-6 w-44 rounded-full bg-slate-200" />
            <div className="mt-5 h-32 rounded-3xl bg-slate-100" />
          </div>
          <div className="animate-pulse rounded-4xl border border-white/70 bg-white/70 p-6 shadow-sm">
            <div className="h-6 w-36 rounded-full bg-slate-200" />
            <div className="mt-5 space-y-4">
              <div className="h-12 rounded-2xl bg-slate-100" />
              <div className="h-12 rounded-2xl bg-slate-100" />
              <div className="h-12 rounded-2xl bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700 shadow-sm">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 p-1 shadow-lg">
        <div className="grid gap-6 rounded-4xl bg-white/95 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-600 to-cyan-600 text-2xl font-semibold text-white shadow-lg shadow-emerald-200">
                {profile.photo ? (
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="h-full w-full rounded-3xl object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600">
                  Profile
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  {profile.name}
                </h2>
                <p className="max-w-xl text-sm leading-6 text-slate-600">
                  Kelola data akun dan keamanan password dari satu tempat dengan
                  tampilan yang lebih bersih, modern, dan mudah dipahami.
                </p>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Email
                </p>
                <p className="mt-2 break-all text-sm font-medium text-slate-900">
                  {profile.email}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  User ID
                </p>
                <p className="mt-2 break-all text-sm font-medium text-slate-900">
                  {profile.id}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Bergabung
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {joinedDate}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Security overview
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Update password
                </h3>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Protected
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handlePasswordSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Password lama
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={passwordForm.currentPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      currentPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Masukkan password lama"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Password baru
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={passwordForm.newPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Minimal 6 karakter"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Konfirmasi password
                </span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      confirmPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Ulangi password baru"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan password baru"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
