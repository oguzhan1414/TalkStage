import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SceneTicker from "@/components/SceneTicker";
import HowItWorks from "@/components/HowItWorks";
import Bento from "@/components/Bento";
import WhySpekvia from "@/components/WhySpekvia";
import TrustStrip from "@/components/TrustStrip";
import SceneShelf from "@/components/SceneShelf";
import MivoSection from "@/components/MivoSection";
import DailyPath from "@/components/DailyPath";
import Pricing from "@/components/Pricing";
import HomeFaq from "@/components/HomeFaq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { HOME_FAQS } from "@/data/homeFaq";
import { faqSchema, webPageSchema } from "@/i18n/schema";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/",
    locale,
    title: t("Spekvia — Sesli İngilizce Konuşma Pratiği Uygulaması"),
    description: t("Gerçek hayat sahnelerini Mivo ile sesli prova et: havalimanı, otel, mülakat. Takıldığın cümle anında kendi dilinde düzeltilir. Ücretsiz başla."),
  });
}

export default async function Home({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(locale, "WebPage", "/", t("Spekvia — Sesli İngilizce Konuşma Pratiği Uygulaması"), t("Gerçek hayat sahnelerini Mivo ile sesli prova et: havalimanı, otel, mülakat. Takıldığın cümle anında kendi dilinde düzeltilir. Ücretsiz başla.")),
          faqSchema(locale, HOME_FAQS.map((f) => ({ q: t(f.q), a: t(f.a) })), "/"),
        ]}
      />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SceneTicker />
        <HowItWorks />
        <SceneShelf />
        <Bento />
        <DailyPath />
        <MivoSection />
        <WhySpekvia />
        <TrustStrip />
        <Pricing />
        <HomeFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
