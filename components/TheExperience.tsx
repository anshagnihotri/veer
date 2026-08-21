"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experienceSteps = [
  {
    num: "01",
    title: "CONNECTION",
    desc: "It begins with understanding who you are. We dive deep into your story, your vision, and what matters most to you, ensuring we are perfectly aligned before the cameras ever roll.",
  },
  {
    num: "02",
    title: "CELEBRATION",
    desc: "On the day, we blend seamlessly into the background. We don't direct your day; we document it. Capturing the unscripted magic, the quiet tears, and the grand celebrations exactly as they unfold.",
  },
  {
    num: "03",
    title: "CREATION",
    desc: "In the editing room, your story is meticulously crafted. Through world-class color grading, precise audio design, and cinematic pacing, we create a timeless heirloom you will cherish forever.",
  },
];

export default function TheExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
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
    <section ref={containerRef} className="py-24 md:py-32 bg-black text-ivory border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-medium text-white/50 mb-6">
            The Process
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif">
            THE EXPERIENCE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 relative">
          {/* Subtle connecting line on desktop */}
          <div className="hidden md:block absolute top-[4rem] left-[10%] right-[10%] h-[1px] bg-white/10 -z-10" />

          {experienceSteps.map((step) => (
            <div key={step.num} className="exp-card flex flex-col items-center text-center">
              <span className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white/20 mb-6 bg-black px-6">
                {step.num}
              </span>
              <h4 className="text-xl md:text-2xl font-serif tracking-wide mb-4 text-white/90">
                {step.title}
              </h4>
              <p className="text-sm font-sans text-white/60 leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
