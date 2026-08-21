"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background reveal
      gsap.fromTo(
        ".hero-bg",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // UI elements fade
      gsap.fromTo(
        ".hero-ui",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 0.8, ease: "power2.out" }
      );
      
      // Explore circle gentle float
      gsap.to(".explore-circle", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative w-full h-[100dvh] overflow-hidden bg-black flex flex-col justify-between">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 hero-bg">
        <img
          src="/images/_XYZ1112.webp"
          className="w-full h-full object-cover opacity-80"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 w-full pt-8 md:pt-12 px-6 md:px-12 hero-ui">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-white/20">
          <h1 className="text-3xl md:text-[2.5rem] font-serif text-white tracking-wide">
            VEER PHOTOFACTORY
          </h1>
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-widest font-sans text-white/90 pb-2">
            <Link href="#about" className="hover:text-white transition-colors">ABOUT</Link>
            <Link href="/work" className="hover:text-white transition-colors">WORK</Link>
            <Link href="#philosophy" className="hover:text-white transition-colors">SERVICES</Link>
            <Link href="#contact" className="hover:text-white transition-colors">CONTACT</Link>
          </nav>
        </div>
        
        <div className="mt-12 max-w-[200px] hero-ui hidden md:block">
          <p className="text-[9px] uppercase tracking-widest font-sans leading-loose text-white/80">
            WE DOCUMENT THE QUIET,<br />
            UNEXPECTED AND<br />
            UNFORGETTABLE MOMENTS<br />
            OF YOUR WEDDING DAY.
          </p>
        </div>
      </div>

      {/* Floating Explore Badge */}
      <div className="absolute right-[15%] bottom-[30%] z-20 hidden md:flex explore-circle cursor-pointer hero-ui group">
        <Link href="/work">
          <div className="w-28 h-28 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
            <span className="text-[9px] uppercase tracking-widest font-sans">EXPLORE</span>
          </div>
        </Link>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 w-full pb-8 md:pb-12 px-6 md:px-12 flex justify-between items-end hero-ui">
        
        {/* Bottom Left */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-sans text-white/90">
            <div className="w-8 h-[1px] bg-white/40" />
            WEDDING PHOTOGRAPHY + FILMS
          </div>
          <Link href="#contact" className="text-[10px] uppercase tracking-widest font-sans text-white border border-white/30 px-8 py-3 w-fit hover:bg-white hover:text-black transition-colors">
            INQUIRE
          </Link>
        </div>

        {/* Bottom Center - SCROLL */}
        <div className="hidden md:flex flex-col items-center gap-4 absolute left-1/2 bottom-12 -translate-x-1/2">
          <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-white/60">SCROLL</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden" />
        </div>

        {/* Bottom Right */}
        <div className="hidden md:flex flex-col items-end gap-2 text-right w-1/3">
          <p className="text-[9px] uppercase tracking-widest font-sans text-white/90 leading-relaxed">
            VEER PHOTOFACTORY <br />
            WEDDINGS <br />
            PORTRAITS <br />
            FILMS
          </p>
          <div className="h-[1px] w-48 bg-white/20 my-2" />
          <p className="text-[9px] uppercase tracking-widest font-sans text-white/60 leading-relaxed">
            GORAKHPUR · INDIA <br />
            AVAILABLE WORLDWIDE
          </p>
        </div>

      </div>
    </section>
  );
}