"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

interface PrayerTime {
  id: string;
  date: string;
  time: {
    imsak: string;
    subuh: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
  cityId: string;
}

interface PrayerData {
  id: string;
  name: string;
  slug: string;
  provinceId: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  province: {
    id: string;
    name: string;
    slug: string;
  };
  prayers: PrayerTime[];
}

export default function JadwalSholatDetail() {
  const { isDark } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const latitude = params.latitude as string;
  const longitude = params.longitude as string;

  useEffect(() => {
    if (latitude && longitude) {
      fetchPrayerData();
    }
  }, [latitude, longitude]);

  const fetchPrayerData = async () => {
    try {
      const response = await fetch(
        `/api/prayer?latitude=${latitude}&longitude=${longitude}`,
      );
      if (!response.ok) throw new Error("Gagal mengambil data jadwal sholat");
      const data = await response.json();
      setPrayerData(data);

      // Set today as default, or first available date if today is not in the list
      const today = new Date().toISOString().split("T")[0];
      const todayExists = data.prayers.some(
        (p: PrayerTime) => p.date === today,
      );

      if (todayExists) {
        setSelectedDate(today);
      } else if (data.prayers.length > 0) {
        // If today's date is not available, use the first date in the list
        setSelectedDate(data.prayers[0].date);
      }
    } catch (err) {
      setError("Gagal mengambil data jadwal sholat");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-blue-600" />
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Memuat jadwal sholat...
          </p>
        </div>
      </div>
    );
  }

  if (error || !prayerData) {
    return (
      <div>
        <Link
          href="/jadwal-sholat"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={20} />
          Kembali
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const selectedPrayer =
    prayerData.prayers.find((p) => p.date === selectedDate) ||
    prayerData.prayers[0];

  return (
    <div>
      {/* Header */}
      <Link
        href="/jadwal-sholat"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Kembali
      </Link>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{prayerData.name}</h1>
            <p className="text-blue-100 flex items-center gap-2">
              <MapPin size={16} />
              {prayerData.province.name}
            </p>
            <p className="text-sm text-blue-100 mt-1">
              {prayerData.coordinate.latitude.toFixed(6)},{" "}
              {prayerData.coordinate.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <label
          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-2`}
        >
          Pilih Tanggal
        </label>
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {prayerData.prayers.map((prayer) => (
              <option key={prayer.id} value={prayer.date}>
                {new Date(prayer.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prayer Times */}
      {selectedPrayer && (
        <div
          className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-sm p-6`}
        >
          <h2
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}
          >
            Jadwal Sholat
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Subuh
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {selectedPrayer.time.subuh}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Dzuhur
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {selectedPrayer.time.dzuhur}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Ashar
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {selectedPrayer.time.ashar}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Maghrib
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {selectedPrayer.time.maghrib}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Isya
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}
              >
                {selectedPrayer.time.isya}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Imsak
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {selectedPrayer.time.imsak}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Terbit
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {selectedPrayer.time.terbit}
              </p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Dhuha
              </p>
              <p
                className={`text-2xl font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {selectedPrayer.time.dhuha}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
