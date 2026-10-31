"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, RotateCcw, Star, X } from "lucide-react";
import { useLocale, useT } from "@/i18n/client";
import { anchorId } from "@/i18n/paths";
import { tr } from "@/i18n/shared";
import { ORDER, TABLE, WORDS } from "@/data/storyDemo";

const PARTS = [
  { name: tr("Kelimeler"), text: tr("Bölümde geçecek beş kelimeyi resmiyle ve sesiyle öğrenirsin.") },
  { name: tr("Dil bilgisi"), text: tr("Metindeki yapıyı kısa bir tabloyla görür, boşluğu doldurursun.") },
  { name: tr("Pratik"), text: tr("Cümle kurar, seçer, en sonunda sesli okursun.") },
];

/** One episode, three short parts, one star each; the visitor can play the grammar gap and the sentence builder. */
export default function LessonParts() {
  const t = useT();
  const locale = useLocale();
  const [part, setPart] = useState(0);

  return (
    <section id={anchorId("path", locale)} className="scroll-mt-20 bg-page px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-cloth-deep sm:text-[3.3rem]">
            {t("Her bölüm üç kısa parça.")}
          </h2>
          <p className="mt-5 max-w-[32rem] text-pretty text-[1.08rem] leading-relaxed text-body">
            {t("Bir bölüm 5–10 dakika sürer. Her parça bir yıldız; istersen parçalar arasında ara verirsin. İki yıldız bir sonraki bölümü açar.")}
          </p>

          <div role="tablist" aria-label={t("Bölümün parçaları")} className="mt-9 flex flex-col gap-2">
            {PARTS.map((p, i) => {
              const active = part === i;
              return (
                <button
                  key={p.name}
                  role="tab"
                  id={`part-tab-${i}`}
                  aria-selected={active}
                  aria-controls={`part-panel-${i}`}
                  onClick={() => setPart(i)}
                  className={`press group flex items-start gap-4 rounded-2xl px-4 py-4 text-left ${
                    active ? "bg-cloth text-white shadow-[0_18px_30px_-20px_rgba(24,20,77,0.8)]" : "text-cloth-deep hover:bg-paper-deep"
                  }`}
                >
                  <Star
                    aria-hidden
                    className={`mt-0.5 h-6 w-6 shrink-0 transition-colors duration-200 ${active ? "fill-marker text-marker" : "text-cloth/30 group-hover:text-cloth/50"}`}
                  />
                  <span>
                    <span className="block font-display text-[1.15rem] font-bold">{t(p.name)}</span>
                    <span className={`mt-0.5 block text-[0.94rem] leading-snug ${active ? "text-on-cloth" : "text-body"}`}>{t(p.text)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid rounded-[1.6rem] bg-paper-deep/60 p-3 sm:p-4">
          {[<WordsPart key="w" />, <GrammarPart key="g" />, <PracticePart key="p" />].map((panel, i) => (
            <div
              key={i}
              role="tabpanel"
              id={`part-panel-${i}`}
              aria-labelledby={`part-tab-${i}`}
              aria-hidden={part !== i}
              inert={part !== i}
              data-active={part === i}
              className="part-swap col-start-1 row-start-1 rounded-[1.2rem] bg-white p-6 shadow-[0_2px_0_0_var(--color-page-edge)] sm:p-8"
            >
              {panel}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-[1.05rem] font-bold text-cloth-deep">{children}</p>;
}

function WordsPart() {
  const t = useT();
  return (
    <div>
      <PanelTitle>{t("Bu bölümün kelimeleri")}</PanelTitle>
      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {WORDS.map((w) => (
          <li key={w.en} className="flex items-center gap-3 sm:flex-col sm:items-start">
            <Image
              src={`/story/words/${w.en}.webp`}
              alt=""
              width={480}
              height={480}
              sizes="(max-width: 640px) 64px, 120px"
              className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-[7.5rem] sm:w-[7.5rem]"
            />
            <span>
              <span lang="en" className="block font-story text-[1.3rem] font-medium leading-none text-cloth-deep">
                {w.en}
              </span>
              <span className="mt-1 block text-[0.92rem] text-body">{t(w.gloss)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GrammarPart() {
  const t = useT();
  const [picked, setPicked] = useState<string | null>(null);
  const right = TABLE.ask.cells[TABLE.ask.col];
  const correct = picked === right;

  return (
    <div>
      <PanelTitle>I am / You are</PanelTitle>
      <table lang="en" className="mt-5 w-full border-separate border-spacing-y-1.5 font-story text-[1.2rem] text-cloth-deep">
        <tbody>
          {TABLE.rows.map((row) => (
            <tr key={row.join(" ")}>
              {row.map((cell, c) => (
                <td key={c} className={`px-3 py-1.5 first:rounded-l-xl last:rounded-r-xl ${c === 1 ? "bg-marker/25 font-medium" : "bg-paper"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            {TABLE.ask.cells.map((cell, c) => (
              <td key={c} className="px-3 py-1.5 first:rounded-l-xl last:rounded-r-xl bg-cloth/[0.06]">
                {c === TABLE.ask.col ? (
                  <span
                    className={`inline-block min-w-[3.2rem] rounded-lg border-b-2 px-2 text-center transition-colors duration-200 ${
                      picked == null ? "border-cloth/40 text-transparent" : correct ? "border-emerald bg-emerald/15 text-cloth-deep" : "border-coral bg-coral/10 text-cloth-deep"
                    }`}
                  >
                    {picked ?? "___"}
                  </span>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-2 text-[0.9rem] text-body">{t(TABLE.ask.gloss)}</p>

      <div className="mt-4 flex items-center gap-2">
        {TABLE.ask.options.map((o) => (
          <button
            key={o}
            type="button"
            lang="en"
            onClick={() => setPicked(o)}
            className="press rounded-xl border border-page-edge bg-white px-5 py-2 font-story text-[1.15rem] text-cloth-deep hover:border-stage"
          >
            {o}
          </button>
        ))}
        <span aria-live="polite" className="ml-2 text-[0.92rem] font-semibold">
          {picked != null && (correct ? <span className="text-emerald">{t("Doğru!")}</span> : <span className="text-coral">{t("Bir daha dene.")}</span>)}
        </span>
      </div>

      <div className="mt-7 rounded-2xl bg-paper px-4 py-3.5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-story text-[1.12rem]" lang="en">
          <span className="inline-flex items-center gap-1.5 text-coral line-through decoration-2">
            <X aria-hidden className="h-4 w-4" />
            {TABLE.mistake.wrong}
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald">
            <Check aria-hidden className="h-4 w-4" />
            {TABLE.mistake.right}
          </span>
        </p>
        <p className="mt-1 text-[0.9rem] text-body">{t(TABLE.mistake.why)}</p>
      </div>
    </div>
  );
}

function PracticePart() {
  const t = useT();
  const [built, setBuilt] = useState<number[]>([]);
  const words = ORDER.shuffled;
  const answer = built.map((i) => words[i]).join(" ");
  const done = built.length === words.length;
  const correct = done && answer === ORDER.sentence;

  return (
    <div>
      <PanelTitle>{t("Cümleyi kur")}</PanelTitle>
      <p className="mt-1 text-[0.95rem] text-body">{t(ORDER.gloss)}</p>

      <div
        lang="en"
        className={`mt-5 flex min-h-[3.6rem] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed px-3 py-2 transition-colors duration-200 ${
          done ? (correct ? "border-emerald bg-emerald/10" : "border-coral bg-coral/5") : "border-page-edge"
        }`}
      >
        {built.map((i, k) => (
          <button
            key={i}
            type="button"
            onClick={() => setBuilt((b) => b.filter((_, j) => j !== k))}
            className="press rounded-xl bg-cloth px-3.5 py-1.5 font-story text-[1.15rem] text-white"
          >
            {words[i]}
          </button>
        ))}
      </div>

      <div lang="en" className="mt-4 flex flex-wrap gap-2">
        {words.map((w, i) => {
          const used = built.includes(i);
          return (
            <button
              key={i}
              type="button"
              disabled={used}
              onClick={() => setBuilt((b) => [...b, i])}
              className="press rounded-xl border border-page-edge bg-white px-3.5 py-1.5 font-story text-[1.15rem] text-cloth-deep hover:border-stage disabled:border-transparent disabled:bg-paper disabled:text-transparent"
            >
              {w}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex min-h-8 items-center gap-3" aria-live="polite">
        {done && (
          <>
            <span className={`text-[0.95rem] font-semibold ${correct ? "text-emerald" : "text-coral"}`}>
              {correct ? t("Doğru! Bu parçanın yıldızı senin.") : t("Sıra biraz karıştı.")}
            </span>
            <button type="button" onClick={() => setBuilt([])} className="press inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.88rem] font-semibold text-stage hover:bg-stage/10">
              <RotateCcw aria-hidden className="h-3.5 w-3.5" />
              {t("Baştan")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
