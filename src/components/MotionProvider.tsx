"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion defaults. Every framer-motion component on the site
 * inherits this transition unless it explicitly overrides one of the
 * fields. The cubic-bezier here is "ease-out-expo" — the same curve
 * iOS and Linear use for entrances. It accelerates fast and settles
 * very gently, which reads as "smooth" rather than the snappier
 * built-in "easeOut".
 *
 * Components that set `type: "spring"` keep their spring physics
 * because spring transitions ignore `ease`/`duration`.
 *
 * `reducedMotion="user"` tells framer-motion to honour the user's
 * prefers-reduced-motion setting automatically.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionConfig>
  );
}
