import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenith X - Next-Generation Acoustic Weightlessness",
  description: "Experience the architectural explosion of pure sound. 40mm titanium drivers, micro-calibrated acoustics, and lossless high-resolution audio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#1c1a1d]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
