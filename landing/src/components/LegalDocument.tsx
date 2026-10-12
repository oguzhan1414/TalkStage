import { Fragment, type ReactNode } from "react";
import Link from "@/i18n/Link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
export default function LegalDocument({ doc, path, locale }: { doc: LegalDoc; path: string; locale: Locale }) {
  const t = getT(locale);
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
      <main className="flex-1 bg-white pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-indigo">
              {t("Ana Sayfa")}
            </Link>
            <span>/</span>
            <span className="font-semibold text-heading">{t(doc.breadcrumb)}</span>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo">{t(doc.eyebrow)}</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">{t(doc.h1)}</h1>
          <p className="mt-2 text-xs text-muted">{t("Son Güncelleme: {{p0}}", { p0: updated })}</p>
          <p className="mt-6 text-[0.95rem] leading-[1.75] text-body">{t(doc.intro)}</p>

          <div className="mt-10 space-y-8 text-[0.95rem] leading-[1.75] text-body">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="font-display text-xl font-bold text-heading">{t(s.title)}</h2>
                {s.paras?.map((p) => (
                  <p key={p} className="mt-2">
                    {withMailLinks(t(p))}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {s.list.map((item) => (
                      <li key={item}>{withMailLinks(t(item))}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => (
                  <p key={p} className="mt-3">
                    {withMailLinks(t(p))}
                  </p>
                ))}
                {s.link && (
                  <p className="mt-3">
                    <Link href={s.link.href} className="font-semibold text-indigo underline underline-offset-4 hover:text-stage">
                      {t(s.link.label)}
                    </Link>
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
