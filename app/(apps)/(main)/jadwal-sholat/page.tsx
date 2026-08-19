"use client";


import Link from "next/link";
import { Loader2, MapPin, ChevronRight } from "lucide-react";
import { useTheme } from "@/lib/contexts/theme";
import { useSolat } from "@/services/sholat/useSolat";


export default function JadwalSholat() {
  const { isDark } = useTheme();

  const {
    allCities,
    loading,
    error,
    searching,
    searchTerm,
    handleSearch,
  } = useSolat();

 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-blue-600" />
          <p className="text-gray-600">Memuat data kota...</p>
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
      <div className="mb-8 max-w-6xl mx-auto">
        <h1
          className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3`}
        >
          Jadwal Sholat
        </h1>
        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Cari dan pilih kota untuk melihat jadwal sholat
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-6xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari kota atau kabupaten..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          />
          {searching && (
            <div className="absolute right-4 top-3">
              <Loader2 size={20} className="animate-spin text-blue-600" />
            </div>
          )}
        </div>
      </div>

      {/* Cities List */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {allCities.map((city) => (
            <Link
              key={city.id}
              href={`/jadwal-sholat/${city.id}`}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all group h-full ${
                isDark
                  ? "border-gray-700 hover:border-blue-500 hover:bg-blue-900/20"
                  : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MapPin
                  size={20}
                  className="text-gray-400 group-hover:text-blue-600 shrink-0"
                />
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"} truncate`}
                >
                  {city.lokasi}
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-blue-600 shrink-0 ml-2"
              />
            </Link>
          ))}
        </div>
      </div>

      {allCities.length === 0 && !searching && (
        <div className="text-center py-12">
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {searchTerm ? "Tidak ada kota yang cocok" : "Tidak ada data kota"}
          </p>
        </div>
      )}
    </div>
  );
}
