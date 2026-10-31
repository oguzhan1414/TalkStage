"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useT } from "@/i18n/client";
import { EPISODE, UNIT_STEPS } from "@/data/storyDemo";

/**
 * The open page in the hero: episode 1 of the A1 story as the app shows it. Dotted words open their meaning in a
 * bubble that grows out of the word; the grammar word carries a highlighter stroke drawn once.
 */
export default function EpisodePage() {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>(null);
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") setOpen(null);
        return;
      }
      const target = e.target as HTMLElement;
      if (!target.closest("[data-word]")) setOpen(null);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={page} className="relative">
      {/* the ribbon bookmark: where you left off */}
      <div aria-hidden className="absolute -top-3 right-10 z-20 h-24 w-7 sm:right-14">
        <div className="h-full w-full bg-marker shadow-[0_6px_10px_-6px_rgba(24,20,77,0.5)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]" />
      </div>

      <article className="relative rounded-[1.4rem] bg-page px-6 pb-6 pt-7 text-cloth-deep shadow-[0_40px_60px_-30px_rgba(8,6,40,0.75),0_2px_0_0_var(--color-page-edge)] sm:px-9 sm:pb-8 sm:pt-9">
        <header className="flex items-center gap-4 sm:gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-marker-soft sm:h-24 sm:w-24">
            <Image src={EPISODE.cover} alt={t("Maya ve Leo Bristol'da tanışıyor")} fill sizes="96px" className="scale-[1.12] object-cover" priority />
          </div>
          <div className="min-w-0">
            <p className="text-[0.8rem] font-semibold text-cloth/70">
              {EPISODE.level} · {t("Ünite {{n}}", { n: EPISODE.unit })} · {t("Bölüm {{n}}", { n: EPISODE.number })}
            </p>
            <h2 className="mt-0.5 font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[1.7rem]">{t(EPISODE.title)}</h2>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-cloth/70">
              <span className="rounded-full bg-cloth/[0.07] px-2.5 py-0.5 font-semibold text-cloth">{EPISODE.grammar}</span>
              <span>{t("~{{n}} dk", { n: EPISODE.minutes })}</span>
            </p>
          </div>
        </header>

        <div className="mt-6 space-y-2.5 font-story text-[1.22rem] leading-snug sm:text-[1.32rem]" lang="en">
          {EPISODE.lines.map((line, i) => (
            <p key={i} className="grid grid-cols-[3.4rem_1fr] items-baseline gap-2 sm:grid-cols-[3.8rem_1fr]">
              <span className="font-body text-[0.72rem] font-bold uppercase tracking-[0.06em] text-cloth/55">{line.speaker}</span>
              <span>
                {line.parts.map((part, j) => {
                  if (typeof part === "string") return <span key={j}>{part}</span>;
                  if ("mark" in part)
                    return (
                      <span key={j} className="marker marker-draw font-medium">
                        {part.mark}
                      </span>
                    );
                  const id = `${i}-${part.word}`;
                  const isOpen = open === id;
                  return (
                    <span key={j} className="relative inline-block" data-word>
                      <button
                        type="button"
                        className="story-word px-0.5"
                        aria-expanded={isOpen}
                        aria-describedby={isOpen ? `gloss-${id}` : undefined}
                        onClick={() => setOpen(isOpen ? null : id)}
                      >
                        {part.word}
                      </button>
                      <span
                        id={`gloss-${id}`}
                        role="tooltip"
                        data-open={isOpen}
                        lang={locale}
                        className="gloss absolute bottom-[calc(100%+0.45rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-cloth px-3 py-1.5 font-body text-[0.88rem] font-semibold text-white shadow-[0_10px_20px_-10px_rgba(8,6,40,0.7)]"
                        style={{ ["--gloss-origin" as string]: "50% 100%" }}
                      >
                        {t(part.gloss)}
                        <span aria-hidden className="absolute left-1/2 top-full -ml-1.5 border-x-[6px] border-t-[6px] border-x-transparent border-t-cloth" />
                      </span>
                    </span>
                  );
                })}
              </span>
            </p>
          ))}
        </div>

        <p className="mt-4 text-[0.8rem] font-medium text-cloth/60">{t("Altı noktalı kelimelere dokun.")}</p>

        <aside className="mt-5 rounded-2xl bg-marker/20 px-4 py-3.5 sm:px-5">
          <p className="font-display text-[0.98rem] font-bold">{t(EPISODE.tip.title)}</p>
          <p className="mt-1 text-[0.9rem] leading-relaxed text-cloth/80">{t(EPISODE.tip.rule)}</p>
        </aside>

        <UnitStrip />
      </article>
    </div>
  );
}

/** The unit's six steps; the first is the open episode, the last is the Mivo scene. */
function UnitStrip() {
  const t = useT();
  return (
    <div className="mt-6 border-t border-page-edge pt-4">
      <ol className="flex items-center gap-1.5" aria-label={t("Ünite 1 adımları")}>
        {UNIT_STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-1 items-center gap-1.5 last:flex-none">
            <span
              title={t(step.title)}
              aria-label={t(step.title)}
              aria-current={i === 0 ? "step" : undefined}
              className={`grid shrink-0 place-items-center rounded-full ${
                step.kind === "scene"
                  ? "h-9 w-9 overflow-hidden bg-marker"
                  : i === 0
                    ? "h-4 w-4 bg-stage ring-4 ring-stage/20"
                    : step.kind === "vocab"
                      ? "h-3 w-3 rotate-45 rounded-[3px] bg-cloth/25"
                      : "h-3 w-3 bg-cloth/25"
              }`}
            >
              {step.kind === "scene" && <Image src="/mivo/idle.webp" alt="" width={36} height={44} className="mt-2 h-9 w-auto" />}
            </span>
            {i < UNIT_STEPS.length - 1 && <span aria-hidden className="h-[2px] flex-1 rounded-full bg-cloth/10" />}
          </li>
        ))}
      </ol>
      <p className="mt-2.5 text-[0.82rem] text-cloth/70">{t("Ünitenin sonunda Mivo ile sesli bir sahne var.")}</p>
    </div>
  );
}
