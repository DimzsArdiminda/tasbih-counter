"use client";

import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";
import { useTheme } from "@/contexts/ThemeContext";

export default function LandingPageLayout() {
  const { isDark } = useTheme();

  return (
    <>
      <Hero isDark={isDark} />
      <Features isDark={isDark} />
      {/* <CTASection isDark={isDark} /> */}
    </>
  );
}
