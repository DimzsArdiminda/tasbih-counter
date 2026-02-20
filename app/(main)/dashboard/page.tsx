"use client";

import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { useTheme } from "@/contexts/ThemeContext";

export default function Dashboard() {
  const { isDark } = useTheme();

  return (
    <>
      <Hero isDark={isDark} />
      <Features isDark={isDark} />
      {/* <CTASection isDark={isDark} /> */}
    </>
  );
}
