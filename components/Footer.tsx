'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      '.gsap-reveal-up',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  return (
    <footer
      ref={containerRef}
      className="relative flex flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white px-6 md:px-12 pb-8 pt-24 md:pt-32 border-t border-white/10"
    >
      
      {/* Massive CTA Section */}
      <div className="flex flex-col items-center justify-center text-center mb-24 md:mb-32">
        <p className="gsap-reveal-up text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-medium text-white/50 mb-6">
          Ready to create something beautiful?
        </p>
        <Link href="/#contact" className="gsap-reveal-up font-serif text-6xl md:text-8xl lg:text-9xl mb-12 hover:italic transition-all duration-500 text-white hover:text-white/90">
          LET&apos;S TALK
        </Link>
        <Link href="/#contact" className="gsap-reveal-up group relative inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-sans font-medium text-white/80 hover:text-white transition-colors">
          <span className="w-8 h-[1px] bg-white transition-all duration-300 group-hover:w-12"></span>
          Start a conversation
        </Link>
      </div>

      {/* Grid Links and Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        
        {/* Nav */}
        <div className="gsap-reveal-up flex flex-col gap-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans text-white/40 mb-2">Navigation</h4>
          {['Home', 'Stories', 'Films', 'Philosophy', 'About'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-sans tracking-wide text-white/80 hover:text-white transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="gsap-reveal-up flex flex-col gap-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans text-white/40 mb-2">Social</h4>
          {['Instagram', 'Vimeo', 'YouTube', 'Pinterest'].map((item) => (
            <a key={item} href="#" className="text-sm font-sans tracking-wide text-white/80 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Info */}
        <div className="gsap-reveal-up flex flex-col gap-4 col-span-2 md:col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans text-white/40 mb-2">Contact</h4>
          <a href="mailto:hello@veer.com" className="text-sm font-sans tracking-wide text-white/80 hover:text-white transition-colors">
            hello@veer.com
          </a>
          <p className="text-sm font-sans tracking-wide text-white/80 mt-4 leading-relaxed">
            Gorakhpur, India<br/>
            Available Worldwide
          </p>
        </div>

        {/* Newsletter */}
        <div className="gsap-reveal-up flex flex-col gap-4 col-span-2 md:col-span-1">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-sans text-white/40 mb-2">Newsletter</h4>
          <p className="text-sm font-sans text-white/80 mb-2 leading-relaxed">Stay in the frame for updates and recent films.</p>
          <div className="flex items-end border-b border-white/20 pb-2 focus-within:border-white transition-colors mt-2">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-none outline-none text-xs font-sans tracking-[0.1em] w-full text-white placeholder:text-white/30"
            />
            <button type="submit" className="text-white hover:text-white/70 transition-colors">→</button>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="gsap-reveal-up flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] uppercase tracking-[0.2em] font-sans text-white/40">
        <p>© 2026 VEER PHOTOFACTORY.</p>
        <p className="mt-4 md:mt-0">All Rights Reserved</p>
      </div>

    </footer>
  );
}