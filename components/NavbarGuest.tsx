"use client";
import React from "react";
import Link from "next/link";

interface NavbarGuestProps {
  isDark: boolean;
}

const MenuItems = [
  { name: "Home", href: "/" },
  { name: "Developer", href: "/developer" },
  { name: "Tentang", href: "/tentang" },
  { name: "Blog", href: "/blog" },
];

export default function NavbarGuest({ isDark }: NavbarGuestProps) {
  return (
    <>
      
        {MenuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`hover:text-blue-500 transition ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
    </>
  );
}
