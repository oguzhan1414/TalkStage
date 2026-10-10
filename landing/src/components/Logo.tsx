import Image from "next/image";

/** Spekiva wordmark (transparent PNG). `tone="light"` is the white variant for dark backgrounds. */
export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={tone === "light" ? "/brand/spekiva-wordmark-white.png" : "/brand/spekiva-wordmark.png"}
        alt="Spekiva"
        width={1200}
        height={380}
        sizes="140px"
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </span>
  );
}
