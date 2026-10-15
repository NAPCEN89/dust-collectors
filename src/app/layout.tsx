import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Industrial Dust Collector Manufacturers in India | NAPCEN",
  description: "NAPCEN designs, manufactures and supplies industrial dust collectors, pulse jet baghouses, cartridge collectors, cyclones and extraction systems in India.",
  keywords: [
    "Industrial Dust Collector Manufacturers in India",
    "Cartridge Dust Collector",
    "Pulse Jet Baghouse",
    "Cyclone Dust Collector",
    "Dust Extraction System",
    "NAPCEN"
  ],
  icons: {
    icon: '/Napcen-logo.webp',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
