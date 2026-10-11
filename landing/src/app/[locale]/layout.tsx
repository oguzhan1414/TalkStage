import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RootShell from "@/components/RootShell";
import { LOCALES, LOCALE_META, SITE_URL, isLocale } from "@/i18n/config";
import { getT, setRequestLocale } from "@/i18n/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);

  const title = t("Spekvia — İngilizceyi sahnede konuş, Mivo anında düzeltsin");
  const description = t(
    "Havalimanı, otel, iş görüşmesi... Gerçek hayat sahnelerini Mivo ile sesli prova et. Takıldığın cümleyi anında Türkçe açıklamayla düzeltir; her oynayışta sahne farklı bir sürprizle gelir.",
  );
  const ogAlt = t("Spekvia — Mivo ile sesli İngilizce sahneleri");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: ogAlt }],
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
    icons: { icon: "/brand/spekvia-app-icon.png", apple: "/brand/spekvia-app-icon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <RootShell locale={locale}>{children}</RootShell>;
}
