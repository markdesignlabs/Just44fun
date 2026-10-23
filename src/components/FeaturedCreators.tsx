"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  CheckCircle2,
  Heart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

interface Creator {
  id: string;
  name: string;
  handle: string;
  category: string;
  avatarBg: string;
  initials: string;
  caption: string;
  hashtags: string[];
  likes: string;
  comments: string;
  shares: string;
  posterUrl: string;
  videoUrl?: string;
}

const BASE_CREATORS: Creator[] = [
  {
    id: "zeevibes",
    name: "ZeeVibes",
    handle: "@zeevibes",
    category: "Musician & Producer",
    avatarBg: "from-[#9D4EDD] via-[#E0218A] to-[#FF7700]",
    initials: "ZV",
    caption: "Analog synthwave live from Shibuya 🎹⚡ Stem pack in bio.",
    hashtags: ["#Synthwave", "#Just44Fun"],
    likes: "24.8K",
    comments: "1,420",
    shares: "890",
    posterUrl: "/images/MTV1.gif",
  },
  {
    id: "ringair",
    name: "Ring Air",
    handle: "@ring_air",
    category: "Cinematic Drone & Flow",
    avatarBg: "from-cyan-500 via-blue-600 to-indigo-700",
    initials: "RA",
    caption: "Golden hour FPV dive in Tokyo skyline 🛸💨 4K raw footage.",
    hashtags: ["#FPV", "#Cinematic"],
    likes: "41.2K",
    comments: "2,830",
    shares: "3,110",
    posterUrl: "/images/MTV2.gif",
  },
  {
    id: "kingrex",
    name: "KingRex",
    handle: "@kingrex",
    category: "Esports & FPS Streamer",
    avatarBg: "from-[#00F0FF] via-indigo-600 to-purple-800",
    initials: "KR",
    caption: "1v5 championship clutch in overtime round 🎯🔥 Config in bio.",
    hashtags: ["#FPSPro", "#Esports"],
    likes: "58.6K",
    comments: "4,190",
    shares: "6,200",
    posterUrl: "/images/MTV3.gif",
  },
  {
    id: "inkbymira",
    name: "Ink by Mira",
    handle: "@inkbymira",
    category: "Cyberpunk Concept Artist",
    avatarBg: "from-fuchsia-600 via-pink-600 to-rose-600",
    initials: "IM",
    caption: "Neo-Shibuya digital alley in Procreate 🎨✨ 8K PSD live now.",
    hashtags: ["#ConceptArt", "#Procreate"],
    likes: "19.4K",
    comments: "980",
    shares: "1,430",
    posterUrl: "/images/MTV4.gif",
  },
  {
    id: "coachjay",
    name: "CoachJay",
    handle: "@coachjay",
    category: "Gaming Mindset & Reflexes",
    avatarBg: "from-amber-500 via-orange-600 to-red-600",
    initials: "CJ",
    caption: "3 reaction drills pro esports players run before finals ⏱️🧠",
    hashtags: ["#Mindset", "#Focus"],
    likes: "15.1K",
    comments: "760",
    shares: "890",
    posterUrl: "/images/MTV5.gif",
  },
];

const CARD_WIDTH = 330;
const CARD_HEIGHT = 620;
const CARD_GAP = 28;
const STEP = CARD_WIDTH + CARD_GAP; // 358px

// 21 repetitions (105 cards) for a deep, robust buffer preventing any boundary edge cases
const BASE_COUNT = BASE_CREATORS.length; // 5
const REPEATS = 21;
const CREATORS = Array.from({ length: REPEATS }, () => BASE_CREATORS).flat();
const START_INDEX = BASE_COUNT * 10; // 50 (middle repetition)
const MIN_INDEX = BASE_COUNT * 4; // 20
const MAX_INDEX = BASE_COUNT * 16; // 80
const AUTO_MOVE_INTERVAL = 6000; // 6 seconds auto movement

export default function FeaturedCreators() {
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Re-enable CSS transitions after silent boundary teleporting
  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  // Seamless invisible wrap when crossing repetition boundaries
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Strictly ignore bubbled transitionend events from child elements/buttons
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;

    if (currentIndex >= MAX_INDEX || currentIndex <= MIN_INDEX) {
      const offsetInCycle =
        ((currentIndex % BASE_COUNT) + BASE_COUNT) % BASE_COUNT;
      const targetIndex = START_INDEX + offsetInCycle;

      // Teleport without animation to the equivalent card in center repetition
      setIsTransitioning(false);
      setCurrentIndex(targetIndex);
    }
  };

  // Pause timer when browser tab is inactive to prevent skipped frames or offscreen drift
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Automatic movement
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_MOVE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const toggleLike = (key: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section
      id="creators"
      className="py-20 md:py-28 relative bg-[#0D0E1A] overflow-hidden cyber-grid"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#9D4EDD]/15 via-[#E0218A]/15 to-[#FF7700]/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16182e] border border-[#282a4d] text-xs font-semibold text-purple-300 mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF7700]" />
            Pre-Launch Creator Roster
          </div>
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
            MEET THE{" "}
            <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
              VIBE
            </span>
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Top tier creators across music, gaming, illustration, and coaching
            have already claimed their handle. Discover early previews before
            public doors open.
          </p>
        </div>

        {/* Carousel Viewport with Navigation Buttons & Fixed Center Gradient Frame */}
        <div className="relative w-full overflow-hidden py-6">
          {/* FIXED BRAND GRADIENT BORDER FRAME IN THE MIDDLE (4px stroke spotlight frame) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            style={{
              width: `${CARD_WIDTH + 8}px`,
              height: `${CARD_HEIGHT + 8}px`,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${CARD_WIDTH + 8} ${CARD_HEIGHT + 8}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter:
                  "drop-shadow(0 0 16px rgba(157, 78, 221, 0.6)) drop-shadow(0 0 32px rgba(224, 33, 138, 0.35))",
              }}
            >
              <defs>
                <linearGradient
                  id="centerFixedGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9D4EDD" />
                  <stop offset="50%" stopColor="#E0218A" />
                  <stop offset="100%" stopColor="#FF7700" />
                </linearGradient>
              </defs>
              <rect
                x="2"
                y="2"
                width={CARD_WIDTH + 4}
                height={CARD_HEIGHT + 4}
                rx="24"
                ry="24"
                stroke="url(#centerFixedGrad)"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>

          {/* Previous Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous creator"
            className="cursor-pointer absolute left-4 sm:left-8 md:left-12 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-[#16182e]/90 hover:bg-[#9D4EDD] border border-[#282a4d] hover:border-transparent text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next creator"
            className="cursor-pointer absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full bg-[#16182e]/90 hover:bg-[#9D4EDD] border border-[#282a4d] hover:border-transparent text-white shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Straight-line track: side-by-side with NO overlap & hardware-accelerated smooth slide */}
          <div
            className="flex items-center will-change-transform"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translate3d(calc(50% - ${currentIndex * STEP + CARD_WIDTH / 2}px), 0, 0)`,
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {CREATORS.map((creator, index) => {
              const isCenter = index === currentIndex;
              const uniqueKey = `${creator.id}-${index}`;

              return (
                <div
                  key={uniqueKey}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                  }}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    transition: isTransitioning ? "all 0.5s ease-out" : "none",
                  }}
                  className={`shrink-0 cursor-pointer select-none ${
                    isCenter
                      ? "scale-100 opacity-100 z-20"
                      : "scale-[0.92] opacity-40 hover:opacity-75 z-10"
                  }`}
                >
                  {/* Card Container (Docking flush into the center fixed gradient border when active) */}
                  <div
                    style={{ height: `${CARD_HEIGHT}px` }}
                    className="relative w-full rounded-[22px] overflow-hidden bg-[#0D0E1A] border border-[#282a4d]/70 shadow-2xl shadow-black/80"
                  >
                    {/* Background Media (Poster / Video) */}
                    <div className="absolute inset-0 bg-[#0D0E1A]">
                      {creator.videoUrl ? (
                        <video
                          src={creator.videoUrl}
                          poster={creator.posterUrl}
                          muted
                          playsInline
                          loop
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={creator.posterUrl}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Deep Dark Gradient Backdrop for crisp caption contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-50% to-transparent pointer-events-none" />
                    </div>

                    {/* Right-Side Social Actions Rail (Vertically Centered) */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(uniqueKey);
                        }}
                        aria-label="Like reel"
                        className="group flex flex-col items-center gap-1 text-white cursor-pointer"
                      >
                        <div
                          className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                            likedMap[uniqueKey]
                              ? "bg-[#E0218A] border-[#E0218A] text-white scale-110 shadow-lg shadow-[#E0218A]/40"
                              : "bg-black/50 border-white/15 hover:bg-black/80 text-white"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedMap[uniqueKey]
                                ? "fill-white text-white"
                                : "text-white"
                            }`}
                          />
                        </div>
                        <span className="text-[11px] font-bold drop-shadow">
                          {likedMap[uniqueKey] ? "Liked" : creator.likes}
                        </span>
                      </button>

                      {/* Comment Button */}
                      <div className="flex flex-col items-center gap-1 text-white">
                        <div className="p-2.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[11px] font-bold drop-shadow">
                          {creator.comments}
                        </span>
                      </div>

                      {/* Share Button with Send (Paper Plane Outline) Icon */}
                      <div className="flex flex-col items-center gap-1 text-white">
                        <div className="p-2.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md hover:bg-black/80 transition-colors">
                          <Send className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[11px] font-bold drop-shadow">
                          {creator.shares}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Creator Information Overlay (Decluttered) */}
                    <div className="absolute bottom-0 inset-x-0 p-5 pr-16 z-20 space-y-2">
                      {/* Creator Identity Row */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full bg-gradient-to-br ${creator.avatarBg} p-[2px] shadow-lg shrink-0`}
                        >
                          <div className="w-full h-full bg-[#121324] rounded-full flex items-center justify-center font-black text-sm text-white">
                            {creator.initials}
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-white text-base tracking-tight truncate">
                              {creator.name}
                            </h3>
                            <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                          </div>
                          {/* User Handle: White with 40% opacity */}
                          <div className="text-white/40 font-mono text-xs">
                            {creator.handle}
                          </div>
                        </div>
                      </div>

                      {/* Caption Text (Shorter, 12px font size) */}
                      <p className="text-[12px] text-gray-200 font-normal leading-relaxed line-clamp-2 drop-shadow">
                        {creator.caption}
                      </p>

                      {/* Hashtags (reduced opacity) */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5 opacity-50">
                        {creator.hashtags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-purple-200 hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
