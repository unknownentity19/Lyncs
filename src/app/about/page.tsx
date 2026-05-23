"use client";

import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Globe2,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const aboutMetrics = [
  { value: "50,000+", label: "career pages monitored every day" },
  { value: "10+", label: "ATSes covered, from Workday to Ashby" },
  { value: "100s/wk", label: "tailored applications submitted per user" },
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

const aboutStory = [
  {
    icon: Target,
    title: "The problem we kept hitting.",
    description:
      "The best roles disappear in 48 hours. Most candidates spend their evenings tweaking the same bullet points across Workday, Greenhouse, Lever, and Ashby — and still miss the window. Recruiters reward fit and timing, not effort, so the careful applicant loses to the fast one.",
  },
  {
    icon: Heart,
    title: "What we wanted instead.",
    description:
      "An agent that does the patient, careful work of tailoring an application — in your voice, with your receipts, on your terms — and submits in minutes, not days. Something that frees you to focus on the conversations that actually move offers forward.",
  },
  {
    icon: Users,
    title: "Who Lyncs is for.",
    description:
      "New grads casting a wide net, senior engineers running a quiet search, designers and PMs targeting a short list of dream companies. Set your criteria once, review the queue every morning, and let the agent handle the rest with full receipts.",
  },
];

const teamValues = [
  {
    label: "We answer email.",
    detail:
      "Founders read every message. Bugs, feature requests, edge cases — all welcome.",
  },
  {
    label: "We build in the open.",
    detail:
      "Changelog is public, AI usage is disclosed, and you can delete your data any time.",
  },
  {
    label: "We respect your time.",
    detail:
      "No dark patterns, no auto-renew traps, no growth-hack pop-ups asking you to share Lyncs.",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden border-b border-border bg-card-alt/40 px-6 py-20 sm:py-24">
        <div className="aurora">
          <span className="aurora__blob aurora__blob--a" />
          <span className="aurora__blob aurora__blob--b" />
          <span className="aurora__blob aurora__blob--c" />
        </div>
        <div className="bg-grid bg-grid-fade absolute inset-0 -z-10" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
              <Sparkles size={14} />
              About Lyncs
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Built by people tired of pasting the same résumé into{" "}
              <span className="gradient-text">the same form.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              Lyncs is a transparent application agent for job seekers. We
              watch the entire ATS landscape, draft a role-specific résumé and
              answers the moment a fitting job goes live, and submit it for
              you — with every step reviewable and reversible.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/25"
              >
                <Sparkles size={15} className="opacity-80" />
                Get started
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="mailto:founders@lyncs.com?subject=Hi%20Lyncs"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/80 px-8 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-all duration-200 hover:border-foreground/25 hover:bg-card-alt"
              >
                <MessageCircle size={15} className="opacity-70" />
                Talk to the founders
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-14 grid border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border"
          >
            {aboutMetrics.map((metric) => (
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
            className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                Our story
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Job hunting shouldn&rsquo;t be a full-time job.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              We started Lyncs because every founder, engineer, and designer
              we know was losing weeks of their life to the same forms. The
              tooling for hiring is great. The tooling for being hired is
              stuck in 2012.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {aboutStory.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * index }}
                className="hover-glow rounded-lg border border-border bg-white p-6 sm:p-8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-card-alt">
                  <item.icon size={21} className="text-foreground" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
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
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              How we think
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Four principles we won&rsquo;t bend on.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every product decision at Lyncs runs through this short list. If
              a feature can&rsquo;t pass all four, we don&rsquo;t ship it.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPrinciples.map((principle, index) => (
              <motion.article
                key={principle.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * index }}
                className="hover-glow flex min-h-[260px] flex-col rounded-lg border border-border bg-white p-5"
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
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                The team
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                A small team, building in the open from San Francisco.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Lyncs is built by a small group of engineers and former hiring
                managers. We&rsquo;ve sat on both sides of the table —
                submitting hundreds of applications and screening thousands of
                them — and we&rsquo;re building the tool we wish had existed.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {teamValues.map((value) => (
                  <div
                    key={value.label}
                    className="rounded-lg border border-border bg-card-alt p-5"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {value.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {value.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-border bg-white p-6 sm:p-8">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                <span className="dot-pulse" />
                Talk to the founders
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                We answer email — questions, feature requests, partnership
                pitches, the occasional bug bounty. If something about Lyncs
                isn&rsquo;t working for you, we want to hear it directly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="mailto:founders@lyncs.com?subject=Hi%20Lyncs"
                  className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-foreground/90"
                >
                  <Sparkles size={15} />
                  Email the founders
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-card-alt"
                >
                  Read the changelog
                </Link>
              </div>
            </aside>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col justify-between gap-6 border-t border-border pt-12 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to let the agent take over the forms?
            </h2>
            <p className="mt-3 text-muted">
              Start with 25 free applications. No credit card required.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="group btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/25"
          >
            Get started
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
