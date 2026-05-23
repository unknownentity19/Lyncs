"use client";

import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import {
  workflowFeatures,
  workflowMetrics,
  workflowSteps,
} from "@/components/workflowSteps";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

export default function HowItWorksPage() {
  return (
    <PageWrapper>
      <section className="border-b border-border bg-card-alt/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
              <Zap size={14} />
              Four governed steps
            </div>
            <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
              How Lyncs applies without losing control.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              Every application moves through the same auditable workflow:
              match intake, material review, ATS submission, and pipeline sync.
              You get speed without turning the process into a mystery.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
              >
                Get started free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card-alt"
              >
                See pricing
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-14 grid border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border"
          >
            {workflowMetrics.map((metric) => (
              <div key={metric.label} className="py-6 sm:px-6">
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="mt-1 text-sm text-muted">{metric.label}</p>
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
            className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase text-muted">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From posting to pipeline.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Each stage has a clear output, so the system feels less like an
              auto-apply tool and more like an operator keeping your search
              organized.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-10 left-6 top-10 hidden w-px bg-border md:block" />
            {workflowSteps.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 * index }}
                className="grid gap-6 border-b border-border py-10 md:grid-cols-[96px_minmax(0,1fr)_320px]"
              >
                <div className="relative flex md:justify-start">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-white">
                    <step.icon size={22} className="text-foreground" />
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-muted">
                      {step.id.toString().padStart(2, "0")}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${step.accent}`}>
                      {step.eyebrow}
                    </span>
                  </div>
                  <h3 className="max-w-2xl text-2xl font-bold sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex gap-3">
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-green-600"
                        />
                        <p className="text-sm leading-relaxed text-muted">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="rounded-lg border border-border bg-card-alt p-5">
                  <p className="text-xs font-semibold uppercase text-muted">
                    Stage output
                  </p>
                  <p className="mt-4 text-4xl font-bold text-foreground">
                    {step.metric}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.metricLabel}
                  </p>
                </aside>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card-alt/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase text-muted">
              Trust layer
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Built for applicants who still want visibility.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The automation is fast, but the control points stay visible:
              receipts, material changes, authorization answers, and follow-up
              status are all retained.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 * index }}
                className="rounded-lg border border-border bg-white p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-card-alt">
                  <feature.icon size={20} className="text-foreground" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col justify-between gap-6 border-t border-border pt-12 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Put the workflow to work.
            </h2>
            <p className="mt-3 text-muted">
              Start with 25 free applications. No credit card required.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
