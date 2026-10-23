"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import HowItWorks from "@/components/HowItWorks";
import FeaturedCreators from "@/components/FeaturedCreators";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [targetHandle, setTargetHandle] = useState("");
  const [targetCategory, setTargetCategory] = useState("Artists");

  const handleHeroClaim = (handle: string) => {
    setTargetHandle(handle);
  };

  const handleCategorySelect = (category: string) => {
    setTargetCategory(category);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0D0E1A] text-white selection:bg-[#9D4EDD] selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero onHandleSubmit={handleHeroClaim} />

      {/* 3. Category Grid ("Something for Every Interest") */}
      <CategoryGrid onSelectCategory={handleCategorySelect} />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Featured Creators ("Meet the vibe") */}
      <FeaturedCreators />

      {/* 6. Waitlist Conversion Form ("Be first through the door") */}
      <WaitlistSection
        initialHandle={targetHandle}
        initialCategory={targetCategory}
      />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
