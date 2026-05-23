"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-border bg-card-alt p-12 sm:p-16 text-center"
        >
          {/* aurora layer */}
          <div className="aurora">
            <span className="aurora__blob aurora__blob--a" style={{ opacity: 0.45 }} />
            <span className="aurora__blob aurora__blob--b" style={{ opacity: 0.45 }} />
            <span className="aurora__blob aurora__blob--c" style={{ opacity: 0.4 }} />
          </div>
          <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-50" />

          <div className="relative">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-border bg-white/70 backdrop-blur text-xs font-medium text-muted"
            >
              <Sparkles size={12} className="text-amber-500" />
              25 free applications, no card required
            </motion.span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
              Get the next 25 applications off your plate{" "}
              <span className="gradient-text">by tonight</span>.
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/25 hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="#pricing"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border bg-white/80 backdrop-blur text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white hover:border-foreground/25 transition-all duration-200"
              >
                See pricing
                <ArrowRight
                  size={16}
                  className="opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
