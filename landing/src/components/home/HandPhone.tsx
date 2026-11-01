"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * A hand holding the phone, with an app screen behind its glass. Both photos are 1122 × 1402 with the green screen and
 * the background keyed out (sources in brand/landing/). Screen corners were measured on the photos (in %).
 *   front: upright, the screen is a rounded rectangle.
 *   tilt:  turned to the right, the screen is a quad; the app screen is warped onto it with matrix3d.
 */
const PHOTOS = {
  front: { src: "/hero/hand-phone-cut.webp", quad: [[30.0, 13.65], [70.1, 13.65], [70.1, 82.75], [30.0, 82.75]] },
  tilt: { src: "/hero/hand-phone-tilt.webp", quad: [[38.07, 11.79], [74.87, 13.81], [68.41, 82.45], [28.68, 79.31]] },
} as const;

/** App screens are drawn at this size, then mapped onto the glass, so they keep their proportions at any width. */
const BASE_W = 260;
const BASE_H = 562;

export default function HandPhone({
  children,
  variant = "front",
  className = "",
  priority = false,
  label,
}: {
  children: React.ReactNode;
  variant?: keyof typeof PHOTOS;
  className?: string;
  priority?: boolean;
  label?: string;
}) {
  const photo = PHOTOS[variant];
  const box = useRef<HTMLDivElement>(null);
  const [matrix, setMatrix] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      const pts = photo.quad.map(([x, y]) => [(x / 100) * width, (y / 100) * height] as const);
      setMatrix(toMatrix3d(pts));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [photo]);

  return (
    <div ref={box} role={label ? "img" : undefined} aria-label={label} className={`relative aspect-[1122/1402] ${className}`}>
      <div
        className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[35px] bg-white"
        style={{ width: BASE_W, height: BASE_H, transform: matrix ?? undefined, visibility: matrix ? "visible" : "hidden" }}
      >
        {children}
        <div aria-hidden className="absolute left-1/2 top-2 z-30 h-[1.15rem] w-[34%] -translate-x-1/2 rounded-full bg-[#121126]" />
      </div>
      <Image src={photo.src} alt="" fill priority={priority} sizes="(max-width: 1024px) 90vw, 620px" className="pointer-events-none select-none object-contain" />
    </div>
  );
}

/** CSS matrix3d that maps the BASE_W × BASE_H rectangle onto four points (tl, tr, br, bl). */
function toMatrix3d(dst: readonly (readonly [number, number])[]): string {
  const src = [
    [0, 0],
    [BASE_W, 0],
    [BASE_W, BASE_H],
    [0, BASE_H],
  ];
  // Solve the 8 unknowns of the homography (h22 = 1).
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  const h = solve(A, b);
  const [a, bb, c, d, e, f, g, k] = h;
  // column-major 4×4 for CSS
  return `matrix3d(${[a, d, 0, g, bb, e, 0, k, 0, 0, 1, 0, c, f, 0, 1].map((n) => +n.toFixed(10)).join(",")})`;
}

function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col] / M[col][col];
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}
