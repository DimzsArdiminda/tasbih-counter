"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import type {
  KabupatanKota,
  JadwalResponse,
  JadwalKomponen,
} from "@/types/jadwal-solat";

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const { data: session } = useSession();
  const [prayerData, setPrayerData] = useState<JadwalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCurrentLocationAndPrayerSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Find nearest city name from cities list
   */
  const findNearestCityName = async (): Promise<string | null> => {
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) return null;

      const data = await response.json();
      const cities: KabupatanKota[] = data.data || [];

      if (cities.length === 0) return null;

      // Return first city name from list
      return cities[0].lokasi;
    } catch (err) {
      console.error("Error finding nearest city:", err);
      return null;
    }
  };

  /**
   * Main function to get location and fetch prayer schedule
   */
  const getCurrentLocationAndPrayerSchedule = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async () => {
        try {
          // Step 1: Find nearest city name from list
          const nearestCityName = await findNearestCityName();
          if (!nearestCityName) {
            throw new Error("Tidak dapat menemukan kota terdekat");
          }

          // Step 2: Search for city using the city name
          const searchResponse = await fetch(
            `/api/cities/search?q=${encodeURIComponent(nearestCityName)}`,
          );

          if (!searchResponse.ok) {
            throw new Error("Gagal mencari kota");
          }

          const searchData = await searchResponse.json();
          const searchCities: KabupatanKota[] = searchData.data || [];

          if (searchCities.length === 0) {
            throw new Error("Kota tidak ditemukan dalam database");
          }

          // Step 3: Get city ID from search result
          const cityId = searchCities[0].id;

          // Step 4: Fetch prayer schedule using city ID
          const prayerResponse = await fetch(`/api/prayer?id=${cityId}`);

          if (!prayerResponse.ok) {
            throw new Error("Gagal mengambil data jadwal sholat");
          }

          const prayerDataResponse: JadwalResponse =
            await prayerResponse.json();
          setPrayerData(prayerDataResponse);
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
      },
      (error) => {
        setError(
          "Gagal mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi browser.",
        );
        setLoading(false);
        console.error(error);
      },
    );
  };

  /**
   * Get today's prayer times
   */
  const getTodayPrayer = (): JadwalKomponen | null => {
    if (!prayerData?.data?.jadwal) return null;

    const today = new Date().toISOString().split("T")[0];
    return (
      prayerData.data.jadwal[today] ||
      Object.values(prayerData.data.jadwal)[0] ||
      null
    );
  };

  const todayPrayer = getTodayPrayer();

  // Prayer times display configuration
  const prayerTimesDisplay = [
    { label: "Subuh", key: "subuh" as keyof JadwalKomponen, color: "blue" },
    { label: "Dzuhur", key: "dzuhur" as keyof JadwalKomponen, color: "blue" },
    { label: "Ashar", key: "ashar" as keyof JadwalKomponen, color: "blue" },
    { label: "Maghrib", key: "maghrib" as keyof JadwalKomponen, color: "blue" },
    { label: "Isya", key: "isya" as keyof JadwalKomponen, color: "blue" },
    { label: "Imsak", key: "imsak" as keyof JadwalKomponen, color: "gray" },
    { label: "Terbit", key: "terbit" as keyof JadwalKomponen, color: "gray" },
    { label: "Dhuha", key: "dhuha" as keyof JadwalKomponen, color: "gray" },
  ];

  return (
    <section
      className={`rounded-xl p-8 sm:p-12 mb-8 ${
        isDark
          ? "bg-linear-to-r from-blue-900 to-purple-900"
          : "bg-linear-to-r from-blue-500 to-purple-500"
      }`}
    >
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        Assalamualaikum{session?.user?.name ? `, ${session.user.name}` : ""} 👋
      </h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-2xl">
        Selamat datang di Do-Dzikir! Dapatkan beragam kebutuhan rohani kamu di
        website ini secara gratis.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 text-white mb-6">
          <Loader2 size={20} className="animate-spin" />
          <span>Mengambil lokasi dan jadwal sholat Anda...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/20 border border-red-300 text-white px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Location Info */}
      {prayerData && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 text-white">
          <p className="text-sm">
            📍 {prayerData.data.kabko}, {prayerData.data.prov}
          </p>
        </div>
      )}

      {/* Prayer Schedule Card */}
      {prayerData && todayPrayer && (
        <div className="bg-white/95 rounded-xl p-6 text-gray-900">
          {/* Card Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
              {prayerData.data.kabko}
            </h2>
            <p className="text-gray-600">{prayerData.data.prov}</p>
            <p className="text-sm text-gray-500 mt-2">{todayPrayer.tanggal}</p>
          </div>

          {/* Prayer Times Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {prayerTimesDisplay.map((prayer) => (
              <div
                key={prayer.key}
                className={`text-center p-3 sm:p-4 rounded-lg transition-all ${
                  prayer.color === "blue"
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                  {prayer.label}
                </p>
                <p
                  className={`text-lg sm:text-xl font-bold ${
                    prayer.color === "blue" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {todayPrayer[prayer.key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <small className="text-blue-100 mt-6 block">
        Website masih dalam tahap pengembangan, mohon maaf apabila terdapat bug
        atau fitur yang belum sempurna. Terima kasih atas pengertiannya.
      </small>
    </section>
  );
}
