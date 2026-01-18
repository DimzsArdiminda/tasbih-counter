"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/contexts/ThemeContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
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
  );
}
