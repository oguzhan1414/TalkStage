import Image from "next/image";

export default function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/brand/talkstage-mark.png"
          alt=""
          fill
          sizes="32px"
          className={`object-contain ${tone === "light" ? "rounded-md bg-white p-0.5" : ""}`}
          priority
        />
      </span>
      <span
        className={`font-display text-[1.25rem] font-extrabold tracking-tight ${tone === "light" ? "text-white" : "text-heading"}`}
      >
        Talk<span className={tone === "light" ? "text-slate-yellow" : "text-stage"}>Stage</span>
      </span>
    </span>
  );
}
