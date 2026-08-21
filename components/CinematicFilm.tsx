"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Play, X, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const openModal = () => {
    setActiveVideo("/images/_XYZ1051.webp");
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
      // Zoom effect on scroll
      gsap.fromTo(
        ".cinema-bg",
        { scale: 1.2 },
        {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="relative w-full h-[80vh] md:h-[100dvh] overflow-hidden group cursor-pointer" onClick={openModal}>
        <div className="absolute inset-0 z-0 cinema-bg">
          <img
            src="/images/_XYZ1112.webp"
            className="w-full h-full object-cover opacity-80"
            alt="Cinematic background"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-ivory">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center transition-transform duration-500 group-hover:scale-125 group-hover:bg-white/10 mb-8">
            <Play size={40} className="ml-2 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <h2 className="text-sm md:text-base tracking-[0.3em] uppercase font-sans font-light">
            Watch the Film
          </h2>
        </div>
      </section>

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
                <h3 className="text-xl md:text-3xl font-serif">CINEMATIC FILM</h3>
                <p className="text-xs tracking-widest uppercase font-sans text-white/60">
                  Experience the magic
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
              <img
                src={activeVideo}
                className="w-full h-full object-contain"
                alt="Cinematic film"
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-black/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
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
    </>
  );
}
