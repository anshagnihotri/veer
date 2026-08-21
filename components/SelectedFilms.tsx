"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Play, X, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const films = [
  {
    id: "1",
    couple: "AKASH & TANUSHREE",
    location: "UDAIPUR",
    year: "2024",
    image: "/images/1.jpg",
    video: "/videos/Akash%20&%20Tanushree%20Wedding%20Teaser%20Vertical.mov",
  },
  {
    id: "2",
    couple: "AYUSH & AKSHITA",
    location: "LAKE COMO",
    year: "2024",
    image: "/images/111.jpg",
    video: "/videos/Ayush%20&%20Akshita%20Engagement%20Reel.mov",
  },
  {
    id: "3",
    couple: "DIKSHANT & BANDHUTA",
    location: "DUBAI",
    year: "2024",
    image: "/images/2.jpg",
    video: "/videos/Dikshant%20&%20Bandhuta%20Teaser.mp4",
  },
  {
    id: "4",
    couple: "HARSHAL & KRITIKA",
    location: "GOA",
    year: "2024",
    image: "/images/333.jpg",
    video: "/videos/Harshal%20X%20Kritika%20Highlight.mp4",
  },
];

export default function SelectedFilms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeFilm, setActiveFilm] = useState<typeof films[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".film-card");
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
          },
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const openModal = (film: typeof films[0]) => {
    setActiveFilm(film);
    setIsPlaying(true);
    setIsMuted(false);
    document.body.style.overflow = "hidden";

    // Zoom animation
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", display: "flex" }
    );
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActiveFilm(null);
        document.body.style.overflow = "";
        gsap.set(modalRef.current, { display: "none" });
      }
    });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
    <div className="relative w-full">
      <section ref={containerRef} id="films" className="py-24 bg-black text-ivory overflow-hidden relative">
        <div className="px-6 md:px-12 mb-12">
          <h2 className="text-4xl md:text-6xl font-serif">SELECTED FILMS</h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollWrapperRef}
          className="flex md:flex-row flex-col gap-8 md:gap-16 px-6 md:px-12 w-[100vw] md:w-[400vw] relative -translate-y-2.5"
        >
          {films.map((film) => (
            <div 
              key={film.id} 
              className="film-card w-full md:w-[50vw] lg:w-[40vw] flex-shrink-0 group cursor-pointer"
              onClick={() => openModal(film)}
            >
              <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden mb-6">
                <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                
                <Image
                  src={film.image}
                  alt={film.couple}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white">
                    <Play size={24} className="ml-1" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-4xl font-serif mb-2">{film.couple}</h3>
                  <p className="text-xs tracking-widest uppercase font-sans text-white/60">
                    {film.location}
                  </p>
                </div>
                <div className="text-xs tracking-widest uppercase font-sans text-white/60 mt-1">
                  {film.year}
                </div>
              </div>
            </div>
          ))}

          {/* View All Projects Card */}
          <div className="film-card w-full md:w-[50vw] lg:w-[40vw] flex-shrink-0 flex flex-col items-center justify-center cursor-pointer group">
            <Link href="/work" className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowRight size={32} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif mb-4 group-hover:italic transition-all duration-300">
                VIEW ALL PROJECTS
              </h3>
              <p className="text-xs tracking-widest uppercase font-sans text-white/50">
                Explore our full portfolio
              </p>
            </Link>
          </div>

        </div>
      </section>
    </div>

      {/* Full Screen Video Modal */}
      <div 
        ref={modalRef} 
        className="fixed inset-0 z-[100] bg-black hidden flex-col justify-center items-center"
        style={{ opacity: 0 }}
      >
        {activeFilm && (
          <>
            {/* Top Bar with Close Button */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
              <div className="text-white">
                <h3 className="text-xl md:text-3xl font-serif">{activeFilm.couple}</h3>
                <p className="text-xs tracking-widest uppercase font-sans text-white/60">
                  {activeFilm.location} · {activeFilm.year}
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
              <video
                ref={videoRef}
                src={activeFilm.video}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-black/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
                <button onClick={togglePlay} className="text-white hover:text-soft-grey transition-colors">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
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
