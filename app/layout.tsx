"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme dari localStorage saat pertama kali mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  // Simpan theme ke localStorage setiap kali berubah
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className={`min-h-screen ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}
        >
          <Header
            isDark={isDark}
            sidebarOpen={sidebarOpen}
            toggleTheme={toggleTheme}
            toggleSidebar={toggleSidebar}
          />

          <div className="flex">
            <Sidebar
              isDark={isDark}
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
            />

            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 lg:ml-64">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
