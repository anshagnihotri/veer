'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';

interface HeroCursorProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function HeroCursor({ containerRef }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    if (window.matchMedia('(pointer: coarse), (max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
        isVisible = true;
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.3 });
      isVisible = false;
    };

    const handleInteractibles = () => {
      const interactives = document.querySelectorAll('a, button');
      const hideCursor = () => gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2 });
      const showCursor = () => isVisible && gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });

      interactives.forEach(el => {
        el.addEventListener('mouseenter', hideCursor);
        el.addEventListener('mouseleave', showCursor);
      });

      return () => {
        interactives.forEach(el => {
          el.removeEventListener('mouseenter', hideCursor);
          el.removeEventListener('mouseleave', showCursor);
        });
      };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    const cleanupInteractibles = handleInteractibles();

    return () => {
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
      cleanupInteractibles();
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 z-[100] hidden md:flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 pointer-events-none items-center justify-center rounded-full border border-[#F4E9C8]/70 opacity-0 scale-50"
    >
      <span className="text-center font-sans text-[9px] uppercase tracking-[0.1em] text-[#F4E9C8]">
        Explore
      </span>
    </div>
  );
}