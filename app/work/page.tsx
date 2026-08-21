import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MasonryGrid from "@/components/MasonryGrid";

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#050505] text-white min-h-screen pt-32 md:pt-48 pb-12">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12 md:mb-20 relative z-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-medium text-white/50 mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Stories Worth Remembering
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-tight leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            OUR WORK
          </h1>
        </div>

        {/* Dynamic Pinterest-Style Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <MasonryGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
