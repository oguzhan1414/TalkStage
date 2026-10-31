"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { VOLUMES } from "@/data/storyDemo";

const HEIGHTS = ["h-[15rem]", "h-[16.5rem]", "h-[15.5rem]", "h-[17rem]", "h-[14.5rem]", "h-[16rem]"];

/** Six levels as six volumes on a shelf; the chosen one is pulled out and opens its story. */
export default function Shelf() {
  const t = useT();
  const locale = useLocale();
  const [picked, setPicked] = useState(0);
  const vol = VOLUMES[picked];

  return (
    <section id={anchorId("levels", locale)} className="scroll-mt-20 bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[40rem]">
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-cloth-deep sm:text-[3.3rem]">
            {t("Altı seviye, altı hikâye.")}
          </h2>
          <p className="mt-5 text-pretty text-[1.08rem] leading-relaxed text-body">
            {t("A1’den C2’ye her seviye kendi hikâyesini anlatır; Maya, Leo ve Rosa seviyeden seviyeye seninle devam eder. Başlarken seviyeni seçersin, istediğin zaman değiştirebilirsin.")}
          </p>
        </div>

        <div className="mt-14 grid items-end gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div>
            <div role="group" aria-label={t("Seviyeler")} className="flex items-end gap-1.5 px-2 sm:gap-2">
              {VOLUMES.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={picked === i}
                  onClick={() => setPicked(i)}
                  className={`spine relative flex w-[3.1rem] shrink-0 flex-col items-center justify-between rounded-t-md rounded-b-sm py-3 sm:w-[3.7rem] ${HEIGHTS[i]}`}
                  style={{ backgroundColor: v.color, color: v.ink }}
                >
                  <span aria-hidden className="absolute inset-x-0 top-5 h-px opacity-40" style={{ backgroundColor: v.ink }} />
                  <span aria-hidden className="absolute inset-x-0 bottom-12 h-px opacity-40" style={{ backgroundColor: v.ink }} />
                  <span className="font-display text-[1.05rem] font-extrabold">{v.id}</span>
                  <span className="max-h-[9rem] overflow-hidden whitespace-nowrap text-[0.82rem] font-semibold [writing-mode:vertical-rl] rotate-180">
                    {v.story ? t(v.story.title) : t("Yakında")}
                  </span>
                  <span aria-hidden className="h-2 w-2 rounded-full opacity-60" style={{ backgroundColor: v.ink }} />
                </button>
              ))}
            </div>
            {/* the shelf plank */}
            <div aria-hidden className="h-4 rounded-md bg-cloth shadow-[0_14px_20px_-12px_rgba(24,20,77,0.6)]" />
          </div>

          <div key={vol.id} aria-live="polite" className="vol-in flex flex-col gap-6 rounded-[1.6rem] bg-page p-6 shadow-[0_2px_0_0_var(--color-page-edge)] sm:flex-row sm:items-center sm:p-8">
            {vol.story ? (
              <>
                <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full sm:h-44 sm:w-44" style={{ boxShadow: `0 0 0 6px ${vol.color}` }}>
                  <Image src={vol.story.cover} alt="" fill sizes="176px" className="scale-[1.12] object-cover" />
                </div>
                <div>
                  <p className="text-[0.85rem] font-semibold" style={{ color: vol.color }}>
                    {vol.id} · {vol.name}
                  </p>
                  <h3 className="mt-1 font-display text-[1.7rem] font-extrabold leading-tight tracking-[-0.02em] text-cloth-deep">{t(vol.story.title)}</h3>
                  <p className="mt-2 max-w-[34rem] text-[1rem] leading-relaxed text-body">{t(vol.story.blurb)}</p>
                  <p className="mt-3 text-[0.9rem] font-medium text-cloth/70">
                    {/* every unit ends with one Mivo scene */}
                    {t("{{units}} ünite · {{episodes}} bölüm · {{scenes}} Mivo sahnesi", { units: vol.story.units, episodes: vol.story.episodes, scenes: vol.story.units })}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="text-[0.85rem] font-semibold text-cloth/70">
                  {vol.id} · {vol.name}
                </p>
                <h3 className="mt-1 font-display text-[1.7rem] font-extrabold leading-tight tracking-[-0.02em] text-cloth-deep">{t("Bu cilt yazılıyor.")}</h3>
                <p className="mt-2 max-w-[34rem] text-[1rem] leading-relaxed text-body">
                  {t("C2 hikâyesi hazırlanıyor. O güne kadar C1’de kaldığın yerden devam edersin.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
