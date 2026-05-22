"use client";

import PageWrapper from "@/components/PageWrapper";
import { platformStats, platformSurfaces } from "@/components/platformSurfaces";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Monitor } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

export default function PlatformsPage() {
  return (
    <PageWrapper>
      <section className="border-b border-border bg-card-alt/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
                <Monitor size={14} />
                Web, messaging, browser, and CLI
              </div>
              <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
                Every surface. One agent.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                Lyncs gives each workflow a native interface while keeping the
                same matching, tailoring, submission, and tracking engine behind
                all of them.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-white p-5">
              <p className="text-sm font-semibold text-muted">Surface model</p>
              <div className="mt-5 space-y-4">
                {platformSurfaces.map((surface) => (
                  <div key={surface.title} className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${surface.iconBg}`}
                    >
                      <surface.icon size={17} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{surface.shortTitle}</p>
                      <p className="text-xs text-muted">{surface.badge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-14 grid gap-3 sm:grid-cols-4"
          >
            {platformStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-white p-5">
                <stat.icon size={18} className="mb-3 text-muted" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase text-muted">
              Surface map
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Choose the interface that matches the moment.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Start in the dashboard, approve from your phone, save a role from
              Chrome, or trigger a batch from your AI tools. Everything syncs
              back to the same application pipeline.
            </p>
          </motion.div>

          <div className="space-y-6">
            {platformSurfaces.map((surface, index) => (
              <motion.article
                key={surface.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 * index }}
                className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                  <div>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${surface.iconBg}`}
                      >
                        <surface.icon size={22} className="text-white" />
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${surface.tone}`}>
                        {surface.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold sm:text-3xl">
                      {surface.title}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-muted">
                      {surface.subtitle}
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                      {surface.description}
                    </p>

                    <div className="mt-6 rounded-lg border border-border bg-card-alt p-4">
                      <p className="text-xs font-semibold uppercase text-muted">
                        Best for
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {surface.bestFor}
                      </p>
                    </div>

                    <a
                      href={surface.link.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-muted"
                    >
                      {surface.link.label}
                      <ArrowRight size={15} />
                    </a>
                  </div>

                  <aside className="space-y-4">
                    {surface.codeBlock && (
                      <div className="overflow-x-auto rounded-lg bg-foreground p-5 font-mono text-xs leading-relaxed text-green-400">
                        <pre>{surface.codeBlock}</pre>
                      </div>
                    )}
                    <div className="rounded-lg border border-border bg-card-alt p-5">
                      <p className="text-sm font-semibold">Capabilities</p>
                      <div className="mt-4 space-y-3">
                        {surface.features.map((feature) => (
                          <div key={feature} className="flex gap-3">
                            <CheckCircle2
                              size={17}
                              className="mt-0.5 shrink-0 text-green-600"
                            />
                            <p className="text-sm leading-relaxed text-muted">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pick your surface. Start applying.
            </h2>
            <p className="mt-3 text-muted">
              All surfaces are included with every plan. Start with 25 free
              applications.
            </p>
          </div>
          <a
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
          >
            Get started
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
