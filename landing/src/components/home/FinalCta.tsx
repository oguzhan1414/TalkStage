import Image from "next/image";
import Phone from "./Phone";
import StoreButtons from "./StoreButtons";
import { HomeScreen } from "./AppScreens";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

/** The close: a dark panel with the one action, a phone rising from its bottom edge and Mivo waving. */
export default function FinalCta() {
  const t = getT();
  return (
    <section id={anchorId("download", getLocale())} className="scroll-mt-16 px-3 pb-6 sm:px-5">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-cloth px-6 pt-16 text-white sm:rounded-[2.75rem] sm:px-12 lg:pt-0">
        <div aria-hidden className="absolute -left-20 -top-20 -z-10 h-80 w-80 rounded-full bg-[#4f46e5]/40 blur-[90px]" />
        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="lg:py-24">
            <h2 className="text-balance font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.035em] sm:text-[3.6rem]">{t("Bölüm 1 seni bekliyor.")}</h2>
            <p className="mt-5 max-w-[32rem] text-pretty text-[1.1rem] leading-relaxed text-on-cloth">
              {t("Maya Bristol’a yeni geldi. Kapısının altına bırakılan kartpostalları kim gönderiyor? Uygulamayı indir, ilk bölümü bugün oku.")}
            </p>
            <div className="mt-9">
              <StoreButtons tone="cloth" location="closing" />
            </div>
          </div>
          <div className="relative mx-auto h-[22rem] w-[17rem] sm:h-[26rem]">
            <Phone className="absolute left-0 top-0 w-[15.5rem] rotate-[-4deg]">
              <HomeScreen t={t} />
            </Phone>
            <Image src="/mivo/wave.webp" alt="" width={750} height={900} sizes="140px" className="absolute -right-6 bottom-6 h-auto w-32 drop-shadow-[0_18px_20px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
