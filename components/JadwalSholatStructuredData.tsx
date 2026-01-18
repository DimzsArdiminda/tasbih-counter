"use client";

import React from "react";
import Script from "next/script";

export default function JadwalSholatStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Jadwal Sholat Indonesia",
    description:
      "Cek jadwal sholat hari ini untuk seluruh Indonesia. Waktu sholat akurat: Subuh, Dzuhur, Ashar, Maghrib, Isya.",
    url: "https://do-dzikit.vercel.app/jadwal-sholat",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    featureList: [
      "Jadwal Sholat Hari Ini",
      "Waktu Subuh",
      "Waktu Dzuhur",
      "Waktu Ashar",
      "Waktu Maghrib",
      "Waktu Isya",
      "Jadwal Sholat Seluruh Indonesia",
      "Pencarian Berdasarkan Kota",
    ],
    inLanguage: "id",
    isAccessibleForFree: true,
    spatialCoverage: {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: -2.5489,
        longitude: 118.0149,
      },
      name: "Indonesia",
    },
  };

  return (
    <Script
      id="jadwal-sholat-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
