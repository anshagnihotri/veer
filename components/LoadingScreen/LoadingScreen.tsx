"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onComplete?: () => void;
}

const cycleImages = [
  "/images/2.jpg", 
  "/images/333.jpg", 
  "/images/DSC01369.jpg", 
  "/images/DSC02282.jpg", 
  "/images/DSC02880.jpg", 
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
      
      // --- PHASE 1: CONTENT FADE IN (0.0s - 0.8s) ---
      tl.fromTo(
        ".loader-content",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      );

      // --- PHASE 2: RAPID IMAGE CYCLING (0.8s - 2.8s) ---
      const cycleTimes = [1.0, 1.4, 1.8, 2.2]; 
      for (let i = 1; i < cycleImages.length; i++) {
        tl.set(`#cycle-${i}`, { opacity: 1 }, cycleTimes[i - 1]);
      }

      // --- PHASE 3: SCALE UP & VANISH MOMENT (2.8s - 3.7s) ---
      tl.to(
        ".center-item",
        { scale: 1, duration: 0.9, ease: "expo.inOut" },
        2.8 
      );
      tl.to(
        [".center-item", ".micro-text"],
        { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.inOut", stagger: 0.05 },
        3.7
      );

      // --- PHASE 4: TYPOGRAPHY REVEAL & ACCENT RECT (4.1s - 5.0s) ---
      tl.to(".typo-word", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 4.1);
      tl.to(".oxblood-rect", { scaleX: 1, duration: 0.6, ease: "expo.out" }, 4.3);

      // --- PHASE 5: FINAL TRANSITION / VANISH (5.5s+) ---
      tl.to(containerRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 5.5)
        .set(containerRef.current, { display: "none" }); 
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="loader-overlay fixed inset-0 w-screen h-screen bg-black z-[9999] overflow-hidden flex justify-center items-center text-ivory"
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
              <img
                key={i}
                src={src}
                className={`cycle-image absolute inset-0 w-full h-full object-cover block ${i === 0 ? "opacity-100" : "opacity-0"}`}
                id={`cycle-${i}`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* --- TYPOGRAPHY REVEAL --- */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="overflow-hidden flex items-center justify-center -my-[1vh]">
            <div className="typo-word font-serif text-[11vw] font-normal leading-none tracking-tight uppercase text-ivory will-change-transform">
              MOMENTS,
            </div>
          </div>
          <div className="overflow-hidden flex items-center justify-center -my-[1vh]">
            <div className="typo-word font-serif text-[11vw] font-normal leading-none tracking-tight uppercase text-ivory will-change-transform">
              PRESERVED
            </div>
            <div className="oxblood-rect w-[1.5em] h-[0.76em] bg-white ml-[0.25em] origin-left" />
          </div>
        </div>
      </div>
    </div>
  );
}