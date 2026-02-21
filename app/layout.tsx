import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { defaultMetadata } from "./metadata";
import Providers from "./session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Do'a Dzikit",
              description:
                "Aplikasi tasbih online dan dzikir digital gratis untuk umat muslim. Hitung dzikir, lihat jadwal sholat, dan tingkatkan ibadah harian Anda.",
              url: "https://do-dzikit.vercel.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
              featureList: [
                "Tasbih Digital Online",
                "Counter Dzikir Otomatis",
                "Jadwal Sholat Indonesia",
                "Dzikir Harian",
                "Gratis Selamanya",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
