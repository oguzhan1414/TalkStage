import Image from "next/image";
import { Check, Mic } from "lucide-react";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";
import { SCENE } from "@/data/storyDemo";

/** The unit's last step: Mivo plays a role and the visitor talks. Marigold field so the indigo Mivo stands out. */
export default function MivoScene() {
  const t = getT();
  return (
    <section id={anchorId("mivo", getLocale())} className="relative isolate scroll-mt-20 overflow-hidden bg-marker px-5 py-24 text-cloth-deep sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative">
          <h2 className="text-balance font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[3.3rem]">
            {t("Ünite biter, Mivo sahneye çıkar.")}
          </h2>
          <p className="mt-5 max-w-[32rem] text-pretty text-[1.08rem] leading-relaxed text-cloth-deep/85">
            {t("Her ünitenin son adımı sesli bir sahne. Mivo bir rol üstlenir: kursta yanına oturan bir öğrenci, otel görevlisi, mülakatçı. Sen konuşursun; yanlış kurduğun cümleyi saklamadan söyler ve doğrusunu gösterir.")}
          </p>

          <div className="mt-8 max-w-[30rem] rounded-2xl bg-cloth-deep/[0.06] px-5 py-4">
            <p className="font-display text-[1rem] font-bold">{t("Sahnenin hedefleri")}</p>
            <ul className="mt-2.5 space-y-2">
              {SCENE.goals.map((g) => (
                <li key={g} className="flex gap-2.5 text-[0.95rem] leading-snug">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cloth text-marker">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t(g)}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src="/mivo/speaking.webp"
            alt={t("Mivo konuşuyor")}
            width={750}
            height={900}
            sizes="(max-width: 1024px) 0px, 260px"
            className="pointer-events-none mt-6 hidden h-auto w-[15rem] drop-shadow-[0_24px_24px_rgba(24,20,77,0.25)] lg:block"
          />
        </div>

        <figure className="rounded-[1.6rem] bg-page p-5 shadow-[0_40px_60px_-34px_rgba(24,20,77,0.55)] sm:p-7">
          <figcaption className="flex items-center gap-3 border-b border-page-edge pb-4">
            <Image src="/mivo/idle.webp" alt="" width={750} height={900} sizes="48px" className="h-12 w-auto" />
            <span className="min-w-0">
              <span className="block font-display text-[1.05rem] font-bold">{t(SCENE.title)}</span>
              <span className="block text-[0.85rem] text-body">
                {t("Mivo, {{name}} rolünde · {{role}}", { name: SCENE.name, role: t(SCENE.role) })}
              </span>
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-paper px-2.5 py-1 text-[0.72rem] font-semibold text-muted">{t("Örnek konuşma")}</span>
          </figcaption>

          <ol className="mt-5 space-y-3" lang="en">
            {SCENE.turns.map((turn, i) => (
              <li key={i} className={`flex flex-col ${turn.who === "you" ? "items-end" : "items-start"}`}>
                <span className="mb-1 px-1 font-body text-[0.72rem] font-bold uppercase tracking-[0.06em] text-cloth/50" lang={getLocale()}>
                  {turn.who === "you" ? t("Sen") : SCENE.name}
                </span>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-story text-[1.12rem] leading-snug ${
                    turn.who === "you" ? "rounded-br-md bg-cloth text-white" : "rounded-bl-md bg-paper text-cloth-deep"
                  }`}
                >
                  {turn.who === "you" && <Mic aria-hidden className="mr-1.5 inline h-4 w-4 -translate-y-px text-marker" />}
                  {turn.text}
                </p>
                {"fix" in turn && turn.fix && (
                  <div className="mt-2 max-w-[85%] rounded-2xl border border-marker bg-marker/15 px-4 py-2.5">
                    <p className="font-story text-[1.08rem] text-cloth-deep">
                      <Check aria-hidden className="mr-1.5 inline h-4 w-4 -translate-y-px text-emerald" strokeWidth={3} />
                      {turn.fix.right}
                    </p>
                    <p className="mt-0.5 text-[0.88rem] text-body" lang={getLocale()}>
                      {t(turn.fix.why)}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
