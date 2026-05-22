"use client";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const featuredPost = {
  slug: "lyncs-vs-competitors",
  title: "Lyncs vs every other auto-apply tool (we compared 20 of them)",
  excerpt:
    "We benchmarked Lyncs against 20 other auto-apply tools — LazyApply, Simplify, Jobright, Huntr, Teal, JobCopilot, Massive, and more. Here's where we win and where we lose.",
  date: "May 12, 2026",
  category: "Featured",
  readTime: "12 min read",
};

const posts = [
  {
    slug: "lyncs-vs-simplify",
    title: "Lyncs vs Simplify — $40/mo to save 5 minutes per application",
    excerpt:
      "Simplify is $39.99/mo for a chrome extension that types your name into a form. Lyncs queues an application in 2 seconds and the bot does the rest.",
    date: "May 12, 2026",
    category: "Simplify",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-jobright",
    title: "Lyncs vs Jobright Turbo — prettier autofill that still can't log in",
    excerpt:
      "Jobright Turbo is $29.99/mo for AI matching and a polished autofill. An autofill still can't log into job sites or answer screeners. Lyncs does the whole thing.",
    date: "May 12, 2026",
    category: "Jobright",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-sorce-jobs",
    title: "Lyncs vs Sorce.jobs — one surface vs eight",
    excerpt:
      "Sorce is a beautifully polished iOS app — and the only surface they have. Lyncs runs on eight.",
    date: "May 12, 2026",
    category: "Sorce.jobs",
    readTime: "4 min read",
  },
  {
    slug: "lyncs-vs-aiapply",
    title: "Lyncs vs AIApply — the paywall maze",
    excerpt:
      "AIApply is $50/mo for 100 applications, plus $12/mo for resume optimization, plus $12/mo for cover letter optimization. Lyncs is $19/mo for 600 apps with all of that included.",
    date: "May 12, 2026",
    category: "AIApply",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-massive",
    title: "Lyncs vs Massive — $99/mo for 200 apps and 23 onboarding steps",
    excerpt:
      "Massive+ is $99/mo for up to 200 jobs/month. That's $0.50 per application, 23 onboarding steps, and a 4-day trial that requires a credit card.",
    date: "May 12, 2026",
    category: "Massive",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-lazyapply",
    title: "Lyncs vs LazyApply — the LinkedIn-Easy-Apply trap",
    excerpt:
      "LazyApply sells annual plans from $99 to $999/yr with daily caps. Lyncs is monthly or credit-pack, with ATS-native coverage instead of LinkedIn-Easy-Apply spam.",
    date: "May 12, 2026",
    category: "LazyApply",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-teal",
    title: "Lyncs vs Teal — $29 for a polished autofill, $39 for an actual applier",
    excerpt:
      "Teal is $29/mo for the best resume editor in the category plus autofill. Lyncs Pro is $39/mo for 1,500 actual applications a month.",
    date: "May 12, 2026",
    category: "Teal",
    readTime: "4 min read",
  },
  {
    slug: "lyncs-vs-scale-jobs",
    title: "Lyncs vs Scale.jobs — $99 for 2,000 apps vs $1,099 for 1,100",
    excerpt:
      "Scale.jobs hires humans to apply at $1,099 for 1,100 apps. Lyncs's $99 credit pack gets you 2,000 apps that never expire. The math is wild.",
    date: "May 12, 2026",
    category: "Scale.jobs",
    readTime: "5 min read",
  },
  {
    slug: "lyncs-vs-huntr",
    title: "Lyncs vs Huntr — $40 to track, $39 to actually apply",
    excerpt:
      "Huntr Pro is $40/mo for a kanban tracker. Lyncs Pro is $39/mo for 1,500 actual applications and a tracker. Same price, completely different products.",
    date: "May 12, 2026",
    category: "Huntr",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Takes on the broken auto-apply space, from two college students building Lyncs.
            </p>
          </motion.div>

          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl border border-border bg-card-alt/50 p-8 sm:p-12 hover:border-foreground/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-foreground text-white text-xs font-medium">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Calendar size={12} />
                  {featuredPost.date}
                </span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">{featuredPost.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-muted transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-muted text-base leading-relaxed mb-6 max-w-3xl">
                {featuredPost.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all duration-200">
                Read the full breakdown
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-2xl border border-border/50 p-6 hover:border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-card-alt text-xs font-medium text-muted">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-3 leading-snug group-hover:text-muted transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all duration-200">
                    Read more
                    <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
