import Image from "next/image";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { VOLUMES } from "@/data/storyDemo";

/** Six levels, six stories: one row of covers. */
export default function Levels() {
  const t = getT();
  return (
    <section id={anchorId("levels", getLocale())} className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[38rem]">
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-cloth-deep sm:text-[3.2rem]">
            {t("A1’den C2’ye altı hikâye.")}
          </h2>
          <p className="mt-5 text-pretty text-[1.08rem] leading-relaxed text-body">
            {t("Seviyeni seç, hikâyene başla. Maya, Leo ve Rosa seviyeden seviyeye seninle devam eder.")}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {VOLUMES.map((v) => (
            <li key={v.id} className="level-card group text-center">
              <div className="relative mx-auto aspect-square w-full max-w-[11rem] overflow-hidden rounded-full" style={{ boxShadow: `0 0 0 5px ${v.color}` }}>
                {v.story ? (
                  <Image src={v.story.cover} alt="" fill sizes="(max-width: 640px) 45vw, 176px" className="scale-[1.12] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.18]" />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-paper-deep text-[0.95rem] font-semibold text-cloth/60">{t("Yakında")}</div>
                )}
              </div>
              <p className="mt-4 text-[0.82rem] font-bold" style={{ color: v.color }}>
                {v.id} · {v.name}
              </p>
              <p className="mt-0.5 font-display text-[1.1rem] font-bold leading-tight text-cloth-deep">{v.story ? t(v.story.title) : t("Yakında")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
