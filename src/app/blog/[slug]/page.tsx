"use client";

import { use } from "react";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";

const allPosts: Record<string, { title: string; excerpt: string; date: string; category: string; readTime: string; content: string[] }> = {
  "lyncs-vs-competitors": {
    title: "Lyncs vs every other auto-apply tool (we compared 20 of them)",
    excerpt: "We benchmarked Lyncs against 20 other auto-apply tools.",
    date: "May 12, 2026",
    category: "Featured",
    readTime: "12 min read",
    content: [
      "We benchmarked Lyncs against 20 other auto-apply tools — LazyApply, Simplify, Jobright, Huntr, Teal, JobCopilot, Massive, and more. Here's where we win and where we lose.",
      "The auto-apply space is crowded. There are at least 20 tools that claim to automate your job applications. We tested every single one of them, and here's what we found.",
      "Most tools in this category fall into one of two buckets: autofill extensions that save you 5 minutes per application but still require you to do the actual applying, or full automation bots that submit to jobs you never asked for with resumes you never approved.",
      "Lyncs sits in a third category: a transparent agent. It watches career pages, matches roles to your profile, tailors your resume per role, fills out the actual ATS form, and submits — but shows you everything before and after.",
      "On price, we're competitive at every tier. Starter is free for 25 applications. Pro is $29/mo for 200 applications. Power is $79/mo for unlimited. Compare that to Massive at $99/mo for 200, or Scale.jobs at $1,099 for 1,100 human-applied applications.",
      "On speed, we're the fastest. Average time from match to submitted application is 8 seconds. Most competitors take minutes to hours, and some (like Wobo AI) take 3-4 days.",
      "On coverage, we support 12 ATSes natively — Workday, Greenhouse, Lever, Ashby, and more. Most competitors only support LinkedIn Easy Apply or a handful of platforms.",
      "Where we lose: if you want a polished iOS app (Sorce wins there), or if you want the cheapest possible price with no regard for quality (Sonara at $23.95/mo unlimited). We're building the most complete, transparent auto-apply agent — not the cheapest or the prettiest.",
    ],
  },
  "lyncs-vs-simplify": {
    title: "Lyncs vs Simplify — $40/mo to save 5 minutes per application",
    excerpt: "Simplify is $39.99/mo for a chrome extension that types your name into a form.",
    date: "May 12, 2026",
    category: "Simplify",
    readTime: "5 min read",
    content: [
      "Simplify is $39.99/mo for a chrome extension that types your name into a form. It saves you about 5 minutes per application. Lyncs queues an application in 2 seconds and the bot does the rest. Different product category.",
      "Simplify is well-known in the job search space. Their Chrome extension detects job application forms and auto-fills your information — name, email, phone, education, work history. It's a time-saver, not an applier.",
      "The key difference: with Simplify, you still need to find the job, navigate to the application page, review the autofilled form, answer screener questions yourself, and click submit. That's 5-10 minutes per application saved from the original 15-20.",
      "With Lyncs, you approve a match and the entire application is done for you — including screener questions, resume tailoring, and submission. Total time: 2 seconds of your attention.",
      "At $39.99/mo vs Lyncs Pro at $29/mo, you're paying more for Simplify to do less. If you apply to 50 jobs a month, Simplify saves you ~4 hours. Lyncs saves you ~16 hours.",
    ],
  },
  "lyncs-vs-jobright": {
    title: "Lyncs vs Jobright Turbo — prettier autofill that still can't log in",
    excerpt: "Jobright Turbo is $29.99/mo for AI matching and a polished autofill.",
    date: "May 12, 2026",
    category: "Jobright",
    readTime: "5 min read",
    content: [
      "Jobright Turbo is $29.99/mo for AI matching and a polished autofill. Polished or not, an autofill still can't log into job sites, navigate the apply flow, or answer screeners. That's all you. Lyncs does the whole thing in 2 seconds.",
      "Jobright's AI matching is genuinely good. They analyze your profile and surface relevant roles with clear match scores. Their UI is polished and the matching algorithm is solid.",
      "But the 'Turbo' part — the autofill — runs into the same limitation as every other autofill extension. It can pre-populate form fields, but it can't actually navigate multi-step application flows, log into ATS portals, or handle the open-ended screening questions that many applications require.",
      "Lyncs handles all of that. Our bot logs into the ATS, navigates every step of the application, fills every field including screener questions (in your voice), uploads your tailored resume, and clicks submit.",
    ],
  },
};

// Fallback for posts not in the dictionary
function getPost(slug: string) {
  if (allPosts[slug]) return allPosts[slug];
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Lyncs vs ${title.replace("Lyncs Vs ", "")}`,
    excerpt: "A detailed comparison of Lyncs against this competitor.",
    date: "May 12, 2026",
    category: "Comparison",
    readTime: "5 min read",
    content: [
      "This is a detailed comparison between Lyncs and this competitor. We break down pricing, features, speed, and overall value.",
      "Lyncs's core advantage is full automation: from role matching to resume tailoring to form submission — all in under 10 seconds. Most competitors offer partial automation at best.",
      "Our transparent approach means you see exactly what was submitted on your behalf. Every application comes with a receipt showing the fields filled, answers given, and resume sent.",
      "Check out our full comparison page for benchmarks against all 20+ auto-apply tools in the market.",
    ],
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPost(slug);

  return (
    <PageWrapper>
      <article className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-card-alt text-xs font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-8">
              {post.title}
            </h1>
          </motion.div>

          {/* Post content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {post.content.map((para, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed ${i === 0 ? "text-foreground text-lg font-medium" : "text-muted"}`}
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 rounded-2xl bg-card-alt border border-border p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-3">Ready to try Lyncs?</h3>
            <p className="text-sm text-muted mb-6">
              25 free applications. No credit card required.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-foreground text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all"
            >
              Get started
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </article>
    </PageWrapper>
  );
}
