"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Stories", href: "#stories" },
  { name: "Films", href: "#films" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.8, ease: "power4.inOut" }
      );
      
      gsap.fromTo(
        ".menu-link",
        { y: 60, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.05, delay: 0.3, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ".menu-media",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, delay: 0.2, ease: "power2.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        }
      });
    }
  }, [isOpen]);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const isHeroVisible = isHome && !scrolled;

  return (
    <>
      {/* Sticky Top Glassmorphic Header */}
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-center",
          isHeroVisible ? "opacity-0 -translate-y-full pointer-events-none pt-0" : "opacity-100 translate-y-0 pt-4 md:pt-6"
        )}
      >
        <div 
          className={clsx(
            "flex items-center justify-between transition-all duration-500",
            scrolled 
              ? "w-[95%] md:w-[80%] lg:w-[60%] bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "w-full p-6 md:p-10 bg-transparent border-transparent rounded-none"
          )}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="text-xs uppercase tracking-widest hover:text-soft-grey transition-colors flex items-center gap-2 font-sans w-24"
          >
            <Menu size={16} /> <span className={clsx("transition-opacity", scrolled ? "hidden md:inline" : "inline")}>Menu</span>
          </button>

          <a href="#home" className="text-xl md:text-2xl font-serif tracking-wide text-center hover:scale-105 transition-transform flex-grow mx-4">
            Veer Photofactory
          </a>

          <div className="w-24 text-right">
            <a
              href="#contact"
              className={clsx("text-xs uppercase tracking-widest hover:text-soft-grey transition-colors font-sans", scrolled ? "hidden md:inline" : "inline")}
            >
              Enquire
            </a>
          </div>
        </div>
      </header>

      {/* Full Screen Cinematic Menu Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black text-white hidden flex-col overflow-hidden"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/02%20Reel.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="menu-media w-full h-full object-cover hidden md:block"
          />
          <img
            src="/images/DSC01369.jpg"
            className="menu-media w-full h-full object-cover md:hidden"
            alt="Menu background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-10 md:px-32">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 left-10 md:top-12 md:left-12 text-white hover:text-soft-grey transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-widest group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Close
          </button>

          <ul className="flex flex-col gap-4 md:gap-6 mt-12 md:mt-0" style={{ perspective: "1000px" }}>
            {navLinks.map((link, index) => (
              <li key={link.name} className="overflow-hidden group/item">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="menu-link flex items-baseline gap-4 md:gap-8 text-4xl md:text-5xl lg:text-6xl font-serif text-white/80 hover:text-white transition-all duration-500 origin-left hover:translate-x-6"
                >
                  <span className="text-sm md:text-lg font-sans font-light tracking-widest opacity-40 group-hover/item:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                  <span className="group-hover/item:italic">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="absolute bottom-10 left-10 md:left-32 flex items-center gap-12 text-xs font-sans text-white/40 tracking-widest uppercase">
            <span>Stories Worth Remembering</span>
            <div className="hidden md:block w-12 h-[1px] bg-white/20" />
            <span className="hidden md:inline">Est. 2024</span>
          </div>
        </div>
      </div>
    </>
  );
}
