"use client";

import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, CheckCircle, Code, Zap, Shield, Copy } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const steps = [
  {
    step: 1,
    title: "Run the add command",
    description: "In your terminal, run:",
    code: "claude mcp add --transport http lyncs https://api.autojobs.me/api/v1/mcp",
  },
  {
    step: 2,
    title: "Approve OAuth in your browser",
    description:
      "Claude Code opens your default browser to the Lyncs approval screen. Sign in with Google and click Approve to grant access.",
    code: null,
  },
  {
    step: 3,
    title: "Verify the connection",
    description: "Back in the terminal, run:",
    code: "claude mcp list",
  },
];

const useCases = [
  {
    title: "Search for roles",
    code: `claude > find senior frontend roles in SF
→ calling lyncs.search(query: "senior frontend", location: "SF")
✓ 12 roles found · showing top 5`,
  },
  {
    title: "Apply to a specific role",
    code: `claude > apply to the new Stripe role
→ calling lyncs.apply(role: "sr-frontend@stripe")
✓ submitted via greenhouse · 8s
✓ tracker updated · alex_morgan_stripe_v6.pdf`,
  },
  {
    title: "Check application status",
    code: `claude > what's the status of my Stripe application?
→ calling lyncs.status(company: "stripe")
✓ Applied 2h ago · no response yet
✓ 47 applicants ahead of you`,
  },
  {
    title: "Batch apply to all matches",
    code: `claude > apply to all matches from today
→ calling lyncs.batch_apply(filter: "today")
✓ 8 applications queued
✓ 8/8 submitted · avg 6.2s each`,
  },
];

function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group rounded-xl bg-foreground text-green-400 p-5 font-mono text-sm leading-relaxed overflow-x-auto ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
      </button>
      <pre>{code}</pre>
    </div>
  );
}

export default function MCPPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/60 text-sm font-medium mb-8">
              <Terminal size={14} />
              MCP Server & CLI
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Run your job search{" "}
              <span className="text-muted">from inside your AI.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              Connect Lyncs to Claude, Cursor, or any MCP-compatible client. Ask your AI to
              surface roles, tailor your resume, and submit applications — without leaving the chat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#setup"
                className="w-full sm:w-auto inline-flex items-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/20 hover:-translate-y-0.5"
              >
                Get setup instructions
                <ArrowRight size={16} />
              </a>
              <a
                href="/signup?surface=mcp"
                className="w-full sm:w-auto inline-flex items-center gap-2 border border-border px-8 py-3.5 rounded-full text-sm font-medium hover:bg-card-alt transition-all duration-200"
              >
                Sign up
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Setup steps */}
      <section id="setup" className="py-24 px-6 bg-card-alt/50">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Connect Lyncs to your client.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Pick your client and follow the steps. Each connection takes under a minute and uses OAuth — Lyncs never sees a password.
            </p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="rounded-2xl bg-white border border-border p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted mb-4">{s.description}</p>
                    {s.code && <CodeBlock code={s.code} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              What you can do.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Search, apply, and track — all from natural language commands inside your AI client.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <h3 className="text-base font-semibold mb-3">{uc.title}</h3>
                <CodeBlock code={uc.code} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-card-alt/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "MCP Protocol", desc: "Standard MCP protocol — works with any compatible client out of the box." },
              { icon: Shield, title: "OAuth Auth", desc: "Secure OAuth flow. Lyncs never stores or sees your password." },
              { icon: Terminal, title: "CLI Commands", desc: "Full CLI for search, apply, status, and batch operations." },
              { icon: Zap, title: "Real-time", desc: "Streaming responses for instant feedback on long operations." },
              { icon: CheckCircle, title: "Webhooks", desc: "Set up webhooks for custom automation workflows." },
              { icon: ArrowRight, title: "Full API", desc: "RESTful API available for custom integrations beyond MCP." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="rounded-2xl bg-white border border-border/50 p-6"
              >
                <f.icon size={20} className="text-purple-600 mb-3" />
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Your AI already knows how to apply.
            </h2>
            <p className="text-muted text-lg mb-8">
              Connect Lyncs and let your agent handle the rest.
            </p>
            <a
              href="/signup?surface=mcp"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl"
            >
              Get started
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
