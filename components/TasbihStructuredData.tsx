"use client";

import React from "react";
import Script from "next/script";

export default function TasbihStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tasbih Online - Counter Dzikir Digital",
    description:
      "Aplikasi tasbih online gratis dengan counter dzikir otomatis untuk Subhanallah, Alhamdulillah, Allahu Akbar, dan dzikir lainnya.",
    url: "https://do-dzikit.vercel.app/tasbih",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    featureList: [
      "Counter Tasbih Digital",
      "Dzikir Subhanallah",
      "Dzikir Alhamdulillah",
      "Dzikir Allahu Akbar",
      "Istighfar Counter",
      "Salawat Counter",
      "Custom Dzikir",
      "History Dzikir",
      "Sound & Vibration",
    ],
    inLanguage: "id",
    isAccessibleForFree: true,
  };

  return (
    <Script
      id="tasbih-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
