"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  /**
   * End value as a string. May contain digits, an optional decimal,
   * and an arbitrary prefix or suffix that is preserved verbatim
   * (e.g. "50k+", "8s", "34%", "$120k", "1,240").
   */
  value: string;
  /** Animation duration in ms (default 1400). */
  duration?: number;
  className?: string;
};

interface Parsed {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
}

/**
 * Pulls the numeric portion out of `value`. Anything before the first
 * digit becomes the prefix; anything after the last digit becomes the
 * suffix; commas inside the number are stripped before parsing so that
 * "1,240" still produces target = 1240 (and toLocaleString on output
 * puts the commas back).
 */
function parseValue(value: string): Parsed | null {
  const match = value.match(/^([^\d.-]*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const numStr = match[2].replace(/,/g, "");
  if (numStr === "" || isNaN(parseFloat(numStr))) return null;
  return {
    prefix: match[1] ?? "",
    target: parseFloat(numStr),
    suffix: match[3] ?? "",
    decimals: numStr.includes(".") ? numStr.split(".")[1]!.length : 0,
  };
}

/**
 * Counts up to a numeric target the first time the element scrolls
 * into view. Two design choices that prevent the visual jitter you
 * see in naive counter components:
 *
 * 1. The output is rendered in a plain <span> with `tabular-nums`,
 *    which forces every digit to occupy the same advance width. That
 *    keeps surrounding layout pinned in place while digits cycle.
 *
 * 2. A ref guards the requestAnimationFrame so the count only runs
 *    once per mount. Without this guard, any parent re-render that
 *    happens to land while the counter is animating (filter changes,
 *    hover state on a card, etc.) was restarting the timer and
 *    snapping the value back toward zero.
 */
export default function AnimatedCounter({
  value,
  duration = 1400,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const parsed = useMemo(() => parseValue(value), [value]);

  const animatedRef = useRef(false);
  const [display, setDisplay] = useState<number>(() =>
    parsed && prefersReducedMotion ? parsed.target : 0
  );

  useEffect(() => {
    if (!parsed) return;
    if (!inView) return;
    if (animatedRef.current) return;
    animatedRef.current = true;

    if (prefersReducedMotion) {
      setDisplay(parsed.target);
      return;
    }

    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic; runs the count fast at first, settles smoothly
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(parsed.target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, prefersReducedMotion]);

  // Non-numeric input (rare): render verbatim.
  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formatted =
    parsed.decimals > 0
      ? display.toFixed(parsed.decimals)
      : Math.round(display).toLocaleString();

  return (
    <span
      ref={ref}
      className={["tabular-nums", className].filter(Boolean).join(" ")}
    >
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
