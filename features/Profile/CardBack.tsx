"use client";

import { Camera, Save, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Field from "@/components/ui/field";
import { useAlert } from "@/hooks/useAlert";

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

interface CardBackProps {
  profile: Profile;
  isDark: boolean;
  onCancel: () => void;
  onSave: (data: UpdateProfilePayload) => Promise<void>;
}

export default function CardBack({
  profile,
  isDark,
  onCancel,
  onSave,
}: CardBackProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [photo, setPhoto] = useState<File | null>(null);
  const [createdAt] = useState(profile.createdAt);
  const [isLoading, setIsLoading] = useState(false);

  const { success, error: showError } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      showError("Validasi", "Nama dan email wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      await onSave({
        id: profile.id,
        name,
        email,
        photo,
        createdAt,
      });

      success("Berhasil", "Profil berhasil diperbarui");

      onCancel(); // kembali ke tampilan depan
    } catch (err) {
      showError(
        "Gagal Memperbarui Profil",
        err instanceof Error ? err.message : "Terjadi kesalahan.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`h-full overflow-hidden rounded-3xl border shadow-xl ${
        isDark
          ? "border-zinc-700 bg-zinc-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <div
        className={`h-24 ${
          isDark
            ? "bg-gradient-to-r from-zinc-800 to-zinc-700"
            : "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
        }`}
      />

      <form onSubmit={handleSubmit}>
        <div className="px-8 pb-8">
          <div className="-mt-12 flex flex-col items-center">
            <div className="group relative">
              <Image
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : profile.photo || "/default-profile.png"
                }
                width={120}
                height={120}
                alt="Profile"
                className={`h-32 w-32 rounded-full border-4 object-cover ${
                  isDark ? "border-zinc-900" : "border-white"
                }`}
              />

              <label
                htmlFor="photo"
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100"
              >
                <Camera className="text-white" />
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhoto(file);
                  }
                }}
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold">Edit Profile</h2>

            <p className="mt-1 text-sm opacity-70">
              Update your profile information.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <Field
              id="name"
              title="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              isDark={isDark}
            />

            <Field
              id="email"
              title="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              isDark={isDark}
            />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 transition ${
                isDark
                  ? "border-zinc-700 hover:bg-zinc-800"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <X size={18} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
