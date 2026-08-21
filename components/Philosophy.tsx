"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Image 1
      gsap.fromTo(
        ".phil-img-1",
        { y: -30 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Parallax Image 2 (Moves faster)
      gsap.fromTo(
        ".phil-img-2",
        { y: 50 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal
      const words = gsap.utils.toArray<HTMLElement>(".phil-word");
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: word,
              start: "top 90%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="py-24 md:py-32 px-6 md:px-12 bg-black text-ivory overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 relative">
        
        {/* Left Side: Editorial Typography */}
        <div className="w-full md:w-1/2 relative z-20">
          <div className="flex flex-col gap-0 mb-12">
            <div className="overflow-hidden py-1">
              <span className="phil-word inline-block text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.85] text-white/90">
                HEARTFELT.
              </span>
            </div>
            <div className="overflow-hidden py-1 md:pl-12">
              <span className="phil-word inline-block text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.85] text-white">
                CINEMATIC.
              </span>
            </div>
            <div className="overflow-hidden py-1 md:pl-24">
              <span className="phil-word inline-block text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.85] italic text-white/70">
                TIMELESS.
              </span>
            </div>
          </div>
          
          <div className="phil-word flex gap-6 md:gap-8 items-start max-w-md">
            <div className="w-[1px] h-24 bg-white/20 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm md:text-base font-sans leading-relaxed text-white/60">
                We approach every wedding as a unique piece of cinema. It&apos;s not about capturing standard sequences; it&apos;s about preserving the profound emotion, the fleeting glances, and the atmosphere of a day you&apos;ll want to relive forever.
              </p>
              <p className="mt-6 text-xs uppercase tracking-widest font-sans font-medium text-white/80">
                The Veer Approach
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Image Collage */}
        <div className="w-full md:w-1/2 relative z-10 h-[600px] md:h-[800px] mt-12 md:mt-0 flex items-center justify-center">
          
          {/* Main Large Image */}
          <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 w-[70%] md:w-[65%] aspect-[3/4] overflow-hidden z-10">
            <Image
              src="/images/054A4027.jpg"
              alt="Veer Philosophy Main"
              fill
              sizes="(max-width: 768px) 70vw, 35vw"
              className="phil-img-1 object-cover"
            />
          </div>

          {/* Secondary Overlapping Image */}
          <div className="absolute left-0 md:left-10 bottom-10 w-[50%] md:w-[45%] aspect-[4/5] overflow-hidden z-20 border-4 border-black">
            <Image
              src="/images/_XYZ1112.jpg"
              alt="Veer Philosophy Detail"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="phil-img-2 object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
