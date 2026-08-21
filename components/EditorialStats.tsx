'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { id: 1, target: 8, suffix: '+', label: 'Years Archiving' },
  { id: 2, target: 150, suffix: '+', label: 'Stories Documented' },
  { id: 3, target: 12, suffix: '', label: 'Countries Travelled' },
  { id: 4, target: 1, suffix: 'M+', label: 'Frames Preserved' },
];

export default function Stats() {
  const container = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%', // Starts animation when section is 20% into the viewport
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Fade in the grid lines and labels
      tl.fromTo(
        '.gsap-stat-element',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      // 2. Animate the numbers counting up
      numberRefs.current.forEach((el) => {
        if (!el) return;
        
        const targetValue = parseFloat(el.getAttribute('data-target') || '0');
        
        gsap.fromTo(el, 
          { innerHTML: 0 }, 
          { 
            innerHTML: targetValue,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerHTML: 1 }, // Forces whole numbers
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
            }
          }
        );
      });
    });

    // Fallback for reduced motion (just fades in)
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.gsap-stat-element', { opacity: 1, y: 0 });
      numberRefs.current.forEach((el) => {
        if (el) el.innerHTML = el.getAttribute('data-target') || '0';
      });
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full min-h-[40svh] md:h-[50svh] bg-[#EEE6D8] text-[#24150F] flex flex-col justify-center px-[20px] md:px-[6vw] py-50"
    >
      {/* Editorial Header */}
      <div className="gsap-stat-element w-full mb-8 md:mb-12">
        <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.16em] font-medium font-sans">
          <span>03 — By The Numbers</span>
          <span className="opacity-60">Global Reach</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full border-t border-b border-[#24150F]/15 grid grid-cols-2 md:grid-cols-4">
        {statsData.map((stat, index) => (
          <div 
            key={stat.id}
            className={`
              gsap-stat-element flex flex-col items-center justify-center text-center py-10 md:py-16
              ${index % 2 === 0 ? 'border-r border-[#24150F]/15' : ''} 
              md:border-r md:border-[#24150F]/15 md:last:border-r-0
              ${index < 2 ? 'border-b border-[#24150F]/15 md:border-b-0' : ''}
            `}
          >
            {/* Number Counter */}
            <div className="flex items-start text-[#24150F]">
              <span 
                ref={(el) => { numberRefs.current[index] = el; }}
                data-target={stat.target}
                className="font-serif text-[clamp(40px,5vw,72px)] leading-none tracking-tight"
              >
                0
              </span>
              <span className="font-serif text-[clamp(24px,3vw,40px)] leading-none text-[#24150F]/60">
                {stat.suffix}
              </span>
            </div>

            {/* Subtitle */}
            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#24150F]/60 mt-4 md:mt-6">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}