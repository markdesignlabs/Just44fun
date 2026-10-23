"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

interface WaitlistSectionProps {
  initialHandle?: string;
  initialCategory?: string;
}

export default function WaitlistSection({
  initialHandle = "",
  initialCategory = "General",
}: WaitlistSectionProps) {
  // Form states
  const [email, setEmail] = useState("");
  const [platformHandle, setPlatformHandle] = useState(initialHandle);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(4824);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initial props
  useEffect(() => {
    if (initialHandle) {
      setPlatformHandle(initialHandle);
    }
  }, [initialHandle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: platformHandle,
          email,
          category: initialCategory,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to reserve handle. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (data.queuePosition) {
        setWaitlistNumber(data.queuePosition);
      } else {
        setWaitlistNumber((prev) => prev + 1);
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(
      `https://just44funx.com/invite?ref=${encodeURIComponent(
        platformHandle || "vip"
      )}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="waitlist"
      className="py-20 md:py-28 relative bg-[#0D0E1A] overflow-hidden cyber-grid"
    >
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#9D4EDD]/20 via-[#E0218A]/20 to-[#FF7700]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16182e] border border-[#282a4d] text-xs font-semibold text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#9D4EDD]" />
            Limited Early Access Cohort
          </div>
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
            BE FIRST{" "}
            <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
              THROUGH THE DOOR
            </span>
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed">
            Secure your unique creator handle, gain 0% platform fees for 90 days,
            and participate in our exclusive private beta.
          </p>
        </div>

        {/* Waitlist Box Container */}
        <div className="relative rounded-3xl bg-[#16182e]/95 border border-[#282a4d] p-6 sm:p-10 shadow-2xl backdrop-blur-xl max-w-xl mx-auto">
          {!isSubmitted ? (
            <div>
              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
                    <span className="font-semibold">{errorMessage}</span>
                  </div>
                )}

                {/* Secure Handle */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Secure Handle
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={platformHandle}
                      onChange={(e) => setPlatformHandle(e.target.value)}
                      placeholder="@yourhandle"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121324] border border-[#282a4d] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#121324] border border-[#282a4d] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD]"
                    />
                  </div>
                </div>

                {/* CTA Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full group py-4 px-6 rounded-2xl bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] text-white font-black text-base tracking-wide shadow-xl shadow-[#9D4EDD]/35 hover:shadow-[#9D4EDD]/65 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Reserving your VIP spot...
                      </span>
                    ) : (
                      <>
                        <span>Request early access</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Assurance Note */}
                <p className="text-center text-xs text-gray-400 pt-2 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No spam. Unsubscribe anytime.</span>
                </p>
              </form>
            </div>
          ) : (
            /* Interactive Success Confirmation Screen */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9D4EDD] to-emerald-400 p-[2px] mx-auto shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#121324] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  You're On The VIP Waitlist!
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  Welcome aboard, <span className="text-white font-bold">{platformHandle ? (platformHandle.startsWith("@") ? platformHandle : `@${platformHandle}`) : "Creator"}</span>. We've reserved your access pass.
                </p>
              </div>

              {/* Waitlist Position Card */}
              <div className="p-6 rounded-2xl bg-[#121324] border border-[#9D4EDD]/40 max-w-md mx-auto space-y-3">
                <div className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  Your Waitlist Queue Position
                </div>
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
                  #{waitlistNumber}
                </div>
                <div className="text-xs text-gray-400">
                  Invites sent weekly in batches of 500 creators & verified fans.
                </div>
              </div>

              {/* Referral Boost */}
              <div className="max-w-md mx-auto space-y-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Jump 50 Spots In Line With Your Unique Referral Link:
                </label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121324] border border-[#282a4d]">
                  <input
                    type="text"
                    readOnly
                    value={`https://just44funx.com/invite?ref=${encodeURIComponent(
                      platformHandle || "vip"
                    )}`}
                    className="w-full bg-transparent text-xs text-gray-300 px-2 font-mono focus:outline-none"
                  />
                  <button
                    onClick={copyReferralLink}
                    className="cursor-pointer shrink-0 px-3 py-1.5 rounded-lg bg-[#9D4EDD] hover:bg-[#8338ec] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="cursor-pointer text-xs text-gray-400 hover:text-white underline underline-offset-4"
                >
                  Submit another response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
