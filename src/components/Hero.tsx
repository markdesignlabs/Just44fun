"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
  X,
  Loader2,
  Lock,
  Check,
  AtSign,
} from "lucide-react";

interface HeroProps {
  onHandleSubmit?: (handleOrEmail: string) => void;
}

export default function Hero({ onHandleSubmit }: HeroProps) {
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecuring, setIsSecuring] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Close modal and reset state if needed
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSecuring(false);
    setErrorMessage("");
  };

  // Close on Escape key & lock background scroll while modal is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Step 1: User submits the Hero input slug
  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = handle.trim().replace(/^@/, "").replace(/\s+/g, "");
    if (!clean) return;
    setHandle(clean);
    setIsSecured(false);
    setErrorMessage("");
    setIsModalOpen(true);
  };

  // Step 2: User submits the email in the Modal
  const handleSecureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSecuring(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to secure handle. Please try again.");
        setIsSecuring(false);
        return;
      }

      setIsSecuring(false);
      setIsSecured(true);
      if (onHandleSubmit) {
        onHandleSubmit(handle);
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsSecuring(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 cyber-grid">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] md:w-[1100px] md:h-[550px] bg-gradient-to-tr from-[#9D4EDD]/25 via-[#E0218A]/20 to-[#FF7700]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Floating Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16182e] border border-[#282a4d] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0218A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9D4EDD]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-gray-300">
                Launching Soon
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#9D4EDD]/20 text-purple-300 border border-[#9D4EDD]/30">
                Beta Access
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[38px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-black tracking-tight text-white leading-[1.08] max-w-4xl uppercase">
              POST 2{" "}
              <span
                className="font-shantell font-extrabold bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent uppercase"
                style={{ fontFamily: 'var(--font-shantell-sans), "Shantell Sans", cursive, sans-serif' }}
              >
                EARN
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-[15px] sm:text-[16px] text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Create, share, connect with fans, and turn your passion into
              sustainable opportunities. Built with high-speed streaming, direct
              fan memberships, and zero algorithm manipulation.
            </p>

            {/* Step 1: URL Slug Hero Form */}
            <div
              className="w-full max-w-xl mx-auto !mt-[40px]"
              style={{ marginTop: "40px" }}
            >
              <form
                onSubmit={handleClaim}
                className="p-2 sm:p-2.5 rounded-2xl bg-[#16182e]/95 border border-white/20 shadow-none focus-within:border-[#9D4EDD] focus-within:shadow-[0_0_35px_rgba(157,78,221,0.45)] transition-all flex flex-col sm:flex-row gap-2.5"
              >
                <div className="flex-1 flex items-center px-4 sm:px-5 py-2.5 sm:py-3 gap-3 overflow-hidden">
                  <AtSign className="w-5 sm:w-6 h-5 sm:h-6 text-white shrink-0 select-none" />
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/^@/, "").replace(/\s+/g, "");
                      setHandle(clean);
                    }}
                    placeholder="yourhandle"
                    aria-label="Desired Creator Handle"
                    required
                    className="w-full bg-transparent text-white placeholder-gray-500 text-base sm:text-lg focus:outline-none font-medium py-1"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer group flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 rounded-xl bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-[#9D4EDD]/30 hover:shadow-[#9D4EDD]/60 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  <span>Reserve Handle</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              {/* Sub-text micro metrics */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Free VIP reserve
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9D4EDD]" />
                  2,300+ creators waitlisted
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: "Claim Your Handle" Modal Flow */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#121324] border border-[#282a4d] shadow-[0_0_60px_rgba(157,78,221,0.25)] p-6 sm:p-8 overflow-hidden z-10"
            >
              {/* Subtle ambient lighting inside modal */}
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#9D4EDD]/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-[#E0218A]/20 blur-3xl rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSecured ? (
                /* Step 2A: Email Input Form */
                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16182e] border border-[#282a4d] text-[11px] font-semibold text-purple-300 mb-3">
                      <Sparkles className="w-3 h-3 text-[#E0218A]" />
                      Priority VIP Reservation
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                      Lock in{" "}
                      <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
                        @{handle || "yourhandle"}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed font-normal">
                      Enter your email to secure this creator handle and lock in 0%
                      platform fees for your first 3 months.
                    </p>
                  </div>

                  {/* URL Slug Preview Box */}
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0D0E1A] border border-[#282a4d]/80 text-xs font-mono">
                    <span className="text-gray-400 truncate flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#9D4EDD] shrink-0" />
                      just44funx.com/@
                      <span className="text-white font-bold">{handle}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30 shrink-0 ml-2">
                      AVAILABLE
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSecureSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
                        <span className="font-semibold">{errorMessage}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Your Email Address
                      </label>
                      <div className="flex items-center px-4 py-3 rounded-xl bg-[#0D0E1A] border border-[#282a4d] focus-within:border-[#9D4EDD] focus-within:ring-2 focus-within:ring-[#9D4EDD]/30 transition-all gap-3">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.com"
                          required
                          autoFocus
                          className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSecuring}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#9D4EDD]/30 hover:shadow-[#9D4EDD]/50 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSecuring ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Securing @{handle}...</span>
                        </>
                      ) : (
                        <>
                          <span>Secure My Handle</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No spam. Instant confirmation link sent.</span>
                  </div>
                </div>
              ) : (
                /* Step 2B: Success State */
                <div className="text-center py-4 space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-purple-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Handle Reserved!
                    </h3>
                    <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                      We have secured{" "}
                      <span className="text-[#9D4EDD] font-mono font-bold">
                        @{handle}
                      </span>{" "}
                      for you and sent a priority VIP confirmation to{" "}
                      <span className="text-white font-medium">{email}</span>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D0E1A] border border-[#282a4d] text-xs font-mono text-gray-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>just44funx.com/@{handle}</span>
                    <span className="text-emerald-400 font-bold ml-1">LOCKED IN</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={closeModal}
                      className="cursor-pointer w-full py-3.5 px-6 rounded-xl bg-[#16182e] hover:bg-[#1a1d38] border border-[#282a4d] text-white font-semibold text-sm transition-all shadow-md"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
