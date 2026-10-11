import type { Metadata } from "next";
import { getT } from "@/i18n/server";
import { pageLocale, type PageProps } from "@/i18n/page";

// Utility page: keep it out of the index (no search value), but let crawlers follow its links.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return { title: `${t("Ücretsiz dene")} — Spekvia`, robots: { index: false, follow: true } };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
