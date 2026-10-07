import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@/lib/analytics";
import "./globals.css";

// `latin-ext` is required for Turkish (ğ, ş, ı, İ, ö, ü, ç) — without it those
// glyphs silently fall back to the system font.
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

const TITLE = "TalkStage — İngilizceyi sahnede konuş, Mivo anında düzeltsin";
const DESCRIPTION =
  "Havalimanı, otel, iş görüşmesi... Gerçek hayat sahnelerini Mivo ile sesli prova et. Takıldığın cümleyi anında Türkçe açıklamayla düzeltir; her oynayışta sahne farklı bir sürprizle gelir.";

export const metadata: Metadata = {
  metadataBase: new URL("https://talkstage.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "TalkStage — Mivo ile sesli İngilizce sahneleri" }],
    locale: "tr_TR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] },
  icons: {
    icon: "/brand/talkstage-app-icon.png",
    apple: "/brand/talkstage-app-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full overflow-x-hidden antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-paper text-body selection:bg-stage selection:text-white">
        <AuthProvider>
          <Analytics />
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
