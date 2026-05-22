"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { workflowMetrics, workflowSteps } from "@/components/workflowSteps";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = workflowSteps[activeStep];
  const Icon = current.icon;

  return (
    <section id="workflow" className="border-y border-border bg-card-alt/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-muted">
              How it works
            </p>
            <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
              A controlled application pipeline, not a black box.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Lyncs turns every matched role into a reviewed submission trail:
              find the job, prepare the materials, submit the form, then keep
              the status moving.
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-lg border border-border bg-white">
            {workflowMetrics.map((metric) => (
              <div key={metric.label} className="p-4">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mb-8 grid gap-3 md:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-lg border p-4 text-left transition-all duration-200 ${
                activeStep === index
                  ? "border-foreground bg-white shadow-sm"
                  : "border-border bg-white/70 text-muted hover:border-foreground/30 hover:bg-white"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase">
                  {step.eyebrow}
                </span>
                <step.icon size={17} />
              </span>
              <span className="mt-4 block text-lg font-semibold text-foreground">
                {step.id.toString().padStart(2, "0")}. {step.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${current.iconBg}`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${current.accent}`}>
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
                  {current.details.slice(0, 4).map((detail) => (
                    <div key={detail} className="flex gap-3 rounded-lg border border-border bg-card-alt p-4">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-green-600" />
                      <p className="text-sm leading-relaxed text-muted">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="border-t border-border bg-card-alt p-6 lg:border-l lg:border-t-0 lg:p-8">
                <p className="text-sm font-semibold text-muted">Current output</p>
                <p className="mt-3 text-5xl font-bold text-foreground">
                  {current.metric}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {current.metricLabel}
                </p>

                <div className="mt-8 space-y-3">
                  {workflowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          index <= activeStep ? "bg-foreground" : "bg-border"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          index === activeStep
                            ? "font-semibold text-foreground"
                            : "text-muted"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="/how-it-works"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted"
                >
                  View full workflow
                  <ArrowRight size={16} />
                </a>
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
