"use client";

import Image from "next/image";
import { useState } from "react";

type MediaType = "image" | "video";

interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt?: string;
}

const portfolioMedia: MediaItem[] = [
  { id: "1", type: "image", src: "/images/054A3733.webp", alt: "Wedding shot 1" },
  { id: "v1", type: "image", src: "/images/001 (69).webp", alt: "Wedding film snippet 1" },
  { id: "2", type: "image", src: "/images/054A4027.webp", alt: "Wedding shot 2" },
  { id: "3", type: "image", src: "/images/111_converted.webp", alt: "Wedding shot 3" },
  { id: "4", type: "image", src: "/images/1.webp", alt: "Wedding shot 4" },
  { id: "v2", type: "image", src: "/images/_XYZ1252.webp", alt: "Wedding film snippet 2" },
  { id: "5", type: "image", src: "/images/333.webp", alt: "Wedding shot 5" },
  { id: "6", type: "image", src: "/images/DSC01369.webp", alt: "Wedding shot 6" },
  { id: "7", type: "image", src: "/images/DSC02282.webp", alt: "Wedding shot 7" },
  { id: "v3", type: "image", src: "/images/_VEE1074.webp", alt: "Wedding film snippet 3" },
  { id: "8", type: "image", src: "/images/DSC02880.webp", alt: "Wedding shot 8" },
  { id: "9", type: "image", src: "/images/DSC_0361.webp", alt: "Wedding shot 9" },
  { id: "10", type: "image", src: "/images/_DSC8508.webp", alt: "Wedding shot 10" },
  { id: "v4", type: "image", src: "/images/Anjali.webp", alt: "Wedding film snippet 4" },
  { id: "11", type: "image", src: "/images/_PR09779.webp", alt: "Wedding shot 11" },
  { id: "12", type: "image", src: "/images/_PR09941.webp", alt: "Wedding shot 12" },
  { id: "13", type: "image", src: "/images/_XYZ1051.webp", alt: "Wedding shot 13" },
  { id: "14", type: "image", src: "/images/_XYZ1086.webp", alt: "Wedding shot 14" },
  { id: "15", type: "image", src: "/images/_XYZ1112.webp", alt: "Wedding shot 15" },
  { id: "16", type: "image", src: "/images/054A3911.webp", alt: "Wedding shot 16" },
];

export default function MasonryGrid() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-24">
      {/* CSS Columns perfectly mimic Pinterest masonry layout without JS heavy calculations */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        
        {portfolioMedia.map((item) => (
          <div 
            key={item.id} 
            className="break-inside-avoid relative overflow-hidden group rounded-lg cursor-pointer bg-[#111]"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt || "Portfolio image"}
                width={800}
                height={1200}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            )}
            
            {/* Subtle Overlay Effect */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}

      </div>
    </div>
  );
}
