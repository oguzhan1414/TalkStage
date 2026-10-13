import Link from "@/i18n/Link";
import { ImageOff, ShieldCheck, UserRoundCheck } from "lucide-react";
import { getT } from "@/i18n/server";

const ITEMS = [
  {
    icon: UserRoundCheck,
    title: "Google ile girişin amacı",
    body: "Google ile giriş yalnızca Spekvia hesabını oluşturmak, doğrulamak ve oturum açmanı sağlamak için kullanılır.",
  },
  {
    icon: ShieldCheck,
    title: "Eriştiğimiz Google verileri",
    body: "Google'dan yalnızca adını, e-posta adresini ve varsa profil fotoğrafını alırız. Google Drive, Google Fotoğraflar, YouTube veya diğer Google içeriklerine erişmeyiz.",
  },
  {
    icon: ImageOff,
    title: "Görüntü üretimi ve AI NCII",
    body: "Spekvia görüntü veya video üretmez. Google API'leri yapay zekâ tarafından oluşturulan rızasız cinsel içerikli görüntüler (AI-generated NCII) oluşturmak, düzenlemek, depolamak, kolaylaştırmak veya dağıtmak için kullanılmaz.",
  },
] as const;

export default function GoogleApiDisclosure() {
  const t = getT();

  return (
    <section aria-labelledby="google-api-disclosure-title" className="bg-white px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-stage/15 bg-linear-to-br from-stage/5 via-white to-sky-50 p-6 shadow-layered sm:p-9">
        <div className="max-w-3xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stage">{t("Google API kullanımı ve güvenlik")}</p>
          <h2 id="google-api-disclosure-title" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            {t("Spekvia ne yapar, Google verilerini neden ister?")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
            {t("Spekvia, yapay zekâ destekli metin ve ses özellikleriyle gerçek hayat senaryolarında İngilizce konuşma pratiği sunan bir eğitim uygulamasıdır.")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
              <Icon aria-hidden className="h-6 w-6 text-stage" strokeWidth={1.8} />
              <h3 className="mt-4 font-display text-lg font-bold text-heading">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{t(body)}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted">
          {t("Google kullanıcı verilerini nasıl işlediğimizin tüm ayrıntıları için")}{" "}
          <Link href="/privacy" className="font-semibold text-stage underline underline-offset-4 hover:text-stage-deep">
            {t("Gizlilik Politikamızı inceleyin")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
