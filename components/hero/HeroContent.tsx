export default function HeroContent() {
  return (
    <div className="flex w-full flex-col md:flex-row justify-between items-end pb-4 md:pb-8 relative">
      
      {/* Left Column */}
      <div className="flex w-full flex-col items-start md:w-1/2 z-10 pointer-events-auto">
        <div className="gsap-category mb-4 md:mb-6 flex items-center gap-3 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.12em] text-[#F5F1E9]/75">
          <span className="h-[1px] w-4 md:w-6 bg-[#F5F1E9]/50 block" />
          Wedding Photography + Films
        </div>
        
        <h1 className="flex flex-col text-[42px] leading-[0.85] tracking-[-0.04em] text-[#F5F1E9] md:text-[76px] lg:text-[100px]">
          <div className="overflow-hidden">
            <span className="gsap-heading-line block font-sans text-[12px] md:text-[16px] uppercase tracking-[0.15em] font-medium opacity-90 mb-1 md:mb-2 translate-y-full">
              For The
            </span>
          </div>
          <div className="overflow-hidden mb-1 md:mb-2">
            <span className="gsap-heading-line block font-serif font-medium translate-y-full">
              Love
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="gsap-heading-line block font-sans text-[12px] md:text-[16px] uppercase tracking-[0.15em] font-medium opacity-90 mb-1 md:mb-2 translate-y-full">
              That
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="gsap-heading-line block font-serif font-medium translate-y-full">
              Lasts.
            </span>
          </div>
        </h1>
        
        <div className="gsap-metadata mt-6 md:mt-8 text-[10px] uppercase tracking-[0.12em] opacity-65">
          Delhi · Mumbai · Worldwide
        </div>
        
        <a 
          href="#inquire" 
          className="gsap-cta interactive-element group mt-6 md:mt-8 flex h-[40px] md:h-[44px] w-[110px] md:w-[130px] items-center justify-center gap-2 rounded-full border border-[#F5F1E9]/70 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.05em] transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-[#F5F1E9] hover:text-[#11100E]"
        >
          Inquire
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>

      {/* Right Column / Bottom Center (DYNAMIC METADATA) */}
      <div className="relative flex w-full flex-row-reverse md:flex-col justify-between items-end mt-8 md:mt-0 md:w-[150px] pointer-events-auto h-[60px] md:h-[80px]">
        
        {/* Slide 1 Info */}
        <div className="gsap-meta-1 absolute top-0 right-0 text-right text-[10px] uppercase leading-relaxed tracking-[0.08em] md:text-[11px] opacity-80">
          Recently<br />
          <span className="text-white">Ananya + Arjun</span><br />
          Udaipur · 2026
        </div>

        {/* Slide 2 Info (Hidden by default) */}
        <div className="gsap-meta-2 absolute top-0 right-0 text-right text-[10px] uppercase leading-relaxed tracking-[0.08em] md:text-[11px] opacity-0">
          Recently<br />
          <span className="text-white">Priya + Rahul</span><br />
          Lake Como · 2026
        </div>

        {/* Slide 3 Info (Hidden by default) */}
        <div className="gsap-meta-3 absolute top-0 right-0 text-right text-[10px] uppercase leading-relaxed tracking-[0.08em] md:text-[11px] opacity-0">
          Recently<br />
          <span className="text-white">Sneha + Vikram</span><br />
          Jaipur · 2027
        </div>

      </div>

      {/* Center Scroll Indicator */}
      <div className="gsap-scroll-indicator absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] tracking-[0.16em] opacity-60 pointer-events-none md:bottom-4">
        SCROLL
        <div className="h-6 w-[1px] overflow-hidden bg-[#F5F1E9]/20">
          <div className="h-full w-full bg-white animate-[scrollDown_2s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
        </div>
      </div>

    </div>
  );
}