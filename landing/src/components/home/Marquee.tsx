/** A four-point spark between the words of a running strip. */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0c1.2 6.6 5.4 10.8 12 12-6.6 1.2-10.8 5.400-12 12-1.2-6.600-5.400-10.800-12-12 6.600-1.200 10.800-5.400 12-12Z" />
    </svg>
  );
}

/**
 * A strip of words that never stops. The words are read once by screen readers (the copies are hidden).
 * `sparks` are the colours of the marks between the words, used in turn.
 */
export default function Marquee({
  items,
  className = "",
  reverse = false,
  speed = 32,
  sparks = ["#FFCB3D", "#FF7A59", "#74DDB0", "#FFB5D2"],
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
  sparks?: string[];
}) {
  // Each track repeats the words so one track is always wider than a large screen.
  const run = [...items, ...items, ...items];
  const track = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {run.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 sm:px-7">{word}</span>
          <span className="shrink-0" style={{ color: sparks[i % sparks.length] }}>
            <Spark className="h-[0.7em] w-[0.7em]" />
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`} style={{ "--speed": `${speed}s` } as React.CSSProperties}>
      {track(false)}
      {track(true)}
    </div>
  );
}
