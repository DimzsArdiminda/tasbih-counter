"use client";

import { Home, Book, Clock, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isDark: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const linkSidebar = [
  {
    title: "Dashboard",
    link: "/",
    icon: Home,
  },
  {
    title: "Al Quran",
    link: "https://quran-me.vercel.app",
    icon: Book,
    external: true,
  },
  {
    title: "Jadwal Sholat",
    link: "/jadwal-sholat",
    icon: Clock,
  },
  {
    title: "Tasbih",
    link: "/tasbih",
    icon: Sparkles,
  },
];

export default function Sidebar({
  isDark,
  sidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 
          ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} 
          border-r transition-all duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <nav className="p-4 space-y-2">
          {linkSidebar.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;

            return (
              <a
                key={item.link}
                href={item.link}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? isDark
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                    : isDark
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                } transition-colors`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer Card */}
        {/* <div
          className={`m-4 p-4 rounded-lg ${isDark ? "bg-gray-700" : "bg-blue-50"}`}
        >
          <h3
            className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Butuh Bantuan?
          </h3>
          <p
            className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Hubungi tim support kami
          </p>
          <button
            className={`w-full px-4 py-2 rounded-lg ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white text-sm font-medium transition-colors`}
          >
            Hubungi Kami
          </button>
        </div> */}
      </aside>

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
