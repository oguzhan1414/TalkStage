import Link from '@/i18n/Link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import HeroDevice from '@/components/HeroDevice';
import HeroCtaTracker from '@/components/HeroCtaTracker';
import CountUp from '@/components/motion/CountUp';
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";

const FACTS = [
  { value: 21, suffix: '', label: tr("sahne · A1–B2") },
  { value: 40, suffix: '', label: tr("podcast bölümü") },
  { value: 160, suffix: '+', label: tr("okuma hikâyesi") },
  { value: 5, suffix: '', label: tr("dilde açıklama") },
];

export default function Hero() {
  const t = getT();
  return (
    <section id={anchorId("top", getLocale())} className="relative isolate overflow-hidden bg-paper">
      {/* Aurora: three slow, soft colour fields + a faint grid, so the light page still feels deep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.30),transparent_65%)] blur-3xl" style={{ animation: 'float 14s ease-in-out infinite' }} />
        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.22),transparent_65%)] blur-3xl" style={{ animation: 'float 17s ease-in-out -4s infinite' }} />
        <div className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(239,93,168,0.16),transparent_65%)] blur-3xl" style={{ animation: 'float 19s ease-in-out -8s infinite' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-16 lg:pt-24">
        <div className="max-w-[38rem]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-stage shadow-layered backdrop-blur-xl">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald" style={{ animation: 'pulse-dot 1.8s ease-in-out infinite' }} />
            {t("Sesli İngilizce sahneleri · Mivo ile")}
          </p>

          <h1 className="mt-6 text-balance font-display text-[3.3rem] font-extrabold leading-[0.95] tracking-[-0.04em] text-heading sm:text-[4.8rem] lg:text-[5.4rem]">
            {t("Anlıyorsun.")}
            <br />
            {t("Şimdi")}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-stage via-purple-pop to-spot bg-clip-text text-transparent">{t("konuş.")}</span>
              <span aria-hidden className="absolute -inset-x-2 bottom-1 z-0 h-[0.3em] -rotate-1 rounded-[3px] bg-slate-yellow/70 sm:bottom-2" />
            </span>
          </h1>

          <p className="mt-6 max-w-[32rem] text-pretty text-lg leading-relaxed text-body sm:text-xl">
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

          <dl className="mt-6 grid max-w-[34rem] grid-cols-2 gap-3 sm:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-white/80 bg-white/60 px-3.5 py-3 shadow-layered backdrop-blur-xl">
                <dt className="sr-only">{t(fact.label)}</dt>
                <dd className="font-display text-2xl font-extrabold tracking-tight text-heading">
                  <CountUp value={fact.value} suffix={fact.suffix} />
                </dd>
                <dd className="mt-0.5 text-[0.72rem] leading-tight text-muted">{t(fact.label)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroDevice />
      </div>
    </section>
  );
}
