'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Base unique stories
const uniqueStories = [
  { id: '01', couple: 'Ananya & Arjun', location: 'Udaipur, India', year: '2026', type: 'Wedding Film + Photography', image: '/images/Anjali.webp' },
  { id: '02', couple: 'Priya & Rahul', location: 'Lake Como, Italy', year: '2026', type: 'Editorial Portraits', image: '/images/DSC01369.webp' },
  { id: '03', couple: 'Sneha & Vikram', location: 'Jaipur, India', year: '2027', type: 'Archival Documentary', image: '/images/DSC02282.webp' },
  { id: '04', couple: 'Meera & Aditya', location: 'Goa, India', year: '2025', type: 'Destination Celebration', image: '/images/DSC02880.webp' },
  { id: '05', couple: 'Ishita & Rohan', location: 'Tuscany, Italy', year: '2026', type: 'Intimate Elopement', image: '/images/DSC_0361.webp' },
  { id: '06', couple: 'Tara & Kabir', location: 'Bali, Indonesia', year: '2027', type: 'Wedding Film + Photography', image: '/images/VeerSingh.webp' },
];

export default function SelectedStories() {
  const container = useRef<HTMLElement>(null);
  const trainContainerRef = useRef<HTMLDivElement>(null); 
  const trainRef = useRef<HTMLDivElement>(null);          
  const cursorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const instructionRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [hasInteracted, setHasInteracted] = useState(true);

  // Mobile Drag State
  const progressRef = useRef({ value: 0 });
  const touchState = useRef({ isDown: false, isDragging: false, startX: 0, startProgress: 0, lastX: 0, time: 0, velocity: 0 });

  // 1. Setup True 3D Coordinate Map
  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touch);
    
    if (touch && !sessionStorage.getItem('veer_stories_interacted')) {
      setHasInteracted(false);
    }

    const TOTAL_CARDS = touch ? 15 : 30; 
    const middleIndex = Math.floor(TOTAL_CARDS / 2);
    
    // TIGHTENED MOBILE SPACING
    // Reduced dx from -26 to -15, dy from 18 to 10, dz from -50 to -35
    const dx = touch ? -15 : -18; 
    const dy = touch ? 10 : 12;  
    const dz = touch ? -35 : -30; 

    const data = Array.from({ length: TOTAL_CARDS }).map((_, i) => {
      const offsetFromCenter = i - middleIndex;
      return {
        ...uniqueStories[i % uniqueStories.length],
        id: `photo-${i}`,
        index: i,
        origX: offsetFromCenter * dx,
        origY: offsetFromCenter * dy,
        origZ: offsetFromCenter * dz,
        origRotY: -15, 
      };
    });
    
    setCardsData(data);
  }, []);

  // Custom Mobile Render Loop
  const renderMobile = (progress: number) => {
    if (!trainRef.current || !isTouchDevice || cardsData.length === 0) return;
    
    // MATCH THE TIGHTENED SPACING HERE
    const dx = -15; 
    const dy = 10; 
    const dz = -35;
    const middleIndex = Math.floor(cardsData.length / 2);

    const trainX = -(progress - middleIndex) * dx;
    const trainY = -(progress - middleIndex) * dy;
    const trainZ = -(progress - middleIndex) * dz;
    gsap.set(trainRef.current, { x: trainX, y: trainY, z: trainZ });
  };
  
  useEffect(() => {
    if (isTouchDevice && cardsData.length > 0) {
      progressRef.current.value = Math.floor(cardsData.length / 2);
      renderMobile(progressRef.current.value);
    }
  }, [isTouchDevice, cardsData]);

  // 2. Initial Entrance & Scroll Trigger
  useGSAP(() => {
    if (cardsData.length === 0) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo('.gsap-meta-text',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      );

      tl.fromTo(itemRefs.current, 
        { opacity: 0, x: (i) => cardsData[i].origX + 50, y: (i) => cardsData[i].origY - 20, z: (i) => cardsData[i].origZ + 200, rotateY: (i) => cardsData[i].origRotY },
        { opacity: 1, x: (i) => cardsData[i].origX, y: (i) => cardsData[i].origY, z: (i) => cardsData[i].origZ, rotateY: (i) => cardsData[i].origRotY, duration: 1.2, stagger: 0.02, ease: 'power3.out' },
        "<"
      );

      gsap.fromTo(trainContainerRef.current,
        { 
          x: isTouchDevice ? 200 : 400, 
          y: isTouchDevice ? -125 : -250, 
          z: isTouchDevice ? -200 : -400 
        },
        { 
          x: 0, y: 0, z: 0, ease: 'none',
          scrollTrigger: { 
            trigger: container.current, 
            start: 'top bottom', 
            end: 'center center', 
            scrub: 1 
          }
        }
      );

      if (!isTouchDevice && cursorRef.current) {
        const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' });
        const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });
        const moveCursor = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
      }
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [cardsData, isTouchDevice] });

  useEffect(() => {
    if (!isTouchDevice && cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: activeIndex !== null ? 1 : 0, scale: activeIndex !== null ? 1 : 0.5, duration: 0.3, ease: 'power2.out' });
    }
  }, [activeIndex, isTouchDevice]);

  // 3. Unified Desktop Hover / Mobile Tap Interaction
  useEffect(() => {
    if (cardsData.length === 0 || itemRefs.current.length === 0) return;

    if (activeIndex !== null) {
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const data = cardsData[i];

        if (i < activeIndex) {
          gsap.to(item, { x: data.origX + 50, y: data.origY - 30, z: data.origZ + 50, rotateY: data.origRotY, opacity: 0, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
        } else if (i > activeIndex) {
          gsap.to(item, { x: data.origX - 50, y: data.origY + 30, z: data.origZ - 50, rotateY: data.origRotY, opacity: 0, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
        } else {
          
          // Calculate target coordinates
          let targetX = data.origX;
          let targetY = data.origY;
          let targetZ = data.origZ + (isTouchDevice ? 150 : 200);

          if (isTouchDevice && trainContainerRef.current && trainRef.current) {
            // Inverse the current translation of both train containers to place the item exactly in the center of the viewport
            const outerX = Number(gsap.getProperty(trainContainerRef.current, 'x')) || 0;
            const outerY = Number(gsap.getProperty(trainContainerRef.current, 'y')) || 0;
            const outerZ = Number(gsap.getProperty(trainContainerRef.current, 'z')) || 0;

            const innerX = Number(gsap.getProperty(trainRef.current, 'x')) || 0;
            const innerY = Number(gsap.getProperty(trainRef.current, 'y')) || 0;
            const innerZ = Number(gsap.getProperty(trainRef.current, 'z')) || 0;

            targetX = -outerX - innerX;
            targetY = -outerY - innerY;
            targetZ = -outerZ - innerZ + 150;
          }

          // ACTIVE CARD - Flies exactly to the center of the screen
          gsap.to(item, { 
            width: isTouchDevice ? '75vw' : '26vw', 
            height: isTouchDevice ? '60vh' : '65vh', 
            x: targetX, 
            y: targetY, 
            z: targetZ, 
            rotateY: 0, 
            opacity: 1, 
            zIndex: 100, 
            duration: 0.8, 
            ease: 'power4.out', 
            overwrite: 'auto' 
          });
          gsap.fromTo(item.querySelector('.active-meta'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out', overwrite: 'auto' });
        }
      });
    } else {
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const data = cardsData[i];
        gsap.to(item, { 
          width: 55, 
          height: 55, 
          x: data.origX, 
          y: data.origY, 
          z: data.origZ, 
          rotateY: data.origRotY, 
          opacity: 1, 
          zIndex: 1, 
          duration: 0.9, 
          ease: 'power4.inOut', 
          overwrite: true 
        });
        
        const metaTarget = item.querySelector('.active-meta');
        gsap.killTweensOf(metaTarget);
        gsap.to(metaTarget, { opacity: 0, y: 5, duration: 0.3 });
      });
    }
  }, [activeIndex, cardsData, isTouchDevice]);

  // 4. Mobile Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isTouchDevice) return;
    gsap.killTweensOf(progressRef.current);
    touchState.current = {
      isDown: true,
      isDragging: false,
      startX: e.clientX,
      startProgress: progressRef.current.value,
      lastX: e.clientX,
      time: Date.now(),
      velocity: 0
    };

    if (!hasInteracted && instructionRef.current) {
      setHasInteracted(true);
      sessionStorage.setItem('veer_stories_interacted', 'true');
      gsap.to(instructionRef.current, { opacity: 0, duration: 0.5 });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isTouchDevice || !touchState.current.isDown || activeIndex !== null) return; 
    
    const deltaX = e.clientX - touchState.current.startX;
    
    if (Math.abs(deltaX) > 8) {
      touchState.current.isDragging = true;
    }

    let newProgress = touchState.current.startProgress - deltaX * 0.012;
    newProgress = Math.max(0, Math.min(cardsData.length - 1, newProgress));
    
    progressRef.current.value = newProgress;
    renderMobile(newProgress);
    
    const now = Date.now();
    const dt = now - touchState.current.time;
    if (dt > 0) {
      touchState.current.velocity = (e.clientX - touchState.current.lastX) / dt;
    }
    touchState.current.lastX = e.clientX;
    touchState.current.time = now;
  };

  const handlePointerUp = () => {
    if (!isTouchDevice || !touchState.current.isDown) return;
    touchState.current.isDown = false;
    
    if (activeIndex === null && touchState.current.isDragging) {
      let targetProgress = progressRef.current.value - touchState.current.velocity * 12;
      targetProgress = Math.max(0, Math.min(cardsData.length - 1, targetProgress));
      
      gsap.to(progressRef.current, {
        value: targetProgress,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: () => renderMobile(progressRef.current.value)
      });
    }
  };

  return (
    <section 
      ref={container}
      className="relative h-[100svh] min-h-[650px] w-full select-none overflow-hidden bg-[#EEE6D8] text-[#24150F]"
    >
      {/* EDITORIAL UI */}
      <div className="pointer-events-none absolute left-[4vw] top-[4vh] z-20 md:left-[6vw] md:top-[6vh]">
        <div className="gsap-meta-text font-sans text-[10px] font-bold uppercase tracking-[0.14em]">
          SELECTED STORIES
        </div>
        <div className="gsap-meta-text mt-1 font-sans text-[9px] uppercase tracking-[0.1em] opacity-50">
          A collection of stories, places & people.
        </div>
      </div>

      {isTouchDevice && activeIndex !== null && (
        <div className="pointer-events-none absolute right-[5vw] top-[4vh] z-20 md:hidden">
          <div className="gsap-meta-text font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#24150F]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(cardsData.length).padStart(2, '0')}
          </div>
        </div>
      )}

      {/* MOBILE INSTRUCTION */}
      {!hasInteracted && isTouchDevice && (
        <div ref={instructionRef} className="pointer-events-none absolute bottom-[12vh] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#24150F]">Drag to explore</span>
          <div className="flex items-center gap-3 text-[9px] text-[#24150F]/40">
            <span>←</span>
            <div className="relative h-[1px] w-[25px] overflow-hidden bg-[#24150F]/20">
              <div className="absolute left-0 top-0 h-full w-1/3 animate-[slide_1.5s_ease-in-out_infinite] bg-[#24150F]/60" />
            </div>
            <span>→</span>
          </div>
        </div>
      )}

      {/* TRUE 3D SCENE */}
      <div 
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ perspective: isTouchDevice ? '1100px' : '1500px', transformStyle: 'preserve-3d' }} 
      >
        <div ref={trainContainerRef} className="pointer-events-none relative h-0 w-0" style={{ transformStyle: 'preserve-3d' }}>
          
          <div 
            ref={trainRef}
            className="pointer-events-auto relative h-0 w-0"
            style={{ transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
            onMouseLeave={() => !isTouchDevice && setActiveIndex(null)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {cardsData.map((story, i) => (
              <div
                key={story.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-[-2px_4px_12px_rgba(36,21,15,0.12)]"
                style={{
                  width: '55px', 
                  height: '55px',
                  transformStyle: 'preserve-3d',
                  opacity: 0, 
                  willChange: 'transform, width, height',
                }}
                onMouseEnter={() => !isTouchDevice && setActiveIndex(i)}
                onClick={() => {
                  if (isTouchDevice) {
                    if (!touchState.current.isDragging) {
                      if (activeIndex === i) {
                        setActiveIndex(null);
                      } else {
                        setActiveIndex(i);
                        // Center function removed, image now flies to center automatically!
                      }
                    }
                  }
                }}
              >
                <div className="h-full w-full overflow-hidden bg-[#EEE6D8] p-[1px] md:p-[2px]">
                  <img 
                    src={story.image} 
                    alt="Memory" 
                    className="h-full w-full object-cover grayscale-[15%]"
                    draggable={false}
                  />
                </div>

                <div className="active-meta pointer-events-none absolute left-0 top-full mt-4 w-max max-w-[300px] origin-top-left opacity-0">
                  <div className="mb-3 h-[1px] w-[20px] bg-[#24150F]/40" />
                  <h4 className="font-serif text-[24px] leading-tight tracking-tight text-[#24150F] md:text-[26px]">
                    {story.couple}
                  </h4>
                  <div className="mt-2 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#24150F]/60 md:text-[10px]">
                    {story.location} · {story.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CUSTOM CURSOR (Desktop) */}
      {!isTouchDevice && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-50 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#24150F] text-[#EEE6D8] opacity-0 mix-blend-difference"
        >
          <div className="flex flex-col items-center justify-center font-sans text-[7px] leading-tight tracking-[0.1em] uppercase">
            <span>View</span>
            <span>Story ↗</span>
          </div>
        </div>
      )}

      {/* MOBILE INVISIBLE BACKDROP TO CLOSE ITEM */}
      {isTouchDevice && activeIndex !== null && (
        <div 
          className="absolute inset-0 z-10" 
          onClick={() => setActiveIndex(null)} 
        />
      )}

      {/* Global CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </section>
  );
}