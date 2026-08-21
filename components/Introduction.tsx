"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".intro-line");
      
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 bg-black min-h-screen flex items-center justify-center bg-grain-dark relative">
      <div className="max-w-6xl mx-auto text-center space-y-4 md:space-y-8">
        <h2 className="intro-line text-4xl md:text-7xl lg:text-8xl font-serif text-ivory tracking-tight leading-[1.1]">
          WE DON&apos;T JUST
        </h2>
        <h2 className="intro-line text-4xl md:text-7xl lg:text-8xl font-serif text-ivory tracking-tight leading-[1.1]">
          FILM THE WEDDING.
        </h2>
        <h2 className="intro-line text-4xl md:text-7xl lg:text-8xl font-serif text-accent italic tracking-tight mt-8 md:mt-12 leading-[1.1]">
          WE FILM HOW IT FELT.
        </h2>
      </div>
    </section>
  );
}
