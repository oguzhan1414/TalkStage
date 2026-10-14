import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { getT } from "@/i18n/server";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/i18n/schema";
import { FAQ_ITEMS } from "@/data/faqData";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";
import { tr } from "@/i18n/shared";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/faq",
    locale,
    title: t("Sıkça Sorulan Sorular — Spekvia"),
    description: t("Spekvia nasıl çalışır? Ücretsiz mi, Pro neleri kapsar, sesim nasıl işlenir? Sahneler, Mivo, kelime çalışması ve abonelik hakkında en çok sorulanlar."),
  });
}

export default async function SssPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd data={[
        webPageSchema(locale, "WebPage", "/faq", t("Sıkça Sorulan Sorular — Spekvia"), t("Spekvia nasıl çalışır? Ücretsiz mi, Pro neleri kapsar, sesim nasıl işlenir? Sahneler, Mivo, kelime çalışması ve abonelik hakkında en çok sorulanlar.")),
        breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("Sıkça Sorulan Sorular"), path: "/faq" }]),
      ]} />
      <JsonLd data={faqSchema(locale, FAQ_ITEMS.map((f) => ({ q: t(f.question), a: t(f.answer) })), "/faq")} />
      <Navbar />
      <main className="flex-1 bg-white pb-20 sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana Sayfa"), href: "/" }, { label: t("Sıkça Sorulan Sorular") }]}
          eyebrow={t("Sıkça Sorulan Sorular")}
          title={t("Başlamadan önce akla gelenler")}
          intro={t("Sahneler, Mivo, düzeltmeler, kelime çalışması ve abonelik hakkında en çok sorulanlar.")}
          art="notebook"
          tint="mint"
        />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
