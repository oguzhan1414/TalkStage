import { redirect } from "next/navigation";
import { localizePath } from "@/i18n/paths";
import { pageLocale, type PageProps } from "@/i18n/page";

// Sign-up lives inside the onboarding flow.
export default async function SignupPage({ params }: PageProps) {
  const locale = await pageLocale(params);
  redirect(localizePath("/onboarding", locale));
}
