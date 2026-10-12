import LegalDocument from "@/components/LegalDocument";
import { PRIVACY_DOC } from "@/data/legalContent";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({ path: "/privacy", locale, title: t(PRIVACY_DOC.metaTitle), description: t(PRIVACY_DOC.metaDesc) });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  return <LegalDocument doc={PRIVACY_DOC} path="/privacy" locale={locale} />;
}
