"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) {
      // Sayfa değiştiğinde en tepeye anında kaydır
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    // Bölüm bağlantısıyla (ör. /es#precios) gelindi: bölüme git, sonra adres çubuğunu temizle.
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
