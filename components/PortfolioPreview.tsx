"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type MediaType = "image" | "video";

interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt?: string;
}

const previewMedia: MediaItem[] = [
  { id: "1", type: "image", src: "/images/054A3733.jpg", alt: "Wedding shot 1" },
  { id: "v1", type: "video", src: "/videos/00%20Reel.MP4", alt: "Wedding film snippet 1" },
  { id: "2", type: "image", src: "/images/111.jpg", alt: "Wedding shot 2" },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-medium text-white/50 mb-4">
          A Glimpse Into Our World
        </h2>
        <h3 className="text-4xl md:text-6xl font-serif">RECENT STORIES</h3>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
        {/* Horizontal 3-stack layout using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {previewMedia.map((item) => (
            <div 
              key={item.id} 
              className="relative overflow-hidden group rounded-lg cursor-pointer bg-[#111] aspect-[4/5]"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt || "Portfolio image"}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center px-6">
        <Link 
          href="/work" 
          className="group relative inline-flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.2em] font-sans font-medium border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          View All Projects
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
