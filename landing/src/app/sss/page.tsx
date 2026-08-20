import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sıkça Sorulan Sorular (SSS) — TalkStage",
  description:
    "TalkStage yapay zekâ sesli simülasyonu, gecikme süreleri, mülakat sahneleri, kelime sistemi ve abonelikler hakkında en çok merak edilen tüm sorular.",
};

export default function SssPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Sıkça Sorulan Sorular</span>
          </div>

          {/* Thought-Provoking 3D Visual Showcase (37_faq_knowledge_hub.png) */}
          <div className="relative mb-12 overflow-hidden rounded-[28px] border border-line bg-porcelain p-2 shadow-[var(--shadow-lifted)] sm:p-4">
            <Image
              src="/images/37_faq_knowledge_hub.png"
              alt="Zihin Labirentinden Aydınlığa: TalkStage Bilgi ve SSS Merkezi"
              width={1440}
              height={810}
              priority
              className="h-auto w-full rounded-[22px] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-line/60 bg-white/90 px-5 py-3 shadow-md backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="font-display text-sm font-bold text-heading sm:text-base">
                  Zihnindeki Kilitleri Çöz, Doğrudan Sahneye Çık
                </p>
                <p className="text-xs text-muted">
                  Konuşma refleksinden yapay zekâ ses gecikmesine tüm merak edilenler
                </p>
              </div>
              <span className="hidden rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo sm:inline-block">
                31 Soru & Yanıt
              </span>
            </div>
          </div>
        </div>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
