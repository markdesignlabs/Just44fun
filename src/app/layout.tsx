import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Shantell_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shantellSans = Shantell_Sans({
  variable: "--font-shantell-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0E1A",
};

export const metadata: Metadata = {
  title: "Just44FunX — One Platform For Every Creator",
  description:
    "Create, share, connect with fans, and turn your passion into opportunities. Built for artists, musicians, gamers, educators, influencers, and verified adult creators.",
  keywords: [
    "Just44FunX",
    "creator platform",
    "fan monetization",
    "creators",
    "livestreaming",
    "digital art",
    "music stems",
    "subscriptions",
  ],
  authors: [{ name: "Just44FunX Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shantellSans.variable} scroll-smooth bg-[#0D0E1A] text-white antialiased`}
    >
      <body className="min-h-screen bg-[#0D0E1A] text-gray-100 flex flex-col font-sans selection:bg-[#9D4EDD] selection:text-white">
        {children}
      </body>
    </html>
  );
}
