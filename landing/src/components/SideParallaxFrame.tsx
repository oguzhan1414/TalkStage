"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SideParallaxFrame() {
  const frameContainerRef = useRef<HTMLDivElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Smooth continuous parallax glide on scroll
      if (imageLayerRef.current) {
        gsap.to(imageLayerRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: frameContainerRef }
  );

  return (
    <div
      ref={frameContainerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 overflow-hidden"
    >
      {/* 3D Side-Framed Glass & Audio Stream Backdrop (41_bg_side_framed_glass_stream.png) */}
      <div
        ref={imageLayerRef}
        className="absolute -top-[10%] left-0 right-0 h-[125vh] w-full opacity-70 will-change-transform"
      >
        <Image
          src="/images/41_bg_side_framed_glass_stream.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle Side Ambient Glow Accents */}
      <div className="absolute -left-20 top-1/3 h-[500px] w-[350px] rounded-full bg-linear-to-r from-indigo/8 via-cyan/6 to-transparent blur-[90px]" />
      <div className="absolute -right-20 top-2/3 h-[500px] w-[350px] rounded-full bg-linear-to-l from-cyan/8 via-indigo/6 to-transparent blur-[90px]" />
    </div>
  );
}
