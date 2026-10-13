import Link from '@/i18n/Link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import HeroStage from '@/components/HeroStage';
import HeroCtaTracker from '@/components/HeroCtaTracker';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

export default function Hero() {
  const t = getT();
  return (
    <section id={anchorId("top", getLocale())} className="relative isolate overflow-hidden bg-paper">
      {/* two soft colour fields behind the text column; the scene on the right carries the rest */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.26),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(239,93,168,0.16),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:justify-center lg:pb-20">
        <div className="max-w-[35rem] lg:w-[44%] lg:max-w-none">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-stage shadow-layered backdrop-blur-xl">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald" style={{ animation: 'pulse-dot 1.8s ease-in-out infinite' }} />
            {t("Sesli İngilizce sahneleri · Mivo ile")}
          </p>

          <h1 className="mt-6 text-balance font-display text-[3.6rem] font-extrabold leading-[0.92] tracking-[-0.045em] text-heading sm:text-[5.2rem] lg:text-[5.8rem]">
            {t("Anlıyorsun.")}
            <br />
            {t("Şimdi")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-stage via-purple-pop to-spot bg-clip-text text-transparent">{t("konuş.")}</span>
              <span aria-hidden className="absolute -inset-x-2 bottom-1 z-0 h-[0.3em] -rotate-1 rounded-[3px] bg-slate-yellow/80 sm:bottom-2" />
            </span>
          </h1>

          <p className="mt-6 max-w-[31rem] text-pretty text-lg leading-relaxed text-body sm:text-xl">
            {t("Mivo havalimanındaki görevliyi, doktoru ya da mülakat yapan kişiyi oynar. Sen sesli konuşursun. Takıldığın cümleyi anında düzeltir ve nedenini kendi dilinde anlatır.")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <HeroCtaTracker>
              <Link
                href="/onboarding"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-linear-to-r from-stage to-purple-pop px-8 py-4 text-base font-bold text-white shadow-[0_22px_44px_-16px_rgba(79,70,229,0.75)] transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-14px_rgba(79,70,229,0.85)]"
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t("Ücretsiz dene")}</span>
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </HeroCtaTracker>
            <Link
              href="/#scenes"
              className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-heading underline-offset-4 hover:underline"
            >
              {t("Sahnelere göz at")}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted">{t("Kredi kartı gerekmez · Günde 1 sesli sahne ücretsiz")}</p>
        </div>
      </div>

      <HeroStage />
    </section>
  );
}
