import LegalDocument from "@/components/LegalDocument";
import { TERMS_DOC } from "@/data/legalContent";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({ path: "/terms", locale, title: t(TERMS_DOC.metaTitle), description: t(TERMS_DOC.metaDesc) });
}

export default async function TermsPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  return <LegalDocument doc={TERMS_DOC} path="/terms" locale={locale} />;
}
