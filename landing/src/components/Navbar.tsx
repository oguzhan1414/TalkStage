import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/#sahneler", label: "Sahneler" },
  { href: "/#seviyeler", label: "Seviyeler (CEFR)" },
  { href: "/#metodoloji", label: "Metodoloji" },
  { href: "/#nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/#fiyatlandirma", label: "Fiyatlandırma" },
  { href: "/blog", label: "Blog" },
  { href: "/sss", label: "SSS" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="glass-card mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 shadow-[var(--shadow-layered)] sm:px-5">
        <Link href="/" className="shrink-0 transition-transform hover:scale-105">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[0.88rem] font-medium text-body transition-colors hover:bg-porcelain hover:text-heading"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#indir"
          className="inline-flex items-center rounded-full bg-linear-to-br from-indigo to-cyan px-5 py-2 text-[0.88rem] font-semibold text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.45)]"
        >
          Ücretsiz Başla
        </Link>
      </div>
    </header>
  );
}
