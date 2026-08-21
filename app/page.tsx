import Navigation from "@/components/Navigation";
import Hero from "@/components/hero/Hero";
import Introduction from "@/components/Introduction";
import FeaturedStory from "@/components/FeaturedStory";
import SelectedFilms from "@/components/SelectedFilms";
import PortfolioPreview from "@/components/PortfolioPreview";
import Philosophy from "@/components/Philosophy";
import CinematicFilm from "@/components/CinematicFilm";
import AboutVeer from "@/components/AboutVeer";
import Marquee from "@/components/Marquee";
import Stories from "@/components/Stories";
import TheExperience from "@/components/TheExperience";
import Credibility from "@/components/Credibility";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-ivory">
        <Hero />
        <Introduction />
        <FeaturedStory />
        <SelectedFilms />
        <PortfolioPreview />
        <Philosophy />
        <CinematicFilm />
        <AboutVeer />
        <Marquee />
        <Stories />
        <TheExperience />
        <Credibility />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}