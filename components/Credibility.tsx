"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Credibility() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cred-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-ivory text-black border-y border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
          
          <div className="cred-item">
            <h4 className="text-4xl md:text-6xl font-serif mb-2">150+</h4>
            <p className="text-xs tracking-widest uppercase font-sans text-soft-grey">Weddings Filmed</p>
            <p className="text-[10px] text-red-500 mt-1 italic opacity-60">*Placeholder data</p>
          </div>

          <div className="cred-item">
            <h4 className="text-4xl md:text-6xl font-serif mb-2">12</h4>
            <p className="text-xs tracking-widest uppercase font-sans text-soft-grey">Countries</p>
            <p className="text-[10px] text-red-500 mt-1 italic opacity-60">*Placeholder data</p>
          </div>

          <div className="cred-item">
            <h4 className="text-4xl md:text-6xl font-serif mb-2">8</h4>
            <p className="text-xs tracking-widest uppercase font-sans text-soft-grey">Years Experience</p>
            <p className="text-[10px] text-red-500 mt-1 italic opacity-60">*Placeholder data</p>
          </div>

          <div className="cred-item">
            <h4 className="text-4xl md:text-6xl font-serif mb-2">5</h4>
            <p className="text-xs tracking-widest uppercase font-sans text-soft-grey">Awards Won</p>
            <p className="text-[10px] text-red-500 mt-1 italic opacity-60">*Placeholder data</p>
          </div>

        </div>
      </div>
    </section>
  );
}
