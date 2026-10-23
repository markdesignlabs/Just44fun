"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileCheck2,
  AlertTriangle,
  UserCheck2,
  CheckCircle,
} from "lucide-react";

export default function SafetySection() {
  const safetyPillars = [
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: "18+ Biometric Age Verification",
      description:
        "Adult content categories require mandatory government-issued ID and live biometric facial analysis. Strict zero-bypass gatekeeping ensures minors cannot access age-restricted spaces.",
      badge: "Strictly Enforced",
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#9D4EDD]" />,
      title: "Creator DRM & Watermarking",
      description:
        "Every video, audio stem, and high-res image is dynamically embedded with invisible cryptographic watermarks to prevent piracy, scraping, and unauthorized reposting.",
      badge: "Anti-Theft DRM",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />,
      title: "Bank-Grade Direct Payouts",
      description:
        "PCI-DSS compliant infrastructure with automated anti-chargeback protection and instant crypto/fiat clearing. You keep your hard-earned revenue without arbitrary platform holds.",
      badge: "Direct Settlement",
    },
    {
      icon: <EyeOff className="w-6 h-6 text-[#E0218A]" />,
      title: "Privacy & Anti-Doxxing Safeguards",
      description:
        "Creators can operate under complete pseudonyms with zero exposure of personal legal names or tax addresses to fans or malicious third parties.",
      badge: "Full Pseudonymity",
    },
  ];

  return (
    <section id="safety" className="py-20 md:py-28 relative bg-[#0D0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-xs font-semibold text-emerald-300 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Safety & Trust Architecture
          </div>
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-black text-white tracking-tight leading-[1.12] uppercase">
            SECURITY BUILT INTO{" "}
            <span className="bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] bg-clip-text text-transparent">
              EVERY LAYER
            </span>
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-gray-400 leading-relaxed">
            A sustainable creator economy requires ironclad trust. We combine
            biometric age verification, digital rights protection, and
            transparent content policies.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyPillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#16182e] border border-[#282a4d] p-6 sm:p-8 flex flex-col justify-between hover:border-[#9D4EDD]/60 hover:shadow-lg hover:shadow-[#9D4EDD]/10 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#121324] border border-[#282a4d] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#121324] text-gray-300 border border-[#282a4d]">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#282a4d]/50 flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Audited compliance & KYC protocol</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
