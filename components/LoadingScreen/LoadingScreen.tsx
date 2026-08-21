"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem("hasSeenLoader")) {
      setShouldShow(false);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Simulate loading progress
  useEffect(() => {
    if (!shouldShow || !isMounted) return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, [shouldShow, isMounted]);

  useGSAP(
    () => {
      if (!shouldShow || !isMounted) return;

      // Wait for progress to reach 100 before starting the main animation
      if (progress < 100) return;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasSeenLoader", "true");
          if (onComplete) onComplete();
        },
      });

      // --- INITIAL STATE SETUP ---
      gsap.set(".loader-image-container", { scale: 1.2, opacity: 0, filter: "blur(10px)" });
      gsap.set(".progress-container", { opacity: 1 });
      gsap.set(".brand-text span", { yPercent: 100, opacity: 0 });
      gsap.set(".micro-text", { opacity: 0, y: 10 });
      gsap.set(".panel-top", { top: 0 });
      gsap.set(".panel-bottom", { bottom: 0 });
      gsap.set(".loader-overlay", { background: "transparent" });
      gsap.set(".line-reveal span", { scaleX: 0, transformOrigin: "left center" });

      // --- PHASE 1: FADE OUT PROGRESS & REVEAL IMAGE (0.0s - 1.2s) ---
      tl.to(".progress-container", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0.2);
      
      tl.to(
        ".loader-image-container",
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
        0.5
      );

      // --- PHASE 2: TYPOGRAPHY & MICRO-TEXT REVEAL (1.0s - 2.0s) ---
      tl.to(".brand-text span", { yPercent: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "expo.out" }, 1.0);
      tl.to(".line-reveal span", { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out" }, 1.4);
      tl.to(".micro-text", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 1.4);

      // --- PHASE 3: HOLD AND ENJOY THE VIEW (2.0s - 3.0s) ---
      // The image continues a very slow, subtle zoom
      tl.to(".loader-image-container", { scale: 1.05, duration: 4, ease: "linear" }, 1.5);

      // --- PHASE 4: THE GRAND REVEAL (3.0s - 4.2s) ---
      tl.to(".brand-text span", { yPercent: -100, opacity: 0, duration: 0.6, stagger: 0.02, ease: "power2.in" }, 2.8);
      tl.to(".line-reveal span", { scaleX: 0, transformOrigin: "right center", duration: 0.6, ease: "power2.in" }, 2.8);
      tl.to(".micro-text", { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, 3.0);
      tl.to(".loader-image-container", { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.inOut" }, 3.1);

      // Panel split effect
      tl.to(".panel-top", { height: 0, duration: 1.2, ease: "expo.inOut" }, 3.4);
      tl.to(".panel-bottom", { height: 0, duration: 1.2, ease: "expo.inOut" }, 3.4);
      
      tl.set(containerRef.current, { display: "none" }, 4.6);
    },
    { scope: containerRef, dependencies: [progress] }
  );

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block relative opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  if (!isMounted || !shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="loader-overlay fixed inset-0 w-screen h-[100dvh] z-[9999] overflow-hidden flex justify-center items-center pointer-events-none"
    >
      {/* Background Panels for the final split reveal */}
      <div className="panel-top absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-0"></div>
      <div className="panel-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-0"></div>

      <div className="absolute inset-0 bg-grain-dark z-10 opacity-30 mix-blend-overlay"></div>

      {/* Progress Counter */}
      <div className="progress-container absolute z-50 flex flex-col items-center justify-center">
        <div className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Initializing</div>
        <div className="font-serif text-5xl md:text-7xl font-light text-ivory tracking-tighter">
          {progress}<span className="text-2xl text-white/50 ml-1">%</span>
        </div>
      </div>

      {/* Main Content (Revealed after loading) */}
      <div className="w-full h-full relative z-20 flex flex-col items-center justify-center">
        
        {/* Cinematic Image container */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
           <div className="loader-image-container w-[75vw] md:w-[45vw] h-[55vh] md:h-[65vh] relative opacity-0 shadow-2xl">
             <Image
                src="/images/2.webp"
                fill
                priority
                sizes="(max-width: 768px) 75vw, 45vw"
                className="object-cover object-center grayscale-[20%]"
                alt="Cinematic frame"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
           </div>
        </div>

        {/* Typography */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center w-full pointer-events-none">
          <div className="overflow-hidden mb-[-1vh] md:mb-[-2vh]">
            <h1 className="brand-text font-serif text-[16vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase text-ivory drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {splitText("VEER")}
            </h1>
          </div>
          <div className="overflow-hidden flex items-center mt-2 md:mt-0">
            <h1 className="brand-text font-serif text-[16vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase text-ivory italic pr-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {splitText("SINGH")}
            </h1>
             <div className="line-reveal ml-2 md:ml-4 h-[2px] w-[12vw] md:w-[15vw] mt-[2vw] md:mt-[1vw]">
                <span className="block w-full h-full bg-ivory shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0"></span>
             </div>
          </div>
        </div>

        {/* Micro details */}
        <div className="micro-text opacity-0 font-sans absolute top-8 left-8 md:top-12 md:left-12 text-[0.6rem] md:text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/70">
          Gorakhpur, IN
        </div>
        <div className="micro-text opacity-0 font-sans absolute top-8 right-8 md:top-12 md:right-12 text-[0.6rem] md:text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white/70 text-right">
          Est. 2024
        </div>
        <div className="micro-text opacity-0 font-sans absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-center normal-case text-[0.65rem] md:text-[0.7rem] leading-relaxed text-white/80 w-max max-w-[90vw]">
          High-end cinematic wedding photography
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>& archival storytelling.
        </div>

      </div>
    </div>
  );
}