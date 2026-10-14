import { Fragment, type ReactNode } from "react";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero, { type HeroArt, type HeroTint } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { LEGAL_UPDATED, type LegalDoc } from "@/data/legalContent";
import { breadcrumbSchema, webPageSchema } from "@/i18n/schema";
import { getT } from "@/i18n/server";
import { LOCALE_META, type Locale } from "@/i18n/config";

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Turns any e-mail address inside a translated sentence into a mailto link. */
function withMailLinks(text: string): ReactNode {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="font-semibold text-indigo underline underline-offset-4 hover:text-stage">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Shared layout for the legal pages (privacy, terms, account deletion). */
const LOOKS: Record<string, { art: HeroArt; tint: HeroTint }> = {
  "/privacy": { art: "passport", tint: "sky" },
  "/terms": { art: "cards", tint: "sun" },
  "/delete-account": { art: "notebook", tint: "mint" },
};

export default function LegalDocument({ doc, path, locale }: { doc: LegalDoc; path: string; locale: Locale }) {
  const t = getT(locale);
  const look = LOOKS[path] ?? { art: "notebook", tint: "lilac" };
  const updated = new Date(`${LEGAL_UPDATED}T00:00:00Z`).toLocaleDateString(LOCALE_META[locale].ogLocale.replace("_", "-"), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(locale, "WebPage", path, t(doc.metaTitle), t(doc.metaDesc)),
          breadcrumbSchema(locale, [
            { name: t("Ana Sayfa"), path: "/" },
            { name: t(doc.breadcrumb), path },
          ]),
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-white pb-20 sm:pb-28">
        <PageHero
          crumbs={[{ label: t("Ana Sayfa"), href: "/" }, { label: t(doc.breadcrumb) }]}
          eyebrow={t(doc.eyebrow)}
          title={t(doc.h1)}
          art={look.art}
          tint={look.tint}
        >
          <p className="inline-flex rounded-full bg-white/80 px-4 py-2 font-mono text-xs font-semibold text-heading/70 shadow-layered backdrop-blur">{t("Son Güncelleme: {{p0}}", { p0: updated })}</p>
        </PageHero>

        <div className="mx-auto mt-4 grid max-w-[88rem] gap-4 px-4 sm:mt-5 sm:gap-5 sm:px-6 lg:grid-cols-[19rem_1fr] lg:items-start">
          {/* contents */}
          <nav aria-label={t(doc.breadcrumb)} className="rounded-[2rem] bg-paper p-6 lg:sticky lg:top-24 sm:rounded-[2.5rem]">
            <ol className="space-y-1">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-start gap-3 rounded-2xl px-3 py-2.5 text-[0.88rem] font-semibold leading-snug text-heading/75 transition-colors hover:bg-white hover:text-stage"
                  >
                    <span className="mt-0.5 font-mono text-[0.7rem] text-stage">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t(s.title)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* text */}
          <div className="rounded-[2rem] bg-white p-1 sm:rounded-[2.5rem] lg:p-2">
            <p className="rounded-[1.75rem] bg-paper p-6 text-[1.02rem] leading-[1.75] text-heading/80 sm:p-8">{withMailLinks(t(doc.intro))}</p>

            <div className="mt-2 divide-y divide-line px-2 text-[0.97rem] leading-[1.8] text-body sm:px-6">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 py-9 first:pt-8">
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-heading">
                    <span className="font-mono text-sm font-semibold text-stage">{String(i + 1).padStart(2, "0")}</span>
                    {t(s.title)}
                  </h2>
                  {s.paras?.map((p) => (
                    <p key={p} className="mt-3">
                      {withMailLinks(t(p))}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stage" />
                          <span>{withMailLinks(t(item))}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((p) => (
                    <p key={p} className="mt-4">
                      {withMailLinks(t(p))}
                    </p>
                  ))}
                  {s.link && (
                    <p className="mt-4">
                      <Link href={s.link.href} className="font-semibold text-stage underline underline-offset-4 hover:text-stage-deep">
                        {t(s.link.label)}
                      </Link>
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
