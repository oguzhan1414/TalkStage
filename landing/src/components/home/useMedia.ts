"use client";

import { useSyncExternalStore } from "react";

/** A media query as state. `false` on the server and during hydration, the real value right after. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** The visitor asked the system for less motion: scroll-driven scenes fall back to plain stacked layouts. */
export function useCalm(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)");
}
