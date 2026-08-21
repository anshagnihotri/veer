"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use gsap.quickTo for highly optimized, high-frequency updates without a ticker loop
    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    const followerX = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
    const followerY = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      cursorX(e.clientX - 4);
      cursorY(e.clientY - 4);
      followerX(e.clientX - 16);
      followerY(e.clientY - 16);
    };

    // Event delegation for interactable elements instead of querying the DOM continuously
    const isInteractable = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (['a', 'button', 'input', 'textarea'].includes(tag)) return true;
      if (el.classList && (el.classList.contains('cursor-pointer') || el.classList.contains('film-card'))) return true;
      return isInteractable(el.parentElement);
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractable(e.target as Element)) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(follower, { scale: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isInteractable(e.target as Element)) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname]); // Re-run effect on route change to reset states if needed

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
