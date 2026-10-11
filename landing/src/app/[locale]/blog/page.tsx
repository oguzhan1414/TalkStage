import BlogIndexClient from "./BlogIndexClient";
import type { Metadata } from "next";
import { alternatesFor } from "@/i18n/paths";
import { pageLocale, type PageProps } from "@/i18n/page";

export const metadata: Metadata = {
  title: "Blog — Spekvia",
  description: "İngilizce konuşma, seviye rehberleri, mülakat ve kelime ezberleme üzerine Spekvia yazıları.",
  alternates: alternatesFor("/blog", "tr", ["tr"]),
};

export default async function BlogPage({ params }: PageProps) {
  await pageLocale(params);
  return <BlogIndexClient />;
}
