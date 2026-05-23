"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient scroll-progress bar pinned to the top of the viewport.
 * Sits above the navbar's bottom border via a small offset.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500"
    />
  );
}
