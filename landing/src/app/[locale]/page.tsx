import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SceneShelf from "@/components/SceneShelf";
import MivoSection from "@/components/MivoSection";
import DailyPath from "@/components/DailyPath";
import Pricing from "@/components/Pricing";
import HomeFaq from "@/components/HomeFaq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/",
    locale,
    title: t("Spekvia — İngilizceyi sahnede konuş, Mivo anında düzeltsin"),
    description: t(
      "Havalimanı, otel, iş görüşmesi... Gerçek hayat sahnelerini Mivo ile sesli prova et. Takıldığın cümleyi anında Türkçe açıklamayla düzeltir; her oynayışta sahne farklı bir sürprizle gelir.",
    ),
  });
}

export default async function Home({ params }: PageProps) {
  await pageLocale(params);
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
