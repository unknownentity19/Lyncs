"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-card-alt border border-border p-12 sm:p-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
            Get the next 25 applications off your plate by tonight.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/20 hover:-translate-y-0.5"
            >
              Get started
              <ArrowRight size={16} />
            </a>
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white transition-all duration-200"
            >
              See pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
