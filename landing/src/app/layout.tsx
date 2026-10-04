import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@/lib/analytics";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talkstage.app"),
  title: "TalkStage — Gramer Ezberlemeyi Bırak, Gerçek Sahnede Konuş",
  description:
    "Yazılımcı standup'ı, FAANG iş mülakatı veya vize görüşmesi... Yapay zekâ ile canlı rol yap, takıldığın anda Türkçe anlık teşhisle özgüven kazan.",
  openGraph: {
    title: "TalkStage — Gramer Ezberlemeyi Bırak, Gerçek Sahnede Konuş",
    description:
      "Senaryo bazlı, ultra düşük gecikmeli sesli İngilizce konuşma simülatörü. Sahneni seç, canlı konuş, anında düzelt.",
    images: ["/images/03_hero_3d_mockup.jpg"],
    locale: "tr_TR",
    type: "website",
  },
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
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} h-full overflow-x-hidden antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white text-body selection:bg-pink-pop selection:text-white">
        <AuthProvider>
          <Analytics />
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
