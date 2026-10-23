"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StepItem {
  number: string;
  title: string;
  description: string;
  image: string;
  accentColor: string;
  glowColor: string;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps: StepItem[] = [
    {
      number: "01",
      title: "CREATE YOUR PROFILE",
      description:
        "Set up your creator page, customize your brand, and share your vibe with the world.",
      image: "/images/step_01_profile.jpg",
      accentColor: "#9D4EDD",
      glowColor: "rgba(157, 78, 221, 0.45)",
    },
    {
      number: "02",
      title: "POST CONTENT",
      description:
        "Share images, videos, text, and exclusive media directly with your audience.",
      image: "/images/step_02_content.jpg",
      accentColor: "#E0218A",
      glowColor: "rgba(224, 33, 138, 0.45)",
    },
    {
      number: "03",
      title: "BUILD YOUR COMMUNITY",
      description:
        "Grow your followers, interact in the comments, and bring your people together.",
      image: "/images/step_03_community.jpg",
      accentColor: "#00F0FF",
      glowColor: "rgba(0, 240, 255, 0.45)",
    },
    {
      number: "04",
      title: "MONETIZE YOUR PASSION",
      description:
        "Earn through recurring subscriptions, exclusive gated posts, and direct tips.",
      image: "/images/step_04_monetize.jpg",
      accentColor: "#FF7700",
      glowColor: "rgba(255, 119, 0, 0.45)",
    },
  ];

  // Dynamic scroll listener tracking continuous scroll progress and active step
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportCenter = window.innerHeight * 0.5;
          const el0 = imageRefs.current[0];
          const elLast = imageRefs.current[steps.length - 1];

          // Calculate continuous scroll progress from first step center to last step center
          if (el0 && elLast) {
            const r0 = el0.getBoundingClientRect();
            const rLast = elLast.getBoundingClientRect();
            const center0 = r0.top + r0.height / 2;
            const centerLast = rLast.top + rLast.height / 2;
            const totalDistance = centerLast - center0;

            if (totalDistance > 0) {
              const currentDistance = viewportCenter - center0;
              const rawProgress = currentDistance / totalDistance;
              const clamped = Math.max(0, Math.min(1, rawProgress));
              setScrollProgress(clamped);
            }
          }

          // Active step is the image closest to viewport center
          let closestIdx = 0;
          let minDistance = Infinity;

          imageRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIdx = idx;
            }
          });

          setActiveStep(closestIdx);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const target = imageRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-[#0D0E1A]">
      {/* Background ambient lighting in isolated container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[#9D4EDD]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[350px] bg-[#E0218A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP SIDE-BY-SIDE: Sticky Text Left (col-span-6), Scrolling Images Right (col-span-6) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-start relative">
          {/* Left Column (Sticky 6-col Share, spanning 80% viewport height) */}
          <div className="lg:col-span-6 sticky top-[10vh] h-[80vh] flex items-center pr-4">
            <div className="flex items-center gap-8 xl:gap-12 w-full h-full">
              {/* Vertical Step Indicators spanning 80% screen */}
              <div className="relative h-full py-8 shrink-0 w-12 flex flex-col items-center">
                {/* Background Track Line (connecting center of node 01 to node 04) */}
                <div className="absolute top-[52px] bottom-[52px] left-1/2 -translate-x-1/2 w-[3px] bg-white/10 rounded-full pointer-events-none" />

                {/* Smooth Animated Progress Fill Line */}
                <div
                  style={{
                    height: `calc(${scrollProgress} * (100% - 104px))`,
                  }}
                  className="absolute top-[52px] left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#9D4EDD] via-[#E0218A] to-[#FF7700] rounded-full pointer-events-none transition-[height] duration-75 ease-out shadow-[0_0_12px_rgba(224,33,138,0.7)]"
                />

                {/* 4 Step Nodes evenly distributed along the track */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between items-center pointer-events-none">
                  {steps.map((step, idx) => {
                    const stepProgress = idx / (steps.length - 1);
                    const isPassed = scrollProgress >= stepProgress - 0.05;
                    const isActive = activeStep === idx;

                    return (
                      <button
                        key={step.number}
                        onClick={() => scrollToStep(idx)}
                        className="pointer-events-auto relative group flex items-center justify-center w-10 h-10 rounded-full focus:outline-none cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label={`Jump to step ${step.number}`}
                      >
                        {/* Circular node background & border */}
                        <span
                          style={{
                            borderColor: isActive
                              ? step.accentColor
                              : isPassed
                              ? `${step.accentColor}90`
                              : "rgba(255, 255, 255, 0.15)",
                            boxShadow: isActive
                              ? `0 0 20px ${step.accentColor}80, inset 0 0 8px ${step.accentColor}30`
                              : isPassed
                              ? `0 0 10px ${step.accentColor}40`
                              : "none",
                            backgroundColor: isActive
                              ? "#16182e"
                              : isPassed
                              ? "#121324"
                              : "#0D0E1A",
                          }}
                          className="absolute inset-0 rounded-full border-2 transition-all duration-300"
                        />

                        {/* Subtle Active Pulsing Ring */}
                        {isActive && (
                          <span
                            style={{ borderColor: step.accentColor }}
                            className="absolute -inset-1 rounded-full border border-dashed opacity-60 animate-pulse pointer-events-none"
                          />
                        )}

                        {/* Step Number */}
                        <span
                          style={{
                            color: isActive
                              ? "#FFFFFF"
                              : isPassed
                              ? step.accentColor
                              : "rgba(255, 255, 255, 0.4)",
                          }}
                          className="relative z-10 text-xs font-mono font-black transition-colors duration-300"
                        >
                          {step.number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sticky Step Content with Cross-Fade Transitions */}
              <div className="flex-1 flex flex-col justify-center min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <span
                      style={{ color: steps[activeStep].accentColor }}
                      className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase block"
                    >
                      Step {steps[activeStep].number}
                    </span>

                    <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
                      {steps[activeStep].title}
                    </h2>

                    <p className="mt-4 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed font-normal max-w-md">
                      {steps[activeStep].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column (Scrolling 3:4 Vertical Images, 6-col Share) */}
          <div className="lg:col-span-6 pb-[15vh] flex flex-col items-center">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="min-h-[85vh] w-full flex items-center justify-center scroll-mt-[10vh]"
                >
                  <div
                    style={{
                      borderColor: isActive
                        ? `${step.accentColor}80`
                        : "rgba(255,255,255,0.08)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    }}
                    className={`relative aspect-[3/4] w-full max-w-[360px] xl:max-w-[420px] rounded-2xl overflow-hidden border bg-[#121324] transition-all duration-500 ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-40 scale-[0.95] hover:opacity-70"
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE STACKED LAYOUT (Below lg) */}
        <div className="block lg:hidden border-t border-white/10 divide-y divide-white/10">
          {steps.map((step) => (
            <div key={step.number} className="py-12 space-y-6">
              {/* Text */}
              <div>
                <span
                  style={{ color: step.accentColor }}
                  className="text-xs font-mono font-bold tracking-widest uppercase block mb-2"
                >
                  {step.number}
                </span>
                <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
                  {step.title}
                </h2>
                <p className="mt-3 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* 3:4 Vertical Image */}
              <div className="flex justify-center">
                <div
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  }}
                  className="relative aspect-[3/4] w-full max-w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#121324]"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
