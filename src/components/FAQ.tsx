"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";

const faqs = [
  {
    q: "How does Lyncs find jobs that match me?",
    a: "Lyncs watches 50,000+ company career pages directly. The moment a new role goes live that fits your résumé and preferences (location, salary, experience level, role family), it lands in your match feed within seconds, with a clear breakdown of why it matched. You also get a curated daily list, and you can paste any job URL to add it to your queue.",
  },
  {
    q: "Can I see what was submitted on my behalf?",
    a: "Every submitted application gets a receipt: the exact fields that were filled, the answers given to open-ended questions, the résumé and cover letter that went out, and a confirmation back from the ATS. You can review every application after the fact and flag anything you'd want changed for next time.",
  },
  {
    q: "Will employers know I used an AI tool?",
    a: "No. Applications go through the same standard forms a manual applicant would. The résumé and cover letter are tailored to the specific role using your real background, and open-ended answers are written in your voice from context you've provided. There's no automated flag in the submission.",
  },
  {
    q: "How does the résumé tailoring work?",
    a: "For each role, Lyncs reads the job description, identifies the keywords and skills the recruiter is screening for, and rewrites your résumé to align them — using only true facts from the résumé you uploaded. You can save the tailored versions per company.",
  },
  {
    q: "Does Lyncs handle work authorization questions?",
    a: "Yes. Set your work authorization status once (OPT, STEM-OPT, H-1B, citizen, etc.) and Lyncs filters out roles where the company doesn't sponsor, and answers the work-authorization questions on every application correctly the first time.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — your first 25 applications are free, no card required. You get the full product on the free tier; upgrade only when you want to keep going.",
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onClick,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`border-b border-border last:border-0 transition-colors ${
        isOpen ? "bg-gradient-to-r from-indigo-50/40 via-transparent to-pink-50/30" : ""
      }`}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-6 px-3 sm:px-5 text-left cursor-pointer group rounded-xl transition-colors hover:bg-white/60"
      >
        <span
          className={`text-base font-medium pr-4 transition-colors ${
            isOpen ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isOpen
              ? "border-foreground/40 bg-foreground text-white"
              : "border-border bg-white text-muted group-hover:border-foreground/30 group-hover:text-foreground"
          }`}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 px-3 sm:px-5 text-muted text-sm leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-6 bg-card-alt/50">
      <div className="bg-grid bg-grid-fade absolute inset-0 -z-10 opacity-40" />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-border bg-white/70 backdrop-blur text-xs font-medium text-muted">
            <MessageSquare size={12} />
            Frequently asked
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What people ask
            <br />
            <span className="gradient-text">before signing up.</span>
          </h2>
          <p className="text-muted text-base">
            Have something else on your mind? Write to{" "}
            <a
              href="mailto:founders@lyncs.com"
              className="link-underline text-foreground transition-colors"
            >
              founders@lyncs.com
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-white border border-border p-2 sm:p-4 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.18)]"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
