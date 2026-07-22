
"use client";

import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavbarGuest from "./navbar-guest";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HeaderProps {
  isDark: boolean;
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export default function Header({
  isDark,
  sidebarOpen,
  toggleTheme,
  toggleSidebar,
}: HeaderProps) {
  const Router = useRouter();
  const { status } = useSession();
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/auth/login",
    });

    Router.push("/auth/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Do-Dzikir & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg ${isDark ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}
              >
                <span className="text-white font-bold">L</span>
              </div>
              <span
                className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Do-Dzikir
              </span>
            </div>
          </div>

          {/* Navigation */}
          {status !== "authenticated" ? (
            <nav className="hidden md:flex items-center gap-6">
              <NavbarGuest isDark={isDark} />
            </nav>
          ) : (
            <p>
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {/* Theme Toggle & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            <div className="relative" ref={dropdownRef}>
              {status === "authenticated" ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                      isDark
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    {/* <p>{session?.user?.photo}</p> */}
                    <Image
                      width={40}
                      height={40}
                      src={
                        session?.user?.photo
                          ? session?.user?.photo
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              session?.user?.name || "Guest",
                            )}&background=2563eb&color=fff`
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />

                    <span className="font-medium hidden sm:block">
                      {session?.user?.name}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        openDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown && (
                    <div
                      className={`absolute right-0 mt-2 w-52 rounded-xl shadow-lg border overflow-hidden z-50 ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 border-b ${
                          isDark ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <p
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {session?.user?.name}
                        </p>

                        <p className="text-sm text-gray-500 truncate">
                          {session?.user?.email}
                        </p>
                      </div>

                      <Link
                        href={`/dashboard/profile/${session?.user?.id}`}
                        onClick={() => setOpenDropdown(false)}
                        className={`block px-4 py-3 transition ${
                          isDark
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className={`px-4 py-2 rounded-lg ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition`}
                  onClick={() => Router.push("/auth/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
