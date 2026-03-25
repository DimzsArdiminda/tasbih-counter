"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Loader2, ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import type { JadwalResponse, JadwalKomponen } from "@/types/jadwal-solat";

interface FormattedSchedule {
  date: string;
  jadwal: JadwalKomponen;
}

export default function JadwalSholatDetail() {
  const { isDark } = useTheme();
  const params = useParams();
  const [prayerData, setPrayerData] = useState<JadwalResponse | null>(null);
  const [schedules, setSchedules] = useState<FormattedSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const cityId = params.cityId as string;

  const fetchPrayerData = useCallback(async () => {
    try {
      const response = await fetch(`/api/prayer?id=${cityId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Kota tidak ditemukan");
        }
        throw new Error("Gagal mengambil data jadwal sholat");
      }
      const data: JadwalResponse = await response.json();
      setPrayerData(data);

      // Format schedule data from original response
      if (data.data && data.data.jadwal) {
        const schedulesArray: FormattedSchedule[] = Object.entries(
          data.data.jadwal,
        ).map(([date, jadwal]) => ({
          date,
          jadwal,
        }));

        setSchedules(schedulesArray);

        // Set today as default, or first available date if not available
        const today = new Date().toISOString().split("T")[0];
        const todayExists = schedulesArray.some((s) => s.date === today);

        if (todayExists) {
          setSelectedDate(today);
        } else if (schedulesArray.length > 0) {
          setSelectedDate(schedulesArray[0].date);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data jadwal sholat",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityId]);

  useEffect(() => {
    if (cityId) {
      fetchPrayerData();
    }
  }, [cityId, fetchPrayerData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
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

  const selectedSchedule =
    schedules.find((s) => s.date === selectedDate) || schedules[0];

  const prayerTimes = [
    { label: "Subuh", key: "subuh", color: "blue" },
    { label: "Dzuhur", key: "dzuhur", color: "blue" },
    { label: "Ashar", key: "ashar", color: "blue" },
    { label: "Maghrib", key: "maghrib", color: "blue" },
    { label: "Isya", key: "isya", color: "blue" },
    { label: "Imsak", key: "imsak", color: "gray" },
    { label: "Terbit", key: "terbit", color: "gray" },
    { label: "Dhuha", key: "dhuha", color: "gray" },
  ];

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

      <div className="bg-linear-to-r from-blue-500 to-purple-500 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{prayerData.data.kabko}</h1>
            <p className="text-blue-100 flex items-center gap-2">
              <MapPin size={16} />
              {prayerData.data.prov}
            </p>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      {schedules.length > 1 && (
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
              {schedules.map((schedule) => (
                <option key={schedule.date} value={schedule.date}>
                  {new Date(schedule.date + "T00:00:00").toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Prayer Times */}
      {selectedSchedule && (
        <div
          className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-xl shadow-sm p-6`}
        >
          <h2
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}
          >
            Jadwal Sholat
          </h2>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}
          >
            {selectedSchedule.jadwal.tanggal}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {prayerTimes.map((prayer) => (
              <div
                key={prayer.key}
                className={`text-center p-4 rounded-lg ${
                  prayer.color === "blue"
                    ? isDark
                      ? "bg-blue-900/20"
                      : "bg-blue-50"
                    : isDark
                      ? "bg-gray-700"
                      : "bg-gray-100"
                }`}
              >
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
                >
                  {prayer.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    prayer.color === "blue"
                      ? isDark
                        ? "text-blue-400"
                        : "text-blue-600"
                      : isDark
                        ? "text-gray-300"
                        : "text-gray-700"
                  }`}
                >
                  {selectedSchedule.jadwal[prayer.key as keyof JadwalKomponen]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
