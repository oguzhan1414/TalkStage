import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RootShell from "@/components/RootShell";
import JsonLd from "@/components/JsonLd";
import { siteSchema } from "@/i18n/schema";
import { LOCALES, LOCALE_META, SITE_URL, isLocale } from "@/i18n/config";
import { getT, setRequestLocale } from "@/i18n/server";

export const dynamicParams = false;

const SITE_DESCRIPTION = "Gerçek hayat sahnelerini Mivo ile sesli prova et: havalimanı, otel, mülakat. Takıldığın cümle anında kendi dilinde düzeltilir. Ücretsiz başla.";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);

  const title = t("Spekvia — Sesli İngilizce Konuşma Pratiği Uygulaması");
  const description = t("Gerçek hayat sahnelerini Mivo ile sesli prova et: havalimanı, otel, mülakat. Takıldığın cümle anında kendi dilinde düzeltilir. Ücretsiz başla.");
  const ogAlt = t("Spekvia — Mivo ile sesli İngilizce sahneleri");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/og/og-${locale}.jpg`, width: 1200, height: 630, alt: ogAlt }],
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/og-${locale}.jpg`] },
    icons: { icon: "/brand/spekvia-app-icon.png", apple: "/brand/spekvia-app-icon.png" },
    // Already localized into 5 languages: do not let Chrome/Google offer to (mis)translate the page again.
    other: { google: "notranslate" },
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
  const t = getT(locale);
  return (
    <RootShell locale={locale}>
      <JsonLd data={siteSchema(locale, t(SITE_DESCRIPTION))} />
      {children}
    </RootShell>
  );
}
