/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import AlertError from "@/components/ui/error";
import { useTheme } from "@/lib/contexts/theme";
import CardPassword from "@/privcomp/Profile/CardPassword";
import CardInfo from "@/privcomp/Profile/CardInfo";


interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}

interface UpdateProfilePayload {
  id: string;
  name: string;
  email: string;
  photo: File | null;
  createdAt: string;
}

export default function ProfileCard() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const router = useRouter();
  

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

  const updateProfileUrl = async (updatedProfile: UpdateProfilePayload) => {
    try {
      let response: Response;

      if (updatedProfile.photo) {
        const form = new FormData();
        form.append("id", updatedProfile.id);
        form.append("name", updatedProfile.name);
        form.append("email", updatedProfile.email);
        form.append("photo", updatedProfile.photo);

        response = await fetch(`/api/profile/update/`, {
          method: "PUT",
          body: form,
        });
      } else {
        const payload = {
          id: updatedProfile.id,
          name: updatedProfile.name,
          email: updatedProfile.email,
        };

        response = await fetch(`/api/profile/update/`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal Merubah Profil");
      }

      const newProf: Profile = await response.json();
      setProfile(newProf);

      router.refresh();
    } catch (error) {
      console.error("Error adding custom dzikir:", error);
      throw error;
    }
  };

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

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Info card */}
          <CardInfo
            onSave={updateProfileUrl}
            profile={profile}
            joinedDate={joinedDate}
            isDark={isDark}
          />
          {/* Password card */}
          <CardPassword profile={profile} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
