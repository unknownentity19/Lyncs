"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Globe2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const aboutStats = [
  { value: "50,000+", label: "career pages monitored every day" },
  { value: "10+", label: "ATSes covered, from Workday to Ashby" },
  { value: "100s/wk", label: "tailored applications submitted per user" },
  { value: "YC-backed", label: "transparent agent, not a black box" },
];

const aboutPrinciples = [
  {
    icon: Eye,
    eyebrow: "Transparent",
    title: "Every submission is reviewable.",
    description:
      "You see the role, the résumé, the answers, and the moment of submission. No hidden steps, no mystery clicks.",
    accent: "border-blue-200 bg-blue-50 text-blue-700",
    iconBg: "bg-blue-600",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Yours alone",
    title: "Your data never trains anyone else's model.",
    description:
      "Résumés, answers, and interview feedback stay in your account. Encrypted at rest, deletable in one click.",
    accent: "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-600",
  },
  {
    icon: Zap,
    eyebrow: "Always-on",
    title: "First applicants get interviews.",
    description:
      "Lyncs watches career pages around the clock and submits within minutes of a fitting role going live, while you sleep.",
    accent: "border-amber-200 bg-amber-50 text-amber-700",
    iconBg: "bg-amber-600",
  },
  {
    icon: Globe2,
    eyebrow: "Everywhere you are",
    title: "iMessage, Chrome, Web, MCP.",
    description:
      "One agent, four surfaces. Triage on iMessage, fix details in Chrome, dive deep on the dashboard, script it through MCP.",
    accent: "border-purple-200 bg-purple-50 text-purple-700",
    iconBg: "bg-purple-600",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-y border-border bg-card-alt/40 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-muted">
              About Lyncs
            </p>
            <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
              Built by people tired of pasting the same résumé into the same form.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Lyncs is a transparent application agent for job seekers. We watch
              the entire ATS landscape, draft a role-specific résumé and answers
              the moment a fitting job goes live, and submit it for you — with
              every step reviewable and reversible.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-white p-3">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md bg-card-alt p-4"
              >
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-12 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase text-muted">
              Why we&rsquo;re building Lyncs
            </p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Job hunting shouldn&rsquo;t be a full-time job.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The best roles disappear in 48 hours. Most candidates spend their
              evenings tweaking the same bullet points across Workday,
              Greenhouse, Lever, and Ashby — and still miss the window. We
              built Lyncs so that the patient, careful work of tailoring an
              application happens automatically, in your voice, while you focus
              on the conversations that actually move offers forward.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase text-muted">
              Who it&rsquo;s for
            </p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Anyone serious about landing the right role.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              New grads casting a wide net, senior engineers running a quiet
              search, designers and PMs targeting a short list of dream
              companies — Lyncs adapts to each playbook. Set the criteria once,
              review the queue every morning, and let the agent handle the rest
              with full receipts.
            </p>
            <a
              href="/signup"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-muted"
            >
              Start a free run
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPrinciples.map((principle, index) => (
            <motion.article
              key={principle.eyebrow}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              className="group flex min-h-[260px] flex-col rounded-lg border border-border bg-white p-5 transition-all duration-200 hover:border-foreground/25 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg ${principle.iconBg}`}
                >
                  <principle.icon size={21} className="text-white" />
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${principle.accent}`}
                >
                  {principle.eyebrow}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold leading-snug">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mt-12 flex flex-col items-start gap-4 rounded-lg border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
              Y
            </span>
            <div>
              <p className="text-xs font-semibold uppercase text-muted">
                Backed by Y Combinator
              </p>
              <p className="mt-1 max-w-xl text-base leading-relaxed text-foreground">
                A small team of engineers and former hiring managers, building
                in the open from San Francisco. We answer email — questions,
                feature requests, and the occasional bug bounty all welcome.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:founders@lyncs.com?subject=Hi%20Lyncs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-card-alt"
            >
              <Sparkles size={15} />
              Talk to the founders
            </a>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/20"
            >
              Get started
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
