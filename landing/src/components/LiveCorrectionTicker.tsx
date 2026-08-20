"use client";

import { useEffect, useRef, useState } from "react";

type Item = {
  before: string;
  wrong: string;
  after: string;
  correctedBefore: string;
  correctedHighlight: string;
  correctedAfter: string;
  explanation: string;
  tag: string;
  score: number;
};

const items: Item[] = [
  {
    before: "I ",
    wrong: "am agree",
    after: " with you about database.",
    correctedBefore: "I agree with you about ",
    correctedHighlight: "the database",
    correctedAfter: ".",
    explanation: "'Agree' bir fiildir, önüne 'am' gelmez. 'Database' belirli olduğu için başına 'the' gelir.",
    tag: "Sık Hata · Fiil Çekimi",
    score: 94,
  },
  {
    before: "I ",
    wrong: "am working",
    after: " here for three years.",
    correctedBefore: "I ",
    correctedHighlight: "have been working",
    correctedAfter: " here for three years.",
    explanation: "Geçmişten bugüne süren durumlarda 'Present Perfect Continuous' kullanılır.",
    tag: "Sık Hata · Zaman Kipi",
    score: 91,
  },
  {
    before: "She ",
    wrong: "don't",
    after: " understand this part.",
    correctedBefore: "She ",
    correctedHighlight: "doesn't",
    correctedAfter: " understand this part.",
    explanation: "Üçüncü tekil şahısta yardımcı fiil 'doesn't' olur, 'don't' değil.",
    tag: "Sık Hata · Özne-Fiil Uyumu",
    score: 96,
  },
];

type Phase = "heard" | "correcting" | "corrected" | "leaving";

const TIMINGS: [Phase, number][] = [
  ["heard", 1000],
  ["correcting", 900],
  ["corrected", 3300],
  ["leaving", 500],
];

export default function LiveCorrectionTicker() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("heard");
  const [reducedMotion, setReducedMotion] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase("corrected");
      return;
    }

    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    let cumulative = 0;
    for (const [phaseName, duration] of TIMINGS) {
      cumulative += duration;
      const id = setTimeout(() => {
        if (phaseName === "leaving") {
          setIndex((i) => (i + 1) % items.length);
          setPhase("heard");
        } else {
          setPhase(phaseName);
        }
      }, cumulative);
      timeouts.current.push(id);
    }

    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, [index, reducedMotion]);

  const item = items[index];
  const isCorrecting = phase === "correcting" || phase === "corrected" || phase === "leaving";
  const isCorrected = phase === "corrected" || phase === "leaving";
  const isLeaving = phase === "leaving";

  return (
    <section id="geri-bildirim" className="relative -mt-4 scroll-mt-24 px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <div
          className={`glass-card mx-auto flex flex-col gap-5 rounded-[26px] px-6 py-6 shadow-[var(--shadow-lifted)] transition-opacity duration-500 sm:px-9 sm:py-8 ${
            isLeaving ? "opacity-40" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-heading/5 px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-heading">
              <span className="h-1.5 w-1.5 animate-[pulse-dot_1.8s_ease-in-out_infinite] rounded-full bg-coral" />
              Live
            </span>
            <span className="font-mono text-[0.7rem] text-muted">talkstage · konuşma odası</span>
          </div>

          <p className="min-h-[3.6em] text-left font-display text-[1.35rem] font-semibold leading-[1.4] text-heading sm:text-[1.65rem]">
            {item.before}
            <span
              className={`transition-colors duration-500 ${
                isCorrecting ? "text-coral/60 line-through decoration-2" : "text-heading"
              }`}
            >
              {item.wrong}
            </span>
            {item.after}
          </p>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
              isCorrected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-[0.7rem] font-bold text-emerald">
                    ✓
                  </span>
                  <p className="text-left font-display text-[1.05rem] font-semibold leading-snug text-heading">
                    {item.correctedBefore}
                    <span className="rounded-sm bg-emerald/10 px-1 text-emerald">
                      {item.correctedHighlight}
                    </span>
                    {item.correctedAfter}
                  </p>
                </div>
                <span className="shrink-0 self-start rounded-full bg-porcelain px-3 py-1 font-mono text-[0.72rem] font-medium text-body sm:self-center">
                  Akıcılık {item.score}%
                </span>
              </div>
              <p className="mt-2 text-left text-[0.9rem] leading-relaxed text-muted">
                {item.explanation}
              </p>
              <span className="mt-3 inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.68rem] text-body">
                {item.tag}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[0.75rem] tracking-wide text-muted">
          Sen konuş, TalkStage 400ms içinde düzeltsin.
        </p>
      </div>
    </section>
  );
}
