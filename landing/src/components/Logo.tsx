import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/brand/talkstage-mark.png"
          alt="TalkStage Logo"
          fill
          sizes="32px"
          className="object-contain"
          priority
        />
      </span>
      <span className="font-display font-extrabold text-[1.25rem] tracking-tight text-heading">
        Talk<span className="bg-linear-to-r from-indigo to-cyan bg-clip-text text-transparent">Stage</span>
      </span>
    </span>
  );
}
