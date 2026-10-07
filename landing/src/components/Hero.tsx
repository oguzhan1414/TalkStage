import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import HeroStage from '@/components/HeroStage';
import HeroCtaTracker from '@/components/HeroCtaTracker';

const FACTS = [
  { value: '21', label: 'sahne · A1–B2' },
  { value: '40', label: 'podcast bölümü' },
  { value: '5', label: 'dilde açıklama' },
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      <HeroStage />

      {/* Copy sits above the scene; bottom padding reserves room for the stage layers on small screens */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-[33rem] pt-28 sm:px-8 sm:pb-[34rem] lg:pb-28 lg:pt-32">
        <div className="max-w-[40rem] lg:max-w-[34rem] xl:max-w-[38rem]">
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-yellow">
            Sesli İngilizce sahneleri · Mivo ile
          </p>

          <h1 className="mt-5 text-balance font-display text-[3.2rem] font-extrabold leading-[0.96] tracking-[-0.035em] sm:text-[4.6rem] lg:text-[5.2rem]">
            Anlıyorsun.
            <br />
            Şimdi{' '}
            <span className="relative inline-block">
              <span className="relative z-10">konuş.</span>
              <span
                aria-hidden
                className="absolute -inset-x-2 bottom-1 z-0 h-[0.34em] -rotate-1 rounded-[3px] bg-slate-yellow sm:bottom-2"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-[32rem] text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
            Mivo, gerçek hayat sahnelerinde karşındaki karakteri oynar. Sen sesli konuşursun; takıldığın cümleyi anında, kendi
            dilinde açıklayarak düzeltir.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <HeroCtaTracker>
              <Link
                href="/onboarding"
                className="group inline-flex items-center gap-2.5 rounded-full bg-slate-yellow px-8 py-4 text-base font-bold text-ink shadow-[0_18px_40px_-14px_rgba(255,194,31,0.65)] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Ücretsiz dene
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </HeroCtaTracker>
            <Link
              href="#sahneler"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-white underline-offset-4 hover:underline"
            >
              Sahnelere göz at
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-2xl font-extrabold tracking-tight">{fact.value}</dd>
                <dd className="text-sm text-white/65">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
