'use client';

import { trackEvent } from '@/lib/analytics';

/** Wraps a server-rendered CTA so the hero can stay a server component but still report clicks. */
export default function HeroCtaTracker({ children }: { children: React.ReactNode }) {
  return <span onClick={() => trackEvent('cta_clicked', { location: 'hero_primary' })}>{children}</span>;
}
