'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; 

export default function HeroNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/our-works' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    // Added pt-[20px] md:pt-[32px] here to give the navbar some top breathing room
    <div className="relative w-full pt-[20px] pb-[16px] md:pt-[32px] md:pb-[24px] pointer-events-auto">
      
      {/* 
        Added relative and z-50 to the header so it sits above the mobile overlay.
        Text color transitions to Espresso (#24150F) when the menu is open to contrast with the Parchment background.
      */}
      <header className="relative z-50 flex w-full items-center justify-between transition-colors duration-500">
        
        <Link 
          href="/"
          className="gsap-nav-item font-serif text-[18px] md:text-[24px] uppercase tracking-wide leading-none transition-colors duration-500"
          style={{ color: isMobileMenuOpen ? '#24150F' : '' }}
        >
          VEER Photofactory
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-[28px] text-[9px] font-medium tracking-[0.12em] uppercase">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className="gsap-nav-item hover:text-[#B59A67] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden gsap-nav-item text-[9px] font-medium tracking-[0.12em] uppercase transition-colors duration-500"
          style={{ color: isMobileMenuOpen ? '#24150F' : '' }}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Thin Horizontal Rule */}
      <div className="gsap-nav-line absolute bottom-0 left-0 h-[1px] w-full md:w-[calc(100%-12vw)] bg-[#F4E9C8]/35 origin-left" />

      {/* =====================================================
          MOBILE FULL-PAGE MENU OVERLAY
          ===================================================== */}
      <div 
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#EEE6D8] px-[6vw] text-[#24150F] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-6">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block font-serif text-[48px] uppercase leading-[0.9] tracking-[-0.02em] text-[#24150F] transition-colors hover:text-[#641F1C]"
              style={{
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.05}s, opacity 0.6s ease ${0.1 + index * 0.05}s`
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Menu Metadata / Footer */}
        <div 
          className="absolute bottom-[8vh] left-[6vw] flex flex-col gap-6"
          style={{
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s, opacity 0.6s ease 0.4s`
          }}
        >
          <div className="flex flex-col gap-1 font-sans text-[9px] font-medium uppercase tracking-[0.14em]">
            <span className="text-[#24150F]">Gorakhpur · India</span>
            <span className="text-[#24150F]/60">Available Worldwide</span>
          </div>

          <div className="flex gap-6 font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-[#24150F]/60">
            <a href="#instagram" className="transition-colors duration-300 hover:text-[#24150F]">Instagram</a>
            <a href="#vimeo" className="transition-colors duration-300 hover:text-[#24150F]">Vimeo</a>
          </div>
        </div>
      </div>

    </div>
  );
}