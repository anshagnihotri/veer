"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/054A3733.webp",
  "/images/_XYZ1112.webp",
  "/images/054A4027.webp",
  "/images/VeerSingh.webp",
  "/images/DSC_0361.webp",
  "/images/DSC01369.webp",
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        x: "-30%", // Smooth horizontal scrolling
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Triple the array to ensure enough horizontal scrolling space
  const marqueeItems = [...images, ...images, ...images];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#F9F9F9] overflow-hidden flex flex-col items-center">
      
      {/* Typography block */}
      <div className="text-center mb-16 md:mb-24 px-6 relative z-10">
        <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] font-sans font-medium text-black/70 mb-4 md:mb-6">
          REAL WEDDING FILMS MADE BY REAL FILMMAKERS
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-black uppercase tracking-normal md:tracking-wide max-w-5xl mx-auto leading-tight">
          WE INVENTED WEDDING FILMS
        </h2>
      </div>

      {/* The Tilted Marquee Strip */}
      <div className="w-[120vw] -ml-[10vw] -rotate-2 overflow-hidden bg-black py-4 md:py-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-0">
        <div ref={marqueeRef} className="flex gap-4 md:gap-6 w-max">
          {marqueeItems.map((src, index) => (
            <div 
              key={index} 
              className="relative w-[280px] md:w-[500px] h-[180px] md:h-[320px] shrink-0 rounded-xl overflow-hidden bg-[#222]"
            >
              <Image 
                src={src} 
                alt={`Wedding Film Scene ${index}`}
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 hover:scale-105"
                sizes="(max-width: 768px) 280px, 500px"
              />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
