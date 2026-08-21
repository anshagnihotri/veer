'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    couple: 'Ananya & Arjun',
    location: 'Udaipur Wedding',
    quote: '"The entire day felt effortless. Veer captured everything exactly as we remembered it. The quiet moments, the grand gestures—it was all documented perfectly."',
    image: '/images/_XYZ1112.jpg',
  },
  {
    id: 2,
    couple: 'Priya & Rahul',
    location: 'Lake Como Intimate',
    quote: '"We wanted our photos to feel like an editorial magazine spread, and they delivered beyond our wildest expectations."',
    image: '/images/_XYZ1252.jpg',
  },
  {
    id: 3,
    couple: 'Sneha & Vikram',
    location: 'Jaipur Celebration',
    quote: '"Looking at our album is like watching a film. The warmth, the tones, and the raw emotion are just breathtaking."',
    image: '/images/001 (69).jpg',
  },
  {
    id: 4,
    couple: 'Meera & Aditya',
    location: 'Goa Destination',
    quote: '"They have this incredible ability to blend in. We barely noticed the cameras, yet they caught the most intimate, beautiful exchanges between us and our families."',
    image: '/images/054A3733.jpg',
  },
  {
    id: 5,
    couple: 'Ishita & Rohan',
    location: 'Tuscany Elopement',
    quote: '"A masterpiece. Our wedding film brings us to tears every single time we watch it. It is a true family heirloom now."',
    image: '/images/054A3911.jpg',
  },
  {
    id: 6,
    couple: 'Tara & Kabir',
    location: 'Bali Wedding',
    quote: '"I cannot stop staring at the portraits. The lighting, the composition—everything feels so cinematic and timeless."',
    image: '/images/054A4027.jpg',
  },
  {
    id: 7,
    couple: 'Riya & Kunal',
    location: 'Kerala Backwaters',
    quote: '"From our very first meeting to the final album delivery, the process was incredibly professional, elegant, and personal."',
    image: '/images/1.jpg',
  },
  {
    id: 8,
    couple: 'Naina & Dhruv',
    location: 'Mumbai Reception',
    quote: '"We hate posing, and they completely understood that. The candid shots from our reception are our absolute favorites."',
    image: '/images/111.jpg',
  },
  {
    id: 9,
    couple: 'Maya & Dev',
    location: 'Positano Vows',
    quote: '"Absolute magic. They perfectly captured the atmosphere of the coast and the overwhelming joy of the day."',
    image: '/images/2.jpg',
  },
];

export default function Testimonials() {
  const container = useRef<HTMLElement>(null);

  // Pre-split the data into 3 locked columns to prevent layout crashing
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Base entrance animations for all screen sizes
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo('.gsap-test-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.gsap-test-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.gsap-test-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.2'
      );
    });

    // Parallax ONLY on desktop (min-width: 768px) to prevent mobile overlapping
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const cols = gsap.utils.toArray('.gsap-test-col');
      
      cols.forEach((col: any, i) => {
        // Move the ENTIRE column up or down. 
        // Spacing between cards inside is permanently locked by Flexbox.
        const yOffset = i % 2 === 0 ? 30 : -30;
        
        gsap.to(col, {
          y: yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: container });

  // Helper function to render a card so we don't duplicate code 3 times
  const renderCard = (test: any) => (
    <div 
      key={test.id} 
      className="gsap-test-card w-full bg-[#F7F2E9] border border-espresso/[0.06] rounded-[8px] shadow-[0_8px_24px_rgba(36,21,15,0.04)] p-6 md:p-8 flex flex-col gap-5"
    >
      <div className="flex items-center gap-4">
        <img 
          src={test.image} 
          alt={test.couple} 
          className="w-[34px] h-[34px] rounded-full object-cover grayscale-[15%]"
        />
        <div className="flex flex-col">
          <span className="font-sans text-[11px] font-medium text-espresso">
            {test.couple}
          </span>
          <span className="font-sans text-[10px] text-espresso/40">
            {test.location}
          </span>
        </div>
      </div>
      <p className="font-sans text-[12px] md:text-[13px] leading-[1.6] text-espresso/80">
        {test.quote}
      </p>
    </div>
  );

  return (
    <section 
      ref={container}
      className="relative w-full bg-parchment text-espresso px-[12px] md:px-[4vw] py-24 md:py-32 bg-grain-light"
    >
      {/* Outer Boundary Box */}
      <div className="relative w-full border border-espresso/[0.08] rounded-[20px] px-4 pt-20 pb-32 md:px-12 md:pt-28 md:pb-48 overflow-hidden bg-parchment">
        
        {/* Section Heading */}
        <div className="gsap-test-header w-full flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <div className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-espresso/60 mb-4 md:mb-5">
            Client Testimonials
          </div>
          <h2 className="font-serif text-[clamp(40px,5vw,64px)] leading-[0.9] text-espresso tracking-[-0.02em]">
            Wall of love
          </h2>
        </div>

        {/* 
          TRUE FLEXBOX GRID MASONRY
          This locks the spacing perfectly using gap-6/gap-8. No margins collapsing!
        */}
        <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Column 1 */}
          <div className="gsap-test-col flex flex-col gap-6 md:gap-8">
            {col1.map(renderCard)}
          </div>
          
          {/* Column 2 */}
          <div className="gsap-test-col flex flex-col gap-6 md:gap-8 md:pt-12">
            {col2.map(renderCard)}
          </div>
          
          {/* Column 3 */}
          <div className="gsap-test-col flex flex-col gap-6 md:gap-8">
            {col3.map(renderCard)}
          </div>

        </div>

        {/* Floating Bottom CTA Overlay & Fade */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] min-h-[300px] bg-gradient-to-t from-parchment via-parchment/90 to-transparent flex items-end justify-center pb-12 md:pb-16 pointer-events-none">
          <div className="gsap-test-cta pointer-events-auto flex flex-col md:flex-row items-center bg-[#F7F2E9] border border-espresso/[0.08] shadow-[0_20px_40px_rgba(36,21,15,0.1)] rounded-[24px] md:rounded-full p-3 md:p-2 md:pl-8 gap-3 md:gap-8 mx-4 md:mx-0">
            <span className="font-sans text-[11px] md:text-[12px] text-espresso/70 text-center md:text-left pt-2 md:pt-0 px-2 md:px-0">
              View the impact on our couples
            </span>
            <button className="bg-espresso text-ivory w-full md:w-auto font-sans text-[11px] md:text-[12px] font-medium tracking-wide rounded-full px-6 py-3 md:px-8 md:py-4 hover:bg-oxblood transition-colors duration-300">
              Browse our work
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}