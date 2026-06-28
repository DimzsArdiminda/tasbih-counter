"use client";

import { Camera, Save, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Field from "@/components/ui/field";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
}

interface CardBackProps {
  profile: Profile;
  isDark: boolean;
  onCancel: () => void;
  onSave?: (data: { name: string; email: string; photo: File | null }) => void;
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

  return (
    <div
      className={`h-full overflow-hidden rounded-3xl border shadow-xl ${
        isDark
          ? "border-zinc-700 bg-zinc-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`h-24 ${
          isDark
            ? "bg-gradient-to-r from-zinc-800 to-zinc-700"
            : "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
        }`}
      />

      <div className="px-8 pb-8">
        <div className="-mt-12 flex flex-col items-center">
          <div className="relative group">
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
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
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
            onClick={onCancel}
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
            onClick={() =>
              onSave?.({
                name,
                email,
                photo,
              })
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
