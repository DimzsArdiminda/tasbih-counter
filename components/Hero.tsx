"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface HeroProps {
  isDark: boolean;
}

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
}

interface LocationData {
  name: string;
  province: {
    name: string;
  };
  prayers: PrayerTime[];
}

interface City {
  id: string;
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export default function Hero({ isDark }: HeroProps) {
  const { data: session } = useSession();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [prayerData, setPrayerData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Haversine formula untuk menghitung jarak antara dua koordinat
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Radius bumi dalam km
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

  // Mencari kota terdekat dari koordinat user
  const findNearestCity = async (
    userLat: number,
    userLon: number,
  ): Promise<{ latitude: number; longitude: number } | null> => {
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) return null;

      const cities: City[] = await response.json();

      let nearestCity = cities[0];
      let minDistance = calculateDistance(
        userLat,
        userLon,
        cities[0].coordinate.latitude,
        cities[0].coordinate.longitude,
      );

      for (const city of cities) {
        const distance = calculateDistance(
          userLat,
          userLon,
          city.coordinate.latitude,
          city.coordinate.longitude,
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = city;
        }
      }

      return {
        latitude: nearestCity.coordinate.latitude,
        longitude: nearestCity.coordinate.longitude,
      };
    } catch (err) {
      console.error("Error finding nearest city:", err);
      return null;
    }
  };

  const getCurrentLocation = () => {
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
        setLocation({ lat: userLat, lng: userLng });

        try {
          // Cari kota terdekat dari database
          const nearestCity = await findNearestCity(userLat, userLng);

          if (!nearestCity) {
            throw new Error("Tidak dapat menemukan kota terdekat");
          }

          // Gunakan koordinat kota terdekat untuk query API
          const response = await fetch(
            `/api/prayer?latitude=${nearestCity.latitude}&longitude=${nearestCity.longitude}`,
          );

          if (!response.ok)
            throw new Error("Gagal mengambil data jadwal sholat");

          const data = await response.json();
          setPrayerData(data);
        } catch (err) {
          setError("Gagal mengambil data jadwal sholat");
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

  // Get today's prayer
  const todayPrayer =
    prayerData?.prayers.find(
      (prayer) => prayer.date === new Date().toISOString().split("T")[0],
    ) || prayerData?.prayers[0];

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
            📍 {prayerData.name}, {prayerData.province.name}
          </p>
        </div>
      )}

      {prayerData && todayPrayer && (
        <div className="bg-white/95 rounded-xl p-6 text-gray-900">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-blue-600">
              {prayerData.name}
            </h2>
            <p className="text-gray-600">{prayerData.province.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(todayPrayer.date).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Subuh</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.time.subuh}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Dzuhur</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.time.dzuhur}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Ashar</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.time.ashar}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Maghrib</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.time.maghrib}
              </p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Isya</p>
              <p className="text-xl font-bold text-blue-600">
                {todayPrayer.time.isya}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Imsak</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.time.imsak}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Terbit</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.time.terbit}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Dhuha</p>
              <p className="text-xl font-bold text-gray-600">
                {todayPrayer.time.dhuha}
              </p>
            </div>
          </div>
        </div>
      )}
      <small className=" text-blue-100 mb-6 max-w-2xl">
        webitse masih dalam tahap pengembangan, mohon maaf apabila terdapat bug
        atau fitur yang belum sempurna. Terima kasih atas pengertiannya.
      </small>
    </section>
  );
}
