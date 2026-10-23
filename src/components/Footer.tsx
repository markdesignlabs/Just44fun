"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#0A0B14] border-t border-[#282a4d]/80 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle neutral top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#282a4d]/60">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
              aria-label="Just44FunX Home"
            >
              <img
                src="/images/logo.png"
                alt="Just44FunX"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The next-generation creator ecosystem combining frictionless
              content sharing, super-fan communities, and direct monetization.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span>Platform Status: Beta Onboarding Phase</span>
            </div>
          </div>

          {/* Group 1: Platform Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-200 font-bold">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollTo("creators")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creators
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("waitlist")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Early access
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("categories")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Creator Categories
                </button>
              </li>
              <li>
                <a
                  href="https://app.notion.com/p/Just44FunX-Whitepaper-40121257fc83805ebd59e771ceeb46cc?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors cursor-pointer text-left inline-flex items-center gap-1.5"
                >
                  <span>Whitepaper</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Group 2: Trust Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-200 font-bold">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link
                  href="/safety"
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  <span>Safety & content policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>18+ content: age-verified only</span>
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500 block pt-1">
                  Biometric ID Verification · Anti-Piracy DRM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© 2026 Just44FunX. All rights reserved.</div>
          <div className="flex items-center gap-6 text-gray-400">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>DMCA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
