import Link from '@/i18n/Link';
import { Check } from 'lucide-react';
import Reveal from './Reveal';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";

const FREE = [
  tr("Günde 1 sesli sahne, 5 dakikaya kadar"),
  tr("Anlık düzeltme ve hata defteri"),
  tr("Kelime kartları ve aralıklı tekrar"),
  tr("Okuma hikâyeleri"),
];

const PRO = [
  tr("Sınırsız sesli sahne ve Mivo ile serbest sohbet"),
  tr("30 dakikaya kadar uzun oturumlar"),
  tr("Her sahneyi farklı sürprizlerle tekrar oyna, yıldız topla"),
  tr("Tüm sahnelere erişim"),
];

export default function Pricing() {
  const t = getT();
  return (
    <section id={anchorId("pricing", getLocale())} className="relative scroll-mt-24 overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.12),transparent_65%)] blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Fiyat")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Ücretsiz başla. Sınırı kaldırmak istersen Pro.")}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[28px] border border-white/80 bg-paper/80 p-7 shadow-layered backdrop-blur-xl sm:p-9">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-heading">{t("Ücretsiz")}</h3>
              <p className="mt-2 text-[0.95rem] text-body">{t("Her gün biraz konuşmak için yeterli.")}</p>
              <ul className="mt-7 flex-1 space-y-3.5">
                {FREE.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-snug text-heading">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                    {t(item)}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="mt-9 inline-flex items-center justify-center rounded-full border border-heading/15 bg-white px-6 py-3.5 text-[0.95rem] font-bold text-heading transition-colors hover:border-stage hover:text-stage"
              >{t("Ücretsiz başla")}</Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-linear-to-br from-stage via-[#5b4bf0] to-purple-pop p-7 text-white shadow-lifted sm:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
              <h3 className="relative font-display text-2xl font-extrabold tracking-tight">{t("Pro")}</h3>
              <p className="relative mt-2 text-[0.95rem] text-white/80">{t("Sahneleri ve Mivo’yu sınırsız kullan.")}</p>
              <ul className="relative mt-7 flex-1 space-y-3.5">
                {PRO.map((item) => (
                  <li key={t(item)} className="flex gap-3 text-[0.97rem] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="relative mt-9 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-[0.95rem] font-bold text-stage shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
              >{t("Önce ücretsiz dene")}</Link>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted">{t("Pro fiyatı uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir. Aboneliği mağaza hesabından istediğin zaman iptal edebilirsin.")}</p>
      </div>
    </section>
  );
}
