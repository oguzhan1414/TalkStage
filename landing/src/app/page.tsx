import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SceneShelf from "@/components/SceneShelf";
import MivoSection from "@/components/MivoSection";
import DailyPath from "@/components/DailyPath";
import Pricing from "@/components/Pricing";
import HomeFaq from "@/components/HomeFaq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SceneShelf />
        <MivoSection />
        <DailyPath />
        <Pricing />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
