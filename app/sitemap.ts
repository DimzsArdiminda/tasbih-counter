import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://do-dzikit.vercel.app"; // Ganti dengan domain Anda

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tasbih`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jadwal-sholat`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Tambahkan URL kota-kota besar untuk jadwal sholat
    {
      url: `${baseUrl}/jadwal-sholat/-6.2088/106.8456`, // Jakarta
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jadwal-sholat/-6.9175/107.6191`, // Bandung
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jadwal-sholat/-7.2575/112.7521`, // Surabaya
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jadwal-sholat/-7.7956/110.3695`, // Yogyakarta
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jadwal-sholat/-6.9667/109.1333`, // Semarang
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
