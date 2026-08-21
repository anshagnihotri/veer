export default function HeroVideo() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-[espresso]">
      <div className="gsap-video absolute inset-0 h-full w-full origin-center opacity-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-center"
          poster="/images/hero-poster.jpg"
        >
          {/* Replace with actual wedding footage */}
          <source src="/videos/veer-wedding-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Cinematic Overlay */}
      <div 
        className="gsap-overlay absolute inset-0 opacity-0 pointer-events-none z-10"
        style={{
          backgroundColor: 'rgba(20, 12, 8, 0.15)',
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.08) 50%,
            rgba(0,0,0,0.48) 100%
          )`
        }}
      />
    </div>
  );
}