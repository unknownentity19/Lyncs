"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-8">
      {/* iMessage hook – compact top section */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <a
            href="#platforms"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/60 text-sm font-medium text-foreground hover:bg-accent-green transition-colors duration-200 mb-6"
          >
            <MessageCircle size={14} />
            Apply to jobs on iMessage
            <ArrowRight size={14} />
          </a>

          <a
            href="https://www.ycombinator.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-orange-500 text-white text-[10px] font-bold">
              Y
            </span>
            Backed by Y Combinator
          </a>
        </motion.div>
      </div>

      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[1.05] tracking-tight mb-8"
          >
            Be the first to apply to every job that fits you.{" "}
            <span className="text-muted">Hands off.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Lyncs watches 50,000+ career pages across Workday, Greenhouse,
            Lever, Ashby and 10+ more ATSes, and submits a tailored résumé the
            moment a fitting role goes up. Hundreds of applications a week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/20 hover:-translate-y-0.5"
            >
              Get started
              <ArrowRight size={16} />
            </a>
            <a
              href="#workflow"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:bg-card-alt transition-all duration-200"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-purple/60 text-xs font-medium">
              <MessageCircle size={12} />
              iMessage
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-blue/60 text-xs font-medium">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
