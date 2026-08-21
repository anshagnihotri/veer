"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} id="contact" className="bg-black text-ivory pt-32 pb-12 px-6 md:px-12 min-h-[80vh] flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Subtle Gradient/Grain */}
      <div className="absolute inset-0 z-0 bg-grain-dark pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="cta-content text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight mb-12">
            YOUR STORY <br />
            <span className="italic text-accent">STARTS HERE.</span>
          </h2>

          <a 
            href="mailto:hello@veer.com" 
            className="group inline-flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.2em] font-sans border-b border-white/30 pb-2 hover:border-white transition-colors"
          >
            PLAN YOUR WEDDING FILM
            <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-sans text-white/50">
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            Instagram
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Mail size={14} /> Email
          </a>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={14} /> Based in India, Worldwide
        </div>

        <div>
          &copy; {new Date().getFullYear()} VEER PHOTOFACTORY
        </div>

      </div>
    </footer>
  );
}
