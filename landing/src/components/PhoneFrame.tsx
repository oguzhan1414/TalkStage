import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: number;
  rotate?: string;
  priority?: boolean;
  glow?: boolean;
  className?: string;
  showNotch?: boolean;
};

const REFERENCE_WIDTH = 260;

/**
 * Ultra-premium titanium/glass device frame for real TalkStage mobile captures.
 */
export default function PhoneFrame({
  src,
  alt,
  width = 260,
  rotate = "-rotate-2",
  priority,
  glow = true,
  className = "",
  showNotch = false,
}: Props) {
  const scale = width / REFERENCE_WIDTH;

  return (
    <div className={`relative ${rotate} shrink-0 ${className}`} style={{ width }}>
      {/* Optional Ambient Glow behind phone */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[3.25rem] bg-linear-to-tr from-indigo-500/25 via-cyan-400/20 to-emerald-400/15 blur-2xl -z-10"
        />
      )}

      {/* Titanium Outer Shell */}
      <div className="relative rounded-[2.75rem] border-[6px] border-[#0f172a] bg-[#0f172a] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset]">
        {/* Physical Side Buttons */}
        <div
          className="absolute left-0 top-0 z-10 pointer-events-none"
          style={{ width: REFERENCE_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div className="absolute -left-[6px] top-20 h-6 w-[3px] rounded-full bg-[#334155]" />
          <div className="absolute -left-[6px] top-30 h-10 w-[3px] rounded-full bg-[#334155]" />
          <div className="absolute -left-[6px] top-42 h-10 w-[3px] rounded-full bg-[#334155]" />
          <div className="absolute -right-[6px] top-26 h-14 w-[3px] rounded-full bg-[#334155]" />
        </div>

        {/* Inner Screen Container */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-slate-950">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${width}px`}
            priority={priority}
            className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
          />

          {/* Minimal Dynamic Island / Notch if enabled */}
          {showNotch && (
            <div
              className="absolute left-1/2 top-2 z-30 -translate-x-1/2 rounded-full bg-[#0f172a] flex items-center justify-between px-2.5 shadow-sm"
              style={{
                width: 80 * scale,
                height: 18 * scale,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
            </div>
          )}

          {/* Glass Glare & Light Sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-80"
          />

          {/* Inner Bezel Ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-black/10 ring-inset"
          />
        </div>
      </div>
    </div>
  );
}

