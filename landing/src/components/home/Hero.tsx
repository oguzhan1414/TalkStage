import Phone from "./Phone";
import StoreButtons from "./StoreButtons";
import { HomeScreen, MivoScreen } from "./AppScreens";
import { getLocale, getT } from "@/i18n/server";
import { anchorId } from "@/i18n/paths";

/** Opening: a big promise on the left, two tilted phones on the right that rise in and then drift. */
export default function Hero() {
  const t = getT();
  return (
    <section id={anchorId("top", getLocale())} className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#f3f1ff_0%,#ffffff_45%,#eef6ff_100%)] sm:rounded-[2.75rem]">
        <div aria-hidden className="absolute -right-24 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#4f46e5]/10 blur-[90px]" />

        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-28 sm:px-10 lg:min-h-[min(100svh,58rem)] lg:grid-cols-[1.05fr_1fr] lg:pb-20 lg:pt-32">
          <div className="hero-copy">
            <h1 className="text-balance font-display text-[2.8rem] font-extrabold leading-[1.02] tracking-[-0.035em] text-cloth-deep sm:text-[4rem] lg:text-[4.4rem]">
              {t("İngilizceyi hikâyeyle öğren, Mivo ile konuş.")}
            </h1>
            <p className="mt-6 max-w-[31rem] text-pretty text-[1.1rem] leading-relaxed text-body sm:text-[1.2rem]">
              {t("Her gün 5–10 dakikalık bir hikâye bölümü. Kelimeler ve dil bilgisi hikâyenin içinde, ünite sonunda Mivo ile sesli bir sahne.")}
            </p>
            <div className="mt-9">
              <StoreButtons tone="page" location="hero" />
            </div>
            <p className="mt-4 text-[0.9rem] text-muted">{t("Ücretsiz başla. Kredi kartı gerekmez.")}</p>
          </div>

          <div className="relative mx-auto h-[30rem] w-full max-w-[26rem] sm:h-[36rem] sm:max-w-[30rem]">
            <div className="phone-in absolute left-0 top-10 w-[46%] [--tilt:-9deg] [animation-delay:120ms] sm:w-[47%]">
              <div className="phone-drift [animation-delay:-2s]">
                <Phone label={t("Uygulamada Mivo ile sesli sahne")}>
                  <MivoScreen t={t} />
                </Phone>
              </div>
            </div>
            <div className="phone-in absolute right-0 top-0 w-[52%] [--tilt:6deg] sm:w-[53%]">
              <div className="phone-drift">
                <Phone label={t("Uygulamanın ana ekranı: bugünkü bölüm")}>
                  <HomeScreen t={t} />
                </Phone>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
