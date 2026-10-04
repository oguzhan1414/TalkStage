import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

const productLinks = [
  { label: "Sahneler & Senaryolar", href: "/#sahneler" },
  { label: "Öğrenme Metodolojisi", href: "/#metodoloji" },
  { label: "Nasıl Çalışır?", href: "/#nasil-calisir" },
  { label: "Fiyatlandırma Planları", href: "/#fiyatlandirma" },
  { label: "Uygulamayı İndir", href: "/#indir" },
];

const companyLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog & Seviye Rehberleri", href: "/blog" },
  { label: "Sıkça Sorulan Sorular (SSS)", href: "/sss" },
  { label: "İletişim & Destek", href: "/iletisim" },
];

const legalLinks = [
  { label: "Gizlilik Politikası (KVKK / GDPR)", href: "/gizlilik" },
  { label: "Kullanım Şartları & Sözleşme", href: "/kullanim-sartlari" },
];

const socialLinks = [
  { label: "TikTok", href: "https://tiktok.com", icon: <TikTokIcon /> },
  { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
  { label: "YouTube", href: "https://youtube.com", icon: <YouTubeIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/60 bg-heading px-6 pt-16 pb-12 text-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-pink-pop via-blue-pop to-lime-pop" />
      {/* 3D Footer Ambient Backdrop (36_bg_footer_ambient.png) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 -z-10 overflow-hidden opacity-60"
      >
        <Image
          src="/images/36_bg_footer_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/50 to-white" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand Info & Social Icons */}
          <div className="max-w-sm">
            <Link href="/" scroll={true} className="inline-block transition-transform hover:scale-105">
              <Logo />
            </Link>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-body">
              Gramer bulmacalarını geride bırak. Yapay zekâ ile gerçek hayattaki senaryolarda konuş, anında Türkçe geri bildirim al.
            </p>

            {/* Official SVG Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/90 text-heading shadow-2xs transition-all hover:-translate-y-0.5 hover:border-indigo hover:text-indigo hover:shadow-xs"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Meaningful & Non-Repetitive Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            {/* Ürün & Keşfet */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-heading">
                Ürün & Keşfet
              </h4>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      scroll={true}
                      className="text-[0.88rem] text-muted transition-colors hover:text-indigo"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Şirket */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-heading">
                Kurumsal
              </h4>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      scroll={true}
                      className="text-[0.88rem] text-muted transition-colors hover:text-indigo"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Yasal & Güvenlik */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-heading">
                Yasal & Güvenlik
              </h4>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      scroll={true}
                      className="text-[0.88rem] text-muted transition-colors hover:text-indigo"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clean Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line/80 pt-6 text-[0.82rem] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} TalkStage Inc. Tüm hakları saklıdır.</p>

          <div className="flex items-center gap-4">
            <Link href="/gizlilik" scroll={true} className="transition-colors hover:text-indigo">
              Gizlilik
            </Link>
            <span>•</span>
            <Link href="/kullanim-sartlari" scroll={true} className="transition-colors hover:text-indigo">
              Şartlar
            </Link>
            <span>•</span>
            <Link href="/iletisim" scroll={true} className="transition-colors hover:text-indigo">
              Destek
            </Link>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[0.75rem]">
            <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 font-semibold text-heading">
              🇹🇷 TR
            </span>
            <span
              className="cursor-pointer px-2.5 py-1 text-muted transition-colors hover:text-heading"
              title="English version coming soon"
            >
              🇬🇧 EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.88-4.46V8.78a8.17 8.17 0 0 0 4.89 1.6V6.93a4.83 4.83 0 0 1-1-.24Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
