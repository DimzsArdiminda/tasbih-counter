import { Metadata } from "next";

export const siteConfig = {
  name: "Do'a Dzikir",
  description:
    "Tasbih Online & Dzikir Digital Gratis - Aplikasi dzikir online, tasbih digital, jadwal sholat Indonesia, dan panduan doa harian. Tingkatkan ibadah Anda dengan tools islami modern.",
  url: "https://do-dzikir.vercel.app", // Ganti dengan domain Anda
  ogImage: "https://do-dzikir.vercel.app/og-image.png", // Buat image ini nanti
  keywords: [
    "tasbih online",
    "dzikir online",
    "tasbih digital",
    "aplikasi dzikir",
    "counter tasbih",
    "jadwal sholat",
    "jadwal sholat Indonesia",
    "waktu sholat",
    "tasbih gratis",
    "dzikir harian",
    "dzikir digital",
    "aplikasi islami",
    "doa harian",
    "subhanallah counter",
    "alhamdulillah counter",
    "allahu akbar counter",
    "istighfar online",
    "tahlil online",
    "sholawat counter",
    "ibadah digital",
    "tools muslim",
    "aplikasi muslim",
    "tasbih muslim",
    "zikir online",
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Tasbih Online & Dzikir Digital Gratis`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Do'a Dzikir" }],
  creator: "Do'a Dzikir",
  publisher: "Do'a Dzikir",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Do'a Dzikir - Tasbih Online & Dzikir Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@doadzikir", // Ganti dengan Twitter handle Anda
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
};
