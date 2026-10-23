"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileCheck2,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Fingerprint,
  Scale,
  Sparkles,
} from "lucide-react";

export default function SafetyPage() {
  const safetyPillars = [
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: "18+ Biometric Age Verification",
      description:
        "Adult content categories require mandatory government-issued ID and live biometric facial analysis. Strict zero-bypass gatekeeping ensures minors cannot access age-restricted spaces.",
      badge: "Strictly Enforced",
      accent: "#FFB703",
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#9D4EDD]" />,
      title: "Creator DRM & Watermarking",
      description:
        "Every video, audio stem, and high-res image is dynamically embedded with invisible cryptographic watermarks to prevent piracy, scraping, and unauthorized reposting.",
      badge: "Anti-Theft DRM",
      accent: "#9D4EDD",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />,
      title: "Bank-Grade Direct Payouts",
      description:
        "PCI-DSS compliant infrastructure with automated anti-chargeback protection and instant crypto/fiat clearing. You keep your hard-earned revenue without arbitrary platform holds.",
      badge: "Direct Settlement",
      accent: "#00F0FF",
    },
    {
      icon: <EyeOff className="w-6 h-6 text-[#E0218A]" />,
      title: "Privacy & Anti-Doxxing Safeguards",
      description:
        "Creators can operate under complete pseudonyms with zero exposure of personal legal names or tax addresses to fans or malicious third parties.",
      badge: "Full Pseudonymity",
      accent: "#E0218A",
    },
  ];

  const verificationSteps = [
    {
      step: "01",
      title: "Government-Issued ID Check",
      desc: "Fast optical validation of passports, driving licenses, and national ID cards across 190+ countries.",
    },
    {
      step: "02",
      title: "3D Liveness & Anti-Spoofing",
      desc: "Active facial depth scan detects deepfakes, masks, and static photo spoofs in under 5 seconds.",
    },
    {
      step: "03",
      title: "Zero-Knowledge Storage",
      desc: "Raw identity documents are never saved on unencrypted drives. Only cryptographic verification tokens persist.",
    },
    {
      step: "04",
      title: "Verified Creator Shield",
      desc: "Instant tier badge issuance enabling full access to age-gated publishing and premium subscription paywalls.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#0D0E1A] text-white selection:bg-[#9D4EDD] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Safety Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-[#9D4EDD]/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[#00F0FF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-semibold text-emerald-300 mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety & Trust Architecture
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-black text-white tracking-tight leading-[1.1]">
              Security Built Into{" "}
              <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
                Every Layer
              </span>
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto">
              A sustainable creator economy requires ironclad trust. We combine
              biometric age verification, digital rights protection, and
              transparent content policies.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16182e] border border-[#282a4d]">
                <Fingerprint className="w-3.5 h-3.5 text-[#00F0FF]" /> Biometric Verification
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16182e] border border-[#282a4d]">
                <Zap className="w-3.5 h-3.5 text-[#FF7700]" /> Invisible DRM Watermarks
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16182e] border border-[#282a4d]">
                <Scale className="w-3.5 h-3.5 text-[#9D4EDD]" /> 100% Creator Ownership
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Security Pillars */}
      <section className="py-16 md:py-24 border-t border-white/10 relative bg-[#0D0E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-white tracking-tight">
              The Four Pillars of Creator Protection
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              Engineered from day one to protect your intellectual property, identity, and earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyPillars.map((pillar, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#16182e] border border-[#282a4d] p-7 sm:p-9 flex flex-col justify-between hover:border-[#9D4EDD]/60 hover:shadow-xl hover:shadow-[#9D4EDD]/15 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-xl bg-[#121324] border border-[#282a4d] flex items-center justify-center p-3 group-hover:scale-105 transition-transform">
                      {pillar.icon}
                    </div>
                    <span
                      style={{ color: pillar.accent }}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#121324] border border-[#282a4d]"
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight pt-1">
                    {pillar.title}
                  </h3>

                  <p className="text-[15px] text-gray-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#282a4d]/60 flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Audited compliance & KYC protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Verification Workflow */}
      <section className="py-16 md:py-24 border-t border-white/10 relative bg-[#0B0C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF]">
              Zero-Bypass Protocol
            </span>
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-black text-white tracking-tight mt-2">
              How Identity Verification Works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              Completed in under 60 seconds with military-grade encryption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#121324] border border-[#282a4d] space-y-3"
              >
                <span className="text-sm font-mono font-bold text-[#9D4EDD] block">
                  Step {step.step}
                </span>
                <h4 className="text-lg font-bold text-white">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-[#0D0E1A] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16182e] border border-[#282a4d] text-xs font-semibold text-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-[#E0218A]" />
            Your Creativity, Fully Shielded
          </div>

          <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-black text-white tracking-tight leading-[1.12]">
            Ready to Create With{" "}
            <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
              Complete Peace of Mind?
            </span>
          </h2>

          <p className="text-[16px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            Join the waitlist today and lock in your custom handle with 0% platform fees for your first 3 months.
          </p>

          <div className="pt-4">
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] text-white font-bold text-base shadow-xl shadow-[#9D4EDD]/30 hover:scale-105 transition-all duration-300"
            >
              <span>Claim your creator handle</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Global Footer */}
      <Footer />
    </main>
  );
}
