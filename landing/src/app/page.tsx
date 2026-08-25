import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SimulatorShowcase from "@/components/SimulatorShowcase";
import LiveCorrectionTicker from "@/components/LiveCorrectionTicker";
import ProblemContrast from "@/components/ProblemContrast";
import BentoStages from "@/components/BentoStages";
import CefrLevelJourney from "@/components/CefrLevelJourney";
import CoreFeatures from "@/components/CoreFeatures";
import HowItWorks from "@/components/HowItWorks";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import FeedbackShowcase from "@/components/FeedbackShowcase";
import GamificationShowcase from "@/components/GamificationShowcase";
import Testimonials from "@/components/Testimonials";
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
        <SimulatorShowcase />
        <LiveCorrectionTicker />
        <ProblemContrast />
        <BentoStages />
        <CefrLevelJourney />
        <CoreFeatures />
        <HowItWorks />
        <MobileAppShowcase />
        <FeedbackShowcase />
        <GamificationShowcase />
        <Testimonials />
        <Pricing />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
