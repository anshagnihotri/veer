'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Wedding Photography',
    description: 'Cinematic, archival documentation of your celebration, capturing unscripted moments with editorial elegance.',
    image: '/images/_DSC8508.webp',
  },
  {
    id: '02',
    title: 'Wedding Films',
    description: 'Moving portraits that preserve the atmosphere, sound, and raw emotion of your most important days.',
    image: '/images/_PR09779.webp',
  },
  {
    id: '03',
    title: 'Pre-Wedding',
    description: 'Intimate, art-directed sessions designed to document your connection before the grand event.',
    image: '/images/_PR09941.webp',
  },
  {
    id: '04',
    title: 'Destination',
    description: 'World-class coverage wherever your story takes us, seamlessly adapting to any environment or culture.',
    image: '/images/_VEE1074.webp',
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);
  // Default the first item to be open
  const [activeIndex, setActiveIndex] = useState<number | null>(0); 

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

      // Stagger the entrance of each panel
      tl.fromTo(
        '.gsap-service-panel',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out' }
      );
      
      // Fade in the top header
      tl.fromTo(
        '.gsap-services-header',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.8'
      );
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      ref={container}
      // Fixed 100 viewport height to ensure it perfectly frames the screen
      className="relative w-full h-[100svh] min-h-[600px] bg-walnut flex flex-col md:flex-row overflow-hidden"
    >
      {/* Floating Section Header */}
      <div className="gsap-services-header absolute top-[3vh] md:top-[5vh] left-[4vw] md:left-[5vw] z-50 pointer-events-none mix-blend-difference text-ivory">
        <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.16em] font-medium">
          04 — Our Services
        </span>
      </div>

      {/* Expanding Accordion Panels */}
      {services.map((service, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={service.id}
            onMouseEnter={() => setActiveIndex(index)}
            className={`
              gsap-service-panel relative overflow-hidden cursor-pointer 
              transition-[flex] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] 
              border-b md:border-b-0 md:border-r border-ivory/15 last:border-0 
              flex flex-col justify-end
              ${isActive ? 'flex-[3] md:flex-[2.5]' : 'flex-[1]'}
            `}
          >
            {/* Background Image & Overlay */}
            <div 
              className={`
                absolute inset-0 w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)]
                ${isActive ? 'scale-100' : 'scale-110'}
              `}
            >
              <div 
                className={`
                  absolute inset-0 bg-espresso transition-opacity duration-[800ms] z-10
                  ${isActive ? 'opacity-30' : 'opacity-80'}
                `} 
              />
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover grayscale-[15%]" 
              />
            </div>

            {/* Typography Content */}
            <div className="relative z-20 p-[20px] md:p-[4vw] flex flex-col justify-end w-full h-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                
                {/* Number & Title */}
                <div className="flex flex-col gap-2 md:gap-4 flex-shrink-0">
                  <span className="font-sans text-[10px] text-ivory/60">
                    {service.id}
                  </span>
                  <h3 
                    className={`
      font-serif uppercase tracking-tight text-ivory transition-all duration-[800ms] ease-out
      ${isActive ? 'text-[22px] md:text-[2.5vw] leading-[1.1]' : 'text-[18px] md:text-[1.5vw] leading-none opacity-50'}
    `}
                  >
                    {/* Replaces spaces with breaks if inactive on desktop to stack the words nicely */}
                    {service.title}
                  </h3>
                </div>

                {/* Description (Fades & collapses when inactive) */}
                <div 
                  className={`
                    overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${isActive ? 'max-h-[150px] opacity-100 mt-2 md:mt-0 md:max-w-[280px]' : 'max-h-0 opacity-0 md:max-w-0'}
                  `}
                >
                  <p className="font-sans text-[11px] md:text-[12px] leading-[1.6] text-ivory/80">
                    {service.description}
                  </p>
                </div>

              </div>
            </div>
            
          </div>
        );
      })}
    </section>
  );
}