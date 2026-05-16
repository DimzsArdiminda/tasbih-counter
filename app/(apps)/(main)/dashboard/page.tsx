"use client";

import React from "react";
import Hero from "@/features/home/components/hero";
import Features from "@/features/home/components/features";
import { useTheme } from "@/lib/contexts/theme";

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
