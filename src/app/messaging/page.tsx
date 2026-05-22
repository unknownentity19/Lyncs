"use client";

import BrandLogo from "@/components/BrandLogo";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, CheckCircle, Smartphone, Clock, Shield } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const chatMessages = [
  { sender: "lyncs", text: "🎯 New match: Senior Frontend Engineer at Stripe — San Francisco, CA. $180K–$220K. 95% match score. Apply?" },
  { sender: "user", text: "yes" },
  { sender: "lyncs", text: "✓ Applied via Greenhouse in 6s. Resume tailored for React, TypeScript, and design systems experience. Receipt saved." },
  { sender: "lyncs", text: "🎯 New match: Product Engineer at Linear — Remote. $160K–$200K. 88% match score. Apply?" },
  { sender: "user", text: "yes" },
  { sender: "lyncs", text: "✓ Applied via Ashby in 4s. Cover letter highlighted your experience with real-time collaboration tools." },
];

const features = [
  { icon: MessageCircle, title: "iMessage & WhatsApp", desc: "Works on both platforms. No app to download." },
  { icon: Clock, title: "Instant Notifications", desc: "Get notified the moment a matching role goes live." },
  { icon: Smartphone, title: "Reply to Apply", desc: "Just say 'yes' and the application is submitted." },
  { icon: Shield, title: "Full Receipts", desc: "Every application receipt delivered to your chat." },
  { icon: CheckCircle, title: "Status Updates", desc: "Ask about any application status via text." },
  { icon: ArrowRight, title: "Zero Friction", desc: "No tabs, no forms, no context switching." },
];

export default function MessagingPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/60 text-sm font-medium mb-8">
              <MessageCircle size={14} />
              iMessage & WhatsApp
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Apply to jobs{" "}
              <span className="text-muted">on iMessage.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              Chat with your AI agent. Find jobs, get tailored resumes, auto-apply. Just people. Just texts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup?surface=messaging"
                className="w-full sm:w-auto inline-flex items-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/20 hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/12067967516?text=Hey%20I%20want%20to%20start%20applying%20to%20jobs"
                className="w-full sm:w-auto inline-flex items-center gap-2 border border-border px-8 py-3.5 rounded-full text-sm font-medium hover:bg-card-alt transition-all duration-200"
              >
                Try on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat mockup */}
      <section className="pb-24 px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-white shadow-2xl shadow-foreground/5 overflow-hidden"
          >
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-border bg-card-alt/50 flex items-center gap-3">
              <div>
                <BrandLogo imageClassName="h-8 rounded-lg" />
                <p className="text-xs text-muted">AI Job Agent</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-3 min-h-[400px]">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-card-alt text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat input */}
            <div className="px-4 py-3 border-t border-border bg-card-alt/30">
              <div className="flex items-center gap-2 bg-white rounded-full border border-border px-4 py-2.5">
                <span className="text-sm text-muted flex-1">iMessage</span>
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-card-alt/50">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Your job search, in your texts.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              No app to download. No dashboard to check. Just reply to a text.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="rounded-2xl bg-white border border-border/50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <f.icon size={20} className="text-green-600 mb-3" />
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
              Start applying from your phone.
            </h2>
            <p className="text-muted text-lg mb-8">
              Sign up and connect your iMessage or WhatsApp in under a minute.
            </p>
            <a
              href="/signup?surface=messaging"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:shadow-xl hover:shadow-foreground/20 hover:-translate-y-0.5"
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
