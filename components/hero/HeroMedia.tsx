import Image from 'next/image';

export default function HeroMedia() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-[#0A0908]">
      
      {/* 
        IMAGE 1: The Base Image (Visible by default)
      */}
      <div className="gsap-media-1 absolute inset-0 h-full w-full origin-center opacity-0">
        <div className="gsap-media-inner h-full w-full scale-[1.04]">
          <img
            src="/images/333.jpg"
            alt="Cinematic memory 1"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 
        IMAGE 2: First Crossfade (Hidden by default)
      */}
      <div className="gsap-media-2 absolute inset-0 h-full w-full origin-center opacity-0">
        <div className="gsap-media-inner h-full w-full scale-[1.04]">
          <img
            src="/images/Anjali.jpg.jpg"
            alt="Cinematic memory 2"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 
        IMAGE 3: Second Crossfade (Hidden by default)
      */}
      <div className="gsap-media-3 absolute inset-0 h-full w-full origin-center opacity-0">
        <div className="gsap-media-inner h-full w-full scale-[1.04]">
          <img
            src="/images/DSC01369.jpg"
            alt="Cinematic memory 3"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}