import Image from "next/image";

/** Spekvia wordmark (transparent PNG). `tone="light"` is the white variant for dark backgrounds. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={tone === "light" ? "/brand/spekvia-wordmark-white.png" : "/brand/spekvia-wordmark.png"}
        alt="Spekvia"
        width={1200}
        height={355}
        sizes="140px"
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </span>
  );
}
