"use client";

import React from "react";
import Hero from "@/privcomp/home/components/hero";
import Features from "@/privcomp/home/components/features";
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
