"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> fade-up (hide)
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> fade-down (show)
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0D0E1A]/85 border-b border-[#282a4d]/70 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] rounded-lg p-1"
          aria-label="Just44FunX Home"
        >
          <img
            src="/images/logo.png"
            alt="Just44FunX"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-300">
          <button
            onClick={() => handleNavClick("creators")}
            className="hover:text-white transition-colors duration-200 cursor-pointer py-1 hover:border-b-2 hover:border-[#9D4EDD]"
          >
            Creators
          </button>
          <button
            onClick={() => handleNavClick("categories")}
            className="hover:text-white transition-colors duration-200 cursor-pointer py-1 hover:border-b-2 hover:border-[#9D4EDD]"
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="hover:text-white transition-colors duration-200 cursor-pointer py-1 hover:border-b-2 hover:border-[#9D4EDD]"
          >
            How it works
          </button>
          <Link
            href="/safety"
            className="hover:text-white transition-colors duration-200 cursor-pointer py-1 hover:border-b-2 hover:border-[#9D4EDD]"
          >
            Safety
          </Link>
          <a
            href="https://app.notion.com/p/Just44FunX-Whitepaper-40121257fc83805ebd59e771ceeb46cc?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 hover:text-white transition-colors duration-200 cursor-pointer py-1 hover:border-b-2 hover:border-[#9D4EDD]"
          >
            <span>Whitepaper</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick("waitlist")}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:ring-offset-2 focus:ring-offset-[#0D0E1A]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-80 blur-[2px]" />
            <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-[11px] bg-[#121324] text-white font-semibold transition-all duration-300 group-hover:bg-[#16182e] group-hover:shadow-[0_0_20px_rgba(157,78,221,0.5)]">
              <span>Get early access</span>
              <ArrowRight className="w-4 h-4 text-[#E0218A] transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-300 hover:text-white bg-[#16182e] border border-[#282a4d] focus:outline-none focus:ring-2 focus:ring-[#9D4EDD]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#E0218A]" />
            ) : (
              <Menu className="w-6 h-6 text-[#9D4EDD]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#282a4d] bg-[#0D0E1A]/95 backdrop-blur-2xl px-6 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-gray-300 text-base">
            <button
              onClick={() => handleNavClick("creators")}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16182e] hover:text-[#9D4EDD] transition-colors"
            >
              Creators
            </button>
            <button
              onClick={() => handleNavClick("categories")}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16182e] hover:text-[#9D4EDD] transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16182e] hover:text-[#9D4EDD] transition-colors"
            >
              How it works
            </button>
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#16182e] hover:text-[#9D4EDD] transition-colors"
            >
              Safety
            </Link>
            <a
              href="https://app.notion.com/p/Just44FunX-Whitepaper-40121257fc83805ebd59e771ceeb46cc?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#16182e] hover:text-[#9D4EDD] transition-colors"
            >
              <span>Whitepaper</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick("waitlist")}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#9D4EDD] via-[#E0218A] to-[#FF7700] text-white font-semibold text-sm shadow-lg shadow-[#9D4EDD]/30"
            >
              <span>Get early access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
