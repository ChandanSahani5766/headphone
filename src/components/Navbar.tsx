"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  const links = [
    { name: "Acoustics", href: "#acoustics" },
    { name: "Engineering", href: "#engineering" },
    { name: "Design", href: "#design" },
    { name: "Specs", href: "#specs" },
  ];

  // Intersection Observer Scroll-Spy to dynamically slide the active pill
  useEffect(() => {
    const sectionIds = ["acoustics", "engineering", "design", "specs"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // Trigger when section occupies the active view space
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe each section
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Reset indicator if user scrolls back to the very top (Hero section) or hits bottom
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveSection("");
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("specs");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center justify-between w-full max-w-4xl h-14 px-6 bg-black/45 border border-white/10 backdrop-blur-xl rounded-full shadow-2xl shadow-black/80 pointer-events-auto">
        
        {/* Brand Logo Link - Scrolls to Top */}
        <Link 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-xs font-black tracking-[0.25em] uppercase text-white hover:opacity-85 transition-opacity flex items-center gap-1.5"
        >
          <span>ZENITH</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-pulse" />
          <span className="text-white/40 font-light">X</span>
        </Link>

        {/* Dynamic scroll-spy sliding-pill navigation */}
        <div className="hidden md:flex items-center gap-2 relative">
          {links.map((link) => {
            const targetId = link.href.slice(1);
            const isActive = activeSection === targetId;
            
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(targetId)}
                className={`relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Floating Call to Action */}
        <div className="flex items-center gap-3">
          <a
            href="#preorder"
            className="px-4 py-2 bg-white hover:bg-white/90 text-black text-[9px] font-black uppercase tracking-wider rounded-full shadow-md shadow-white/5 transition-all duration-300 flex items-center gap-1 group active:scale-95 cursor-pointer"
          >
            <span>Pre-order</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </nav>
    </div>
  );
}
