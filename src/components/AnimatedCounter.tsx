"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useReducedMotion } from "framer-motion";

type Props = {
  /** End numeric value as a string – may include digits, "+", "%", "k", "s", etc. */
  value: string;
  /** Animation duration in ms (default 1400). */
  duration?: number;
  className?: string;
};

/**
 * Counts up to a number when scrolled into view. Preserves any non-digit
 * suffix/prefix from the original string (e.g. "50k+", "8s", "34%").
 */
export default function AnimatedCounter({
  value,
  duration = 1400,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  // Parse the numeric portion. Anything else becomes a suffix.
  const match = value.match(/^([^\d.-]*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = (match?.[2] ?? "").includes(".")
    ? (match![2].split(".")[1]?.length ?? 0)
    : 0;

  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || !match) return;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, match, prefersReducedMotion]);

  // If the input wasn't numeric at all, just render it verbatim.
  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
