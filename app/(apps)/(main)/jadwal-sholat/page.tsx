"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Loader2, MapPin, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { KabupatanKota } from "@/types/jadwal-solat";

export default function JadwalSholat() {
  const { isDark } = useTheme();
  const [allCities, setAllCities] = useState<KabupatanKota[]>([]);
  const [displayedCities, setDisplayedCities] = useState<KabupatanKota[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch all cities on component mount
  useEffect(() => {
    fetchAllCities();
  }, []);

  const fetchAllCities = async () => {
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) throw new Error("Gagal mengambil data kota");
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setAllCities(data.data);
        setDisplayedCities(data.data);
      }
    } catch (err) {
      setError("Gagal mengambil data kota");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const handleSearch = useCallback(
    (query: string) => {
      setSearchTerm(query);

      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (query.trim() === "") {
        setDisplayedCities(allCities);
        setSearching(false);
        return;
      }

      setSearching(true);

      // Debounce search request
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `/api/cities/search?q=${encodeURIComponent(query.trim())}`,
          );
          if (!response.ok) throw new Error("Gagal mencari kota");
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
            setDisplayedCities(data.data);
          } else {
            setDisplayedCities([]);
          }
        } catch (err) {
          console.error("Search error:", err);
          setDisplayedCities([]);
        } finally {
          setSearching(false);
        }
      }, 300); // 300ms debounce
    },
    [allCities],
  );

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
          {displayedCities.map((city) => (
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

      {displayedCities.length === 0 && !searching && (
        <div className="text-center py-12">
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {searchTerm ? "Tidak ada kota yang cocok" : "Tidak ada data kota"}
          </p>
        </div>
      )}
    </div>
  );
}
