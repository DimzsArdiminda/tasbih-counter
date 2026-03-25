"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import type { KabupatanKota, JadwalResponse } from "@/types/jadwal-solat";

interface HeroProps {
  isDark: boolean;
}

interface City extends KabupatanKota {
  coordinate?: {
    latitude: number;
    longitude: number;
  };
}

export default function Hero({ isDark }: HeroProps) {
  const { data: session } = useSession();
  const [prayerData, setPrayerData] = useState<JadwalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const calculateDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number,
    ): number => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const findNearestCity = async (
      userLat: number,
      userLon: number,
    ): Promise<string | null> => {
      try {
        const response = await fetch("/api/cities");
        if (!response.ok) return null;

        const data = await response.json();
        const cities: City[] = data.data || [];

        if (cities.length === 0) return null;

        let nearestCityName = cities[0].lokasi;

        if (cities[0].coordinate) {
          let minDistance = calculateDistance(
            userLat,
            userLon,
            cities[0].coordinate.latitude,
            cities[0].coordinate.longitude,
          );

          for (const city of cities) {
            if (!city.coordinate) continue;

            const distance = calculateDistance(
              userLat,
              userLon,
              city.coordinate.latitude,
              city.coordinate.longitude,
            );

            if (distance < minDistance) {
              minDistance = distance;
              nearestCityName = city.lokasi;
            }
          }
        }

        return nearestCityName;
      } catch (err) {
        console.error("Error finding nearest city:", err);
        return null;
      }
    };

    const loadPrayerSchedule = () => {
      setLoading(true);
      setError("");

      if (!navigator.geolocation) {
        setError("Geolocation tidak didukung oleh browser Anda");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          try {
            const nearestCityName = await findNearestCity(userLat, userLng);

            if (!nearestCityName) {
              throw new Error("Tidak dapat menemukan kota terdekat");
            }

            const searchResponse = await fetch(
              `/api/cities/search?q=${encodeURIComponent(nearestCityName)}`,
            );

            if (!searchResponse.ok) {
              throw new Error("Gagal mencari kota");
            }

            const searchData = await searchResponse.json();
            const searchCities: KabupatanKota[] = searchData.data || [];

            if (searchCities.length === 0) {
              throw new Error("Kota tidak ditemukan");
            }

            const cityId = searchCities[0].id;

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
            "Gagal mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi.",
          );
          setLoading(false);
          console.error(error);
        },
      );
    };

    loadPrayerSchedule();
  }, []);

  const getTodayPrayer = () => {
    if (!prayerData?.data?.jadwal) return null;

    const today = new Date().toISOString().split("T")[0];
    return (
      prayerData.data.jadwal[today] || Object.values(prayerData.data.jadwal)[0]
    );
  };

  const todayPrayer = getTodayPrayer();

  return (
    <section
      className={`rounded-xl p-8 sm:p-12 mb-8 ${isDark ? "bg-linear-to-r from-blue-900 to-purple-900" : "bg-linear-to-r from-blue-500 to-purple-500"}`}
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
          <span>Mengambil lokasi dan jadwal sholat...</span>
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
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-blue-600">
              {prayerData.data.kabko}
            </h2>
            <p className="text-gray-600">{prayerData.data.prov}</p>
            <p className="text-sm text-gray-500 mt-1">{todayPrayer.tanggal}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Subuh</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.subuh}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Dzuhur</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.dzuhur}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Ashar</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.ashar}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Maghrib</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.maghrib}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Isya</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.isya}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Imsak</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.imsak}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Terbit</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.terbit}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Dhuha</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.dhuha}
              </p>
            </div>
          </div>
        </div>
      )}
      <small className="text-blue-100 mb-6 max-w-2xl block ">
        website masih dalam tahap pengembangan, mohon maaf apabila terdapat bug
        atau fitur yang belum sempurna. Terima kasih atas pengertiannya.
      </small>
    </section>
  );
}
