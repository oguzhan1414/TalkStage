import Image from "next/image";
import StoreButtons from "./StoreButtons";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

/** The back cover: the same cloth as the opening, and the one action. */
export default function Closing() {
  const t = getT();
  return (
    <section id={anchorId("download", getLocale())} className="relative isolate scroll-mt-16 overflow-hidden bg-cloth px-5 py-24 text-white sm:px-8 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_4px)]"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[36rem]">
          <h2 className="text-balance font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.035em] sm:text-[3.8rem]">{t("Bölüm 1 seni bekliyor.")}</h2>
          <p className="mt-5 text-pretty text-[1.1rem] leading-relaxed text-on-cloth">
            {t("Maya Bristol’a yeni geldi. Kapısının altına bırakılan kartpostalları kim gönderiyor? Uygulamayı indir, ilk bölümü bugün oku.")}
          </p>
          <div className="mt-9">
            <StoreButtons tone="cloth" location="closing" />
          </div>
        </div>
        <div className="relative h-56 w-56 shrink-0 self-center overflow-hidden rounded-full ring-8 ring-marker sm:h-72 sm:w-72">
          <Image src="/story/a1-e01.webp" alt={t("Maya ve Leo Bristol'da tanışıyor")} fill sizes="288px" className="scale-[1.12] object-cover" />
        </div>
      </div>
    </section>
  );
}
