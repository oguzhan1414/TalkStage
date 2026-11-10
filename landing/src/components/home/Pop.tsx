"use client";

import { MotionConfig, motion } from "motion/react";

/** Something that pops into place the first time it scrolls into view. `rotate` is where it comes to rest. */
export default function Pop({
  children,
  className = "",
  delay = 0,
  rotate = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.82, y: 36, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ type: "spring", stiffness: 240, damping: 19, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps the home page: Motion drops movement (keeps fades) for visitors who asked for reduced motion. */
export function HomeMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
