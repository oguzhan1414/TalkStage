"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/client";

/** Landing-specific screen artwork; the raw app captures remain in assets/screens. */
export const SCREENS = {
  today: "/assets/screens/marketing/today.webp",
  words: "/assets/screens/marketing/words.webp",
  talk: "/assets/screens/marketing/talk.webp",
  mistakes: "/assets/screens/marketing/mistakes.webp",
  scenes: "/assets/screens/scenes.webp",
  rooms: "/assets/screens/rooms.webp",
  library: "/assets/screens/library.webp",
  pronounce: "/assets/screens/pronounce.webp",
} as const;
export type ScreenName = keyof typeof SCREENS;

const LOCALIZED_SCREENS: readonly ScreenName[] = ["today", "words", "talk", "mistakes"];

/** A phone with screen artwork inside. Its size comes from the width the caller gives it. */
export default function Device({
  screen,
  alt = "",
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 60vw, 320px",
}: {
  screen: ScreenName;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const locale = useLocale();
  const src = locale !== "tr" && LOCALIZED_SCREENS.includes(screen)
    ? `/assets/screens/marketing/${locale}/${screen}.webp`
    : SCREENS[screen];

  return (
    <div className={`device ${className}`}>
      <div className="device__screen">
        <Image src={src} alt={alt} width={720} height={1540} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
