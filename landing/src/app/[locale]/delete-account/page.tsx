import LegalDocument from "@/components/LegalDocument";
import { DELETE_DOC } from "@/data/legalContent";
import { getT } from "@/i18n/server";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";

/** Public account/data deletion page — Google Play's Data safety form asks for this URL. */
export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({ path: "/delete-account", locale, title: t(DELETE_DOC.metaTitle), description: t(DELETE_DOC.metaDesc) });
}

export default async function DeleteAccountPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  return <LegalDocument doc={DELETE_DOC} path="/delete-account" locale={locale} />;
}
