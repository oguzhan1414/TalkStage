import EpisodePage from "./EpisodePage";
import StoreButtons from "./StoreButtons";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

/** The cover: indigo book cloth with the first episode lying open on it. */
export default function StoryHero() {
  const t = getT();
  return (
    <section id={anchorId("top", getLocale())} className="relative isolate overflow-hidden bg-cloth text-white">
      {/* cloth weave, barely there */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_4px)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[1fr_1.02fr] lg:gap-16 lg:pb-24">
        <div>
          <h1 className="text-balance font-display text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[4.2rem] lg:text-[4.6rem]">
            {t("İngilizceyi bir hikâyenin içinde öğren.")}
          </h1>
          <p className="mt-6 max-w-[34rem] text-pretty text-[1.1rem] leading-relaxed text-on-cloth sm:text-[1.2rem]">
            {t("Spekvia’da her seviye tek bir hikâye. Her gün kısa bir bölüm okursun, yeni kelimeleri ve dil bilgisini o bölümün içinde görürsün. Ünite bitince Mivo ile sesli konuşursun.")}
          </p>
          <div className="mt-9">
            <StoreButtons tone="cloth" location="hero" />
          </div>
          <p className="mt-4 text-[0.9rem] text-on-cloth/80">{t("Ücretsiz başla. Kredi kartı gerekmez.")}</p>
        </div>

        <div className="lg:pl-4">
          <EpisodePage />
        </div>
      </div>
    </section>
  );
}
