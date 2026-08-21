export default function HeroScrollIndicator() {
  return (
    <div className="gsap-scroll absolute bottom-[20px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
      <span className="text-[9px] uppercase tracking-[0.16em] text-[#F4E9C8]/80">
        Scroll
      </span>
      <div className="h-[30px] md:h-[40px] w-[1px] overflow-hidden bg-[#F4E9C8]/20">
        <div className="h-full w-full bg-[#F4E9C8]/80 animate-[scrollDown_2s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
      </div>
    </div>
  );
}