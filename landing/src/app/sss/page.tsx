import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sıkça Sorulan Sorular (SSS) — Spekvia",
  description:
    "Sahneler, Mivo, anlık düzeltme, kelime çalışması, abonelik ve gizlilik hakkında en çok sorulan sorular.",
};

export default function SssPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-36 bg-paper">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-indigo transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-heading font-semibold">Sıkça Sorulan Sorular</span>
          </div>

          <div className="mb-4 flex items-center gap-5 rounded-[28px] border border-line bg-paper p-5 sm:p-7">
            <Image src="/mivo/thinking.webp" alt="" width={750} height={900} className="h-24 w-auto shrink-0 sm:h-32" priority />
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">Sıkça sorulan sorular</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-body sm:text-base">Aradığını bulamazsan bize yaz, Mivo’yu da yormayalım.</p>
            </div>
          </div>
        </div>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
