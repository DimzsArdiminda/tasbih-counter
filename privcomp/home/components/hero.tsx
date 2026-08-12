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

  const getPlaceUser = async (): Promise<[string, string] | undefined> => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda");
      setLoading(false);
      return;
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `/api/province?lat=${latitude}&lon=${longitude}`,
    );

    const data = await response.json();
    const cityNorm = data.city.replace(/^(Kota|Kabupaten)\s+/i, "").toLowerCase();
    return [cityNorm, data.city];
  };

  const getCurrentLocationAndPrayerSchedule = async () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda");
      setLoading(false);
      return;
    }
    try {
      const location = await getPlaceUser();
      if (!location) {
        throw new Error("Tidak dapat menemukan kota terdekat");
      }
      
      const searchResponse = await fetch(
        `/api/cities/search?q=${location[0]}`,
      );

      if (!searchResponse.ok) {
        throw new Error("Gagal mencari kota");
      }

      const searchData = await searchResponse.json();
      const searchCities: KabupatanKota[] = searchData.data || [];

      const targetCity = location[1].toUpperCase().replace(/^Kabupaten/i, "KAB.")
        .replace(/^Kota/i, "KOTA");

      const selectedCity =
        searchCities.find((city) => city.lokasi.toUpperCase() === targetCity) ??
        searchCities.find((city) =>
          city.lokasi.toUpperCase().includes(targetCity),
        );

      if (!selectedCity) {
        throw new Error("Kota tidak ditemukan dalam database");
      }

      const cityId = selectedCity.id;

      const prayerResponse = await fetch(`/api/prayer?id=${cityId}`);

      if (!prayerResponse.ok) {
        throw new Error("Gagal mengambil data jadwal sholat");
      }

      const prayerDataResponse: JadwalResponse = await prayerResponse.json();
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
  };
  
  useEffect(() => {
    getCurrentLocationAndPrayerSchedule();
  }, []);

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
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        Assalamualaikum{session?.user?.name ? `, ${session.user.name}` : ""} 👋
      </h1>
      <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-2xl">
        Selamat datang di Do-Dzikir! Dapatkan beragam kebutuhan rohani kamu di
        website ini secara gratis.
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-white mb-6">
          <Loader2 size={20} className="animate-spin" />
          <span>Mengambil lokasi dan jadwal sholat Anda...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-300 text-white px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {prayerData && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 text-white">
          <p className="text-sm">
            📍 {prayerData.data.kabko}, {prayerData.data.prov}
          </p>
        </div>
      )}

      {prayerData && todayPrayer && (
        <div className="bg-white/95 rounded-xl p-6 text-gray-900">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
              {prayerData.data.kabko}
            </h2>
            <p className="text-gray-600">{prayerData.data.prov}</p>
            <p className="text-sm text-gray-500 mt-2">{todayPrayer.tanggal}</p>
          </div>

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

      <small className="text-blue-100 mt-6 block">
        Website masih dalam tahap pengembangan, mohon maaf apabila terdapat bug
        atau fitur yang belum sempurna. Terima kasih atas pengertiannya.
      </small>
    </section>
  );
}
