"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { platformStats, platformSurfaces } from "@/components/platformSurfaces";

export default function Platforms() {
  return (
    <section id="platforms" className="border-y border-border bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-muted">
              Platform coverage
            </p>
            <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
              Every surface. One agent.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              The interface changes based on where you are working. The matching,
              tailoring, submission, and tracking engine stays the same.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {platformStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card-alt p-4">
                <stat.icon size={17} className="mb-2 text-muted" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-4">
          {platformSurfaces.map((surface, index) => (
            <motion.article
              key={surface.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              className="group flex min-h-[340px] flex-col rounded-lg border border-border bg-card-alt p-5 transition-all duration-200 hover:border-foreground/25 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${surface.iconBg}`}>
                  <surface.icon size={21} className="text-white" />
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${surface.tone}`}>
                  {surface.shortTitle}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase text-muted">
                  {surface.badge}
                </p>
                <h3 className="mt-2 text-xl font-bold">{surface.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {surface.description}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {surface.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="flex gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                    <p className="text-sm leading-relaxed text-muted">{feature}</p>
                  </div>
                ))}
              </div>

              <a
                href={surface.link.href}
                className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-muted"
              >
                {surface.link.label}
                <ArrowRight size={15} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
