import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { SITE_URL } from "@/i18n/config";
import { setRequestLocale } from "@/i18n/server";

// The logged-in web app (/app) and the deep-link router (/go) are Turkish for now.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Spekvia",
  robots: { index: false, follow: false },
  icons: { icon: "/brand/spekvia-app-icon.png", apple: "/brand/spekvia-app-icon.png" },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale("tr");
  return <RootShell locale="tr">{children}</RootShell>;
}
