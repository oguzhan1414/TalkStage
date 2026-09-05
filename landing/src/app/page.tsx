import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveCorrectionTicker from "@/components/LiveCorrectionTicker";
import MobileAppShowcase from "@/components/MobileAppShowcase";
import ProblemContrast from "@/components/ProblemContrast";
import BentoStages from "@/components/BentoStages";
import SimulatorShowcase from "@/components/SimulatorShowcase";
import InteractiveVocabShowcase from "@/components/InteractiveVocabShowcase";
import InteractivePodcastShowcase from "@/components/InteractivePodcastShowcase";
import InteractiveGrammarShowcase from "@/components/InteractiveGrammarShowcase";
import CefrLevelJourney from "@/components/CefrLevelJourney";
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
        {/* 1. Hero: Dual 3D iPhone Showcase & Live Voice AI */}
        <Hero />

        {/* 2. Live AI Correction Engine Ticker */}
        <LiveCorrectionTicker />

        {/* 3. Real Mobile App Interactive Studio Showcase */}
        <MobileAppShowcase />

        {/* 4. Methodology: Geleneksel Kurslar vs TalkStage */}
        <ProblemContrast />

        {/* 5. The 5 Super-Pillars of TalkStage */}
        <BentoStages />

        {/* 6. Simulator Theater Showcase */}
        <SimulatorShowcase />

        {/* 7. Interactive 900 Core Words & SM-2 Flashcard Simulator */}
        <InteractiveVocabShowcase />

        {/* 8. Interactive Dual-Language Podcast Station */}
        <InteractivePodcastShowcase />

        {/* 9. Interactive 46-Topic CEFR Grammar Studio & Mindmaps */}
        <InteractiveGrammarShowcase />

        {/* 10. A1 to C2 CEFR Milestone Roadmap */}
        <CefrLevelJourney />

        {/* 11. Deep Analytical Feedback Showcase */}
        <FeedbackShowcase />

        {/* 12. Gamification & 3D Badges */}
        <GamificationShowcase />

        {/* 13. Social Proof & Reviews */}
        <Testimonials />

        {/* 14. Transparent Pricing */}
        <Pricing />

        {/* 15. Frequently Asked Questions */}
        <HomeFaq />

        {/* 16. High-Conversion Onboarding CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

