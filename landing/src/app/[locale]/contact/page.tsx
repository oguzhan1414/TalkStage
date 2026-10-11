import ContactClient from "./ContactClient";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/contact",
    locale,
    title: t("İletişim & Destek — Spekvia"),
    description: t("Spekvia ile ilgili sorular, öneriler ve kurumsal talepler için bize ulaşın."),
  });
}

export default async function ContactPage({ params }: PageProps) {
  await pageLocale(params);
  return <ContactClient />;
}
