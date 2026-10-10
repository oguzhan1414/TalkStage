import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Ürün",
    links: [
      { label: "Sahneler", href: "/#sahneler" },
      { label: "Mivo", href: "/#mivo" },
      { label: "Günlük yol", href: "/#yol" },
      { label: "Fiyat", href: "/#fiyatlandirma" },
      { label: "Uygulamayı indir", href: "/#indir" },
    ],
  },
  {
    title: "Spekiva",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Blog", href: "/blog" },
      { label: "Sıkça sorulan sorular", href: "/sss" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "Gizlilik politikası", href: "/gizlilik" },
      { label: "Kullanım şartları", href: "/kullanim-sartlari" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-10 pt-16 text-white sm:px-8">
      <div aria-hidden className="slate-stripes absolute inset-x-0 top-0 h-2" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="group inline-block" aria-label="Spekiva ana sayfa">
              <Logo tone="light" />
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/65">
              İngilizceyi gerçek hayat sahnelerinde sesli prova et. Mivo karşında, düzeltme anında.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h4 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/45">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[0.92rem] text-white/80 transition-colors hover:text-slate-yellow">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[0.82rem] text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Spekiva. Tüm hakları saklıdır.</p>
          <p className="font-mono text-[0.72rem]">Türkçe · English · Español · Português · Deutsch</p>
        </div>
      </div>
    </footer>
  );
}
