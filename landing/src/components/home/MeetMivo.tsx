"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import Pop from "./Pop";
import { useLocale, useT } from "@/i18n/client";
import { tr } from "@/i18n/shared";
import { anchorId } from "@/i18n/paths";

const TRAITS = [
  { title: tr("Sabırla bekler"), text: tr("Düşünmen için zaman tanır. Takıldığında küçük bir ipucu verir."), color: "#FFCB3D", rotate: -2 },
  { title: tr("Bölmeden düzeltir"), text: tr("Doğrusunu gösterir, sohbet kaldığı yerden devam eder."), color: "#74DDB0", rotate: 1.5 },
  { title: tr("Kendi dilinde açıklar"), text: tr("Neden öyle olduğunu senin dilinde, kısaca söyler."), color: "#93D5FF", rotate: -1 },
];

const line = {
  hidden: { opacity: 0, y: 26, scale: 0.86 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
} as const;

/** Mivo, the speaking coach: who he is in a few lines, and one real correction played out as a chat. */
export default function MeetMivo() {
  const t = useT();
  const locale = useLocale();
  return (
    <section id={anchorId("mivo", locale)} className="relative scroll-mt-10 overflow-hidden bg-bubble pb-24 text-ink sm:pb-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-10">
        <header className="mx-auto max-w-[50rem] text-center">
          <p className="hand inline-block rotate-2 text-[1.7rem] text-violet sm:text-[2.2rem]">{t("tanış:")}</p>
          <h2 className="poster mt-1 text-[clamp(2.6rem,7vw,6.25rem)]">{t("Mivo, konuşma koçun.")}</h2>
          <p className="mx-auto mt-5 max-w-[38rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/85 sm:text-[1.2rem]">
            {t("Mivo not veren bir öğretmen gibi değil, sabırlı bir arkadaş gibi konuşur. Sen cümleni kurarsın; o dinler, güler, şaşırır. Yanlışını yüzüne vurmaz, doğrusunu gösterip yola devam eder.")}
          </p>
        </header>

        <div className="mt-14 grid items-end gap-12 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* A correction, played as a chat */}
          <div className="relative mx-auto w-full max-w-[36rem]">
            <motion.div
              className="relative z-10 flex flex-col gap-3.5 pb-[9.5rem] sm:pb-[8rem] sm:pl-[9.5rem]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -25% 0px" }}
              transition={{ staggerChildren: 0.55, delayChildren: 0.15 }}
            >
              <motion.p variants={line} lang="en" className="stk-sm ml-auto w-fit max-w-[85%] origin-bottom-right rounded-[1.4rem] rounded-br-[0.4rem] bg-ink px-5 py-3 text-[1.08rem] font-bold text-white sm:text-[1.2rem]">
                I am agree with you.
              </motion.p>

              <motion.div variants={line} className="stk-sm w-fit max-w-[92%] origin-bottom-left rounded-[1.4rem] rounded-bl-[0.4rem] bg-white px-5 py-4">
                <p lang="en" className="flex items-center gap-2.5 text-[1.05rem] font-semibold sm:text-[1.15rem]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame text-white">
                    <X aria-hidden className="h-4 w-4" strokeWidth={3.5} />
                  </span>
                  <span>
                    I <s className="rounded bg-flame/20 px-1 decoration-flame decoration-[3px]">am</s> agree with you.
                  </span>
                </p>
                <p lang="en" className="mt-2 flex items-center gap-2.5 text-[1.05rem] font-bold sm:text-[1.15rem]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1FA971] text-white">
                    <Check aria-hidden className="h-4 w-4" strokeWidth={3.5} />
                  </span>
                  I agree with you.
                </p>
                <p className="mt-3 border-t-2 border-dashed border-ink/15 pt-2.5 text-[0.95rem] font-medium leading-snug text-ink/75">{t("“Agree” zaten bir fiil, yanına “am” gerekmez.")}</p>
              </motion.div>

              <motion.p variants={line} lang="en" className="stk-sm ml-auto w-fit max-w-[85%] origin-bottom-right rounded-[1.4rem] rounded-br-[0.4rem] bg-ink px-5 py-3 text-[1.08rem] font-bold text-white sm:text-[1.2rem]">
                I agree with you!
              </motion.p>

              <motion.p variants={line} lang="en" className="stk-sm flex w-fit max-w-[85%] origin-bottom-left items-center gap-3 rounded-[1.4rem] rounded-bl-[0.4rem] bg-violet px-5 py-3 text-[1.08rem] font-bold text-white sm:text-[1.2rem]">
                <span aria-hidden className="flex h-5 items-end gap-[3px]">
                  {[0.5, 1, 0.7, 0.9].map((h, i) => (
                    <i key={i} className="sound-bar block w-[3px] rounded-full bg-sun" style={{ height: `${h * 100}%`, animationDelay: `${i * -0.21}s` }} />
                  ))}
                </span>
                Nice! So, coffee or tea?
              </motion.p>
            </motion.div>

            <Image src="/assets/mivo/speaking.webp" alt="" width={434} height={918} sizes="(max-width: 640px) 120px, 180px" className="absolute -bottom-24 left-0 z-0 h-[19rem] w-auto sm:-bottom-32 sm:h-[24rem]" />
            <p className="hand absolute -bottom-10 left-[8.5rem] -rotate-3 text-[1.45rem] text-violet sm:-bottom-12 sm:left-[13rem] sm:text-[1.7rem]">{t("konuşma hiç bölünmedi")}</p>
          </div>

          {/* Three things about him */}
          <ul className="relative z-10 mx-auto flex w-full max-w-[30rem] flex-col gap-6 max-lg:mt-16">
            {TRAITS.map((x, i) => (
              <li key={x.title}>
                <Pop rotate={x.rotate} delay={i * 0.12} className="stk lean rounded-[1.6rem] px-6 py-5 sm:px-7 sm:py-6" style={{ backgroundColor: x.color, "--lean": `${-x.rotate}deg` } as React.CSSProperties}>
                  <h3 className="poster text-[1.6rem] sm:text-[1.9rem]">{t(x.title)}</h3>
                  <p className="mt-1.5 text-[1.02rem] font-medium leading-relaxed text-ink/85 sm:text-[1.1rem]">{t(x.text)}</p>
                </Pop>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
