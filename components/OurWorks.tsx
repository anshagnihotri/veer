'use client';

import { useState } from 'react';

// --- MOCK DATA ---
const categories = ['All', 'Wedding', 'Pre-Wedding', 'Editorial', 'Documentary', 'Film'];
const alphabet = ['All', ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];

// Mixed aspect ratios to create the masonry effect
const worksData = [
  { id: 1, couple: 'Ananya & Arjun', category: 'Wedding', year: '2026', image: '/images/_PR09941.jpg' },
  { id: 2, couple: 'Priya & Rahul', category: 'Editorial', year: '2026', image: '/images/_VEE1074.jpg' },
  { id: 3, couple: 'Sneha & Vikram', category: 'Documentary', year: '2027', image: '/images/_XYZ1051.jpg' },
  { id: 4, couple: 'Meera & Aditya', category: 'Wedding', year: '2025', image: '/images/_XYZ1086.jpg' },
  { id: 5, couple: 'Ishita & Rohan', category: 'Pre-Wedding', year: '2026', image: '/images/_XYZ1112.jpg' },
  { id: 6, couple: 'Tara & Kabir', category: 'Film', year: '2027', image: '/images/_XYZ1252.jpg' },
  { id: 7, couple: 'Kavya & Dev', category: 'Editorial', year: '2025', image: '/images/001 (69).jpg' },
  { id: 8, couple: 'Neha & Sahil', category: 'Wedding', year: '2026', image: '/images/054A3733.jpg' },
  { id: 9, couple: 'Riya & Aman', category: 'Documentary', year: '2026', image: '/images/054A3911.jpg' },
];

export default function OurWorks() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLetter, setActiveLetter] = useState('All');

  // Filter logic
  const filteredWorks = worksData.filter((work) => {
    const matchesCategory = activeCategory === 'All' || work.category === activeCategory;
    const matchesLetter = activeLetter === 'All' || work.couple.startsWith(activeLetter);
    return matchesCategory && matchesLetter;
  });

  return (
    <section className="min-h-screen w-full bg-[#EEE6D8] px-6 py-20 text-[#24150F] md:px-12 lg:px-20">
      
      {/* Top Header / Meta */}
      <div className="mb-16 flex w-full items-center justify-between font-sans text-[10px] font-bold uppercase tracking-[0.14em]">
        <div>VEER PHOTOGRAPHY</div>
        <div className="hidden md:flex gap-8">
          <span className="cursor-pointer hover:opacity-50 transition-opacity">Market</span>
          <span className="cursor-pointer opacity-50">Gallery</span>
          <span className="cursor-pointer hover:opacity-50 transition-opacity">Artists</span>
        </div>
      </div>

      <div className="flex flex-col gap-16 md:flex-row md:gap-8 lg:gap-24">
        
        {/* LEFT COLUMN: Sticky Typography & Filters */}
        <div className="flex flex-col md:sticky md:top-20 md:h-[calc(100vh-100px)] md:w-1/3 lg:w-1/4">
          <h1 className="font-serif text-5xl leading-[0.9] tracking-tight md:text-6xl lg:text-7xl">
            THE ARCHIVE <br />
            OF TIMELESS <br />
            STORIES
          </h1>

          {/* Category List */}
          <div className="mt-16 flex flex-col gap-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group flex items-center gap-3 text-left transition-all ${
                  activeCategory === category ? 'text-[#24150F]' : 'text-[#24150F]/40 hover:text-[#24150F]/70'
                }`}
              >
                {/* Active Indicator Dot */}
                <div 
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    activeCategory === category ? 'bg-[#24150F]' : 'bg-transparent group-hover:bg-[#24150F]/20'
                  }`} 
                />
                {category}
              </button>
            ))}
          </div>

          <div className="mt-auto hidden pt-12 font-sans text-[9px] uppercase tracking-[0.14em] text-[#24150F]/40 md:block">
            EST. 2024
          </div>
        </div>

        {/* RIGHT COLUMN: Alphabet & Masonry Grid */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          
          {/* Alphabet Filter */}
          <div className="mb-12 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[9px] font-bold uppercase tracking-[0.15em]">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`transition-colors ${
                  activeLetter === letter 
                    ? 'rounded bg-[#24150F] px-2 py-1 text-[#EEE6D8]' 
                    : 'px-2 py-1 text-[#24150F]/40 hover:text-[#24150F]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Masonry Grid Setup (CSS Columns) */}
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {filteredWorks.map((work) => (
              <div 
                key={work.id} 
                className="group mb-10 break-inside-avoid cursor-pointer"
              >
                {/* Image Container */}
                <div className="overflow-hidden bg-[#24150F]/5">
                  <img
                    src={work.image}
                    alt={work.couple}
                    className="w-full object-cover grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
                
                {/* Image Meta */}
                <div className="mt-4 flex flex-col gap-1">
                  <h4 className="font-serif text-lg leading-none tracking-tight text-[#24150F]">
                    {work.couple}
                  </h4>
                  <div className="font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-[#24150F]/50">
                    {work.category} / {work.year}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredWorks.length === 0 && (
              <div className="col-span-full py-20 font-sans text-xs uppercase tracking-widest text-[#24150F]/40">
                No stories found for this selection.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}