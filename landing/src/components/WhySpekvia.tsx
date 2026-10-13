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
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Neden Spekvia")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">{t("Konuşmayı konuşarak öğrenirsin.")}</h2>
        </Reveal>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-layered">
            <div className="hidden grid-cols-[8rem_1fr_1fr] border-b border-line bg-paper text-[0.78rem] font-semibold sm:grid">
              <span className="px-6 py-4" />
              <span className="px-6 py-4 text-muted">{t("Ders kitabı ve ezber")}</span>
              <span className="bg-linear-to-r from-stage/10 to-purple-pop/10 px-6 py-4 text-stage">{t("Spekvia")}</span>
            </div>
            {ROWS.map((r) => (
              <div key={r.label} className="grid gap-3 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[8rem_1fr_1fr] sm:gap-0 sm:p-0">
                <p className="font-display text-lg font-bold text-heading sm:px-6 sm:py-6">{t(r.label)}</p>
                <p className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-muted sm:px-6 sm:py-6">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span>
                    <span className="sr-only">{t("Ders kitabı ve ezber")}: </span>
                    {t(r.old)}
                  </span>
                </p>
                <p className="flex items-start gap-2.5 rounded-2xl bg-linear-to-r from-stage/[0.06] to-purple-pop/[0.06] p-3 text-[0.95rem] font-medium leading-relaxed text-heading sm:rounded-none sm:px-6 sm:py-6">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald" strokeWidth={3} />
                  <span>
                    <span className="sr-only">{t("Spekvia")}: </span>
                    {t(r.now)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
