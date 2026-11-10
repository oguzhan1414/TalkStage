import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import OldWay from "@/components/home/OldWay";
import Day from "@/components/home/Day";
import MeetMivo from "@/components/home/MeetMivo";
import Stories from "@/components/home/Stories";
import Extras from "@/components/home/Extras";
import PriceFaq from "@/components/home/PriceFaq";
import FinalCta from "@/components/home/FinalCta";
import { HomeMotion } from "@/components/home/Pop";
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
      <HomeMotion>
        <main className="flex-1 overflow-x-clip bg-cream">
          <Hero />
          <Marquee
            items={[t("Hikâyeyle öğren."), t("Mivo ile konuş."), t("Günde on dakika"), t("A1’den C2’ye")]}
            className="poster relative z-30 -mx-4 -mt-6 -rotate-1 border-y-[2.5px] border-ink bg-ink py-3 text-[1.35rem] text-cream sm:py-4 sm:text-[1.9rem]"
          />
          <OldWay />
          <Day />
          <MeetMivo />
          <Stories />
          <Extras />
          <PriceFaq />
          <FinalCta />
        </main>
      </HomeMotion>
      <Footer />
    </>
  );
}
