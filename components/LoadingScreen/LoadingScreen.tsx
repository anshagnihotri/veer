"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onComplete?: () => void;
}

const cycleImages = [
  "/images/2.webp", 
  "/images/333.webp", 
  "/images/DSC01369.webp", 
  "/images/DSC02282.webp", 
  "/images/DSC02880.webp", 
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // --- INITIAL STATE SETUP ---
      gsap.set(".center-item", { xPercent: -50, yPercent: -50 });
      // Added opacity: 0 to the text for a softer reveal later
      gsap.set(".typo-word", { yPercent: 100, opacity: 0 }); 
      gsap.set(".oxblood-rect", { scaleX: 0 });
      
      // --- PHASE 1: CONTENT FADE IN (0.0s - 0.4s) ---
      tl.fromTo(
        ".loader-content",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        0
      );

      // --- PHASE 2: RAPID IMAGE CYCLING (0.4s - 0.8s) ---
      const cycleTimes = [0.4, 0.5, 0.6, 0.7]; 
      for (let i = 1; i < cycleImages.length; i++) {
        tl.set(`#cycle-${i}`, { opacity: 1 }, cycleTimes[i - 1]);
      }

      // --- PHASE 3: SCALE UP & VANISH MOMENT (1.0s - 1.6s) ---
      tl.to(
        ".center-item",
        { scale: 1, duration: 0.6, ease: "expo.inOut" },
        1.0 
      );
      tl.to(
        [".center-item", ".micro-text"],
        { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.inOut", stagger: 0.04 },
        1.4
      );

      // --- PHASE 4: TYPOGRAPHY REVEAL & ACCENT RECT (1.2s - 2.0s) ---
      tl.to(".typo-word", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 1.2);
      tl.to(".oxblood-rect", { scaleX: 1, duration: 0.6, ease: "expo.out" }, 1.4);

      // --- PHASE 5: FINAL TRANSITION / VANISH (2.2s+) ---
      tl.to(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 2.2)
        .set(containerRef.current, { display: "none" }); 
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="loader-overlay fixed inset-0 w-screen h-[100dvh] bg-black z-[9999] overflow-hidden flex justify-center items-center text-ivory"
    >
      <div className="absolute inset-0 bg-grain-dark z-0"></div>

      <div className="loader-content opacity-0 w-full h-full relative z-10">
        {/* --- SMALL EDITORIAL DETAILS --- */}
        <div className="micro-text font-sans absolute text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/50 left-[4vw] top-1/2 -translate-y-1/2">
           Veer Singh
        </div>
        <div className="micro-text font-sans absolute text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/50 right-[4vw] top-1/2 -translate-y-1/2">
          GORAKHPUR, INDIA
        </div>
        <div className="micro-text font-sans absolute bottom-[4vh] left-1/2 -translate-x-1/2 text-center normal-case text-[0.7rem] leading-relaxed text-white/70 w-max max-w-[90vw]">
          High-end cinematic wedding photography & archival storytelling
          <br />
          serving global clients with old-world Indian warmth.
        </div>

        {/* --- IMAGE SEQUENCE --- */}
        <div className="absolute inset-0">
          <div className="center-item scale-[0.50] absolute top-1/2 left-1/2 w-[22vmin] h-[22vmin] bg-[#111] z-10" id="center-item">
            {cycleImages.map((src, i) => (
              <Image
                key={i}
                src={src}
                fill
                priority
                sizes="25vw"
                className={`cycle-image object-cover ${i === 0 ? "opacity-100" : "opacity-0"}`}
                id={`cycle-${i}`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* --- TYPOGRAPHY REVEAL --- */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="overflow-hidden flex items-center justify-center -my-[1vh]">
            <div className="typo-word font-serif text-[11vw] font-normal leading-none tracking-tight uppercase text-ivory">
              MOMENTS,
            </div>
          </div>
          <div className="overflow-hidden flex items-center justify-center -my-[1vh]">
            <div className="typo-word font-serif text-[11vw] font-normal leading-none tracking-tight uppercase text-ivory">
              PRESERVED
            </div>
            <div className="oxblood-rect w-[1.5em] h-[0.76em] bg-white ml-[0.25em] origin-left" />
          </div>
        </div>
      </div>
    </div>
  );
}