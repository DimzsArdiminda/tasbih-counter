"use client";

import Image from "next/image";
import { Calendar, Mail, User } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
}

interface CardFrontProps {
  profile: Profile;
  joinedDate: string;
  isDark: boolean;
  onEdit: () => void;
}

export default function CardFront({
  profile,
  joinedDate,
  isDark,
  onEdit,
}: CardFrontProps) {
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
          <InfoItem
            icon={<Mail className="text-indigo-500" />}
            title="Email"
            value={profile.email}
            isDark={isDark}
          />

          <InfoItem
            icon={<Calendar className="text-green-500" />}
            title="Joined"
            value={joinedDate}
            isDark={isDark}
          />

          <InfoItem
            icon={<User className="text-orange-500" />}
            title="User ID"
            value={profile.id}
            isDark={isDark}
          />
        </div>

        <button
          onClick={onEdit}
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
  );
}

function InfoItem({
  icon,
  title,
  value,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl p-4 ${
        isDark ? "bg-zinc-800" : "bg-gray-100"
      }`}
    >
      {icon}

      <div>
        <p className="text-sm opacity-70">{title}</p>
        <p className="break-all font-medium">{value}</p>
      </div>
    </div>
  );
}
