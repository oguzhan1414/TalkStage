import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@/lib/analytics";
import { I18nProvider } from "@/i18n/client";
import { getCatalog } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import "../app/globals.css";

// `latin-ext` is required for Turkish (ğ, ş, ı, İ, ö, ü, ç) — without it those
// glyphs silently fall back to the system font. It also covers es/pt/de accents.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** The <html>/<body> shell shared by the localized site and the (Turkish) web app. */
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html
      lang={locale}
      // The site is already localized (own language switcher): stop browsers' automatic page translation from mangling it.
      translate="no"
      className={`notranslate ${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full overflow-x-clip antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col overflow-x-clip bg-paper text-body selection:bg-stage selection:text-white">
        <I18nProvider locale={locale} catalog={getCatalog(locale)} fallback={getCatalog("en")}>
          <AuthProvider>
            <Analytics />
            <ScrollToTop />
            {children}
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
