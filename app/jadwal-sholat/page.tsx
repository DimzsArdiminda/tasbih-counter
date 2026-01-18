"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, MapPin, ChevronRight } from "lucide-react";

interface City {
  id: string;
  name: string;
  slug: string;
  provinceId: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface Province {
  id: string;
  name: string;
  slug: string;
  cities: City[];
}

export default function JadwalSholat() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("/api/province");
      if (!response.ok) throw new Error("Gagal mengambil data provinsi");
      const data = await response.json();
      setProvinces(data);
    } catch (err) {
      setError("Gagal mengambil data provinsi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter provinces and cities based on search term
  const filteredProvinces = provinces
    .map((province) => ({
      ...province,
      cities: province.cities.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter(
      (province) =>
        province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        province.cities.length > 0,
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-blue-600" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Jadwal Sholat
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Pilih kota untuk melihat jadwal sholat
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari provinsi atau kota..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Province List */}
      <div className="space-y-6">
        {filteredProvinces.map((province) => (
          <div
            key={province.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {province.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {province.cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/jadwal-sholat/${city.coordinate.latitude}/${city.coordinate.longitude}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {city.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {city.coordinate.latitude.toFixed(4)},{" "}
                        {city.coordinate.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-gray-400 group-hover:text-blue-600"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProvinces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Tidak ada hasil yang ditemukan
          </p>
        </div>
      )}
    </div>
  );
}
