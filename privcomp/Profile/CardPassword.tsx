/* eslint-disable react-hooks/set-state-in-effect */
import React from 'react'
import { Eye, Lock, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/contexts/theme";
import Field from "@/components/ui/field";

interface Profile {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}


export default function CardPassword({isDark, profile}: {isDark: boolean, profile: Profile}) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
    if (profile) {
        setName(profile.name);
        setEmail(profile.email);
        setPhoto(profile.photo ? new File([], profile.photo) : null);
    }
    }, [profile]);

  return (
    <div
        className={`lg:col-span-2 rounded-3xl border shadow-xl ${
            isDark ? "border-zinc-700 bg-zinc-900" : "border-gray-200 bg-white"
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

                <p className={`mt-1 ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                Keep your account secure by changing your password regularly.
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
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
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
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
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
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
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
    );
}
