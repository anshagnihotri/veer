"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Watching our film felt like reliving the magic all over again. Veer didn't just capture how the day looked, but exactly how it felt. Every frame is poetry.",
    couple: "MEERA & ADITYA",
    location: "UDAIPUR",
    image: "/images/_XYZ1051.webp",
  },
  {
    id: "2",
    quote: "We were worried about feeling awkward on camera, but his presence was so calming. The final result is a masterpiece that our family will treasure for generations.",
    couple: "SOPHIA & LIAM",
    location: "LAKE COMO",
    image: "/images/_XYZ1086.webp",
  },
];

export default function Stories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    gsap.to(".testimonial-content", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        gsap.to(".testimonial-content", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      },
    });
  };

  const prevTestimonial = () => {
    gsap.to(".testimonial-content", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        gsap.to(".testimonial-content", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      },
    });
  };

  return (
    <section ref={containerRef} className="py-16 md:py-20 bg-ivory text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-xs uppercase tracking-widest font-sans font-medium text-soft-grey mb-8 text-center md:text-left">
          Words from our couples
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative aspect-[4/5] w-3/4 max-w-sm md:w-full overflow-hidden">
              <Image
                key={testimonials[currentIndex].id}
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].couple}
                fill
                sizes="(max-width: 768px) 75vw, 30vw"
                className="object-cover testimonial-img animate-in fade-in zoom-in-95 duration-1000"
              />
            </div>
          </div>

          {/* Quote & Meta */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="testimonial-content">
              <p className="text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed mb-6 max-w-xl">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg md:text-xl font-serif uppercase">{testimonials[currentIndex].couple}</h3>
                <p className="text-xs uppercase tracking-widest font-sans text-soft-grey mt-2">
                  {testimonials[currentIndex].location} · Veer Couple
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
