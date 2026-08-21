"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
          "fixed top-0 left-0 w-full z-40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center",
          isHeroVisible
            ? "max-md:translate-y-0 max-md:pt-4 md:-translate-y-full pt-0"
            : "translate-y-0 pt-4 md:pt-6"
        )}
      >
        <div
          className={clsx(
            "relative flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "w-[92%] md:w-[75%] lg:w-[55%] max-w-3xl bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 shadow-2xl"
              : "w-full px-6 py-8 md:px-12 md:py-10 bg-transparent border-transparent rounded-none"
          )}
        >
          {/* Left: Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={clsx(
              "group flex items-center justify-center rounded-full transition-all duration-300",
              scrolled
                ? "gap-3 bg-white/5 hover:bg-white/10 border border-white/5 px-4 md:px-5 py-3 md:py-2.5"
                : "gap-3 hover:opacity-70"
            )}
          >
            <div className="flex flex-col gap-[4px] w-[18px] justify-center items-center">
              <span className="w-full h-[1px] bg-white group-hover:w-2 transition-all duration-300"></span>
              <span className="w-full h-[1px] bg-white transition-all duration-300"></span>
            </div>
            <span className={clsx("text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-sans font-medium", scrolled ? "hidden sm:block" : "block")}>
              Menu
            </span>
          </button>

          {/* Center: Logo */}
          <a
            href="#home"
            className={clsx(
              "absolute left-1/2 -translate-x-1/2 font-serif tracking-widest text-center hover:opacity-70 transition-all duration-500",
              scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
            )}
          >
            VEER PHOTOFACTORY
          </a>

          {/* Right: Enquire Button */}
          <a
            href="#contact"
            className={clsx(
              "uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 text-center",
              scrolled
                ? "text-[10px] md:text-[11px] bg-ivory text-black hover:bg-white px-5 md:px-7 py-3 md:py-2.5 rounded-full shadow-[0_0_15px_rgba(255,255,240,0.1)] hover:shadow-[0_0_25px_rgba(255,255,240,0.3)] hover:scale-105"
                : "text-[10px] md:text-[12px] hover:text-soft-grey"
            )}
          >
            Enquire
          </a>
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
          <Image
            src="/images/_PR09941.webp"
            fill
            sizes="100vw"
            className="menu-media object-cover hidden md:block"
            alt="Menu background video replacement"
          />
          <Image
            src="/images/DSC01369.webp"
            fill
            sizes="100vw"
            className="menu-media object-cover md:hidden"
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
