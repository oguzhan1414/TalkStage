import Image from 'next/image';
import { Check, X } from 'lucide-react';

import Reveal from './Reveal';
import { getT } from '@/i18n/server';
import { tr } from '@/i18n/shared';

const ROWS = [
  {
    label: tr("Konuşma"),
    old: tr("Cümle ezberlersin, karşında kimse yoktur."),
    now: tr("Her sahnede karşında Mivo var; cevabı sen bulursun."),
  },
  {
    label: tr("Düzeltme"),
    old: tr("Hatanı çoğu zaman sonradan, bazen hiç öğrenemezsin."),
    now: tr("Takıldığın cümle anında düzeltilir, nedeni kendi dilinde açıklanır."),
  },
  {
    label: tr("Tekrar"),
    old: tr("Neyi unuttuğunu kendin takip edersin."),
    now: tr("Hatalar Hata defterim’e, kelimeler tekrar sırasına düşer."),
  },
  {
    label: tr("Seviye"),
    old: tr("Herkes aynı üniteden başlar."),
    now: tr("Seviye belirleme seni A1’den C2’ye uzanan yolda doğru basamağa koyar."),
  },
];

export default function WhySpekvia() {
  const t = getT();
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[88rem]">
        <Reveal className="mx-auto max-w-3xl px-1 pb-12 text-center sm:pb-16">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Neden Spekvia")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1] tracking-[-0.035em] text-heading sm:text-6xl">{t("Konuşmayı konuşarak öğrenirsin.")}</h2>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-5">
          {/* the old way: flat and quiet */}
          <Reveal>
            <div className="h-full rounded-[2rem] bg-[#f1f0f6] p-6 sm:rounded-[2.5rem] sm:p-10">
              <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">{t("Ders kitabı ve ezber")}</p>
              <ul className="mt-6 divide-y divide-heading/10">
                {ROWS.map((r) => (
                  <li key={r.label} className="py-5 first:pt-0 last:pb-0">
                    <p className="font-display text-lg font-bold tracking-tight text-heading/55">{t(r.label)}</p>
                    <p className="mt-1.5 flex items-start gap-2.5 text-[1rem] leading-relaxed text-heading/55">
                      <X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={3} />
                      {t(r.old)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Spekvia: loud, with Mivo celebrating */}
          <Reveal delay={100}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-linear-to-br from-[#e1d9ff] via-[#eadfff] to-[#ffdbea] p-6 pb-40 shadow-lifted sm:rounded-[2.5rem] sm:p-10 sm:pb-10">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
              <p className="relative font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stage">{t("Spekvia")}</p>
              <ul className="relative mt-6 divide-y divide-heading/10 sm:pr-44 lg:pr-48">
                {ROWS.map((r) => (
                  <li key={r.label} className="py-5 first:pt-0 last:pb-0">
                    <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-heading">{t(r.label)}</p>
                    <p className="mt-1.5 flex items-start gap-2.5 text-[1.02rem] font-medium leading-relaxed text-heading">
                      <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald text-white">
                        <Check className="h-3 w-3" strokeWidth={4} />
                      </span>
                      {t(r.now)}
                    </p>
                  </li>
                ))}
              </ul>
              <div aria-hidden className="pointer-events-none absolute -bottom-6 right-2 w-36 sm:right-4 sm:w-48 lg:w-56">
                <Image src="/mivo/stops/mivo_stop_cheer.webp" alt="" width={640} height={800} sizes="224px" className="h-auto w-full drop-shadow-[0_24px_28px_rgba(21,18,58,0.3)]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
