"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutVeer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title staggering animation
      gsap.fromTo(
        ".about-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Copy staggering
      gsap.fromTo(
        ".about-copy",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-copy-container",
            start: "top 85%",
          },
        }
      );

      // Image reveal & slight parallax
      gsap.fromTo(
        ".about-img-wrapper",
        { y: 50, opacity: 0 },
        {
          y: -20,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-img-wrapper",
            start: "top 85%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 px-6 md:px-12 bg-[#050505] text-ivory overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row items-center md:items-start justify-center pt-8 md:pt-16">
        
        {/* Massive Overlapping Editorial Title - Fixed Typography to Serif */}
        <div className="w-full md:absolute top-0 left-0 z-20 pointer-events-none flex flex-col items-center md:items-start justify-start gap-2 mb-16 md:mb-0 mix-blend-difference">
          <div className="overflow-hidden">
            <h2 className="about-title font-serif text-5xl md:text-[6vw] lg:text-[7vw] leading-[0.9] tracking-tight font-light text-white md:ml-[8vw]">
              THE MAN
            </h2>
          </div>
          <div className="overflow-hidden w-full flex justify-center md:justify-end md:pr-[12vw]">
            <h2 className="about-title font-serif text-6xl md:text-[7vw] lg:text-[8vw] leading-[0.9] italic text-white/90">
              BEHIND
            </h2>
          </div>
          <div className="overflow-hidden w-full flex justify-center md:justify-start md:pl-[22vw]">
            <h2 className="about-title font-serif text-5xl md:text-[5.5vw] lg:text-[6.5vw] leading-[0.9] tracking-tight text-white/80">
              THE LENS.
            </h2>
          </div>
        </div>

        {/* Center Rectangular Frame - Resized */}
        <div className="w-full md:w-[40%] lg:w-[35%] relative z-10 about-img-wrapper mb-16 md:mb-0 md:mt-16 lg:mt-24">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden bg-[#111]">
            <Image
              src="/images/VeerSingh.jpg"
              alt="Veer Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right / Bottom Copy */}
        <div className="w-full md:w-[45%] md:absolute bottom-[-30px] lg:bottom-[-60px] right-0 z-20 flex flex-col justify-end pb-8 md:pr-[2vw] pointer-events-auto">
          <div className="about-copy-container space-y-6 max-w-xs mx-auto md:ml-auto md:mr-0 p-6 md:p-8 border-l border-white/20 bg-[#050505]/60 backdrop-blur-md">
            <p className="about-copy text-xs md:text-sm font-sans leading-relaxed text-ivory/80">
              I believe that the best stories are found in the unscripted moments. A fleeting glance, a quiet tear, the subtle chaos before you walk down the aisle. 
            </p>
            <p className="about-copy text-xs md:text-sm font-sans leading-relaxed text-ivory/80">
              My approach isn&apos;t about rigid posing or creating artificial scenarios. It&apos;s about being present, observing deeply, and crafting a cinematic narrative that feels inherently true to who you are.
            </p>
            
            <div className="about-copy pt-4">
              <span className="font-serif text-3xl md:text-4xl italic text-white">Veer</span>
              <p className="text-[9px] uppercase tracking-[0.2em] font-sans mt-2 text-white/50">
                Founder & Lead Filmmaker
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
