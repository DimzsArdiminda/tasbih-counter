/**
 * Types for Prayer Schedule (Jadwal Solat) API
 * Based on myquran.com API v3
 */

/**
 * Kabupaten/Kota data structure
 */
export interface KabupatanKota {
  id: string;
  lokasi: string;
}

/**
 * Prayer times for a specific day
 */
export interface JadwalKomponen {
  tanggal: string; // e.g., "Selasa, 23/06/2026"
  imsak: string; // e.g., "04:13"
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

/**
 * Response from MyQuran Kabkota API
 */
export interface KabkotaResponse {
  status: boolean;
  message: string;
  data: KabupatanKota[];
}

/**
 * Response from MyQuran search Kabkota API
 */
export interface CariKabkotaResponse {
  status: boolean;
  message: string;
  data: KabupatanKota[];
}

/**
 * Response from MyQuran get specific city
 */
export interface GetKabkotaResponse {
  status: boolean;
  message: string;
  data: KabupatanKota[];
}

/**
 * Prayer schedule response from MyQuran API
 * Contains jadwal object with date keys (YYYY-MM-DD format)
 */
export interface JadwalResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    kabko: string; // Kabupaten/Kota name
    prov: string; // Province name
    jadwal: Record<string, JadwalKomponen>; // {YYYY-MM-DD: JadwalKomponen}
  };
}

/**
 * Formatted prayer time for display
 */
export interface PrayerTimeDisplay {
  label: string;
  time: string;
  value: keyof Omit<JadwalKomponen, "tanggal">;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  status: false;
  message: string;
  error?: string;
}
