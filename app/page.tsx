"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTASection from "@/components/CTASection";

export default function LandingPageLayout() {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <Hero isDark={isDark} />
      <Features isDark={isDark} />
      <CTASection isDark={isDark} />
      {/* <Footer isDark={isDark} /> */}
    </>
  );
}
