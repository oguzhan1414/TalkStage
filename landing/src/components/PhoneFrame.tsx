import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  rotate?: string;
  priority?: boolean;
  glow?: boolean;
  className?: string;
  showNotch?: boolean;
  theme?: "light" | "dark";
  children?: React.ReactNode;
};

const REFERENCE_WIDTH = 260;

/**
 * Ultra-premium smartphone device frame for real TalkStage mobile captures or living React mockups.
 */
export default function PhoneFrame({
  src,
  alt = "TalkStage Mobile App",
  width = 260,
  rotate = "-rotate-2",
  priority,
  glow = true,
  className = "",
  showNotch = false,
  theme = "light",
  children,
}: Props) {
  const scale = width / REFERENCE_WIDTH;
  const isLight = theme === "light";

  return (
    <div className={`relative ${rotate} shrink-0 ${className}`} style={{ width }}>
      {/* Optional Ambient Glow behind phone */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[3.25rem] bg-linear-to-tr from-pink-500/20 via-blue-500/20 to-lime-500/15 blur-2xl -z-10"
        />
      )}

      {/* Smartphone Outer Shell */}
      <div
        className={`relative rounded-[2.75rem] border-[6px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22),0_0_0_1px_rgba(255,255,255,0.7)_inset] ${
          isLight
            ? "border-slate-300/80 bg-slate-100"
            : "border-[#0f172a] bg-[#0f172a]"
        }`}
      >
        {/* Physical Side Buttons */}
        <div
          className="absolute left-0 top-0 z-10 pointer-events-none"
          style={{ width: REFERENCE_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <div className={`absolute -left-[6px] top-20 h-6 w-[3px] rounded-full ${isLight ? "bg-slate-400" : "bg-[#334155]"}`} />
          <div className={`absolute -left-[6px] top-30 h-10 w-[3px] rounded-full ${isLight ? "bg-slate-400" : "bg-[#334155]"}`} />
          <div className={`absolute -left-[6px] top-42 h-10 w-[3px] rounded-full ${isLight ? "bg-slate-400" : "bg-[#334155]"}`} />
          <div className={`absolute -right-[6px] top-26 h-14 w-[3px] rounded-full ${isLight ? "bg-slate-400" : "bg-[#334155]"}`} />
        </div>

        {/* Inner Screen Container */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.25rem] bg-white">
          {children ? (
            <div className="relative w-full h-full overflow-hidden">{children}</div>
          ) : src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={`${width}px`}
              priority={priority}
              className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : null}

          {/* Minimal Dynamic Island / Speaker if enabled */}
          {showNotch && (
            <div
              className="absolute left-1/2 top-2 z-30 -translate-x-1/2 rounded-full bg-slate-900 flex items-center justify-between px-2.5 shadow-sm pointer-events-none"
              style={{
                width: 76 * scale,
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
            className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-60"
          />

          {/* Inner Bezel Ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-black/5 ring-inset"
          />
        </div>
      </div>
    </div>
  );
}
