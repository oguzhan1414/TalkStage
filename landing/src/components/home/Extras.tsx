import Image from "next/image";
import Pop from "./Pop";
import StoreButtons from "./StoreButtons";
import { getT } from "@/i18n/server";
import { tr } from "@/i18n/shared";

const TILES = [
  {
    title: tr("Sesli sahneler"),
    text: tr("Kafede sipariş, markette alışveriş, havalimanında check-in. Gerçek hayatta başına gelmeden önce Mivo ile sesli prova edersin."),
    art: "/assets/features/scenes.webp",
    color: "#FFB5D2",
    rotate: -1.5,
  },
  {
    title: tr("Kelime odaları"),
    text: tr("Mutfak, yatak odası, otel lobisi. Kelimeleri odadaki eşyaların üstünde görür, yerleriyle birlikte hatırlarsın."),
    art: "/assets/features/travel.webp",
    color: "#74DDB0",
    rotate: 1,
  },
  {
    title: tr("Telaffuz"),
    text: tr("Kelimeyi dinler, mikrofona söylersin. Vurgulu hece altı çizili gelir, nerede bastıracağını görürsün."),
    art: "/assets/features/listening.webp",
    color: "#FFCB3D",
    rotate: -1,
  },
  {
    title: tr("900 kelimelik kütüphane"),
    text: tr("En sık kullanılan isimler, fiiller ve sıfatlar yirmişerlik paketlerde. İstediğini kendi sandığına alırsın."),
    art: "/assets/features/vocab.webp",
    color: "#93D5FF",
    rotate: 1.5,
  },
  {
    title: tr("Ne konuşalım?"),
    text: tr("Hikâye dışında da Mivo ile serbestçe konuşabilirsin: işin, tatil planın ya da aklına ne gelirse."),
    art: "/assets/features/partner.webp",
    color: "#CFC6FF",
    rotate: -1,
  },
];

/** What else is in the app: five sticker tiles and one that sends you to the store. */
export default function Extras() {
  const t = getT();
  return (
    <section className="bg-cream px-5 py-24 text-ink sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[78rem]">
        <header className="mx-auto max-w-[48rem] text-center">
          <p className="hand inline-block rotate-2 text-[1.7rem] text-flame sm:text-[2.2rem]">{t("hepsi bu değil")}</p>
          <h2 className="poster mt-1 text-[clamp(2.5rem,6.6vw,5.75rem)]">{t("Uygulamanın içinde ne var?")}</h2>
          <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.05rem] font-medium leading-relaxed text-ink/80 sm:text-[1.2rem]">
            {t("Hikâye yolun ana hat. Canın ne isterse onu çalışabileceğin köşeler de var.")}
          </p>
        </header>

        <ul className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {TILES.map((x, i) => (
            <li key={x.title}>
              <Pop rotate={x.rotate} delay={(i % 3) * 0.1} className="stk lean relative flex h-full min-h-[17rem] flex-col rounded-[2rem] p-7 pt-24 sm:p-8 sm:pt-28" style={{ backgroundColor: x.color, "--lean": `${-x.rotate}deg` } as React.CSSProperties}>
                <Image src={x.art} alt="" width={320} height={320} sizes="128px" className="floaty absolute -top-7 right-5 w-28 drop-shadow-[4px_5px_0_rgba(27,22,71,0.9)] sm:w-32" style={{ "--delay": `${i * -1.3}s` } as React.CSSProperties} />
                <h3 className="poster text-[1.8rem] sm:text-[2.05rem]">{t(x.title)}</h3>
                <p className="mt-2.5 text-[1.02rem] font-medium leading-relaxed text-ink/85 sm:text-[1.08rem]">{t(x.text)}</p>
              </Pop>
            </li>
          ))}
          <li>
            <Pop rotate={1} delay={0.2} className="stk relative flex h-full min-h-[17rem] flex-col justify-between gap-6 rounded-[2rem] bg-ink p-7 text-white [--stk-shadow:#5546F5] sm:p-8">
              <div>
                <h3 className="poster text-[1.8rem] text-sun sm:text-[2.05rem]">{t("Hepsi tek uygulamada.")}</h3>
                <p className="mt-2.5 text-[1.02rem] font-medium leading-relaxed text-white/80 sm:text-[1.08rem]">{t("İndir, seviyeni seç, ilk bölümü bugün oku.")}</p>
              </div>
              <StoreButtons location="extras" on="dark" size="md" className="[--pop-shadow:#5546F5]" />
            </Pop>
          </li>
        </ul>
      </div>
    </section>
  );
}
