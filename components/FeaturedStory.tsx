"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const openModal = () => {
    setActiveVideo("/images/_XYZ1252.webp");
    setIsVideoPlaying(true);
    setIsMuted(false);
    document.body.style.overflow = "hidden";
    gsap.set(modalRef.current, { display: "flex" });

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActiveVideo(null);
        document.body.style.overflow = "";
        gsap.set(modalRef.current, { display: "none" });
      }
    });
  };

  const togglePlay = () => {
    if (videoRef.current && (videoRef.current as any).play) {
      if (isVideoPlaying) {
        (videoRef.current as any).pause();
      } else {
        (videoRef.current as any).play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current && (videoRef.current as any).muted !== undefined) {
      (videoRef.current as any).muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Image
      gsap.fromTo(
        ".featured-img",
        { y: "-10%", scale: 1.1 },
        {
          y: "10%",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".featured-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="stories" className="py-24 px-6 md:px-12 bg-ivory text-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-end featured-text">
          <h3 className="text-sm tracking-[0.2em] uppercase font-sans font-medium text-soft-grey">
            Featured Story
          </h3>
          <span className="hidden md:block text-xs uppercase tracking-widest font-sans border-b border-black/20 pb-1">
            View All Films
          </span>
        </div>

        <div 
          className="relative aspect-[4/5] md:aspect-[21/9] w-full overflow-hidden group cursor-pointer"
          onClick={openModal}
        >
          <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
          
          <Image
            src="/images/_XYZ1252.webp"
            fill
            sizes="100vw"
            className="featured-img object-cover"
            alt="Featured story background"
          />

          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-90 group-hover:scale-100">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/30 bg-black/20 flex items-center justify-center text-white">
              <Play size={32} className="ml-2" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 text-white">
            <h2 className="featured-text text-4xl md:text-7xl font-serif mb-2 md:mb-4">
              ARJUN & MAYA
            </h2>
            <div className="featured-text flex gap-4 text-xs md:text-sm uppercase tracking-widest font-sans opacity-80">
              <span>JAIPUR</span>
              <span>·</span>
              <span>2026</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Wedding Film</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      <div 
        ref={modalRef} 
        className="fixed inset-0 z-[100] bg-black hidden flex-col justify-center items-center"
        style={{ opacity: 0 }}
      >
        {activeVideo && (
          <>
            {/* Top Bar with Close Button */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
              <div className="text-white">
                <h3 className="text-xl md:text-3xl font-serif">ARJUN & MAYA</h3>
                <p className="text-xs tracking-widest uppercase font-sans text-white/60">
                  JAIPUR · 2026
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="text-white hover:text-soft-grey transition-colors flex items-center gap-2 text-xs uppercase tracking-widest"
              >
                Close <X size={24} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full h-full max-h-screen">
              <Image
                src={activeVideo}
                fill
                sizes="100vw"
                className="object-contain"
                alt="Featured story film"
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-black/70 px-8 py-4 rounded-full border border-white/10">
                <button onClick={togglePlay} className="text-white hover:text-soft-grey transition-colors">
                  {isVideoPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <div className="w-[1px] h-6 bg-white/20" />
                <button onClick={toggleMute} className="text-white hover:text-soft-grey transition-colors">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
