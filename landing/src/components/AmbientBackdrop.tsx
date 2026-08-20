"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function AmbientBackdrop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layer1Ref = useRef<HTMLDivElement | null>(null);
  const layer2Ref = useRef<HTMLDivElement | null>(null);
  const layer3Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Layer 1 (Top Hero Ambient 34) smooth continuous parallax scrub
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }

      // 2. Layer 2 (Floating Glass Shapes 32 in middle) multi-speed parallax
      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      }

      // 3. Layer 3 (Bottom Ambient Lighting)
      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Layer 1: Top Hero Sunlit Daylight Ambient (34_bg_hero_ambient.png) */}
      <div
        ref={layer1Ref}
        className="absolute -top-[10%] left-0 right-0 h-[120vh] opacity-40 will-change-transform"
      >
        <Image
          src="/images/34_bg_hero_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/80" />
      </div>

      {/* Layer 2: Middle Floating Glass & Refraction Shapes (32_bg_floating_glass_shapes.png) */}
      <div
        ref={layer2Ref}
        className="absolute top-[35%] left-0 right-0 h-[120vh] opacity-25 will-change-transform"
      >
        <Image
          src="/images/32_bg_floating_glass_shapes.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-transparent to-white/70" />
      </div>

      {/* Layer 3: Bottom Footer Ambient Wave (36_bg_footer_ambient.png) */}
      <div
        ref={layer3Ref}
        className="absolute bottom-[-10%] left-0 right-0 h-[100vh] opacity-35 will-change-transform"
      >
        <Image
          src="/images/36_bg_footer_ambient.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/50 to-white" />
      </div>

      {/* Continuous Atmospheric Luminous Orbs */}
      <div className="absolute left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-linear-to-br from-indigo/8 to-transparent blur-[120px]" />
      <div className="absolute right-[5%] top-[55%] h-[700px] w-[700px] rounded-full bg-linear-to-br from-cyan/8 to-transparent blur-[140px]" />
      <div className="absolute left-[20%] bottom-[15%] h-[550px] w-[550px] rounded-full bg-linear-to-br from-indigo/6 to-transparent blur-[130px]" />
    </div>
  );
}
