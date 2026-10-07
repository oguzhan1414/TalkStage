import Link from 'next/link';
import { Check } from 'lucide-react';
import Reveal from './Reveal';

const FREE = [
  'Günde 1 sesli sahne, 5 dakikaya kadar',
  'Anlık düzeltme ve hata defteri',
  'Kelime kartları ve aralıklı tekrar',
  'Okuma hikâyeleri',
];

const PRO = [
  'Sınırsız sesli sahne ve Mivo ile serbest sohbet',
  '30 dakikaya kadar uzun oturumlar',
  'Her sahneyi farklı sürprizlerle tekrar oyna, yıldız topla',
  'Tüm sahnelere erişim',
];

export default function Pricing() {
  return (
    <section id="fiyatlandirma" className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">Fiyat</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-6xl">
            Ücretsiz başla. Sınırı kaldırmak istersen Pro.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[28px] border border-line bg-paper p-7 sm:p-9">
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-heading">Ücretsiz</h3>
              <p className="mt-2 text-[0.95rem] text-body">Her gün biraz konuşmak için yeterli.</p>
              <ul className="mt-7 flex-1 space-y-3.5">
                {FREE.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-snug text-heading">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="mt-9 inline-flex items-center justify-center rounded-full border border-heading/15 bg-white px-6 py-3.5 text-[0.95rem] font-bold text-heading transition-colors hover:border-stage hover:text-stage"
              >
                Ücretsiz başla
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-9">
              <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-3" />
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Pro</h3>
              <p className="mt-2 text-[0.95rem] text-white/70">Sahneleri ve Mivo’yu sınırsız kullan.</p>
              <ul className="mt-7 flex-1 space-y-3.5">
                {PRO.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-yellow" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className="mt-9 inline-flex items-center justify-center rounded-full bg-slate-yellow px-6 py-3.5 text-[0.95rem] font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Önce ücretsiz dene
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          Pro fiyatı uygulamada, App Store ve Google Play’in kendi fiyatıyla gösterilir. Aboneliği mağaza hesabından
          istediğin zaman iptal edebilirsin.
        </p>
      </div>
    </section>
  );
}
