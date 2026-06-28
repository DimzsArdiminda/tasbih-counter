"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Mail, User } from "lucide-react";

import Loading from "@/components/ui/loading";
import AlertError from "@/components/ui/error";
import { useTheme } from "@/lib/contexts/theme";

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
    <div
      className={`mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 ${
        isDark
          ? "border-zinc-700 bg-zinc-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`h-36 ${
          isDark
            ? "bg-gradient-to-r from-zinc-800 to-zinc-700"
            : "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
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
          <h1 className="text-3xl font-bold">{profile.name}</h1>

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
            <Mail className="text-indigo-500" size={22} />

            <div>
              <p className="text-sm opacity-70">Email</p>
              <p className="font-medium break-all">{profile.email}</p>
            </div>
          </div>

          {/* Joined */}
          <div
            className={`flex items-center gap-4 rounded-xl p-4 ${
              isDark ? "bg-zinc-800" : "bg-gray-100"
            }`}
          >
            <Calendar className="text-green-500" size={22} />

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
            <User className="text-orange-500" size={22} />

            <div>
              <p className="text-sm opacity-70">User ID</p>
              <p className="font-medium break-all">{profile.id}</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          className={`mt-8 w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
