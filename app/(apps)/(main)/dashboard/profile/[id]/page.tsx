"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Mail, User, Eye, Lock, EyeOff } from "lucide-react";

import Loading from "@/components/ui/loading";
import AlertError from "@/components/ui/error";
import { useTheme } from "@/lib/contexts/theme";
import Field from "@/components/ui/field";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}

export default function ProfileCard() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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

        const data: Profile = await resp.json();

        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  if (loading) return <Loading />;

  if (error || !profile) {
    return <AlertError errorMessage={error ?? "Profil tidak ditemukan"} />;
  }

  const joinedDate = new Date(profile.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={`min-h-screen`}>
      <div className="mx-auto max-w-7xl ">
        {/* Page Title */}
        <div className="mb-10">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Profile Settings
          </h1>

          <p className={`mt-2 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
            Manage your account information and password.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div
            className={`h-fit overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:sticky lg:top-8 ${
              isDark
                ? "border-zinc-700 bg-zinc-900 text-white"
                : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            {/* Header */}
            <div
              className={`h-36 ${
                isDark
                  ? "bg-linear-to-r from-zinc-800 to-zinc-700"
                  : "bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500"
              }`}
            />

            {/* Avatar */}
            <div className="-mt-16 flex justify-center">
              <Image
                src={profile.photo || "/default-profile.png"}
                alt={profile.name}
                width={120}
                height={120}
                className={`h-32 w-32 rounded-full border-4 object-cover shadow-lg ${
                  isDark ? "border-zinc-900" : "border-white"
                }`}
              />
            </div>

            {/* Content */}
            <div className="px-8 pb-8 pt-5">
              <div className="text-center">
                <h2 className="text-3xl font-bold">{profile.name}</h2>

                <span
                  className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                    isDark
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  Member
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {/* Email */}
                <div
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    isDark ? "bg-zinc-800" : "bg-gray-100"
                  }`}
                >
                  <Mail className="text-indigo-500" />

                  <div>
                    <p className="text-sm opacity-70">Email</p>
                    <p className="break-all font-medium">{profile.email}</p>
                  </div>
                </div>

                {/* Joined */}
                <div
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    isDark ? "bg-zinc-800" : "bg-gray-100"
                  }`}
                >
                  <Calendar className="text-green-500" />

                  <div>
                    <p className="text-sm opacity-70">Joined</p>
                    <p className="font-medium">{joinedDate}</p>
                  </div>
                </div>

                {/* User ID */}
                <div
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    isDark ? "bg-zinc-800" : "bg-gray-100"
                  }`}
                >
                  <User className="text-orange-500" />

                  <div>
                    <p className="text-sm opacity-70">User ID</p>
                    <p className="break-all font-medium">{profile.id}</p>
                  </div>
                </div>
              </div>

              <button
                className={`mt-8 w-full rounded-xl py-3 font-semibold transition ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* ================= Password Card ================= */}
          <div
            className={`lg:col-span-2 rounded-3xl border shadow-xl ${
              isDark
                ? "border-zinc-700 bg-zinc-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="border-b border-zinc-200 p-8 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl p-3 ${
                    isDark ? "bg-zinc-800" : "bg-indigo-100"
                  }`}
                >
                  <Lock className="text-indigo-500" />
                </div>

                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Update Password
                  </h2>

                  <p
                    className={`mt-1 ${
                      isDark ? "text-zinc-400" : "text-gray-500"
                    }`}
                  >
                    Keep your account secure by changing your password
                    regularly.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <Field
                id="passwordCurrent"
                title="Current Password"
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                isDark={isDark}
                required
                rightAction={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                }
              />

              <Field
                id="password"
                title="New Password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                isDark={isDark}
                required
                rightAction={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                }
              />

              <Field
                id="confirmPassword"
                title="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                isDark={isDark}
                required
                rightAction={
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                }
              />

              <div className="pt-2">
                <button
                  className={`w-full rounded-xl py-3 font-semibold transition ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
