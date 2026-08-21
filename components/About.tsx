'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Section Header Reveal
      tl.fromTo('.gsap-about-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      // Horizontal Lines Expand
      .fromTo('.gsap-about-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, stagger: 0.2, ease: 'power4.out', transformOrigin: 'left center' },
        '-=0.6'
      )
      // Image Reveal
      .fromTo('.gsap-about-img-wrapper',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo('.gsap-about-img',
        { scale: 1.08 },
        { scale: 1, duration: 1.5, ease: 'power3.out' },
        '-=1.2'
      )
      // Text Stagger
      .fromTo('.gsap-about-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=1'
      );
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full bg-parchment text-espresso px-[20px] md:px-[6vw] py-4 md:py-8 bg-grain-light overflow-hidden"
    >
      {/* Section Header */}
      <div className="gsap-about-header w-full mb-4 md:mb-8">
        <div className="gsap-about-line h-[1px] w-full bg-espresso/20 mb-4 md:mb-6" />
        <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.16em] font-medium font-sans">
          <span>01 — About The Studio</span>
          <span className="opacity-60">Philosophy</span>
        </div>
      </div>

      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
        
        {/* LEFT SIDE: Editorial Photograph (Spans 5 columns) */}
        <div className="md:col-span-5 w-full">
          <div className="gsap-about-img-wrapper relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden">
            <img
              src="/images/VeerSingh.webp" 
              alt="The Veer Photofactory Studio Approach"
              className="gsap-about-img w-full h-full object-cover object-center grayscale-[15%]"
            />
            {/* Subtle overlay to blend the image perfectly with the parchment background */}
            <div className="absolute inset-0 bg-parchment/10 mix-blend-overlay pointer-events-none" />
          </div>
        </div>

        {/* RIGHT SIDE: Typography & Metadata (Spans 6 columns, offset by 1) */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
          
          {/* Small Location Metadata */}
          <div className="flex flex-col gap-2 mb-12 md:mb-16">
            <div className="gsap-about-line h-[1px] w-8 bg-espresso/40 mb-2" />
            <div className="gsap-about-text font-sans text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-espresso/60">
              Gorakhpur · India
            </div>
            <div className="gsap-about-text font-sans text-[9px] md:text-[10px] uppercase tracking-[0.16em] text-espresso font-medium">
              Available Worldwide
            </div>
          </div>

          {/* Large Bodoni Statement */}
          <div className="mb-8 md:mb-10">
            <h2 className="gsap-about-text font-serif text-[clamp(44px,6vw,84px)] leading-[0.9] tracking-[-0.03em] uppercase flex flex-col">
              <span className="block text-espresso/70 italic lowercase font-light text-[clamp(26px,3vw,44px)] -mb-2 md:-mb-4 tracking-normal">The</span>
              <span className="block">Veer Approach</span>
            </h2>
          </div>

          {/* Supporting Philosophy Paragraph */}
          <div className="gsap-about-text">
            <p className="font-sans text-[12px] md:text-[14px] leading-[1.65] text-espresso/85 max-w-[95%] md:max-w-[85%]">
              We believe that the most powerful images are born from observation, not orchestration. Our studio focuses on preserving the tactile, fleeting beauty of your celebration through an editorial lens. We do not just take pictures; we curate an authentic visual legacy that feels exactly the way you remember it.
            </p>
            
            {/* Small Decorative Footer line */}
            <div className="mt-10 pt-6 border-t border-espresso/15 max-w-[95%] md:max-w-[85%] flex items-center justify-between">
               <span className="font-serif italic text-[16px] md:text-[20px] text-oxblood">
                 Authentic. Cinematic. Timeless.
               </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}