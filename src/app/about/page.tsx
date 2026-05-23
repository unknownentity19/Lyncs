"use client";

import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const values = [
  {
    icon: Eye,
    title: "Transparency by default",
    description:
      "Every match, edit, and submission has a paper trail. You see what was sent, when, and to whom — never a silent dispatch.",
  },
  {
    icon: ShieldCheck,
    title: "Human in the loop",
    description:
      "We automate the tedious parts of applying, not the judgement. Your approval gates the steps that matter.",
  },
  {
    icon: Heart,
    title: "Built for real job seekers",
    description:
      "The laid-off, the OPT-clocked, the new grad. We design for the moments when the search feels overwhelming.",
  },
  {
    icon: Wrench,
    title: "Operator-grade tooling",
    description:
      "Receipts, retries, exports, and integrations. Lyncs behaves like infrastructure, not a content farm.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Lyncs starts as a weekend script",
    description:
      "Two friends, frustrated with auto-apply tools that lied about submissions, build the first version for themselves.",
  },
  {
    year: "2025",
    title: "Y Combinator backing",
    description:
      "Lyncs joins YC to build a transparent application agent that real recruiters and applicants can trust.",
  },
  {
    year: "2026",
    title: "12 ATSes, 4 surfaces, one workflow",
    description:
      "Today, Lyncs watches 50,000+ career pages and submits across web, iMessage, Chrome, and MCP / CLI.",
  },
];

const stats = [
  { value: "50k+", label: "Career pages watched" },
  { value: "12", label: "ATSes supported" },
  { value: "4", label: "Surfaces (web, iMessage, Chrome, CLI)" },
  { value: "25", label: "Free applications to start" },
];

const team = [
  {
    name: "Founders",
    role: "Engineering & Product",
    blurb:
      "Ex-platform engineers who shipped automation at scale. Now building the application layer they wished existed.",
    initials: "LY",
  },
  {
    name: "Operators",
    role: "Recruiting partners",
    blurb:
      "Working with in-house recruiters and TA leaders to keep submissions honest, compliant, and useful.",
    initials: "OP",
  },
  {
    name: "Y Combinator",
    role: "Backers",
    blurb:
      "Lyncs is backed by Y Combinator and a group of founders who have hired across thousands of roles.",
    initials: "YC",
  },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="border-b border-border bg-card-alt/40 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold">
              <Sparkles size={14} />
              About Lyncs
            </div>
            <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
              A transparent agent for the modern job search.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              Lyncs is the application layer for job seekers who still want
              visibility. We turn the messy work of finding roles, tailoring
              materials, and submitting forms into a single auditable workflow —
              so you can apply broadly without losing the receipts.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
              >
                Try Lyncs free
                <ArrowRight size={16} />
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card-alt"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-14 grid border-y border-border sm:grid-cols-4 sm:divide-x sm:divide-border"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 sm:px-6">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission / Story */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <motion.div {...fadeUp} transition={{ duration: 0.45 }}>
            <p className="text-sm font-semibold uppercase text-muted">
              Our mission
            </p>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Apply broadly. Stay in control.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Most auto-apply tools optimize for volume and hide what they
              actually did. We think that&rsquo;s the wrong tradeoff. Lyncs is
              built around a different idea: an application agent that moves
              fast but explains itself at every step.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              We want the next chapter of your career to start with a workflow
              you can defend — to yourself, to a recruiter, and to your future
              team.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card-alt p-8"
          >
            <p className="text-sm font-semibold uppercase text-muted">
              The Lyncs principle
            </p>
            <blockquote className="mt-4 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              &ldquo;Automation without visibility is just a black box with
              better marketing. We build the receipts in from day one.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-muted">
              — The Lyncs team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-card-alt/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase text-muted">
              What we believe
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Principles that shape every decision.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              These aren&rsquo;t poster values. They show up in the product —
              in the receipts we generate, the gates we keep, and the features
              we refuse to ship.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * index }}
                className="rounded-lg border border-border bg-white p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-card-alt">
                  <value.icon size={20} className="text-foreground" />
                </div>
                <h3 className="text-base font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-12 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase text-muted">
              Our story
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From a weekend script to a job-search operating layer.
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-2 left-4 top-2 hidden w-px bg-border md:block" />
            <div className="grid gap-8">
              {milestones.map((milestone, index) => (
                <motion.article
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 * index }}
                  className="grid gap-4 md:grid-cols-[64px_minmax(0,1fr)] md:gap-8"
                >
                  <div className="relative flex md:justify-start">
                    <div className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-white p-6">
                    <p className="text-sm font-semibold text-muted">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team / backers */}
      <section className="border-y border-border bg-card-alt/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase text-muted">
                Who builds Lyncs
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                A small team, a focused mandate.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              We&rsquo;re a tight team of engineers, designers, and operators
              backed by Y Combinator. We work in public, ship weekly, and read
              every support email.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * index }}
                className="rounded-lg border border-border bg-white p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-foreground text-sm font-semibold text-white">
                  {member.initials}
                </div>
                <h3 className="text-base font-semibold">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase text-muted">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {member.blurb}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-10 flex flex-col items-start gap-3 rounded-lg border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-base font-bold text-white">
                Y
              </div>
              <div>
                <p className="text-base font-semibold">Backed by Y Combinator</p>
                <p className="text-sm text-muted">
                  Part of a growing class of agent-first startups.
                </p>
              </div>
            </div>
            <a
              href="https://www.ycombinator.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted"
            >
              View YC profile
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col justify-between gap-6 border-t border-border pt-12 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Want to work with us — or for us?
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-muted">
              <Users size={16} />
              Try Lyncs free, or reach out at{" "}
              <a
                href="mailto:founders@lyncs.com"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                founders@lyncs.com
              </a>
              .
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
