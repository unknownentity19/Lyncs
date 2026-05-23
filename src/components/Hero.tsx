"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const headlineLead = "Be the first to apply to every job that fits you.";
const headlineEmphasis = "Hands off.";

const trustedCompanies = [
  "Stripe",
  "Notion",
  "Linear",
  "Figma",
  "Vercel",
  "Ramp",
  "Anthropic",
  "Airtable",
  "Plaid",
  "Retool",
];

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Atmosphere */}
      <div className="aurora">
        <span className="aurora__blob aurora__blob--a" />
        <span className="aurora__blob aurora__blob--b" />
        <span className="aurora__blob aurora__blob--c" />
      </div>
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10" />

      {/* iMessage hook + YC badge */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <a
            href="#platforms"
            className="group float-chip inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/70 hover:bg-accent-green text-sm font-medium text-foreground transition-colors duration-200 shadow-[0_8px_24px_-16px_rgba(34,197,94,0.6)]"
          >
            <MessageCircle size={14} className="text-emerald-700" />
            Apply to jobs on iMessage
            <ArrowRight
              size={14}
              className="arrow-bounce transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* Headline – word stagger */}
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-8"
          >
            {headlineLead.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordItem}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={wordItem}
              className="inline-block gradient-text"
            >
              {headlineEmphasis}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Lyncs watches 50,000+ career pages across Workday, Greenhouse,
            Lever, Ashby and 10+ more ATSes, and submits a tailored résumé the
            moment a fitting role goes up. Hundreds of applications a week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link
              href="/dashboard"
              className="group btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/25 hover:-translate-y-0.5"
            >
              <Sparkles size={15} className="opacity-80" />
              Get started
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#workflow"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-white/80 backdrop-blur text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:bg-card-alt hover:border-foreground/25 transition-all duration-200"
            >
              See how it works
              <ArrowRight
                size={16}
                className="opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <span className="float-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-purple/70 text-xs font-medium">
              <MessageCircle size={12} />
              iMessage
            </span>
            <span className="float-chip-delayed inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-blue/70 text-xs font-medium">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z" />
              </svg>
              Extension
            </span>
            <span className="float-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-yellow/70 text-xs font-medium">
              <Sparkles size={12} />
              MCP / CLI
            </span>
          </motion.div>
        </div>
      </div>

      {/* Trusted-by marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-16 marquee-mask"
        aria-hidden={prefersReducedMotion ? undefined : "true"}
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted/80 mb-5">
          Submits applications on
        </p>
        <div className="overflow-hidden">
          <div className="marquee gap-12 px-6">
            {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-base sm:text-lg font-semibold text-muted/70 hover:text-foreground transition-colors whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
