import Image from "next/image";

/** The mobile wordmark; a CSS filter supplies the white tone on dark backgrounds. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" | "ink" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/assets/brand/wordmark.webp"
        alt="Spekvia"
        width={520}
        height={144}
        sizes="140px"
        className={`h-8 w-auto transition-transform duration-300 group-hover:scale-105 ${tone === "light" ? "brightness-0 invert" : tone === "ink" ? "brightness-0" : ""}`}
        priority
      />
    </span>
  );
}
