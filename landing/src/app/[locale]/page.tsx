import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WorldMap from "@/components/home/WorldMap";
import Levels from "@/components/home/Levels";
import PriceFaq from "@/components/home/PriceFaq";
import FinalCta from "@/components/home/FinalCta";
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
    title: t("Spekvia — Hikâyeyle İngilizce Öğren, Mivo ile Konuş"),
    description: t("Her seviye tek bir hikâye: her gün kısa bir bölüm oku, kelimeleri ve dil bilgisini hikâyenin içinde öğren, ünite sonunda Mivo ile sesli konuş. Ücretsiz başla."),
  });
}

export default async function Home({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(locale, "WebPage", "/", t("Spekvia — Hikâyeyle İngilizce Öğren, Mivo ile Konuş"), t("Her seviye tek bir hikâye: her gün kısa bir bölüm oku, kelimeleri ve dil bilgisini hikâyenin içinde öğren, ünite sonunda Mivo ile sesli konuş. Ücretsiz başla.")),
          faqSchema(locale, HOME_FAQS.map((f) => ({ q: t(f.q), a: t(f.a) })), "/"),
        ]}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WorldMap />
        <Levels />
        <PriceFaq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
