"use client";

import React from "react";
import {
  Palette,
  Headphones,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Lock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  momentum: string;
  accentColor: string;
  iconBg: string;
  hoverBorder: string;
  hoverShadow: string;
  badge?: {
    text: string;
    isRestricted?: boolean;
  };
}

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  const categories: Category[] = [
    {
      id: "artists",
      title: "Artists",
      description:
        "Digital illustrators, 3D modellers, concept artists, animators, and bespoke commission artists.",
      icon: <Palette className="w-6 h-6 text-white" />,
      iconBg: "bg-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.45)]",
      hoverBorder: "hover:border-[#9D4EDD]",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(157,78,221,0.25)]",
      tags: ["Digital Art", "3D Renders", "Commissions", "Asset Packs"],
      momentum: "480+ waitlisted",
      accentColor: "from-[#9D4EDD]/20 via-[#9D4EDD]/5 to-transparent",
    },
    {
      id: "musicians",
      title: "Musicians",
      description:
        "Producers, beatmakers, vocalists, synth wizards, and live acoustic session performers.",
      icon: <Headphones className="w-6 h-6 text-white" />,
      iconBg: "bg-[#E0218A] shadow-[0_0_15px_rgba(224,33,138,0.45)]",
      hoverBorder: "hover:border-[#E0218A]",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(224,33,138,0.25)]",
      tags: ["Beat Packs", "Stem Drops", "Live Jam", "Vocal Presets"],
      momentum: "590+ waitlisted",
      accentColor: "from-[#E0218A]/20 via-[#E0218A]/5 to-transparent",
    },
    {
      id: "gamers",
      title: "Gamers",
      description:
        "Esports competitors, speedrunners, variety streamers, and tactical walkthrough creators.",
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      iconBg: "bg-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.45)]",
      hoverBorder: "hover:border-[#00F0FF]",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]",
      tags: ["Clips & VODs", "Custom Lobbies", "Tournaments", "Guides"],
      momentum: "840+ waitlisted",
      accentColor: "from-[#00F0FF]/20 via-[#00F0FF]/5 to-transparent",
    },
    {
      id: "educators",
      title: "Educators",
      description:
        "Coding mentors, creative coaches, video editing instructors, and deep-dive technical analysts.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      iconBg: "bg-[#FF7700] shadow-[0_0_15px_rgba(255,119,0,0.45)]",
      hoverBorder: "hover:border-[#FF7700]",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(255,119,0,0.25)]",
      tags: ["Masterclasses", "Source Code", "1-on-1 Mentoring", "E-Books"],
      momentum: "320+ waitlisted",
      accentColor: "from-[#FF7700]/20 via-[#FF7700]/5 to-transparent",
    },
    {
      id: "influencers",
      title: "Influencers",
      description:
        "Lifestyle curators, cultural tastemakers, behind-the-scenes vlogging icons, and podcast hosts.",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      iconBg: "bg-[#F72585] shadow-[0_0_15px_rgba(247,37,133,0.45)]",
      hoverBorder: "hover:border-[#F72585]",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(247,37,133,0.25)]",
      tags: ["Exclusive Q&A", "VIP Lounge", "Fan Hangouts", "Drops"],
      momentum: "710+ waitlisted",
      accentColor: "from-[#F72585]/20 via-[#F72585]/5 to-transparent",
    },
    {
      id: "adult-creators",
      title: "Adult Creators",
      description:
        "Independent 18+ performers with bank-grade biometric age verification and end-to-end DMCA protection.",
      icon: <Lock className="w-6 h-6 text-white" />,
      iconBg: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.45)]",
      hoverBorder: "hover:border-amber-400",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
      tags: ["18+ Age-Verified", "Biometric ID", "DRM Watermark", "Safe Pay"],
      momentum: "950+ waitlisted",
      accentColor: "from-amber-500/20 via-red-500/5 to-transparent",
      badge: {
        text: "18+ LOCKED · AGE VERIFIED ONLY",
        isRestricted: true,
      },
    },
  ];

  const handleCardClick = (title: string) => {
    if (onSelectCategory) {
      onSelectCategory(title);
    }
    const waitlistEl = document.getElementById("waitlist");
    if (waitlistEl) {
      waitlistEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-20 md:py-28 relative bg-[#0A0B14] border-y border-[#282a4d]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Left Aligned */}
        <div className="text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16182e] border border-[#282a4d] text-xs font-semibold text-purple-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#9D4EDD]" />
            Universal Creative Freedom
          </div>
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
            SOMETHING FOR{" "}
            <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
              EVERY INTEREST
            </span>
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed">
            Whether you stream, paint, compose, educate, or perform, Just44FunX
            provides tailored tools, private fan channels, and transparent
            monetization.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.title)}
              className={`group relative rounded-2xl bg-[#16182e] border ${
                cat.badge?.isRestricted
                  ? `border-amber-500/40 ${cat.hoverBorder}`
                  : `border-[#282a4d] ${cat.hoverBorder}`
              } p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.hoverShadow} cursor-pointer overflow-hidden`}
            >
              {/* Dynamic subtle ambient gradient inside card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.accentColor} opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 space-y-4">
                {/* Top Row: Icon & Optional 18+ Badge */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {cat.icon}
                  </div>

                  {cat.badge?.isRestricted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/60 text-red-300 text-[11px] font-bold tracking-wide shadow-[0_0_12px_rgba(239,68,68,0.35)] animate-pulse">
                      <Lock className="w-3.5 h-3.5 text-white" />
                      <span>{cat.badge.text}</span>
                    </div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="p-1.5 rounded-lg bg-[#121324] text-gray-400 hover:text-white flex items-center">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors flex items-center gap-2">
                    {cat.title}
                    {cat.badge?.isRestricted && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        18+
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Category feature tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#121324] text-gray-300 border border-[#282a4d]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Waitlist Momentum indicator */}
              <div className="relative z-10 pt-5 mt-4 border-t border-[#282a4d]/60 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-purple-300 bg-[#9D4EDD]/15 px-3 py-1 rounded-full border border-[#9D4EDD]/30 group-hover:bg-[#9D4EDD]/25 transition-colors">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E0218A]" />
                  <span>{cat.momentum}</span>
                </span>
                <span className="text-gray-400 font-medium group-hover:text-white group-hover:translate-x-1 transition-all flex items-center gap-1">
                  Join category waitlist →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
