/** A phone body drawn in CSS; the screen is whatever is passed in (an app screen mock now, a real screenshot later). */
export default function Phone({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative aspect-[9/19.5] rounded-[2.6rem] bg-[#121126] p-[0.55rem] shadow-[0_50px_80px_-30px_rgba(21,18,58,0.55),0_20px_30px_-20px_rgba(21,18,58,0.35)] ring-1 ring-white/10 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
        {children}
        <div aria-hidden className="absolute left-1/2 top-2 z-30 h-[1.15rem] w-[34%] -translate-x-1/2 rounded-full bg-[#121126]" />
      </div>
    </div>
  );
}
