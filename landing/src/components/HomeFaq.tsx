import Link from "@/i18n/Link";
import Reveal from "./Reveal";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { HOME_FAQS } from "@/data/homeFaq";

export default function HomeFaq() {
  const t = getT();
  return (
    <section id={anchorId("faq", getLocale())} className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("SSS")}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-5xl">{t("Başlamadan önce akla gelenler")}</h2>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-stage underline-offset-4 hover:underline"
          >{t("Tüm soruları gör →")}</Link>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-line rounded-[28px] border border-line bg-white">
            {HOME_FAQS.map((item, i) => (
              <details key={item.q} className="group px-6 py-1" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[1.05rem] font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {t(item.q)}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-deep text-lg text-stage transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[0.95rem] leading-relaxed text-body">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
