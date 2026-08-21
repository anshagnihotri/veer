export default function HeroOverlay() {
  return (
    <div 
      className="gsap-overlay absolute inset-0 z-10 opacity-0 pointer-events-none"
      style={{
        background: `linear-gradient(
          to bottom,
          rgba(10, 9, 8, 0.05) 0%,
          rgba(10, 9, 8, 0) 40%,
          rgba(10, 9, 8, 0.65) 100%
        )`,
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)'
      }}
    />
  );
}