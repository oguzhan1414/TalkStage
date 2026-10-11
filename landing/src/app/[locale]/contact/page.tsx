import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/i18n/schema";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/contact",
    locale,
    title: t("İletişim — Spekvia Destek ve Kurumsal"),
    description: t("Spekvia ekibine ulaş: kullanıcı desteği için destek@spekvia.com, kurumsal talepler ve toplu lisanslar için b2b@spekvia.com adreslerine yazabilirsin."),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(locale, "ContactPage", "/contact", t("İletişim — Spekvia Destek ve Kurumsal"), t("Spekvia ekibine ulaş: kullanıcı desteği için destek@spekvia.com, kurumsal talepler ve toplu lisanslar için b2b@spekvia.com adreslerine yazabilirsin.")),
          breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("İletişim & Destek"), path: "/contact" }]),
        ]}
      />
      <ContactClient />
    </>
  );
}
