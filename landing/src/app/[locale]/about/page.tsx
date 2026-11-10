import Image from "next/image";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { getT } from "@/i18n/server";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/i18n/schema";
import { pageLocale, pageMetadata, type PageProps } from "@/i18n/page";
import { tr } from "@/i18n/shared";

export async function generateMetadata({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT(locale);
  return pageMetadata({
    path: "/about",
    locale,
    title: t("Spekvia Hakkında: Konuşarak İngilizce Öğren"),
    description: t("Spekvia, İngilizceyi gerçek hayat sahnelerinde sesli prova etmeni sağlar. Nasıl çalıştığımızı ve hatadan korkmadan konuşmanı sağlayan ilkelerimizi keşfet."),
  });
}

const PRINCIPLES = [
  {
    title: tr("Önce konuşma"),
    text: tr("Bilmek ile söylemek farklı kaslar. Uygulamanın merkezinde test değil, ağzından çıkan cümle var."),
  },
  {
    title: tr("Düzeltme, tam o anda"),
    text: tr("Hata, konuşmayı bölmeden ve utandırmadan gösterilir; nedeni kendi dilinde, tek cümleyle anlatılır."),
  },
  {
    title: tr("Her seferinde farklı"),
    text: tr("Gerçek hayatta aynı sahne iki kez aynı geçmez. Sahneler her oynayışta farklı bir sürprizle gelir, ezber işe yaramaz."),
  },
  {
    title: tr("Seni hatırlayan bir koç"),
    text: tr("Mivo neler konuştuğunuzu ve nerede takıldığını aklında tutar; sen de bu notları görebilir, düzeltebilir ya da silebilirsin."),
  },
];

const TILE_BG = ['bg-sun', 'bg-mint', 'bg-sky', 'bg-bubble'];

export default async function AboutPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  const t = getT();
  return (
    <>
      <JsonLd data={[
        webPageSchema(locale, "AboutPage", "/about", t("Spekvia Hakkında: Konuşarak İngilizce Öğren"), t("Spekvia, İngilizceyi gerçek hayat sahnelerinde sesli prova etmeni sağlar. Nasıl çalıştığımızı ve hatadan korkmadan konuşmanı sağlayan ilkelerimizi keşfet.")),
        breadcrumbSchema(locale, [{ name: t("Ana Sayfa"), path: "/" }, { name: t("Hakkımızda"), path: "/about" }]),
      ]} />
      <Navbar />
      <main className="flex-1 overflow-x-clip bg-cream pb-20 text-ink sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana sayfa"), href: "/" }, { label: t("Hakkımızda") }]}
          eyebrow={t("Hakkımızda")}
          title={t("Anlıyorsun ama konuşamıyorsan, eksik olan bilgi değil prova.")}
          intro={t("Yıllarca İngilizce çalışıp gerçek bir konuşmada donup kalmak çok yaygın. Çoğu zaman sebep gramer eksiği değil, hiç sesli prova yapmamış olmak. Spekvia bu provayı güvenli bir yerde yapmanı sağlar: kimse seni yargılamaz, hata yapman sorun olmaz.")}
          art="point"
          tint="lilac"
          variant="poster"
        />

        <div className="mx-auto max-w-[80rem] space-y-14 px-5 pt-14 sm:space-y-20 sm:px-10 sm:pt-20">
          {/* how it works: artwork + text */}
          <div className="stk grid overflow-hidden rounded-[2rem] bg-sky lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <Image src="/assets/mivo/speaking.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-8" />
            </div>
            <div className="p-7 sm:p-12 lg:p-14">
              <h2 className="poster text-4xl text-ink sm:text-5xl">{t("Nasıl çalışıyoruz?")}</h2>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-heading/75">{t("Bir sahne seçersin: otelde check-in, iş mülakatı, doktor muayenesi. Mivo karşındaki karakteri oynar, sen sesli konuşursun. Takıldığın cümle anında düzeltilir ve Hata Defterim’e eklenir. Aynı sahneyi tekrar oynadığında karşına başka bir durum çıkar. Günün geri kalanında kelime, okuma ve podcast görevleri seviyene göre seni bekler.")}</p>
            </div>
          </div>

          {/* principles */}
          <div>
            <h2 className="poster text-4xl text-ink sm:text-6xl">{t("İlkelerimiz")}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-7">
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} className={`stk rounded-[1.75rem] ${TILE_BG[i % TILE_BG.length]} p-6 sm:p-8`}>
                  <span aria-hidden className="stk-sm poster flex h-12 w-12 -rotate-6 items-center justify-center rounded-full bg-cream text-2xl text-ink">{i + 1}</span>
                  <h3 className="poster mt-6 text-[1.8rem] text-ink sm:text-[2.1rem]">{t(p.title)}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-heading/70">{t(p.text)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* call to action */}
          <div className="stk relative overflow-hidden rounded-[2rem] bg-violet text-cream">
            <div className="relative grid items-end lg:grid-cols-[1.3fr_0.7fr]">
              <div className="p-7 sm:p-12 lg:p-16">
                <h3 className="poster text-4xl text-sun sm:text-6xl">{t("İlk sahneni oyna")}</h3>
                <p className="mt-4 max-w-md text-lg font-medium text-cream/85">{t("Ücretsiz başla; günde bir sesli sahne seni bekliyor.")}</p>
                <div className="mt-7">
                  <Link
                    href="/#download"
                    className="btn-pop btn-pop-wrap bg-sun px-8 py-4 text-base text-ink"
                  >{t("Ücretsiz dene")}</Link>
                </div>
              </div>
              <div aria-hidden className="relative mx-auto h-[13rem] w-[10.4rem] sm:h-[18rem] sm:w-[14.4rem] lg:mr-10 lg:h-[21rem] lg:w-[16.8rem]">
                <Image src="/assets/mivo/success.webp" alt="" fill sizes="270px" className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(21,18,58,0.25)]" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
