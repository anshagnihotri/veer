"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Do you travel for weddings?",
    answer: "Absolutely. While we are based in India, a significant portion of our work takes us across the globe. We've filmed weddings in Dubai, Italy, Thailand, and throughout Europe. Travel and accommodation are simply added to your customized collection.",
  },
  {
    question: "How long does it take to receive our films?",
    answer: "We believe in perfection over speed. Our editing process is highly meticulous, involving custom color grading, sound design, and narrative structuring. You can expect your final cinematic films within 12 to 16 weeks after your wedding.",
  },
  {
    question: "Do we choose the music for our film?",
    answer: "Music is the heartbeat of our cinematic style. We carefully license high-quality, emotive tracks that fit the mood and narrative of your specific day. While we welcome your vibe preferences, we retain creative control over the final soundtrack to ensure a cohesive masterpiece.",
  },
  {
    question: "What is your approach on the wedding day?",
    answer: "We are documentarians first. We blend into the background to capture genuine, unscripted moments as they happen. We only step in for light direction during your portrait sessions to ensure you look your absolute best.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-black text-ivory">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif mb-16 text-center">FREQUENTLY ASKED</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item border-b border-white/20 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="text-xl md:text-2xl font-serif group-hover:text-soft-grey transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={clsx(
                    "transition-transform duration-500",
                    openIndex === index ? "rotate-180 text-soft-grey" : "text-white/50"
                  )} 
                />
              </button>
              
              <div 
                className={clsx(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-sm md:text-base font-sans text-white/70 pt-2 pb-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}