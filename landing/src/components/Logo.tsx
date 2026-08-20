import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(79,70,229,0.18)] ring-1 ring-indigo/20 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/01_logo_app_icon.jpg"
          alt="TalkStage Logo"
          fill
          sizes="32px"
          className="object-cover"
          priority
        />
      </span>
      <span className="font-display font-extrabold text-[1.25rem] tracking-tight text-heading">
        Talk<span className="bg-linear-to-r from-indigo to-cyan bg-clip-text text-transparent">Stage</span>
      </span>
    </span>
  );
}
