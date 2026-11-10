import Image from "next/image";
import StoreButtons from "./StoreButtons";
import Marquee from "./Marquee";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

/** The close: a violet field, the one action, and the whole cast standing on the bottom edge while Mivo hops. */
export default function FinalCta() {
  const t = getT();
  return (
    <section id={anchorId("download", getLocale())} className="relative scroll-mt-10 overflow-hidden bg-violet text-white">
      <Marquee
        items={[t("Bugün başla"), t("Günde on dakika"), t("Hikâyeyle öğren."), t("Mivo ile konuş.")]}
        speed={36}
        reverse
        className="poster -mx-4 -rotate-1 border-y-[2.5px] border-ink bg-sun py-3 text-[1.35rem] text-ink sm:py-4 sm:text-[1.9rem]"
        sparks={["#5546F5", "#FF7A59", "#1B1647"]}
      />
      <div className="px-5 pt-20 text-center sm:px-10 sm:pt-28">
        <p className="hand inline-block -rotate-2 text-[1.8rem] text-sun sm:text-[2.4rem]">{t("hadi, sıra sende")}</p>
        <h2 className="poster mx-auto mt-1 max-w-[12ch] text-[clamp(3rem,9vw,8.5rem)] text-sun">{t("Bölüm 1 seni bekliyor.")}</h2>
        <p className="mx-auto mt-6 max-w-[36rem] text-pretty text-[1.1rem] font-medium leading-relaxed text-white/85 sm:text-[1.28rem]">
          {t("Maya Bristol’a yeni geldi. Kapısının altına bırakılan kartpostalları kim gönderiyor? Uygulamayı indir, ilk bölümü bugün oku.")}
        </p>
        <StoreButtons location="closing" on="dark" className="mt-10 justify-center" />
        <p className="mt-6 text-[0.95rem] font-semibold text-white/70">{t("Ücretsiz başla. Kredi kartı gerekmez.")}</p>

        <div className="mx-auto mt-14 flex max-w-[56rem] items-end justify-center sm:mt-20">
          <Image src="/assets/cast/lineup.webp" alt="" width={980} height={714} sizes="(max-width: 640px) 76vw, 680px" className="-mb-2 h-auto w-[76%]" />
          <Image src="/assets/mivo/success.webp" alt="" width={534} height={918} sizes="(max-width: 640px) 24vw, 215px" className="hop -ml-[3%] h-auto w-[24%]" />
        </div>
      </div>
    </section>
  );
}
