"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { workflowMetrics, workflowSteps } from "@/components/workflowSteps";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = workflowSteps[activeStep];
  const Icon = current.icon;

  return (
    <section
      id="workflow"
      className="relative border-y border-border bg-card-alt/40 px-6 py-24"
    >
      {/* faint grid */}
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              How it works
            </p>
            <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
              A controlled application pipeline,{" "}
              <span className="gradient-text">not a black box</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Lyncs turns every matched role into a reviewed submission trail:
              find the job, prepare the materials, submit the form, then keep
              the status moving.
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
            {workflowMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.07 * i }}
                className="p-4"
              >
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={metric.value} />
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step tabs with animated indicator */}
        <div className="mb-8 grid gap-3 md:grid-cols-4">
          {workflowSteps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                  isActive
                    ? "border-foreground/40 bg-white shadow-sm"
                    : "border-border bg-white/70 text-muted hover:border-foreground/30 hover:bg-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="step-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-white via-indigo-50 to-pink-50"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {step.eyebrow}
                  </span>
                  <step.icon
                    size={17}
                    className={isActive ? "text-foreground" : "text-muted"}
                  />
                </span>
                <span className="mt-4 block text-lg font-semibold text-foreground">
                  {step.id.toString().padStart(2, "0")}. {step.label}
                </span>
                {/* progress bar */}
                <span className="mt-3 block h-1 w-full overflow-hidden rounded-full bg-border">
                  <motion.span
                    initial={false}
                    animate={{
                      width: index <= activeStep ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="block h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                  />
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.18)]"
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.85, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${current.iconBg} shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </motion.div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${current.accent}`}
                  >
                    Step {current.id} of {workflowSteps.length}
                  </span>
                </div>

                <h3 className="max-w-2xl text-2xl font-bold sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                  {current.description}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {current.details.slice(0, 4).map((detail, i) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="flex gap-3 rounded-xl border border-border bg-card-alt p-4 hover:border-foreground/25 hover:bg-white transition-all"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <p className="text-sm leading-relaxed text-muted">
                        {detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <aside className="border-t border-border bg-card-alt p-6 lg:border-l lg:border-t-0 lg:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Current output
                </p>
                <motion.p
                  key={`metric-${current.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-5xl font-bold text-foreground"
                >
                  <AnimatedCounter value={current.metric} />
                </motion.p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {current.metricLabel}
                </p>

                <div className="mt-8 space-y-3">
                  {workflowSteps.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className="flex w-full items-center gap-3 rounded-md p-1 text-left transition-colors hover:bg-white/60"
                    >
                      <span
                        className={`relative h-2.5 w-2.5 rounded-full transition-colors ${
                          index <= activeStep ? "bg-foreground" : "bg-border"
                        }`}
                      >
                        {index === activeStep && (
                          <span className="absolute inset-0 rounded-full ring-4 ring-foreground/15" />
                        )}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          index === activeStep
                            ? "font-semibold text-foreground"
                            : "text-muted"
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>

                <a
                  href="/how-it-works"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted"
                >
                  View full workflow
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
