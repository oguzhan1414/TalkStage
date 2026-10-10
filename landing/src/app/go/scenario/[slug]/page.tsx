"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { androidStoreUrl, appScheme, iosStoreUrl } from "@/lib/links";

/**
 * Smart Deep-Link Router (landing Görev 10, mobile Görev 18's counterpart).
 * TikTok/Instagram bio links point here as
 * `https://<domain>/go/scenario/:slug`. Attempts to open the app via the
 * custom scheme; if the tab is still visible after a short delay (app not
 * installed), falls back to the right app store for the visiting device.
 */
export default function ScenarioDeepLinkPage() {
  const params = useParams<{ slug: string }>();
  const [fallbackVisible, setFallbackVisible] = useState(false);

  const slug = params?.slug;
  const appUrl = slug ? `${appScheme}scenario/${slug}` : null;

  useEffect(() => {
    if (!appUrl) return;

    const userAgent = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const storeUrl = isIOS ? iosStoreUrl : isAndroid ? androidStoreUrl : null;

    window.location.href = appUrl;

    const fallbackTimer = setTimeout(() => {
      setFallbackVisible(true);
      if (storeUrl && storeUrl !== "#") {
        window.location.href = storeUrl;
      }
    }, 1500);

    const handleVisibilityChange = () => {
      // The tab going hidden means the OS switched to the app — cancel the store fallback.
      if (document.hidden) clearTimeout(fallbackTimer);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [appUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-indigo" />
      <p className="text-heading font-semibold">Spekiva açılıyor…</p>
      <p className="text-muted text-sm">
        Uygulama açılmadıysa mağazaya yönlendirileceksin.
      </p>
      {fallbackVisible ? (
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <a href={iosStoreUrl} className="text-indigo underline">
            App Store&rsquo;dan indir
          </a>
          <a href={androidStoreUrl} className="text-indigo underline">
            Google Play&rsquo;den indir
          </a>
        </div>
      ) : null}
    </main>
  );
}
