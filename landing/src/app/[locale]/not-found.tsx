"use client";

import Image from "next/image";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useT } from "@/i18n/client";

export default function NotFound() {
  const t = useT();
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center bg-paper px-6 pb-24 pt-40 text-center">
        <Image src="/mivo/thinking.webp" alt="" width={750} height={900} className="h-40 w-auto" />
        <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-indigo">404</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">{t("Sayfa bulunamadı")}</h1>
        <p className="mt-3 max-w-md text-body">{t("Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-stage px-7 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
        >{t("Ana sayfaya dön")}</Link>
      </main>
      <Footer />
    </>
  );
}
