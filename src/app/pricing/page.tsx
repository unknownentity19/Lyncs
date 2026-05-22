"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { Check, ArrowRight, HelpCircle, Zap, X as XIcon } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
};

const tiers = [
  {
    name: "Starter",
    badge: null,
    price: { monthly: 0, annual: 0 },
    description: "Enough for a real job search. See if Lyncs works for you.",
    features: [
      { name: "25 applications", included: true },
      { name: "Basic job matching", included: true },
      { name: "Resume tailoring", included: true },
      { name: "Email notifications", included: true },
      { name: "Application tracking", included: true },
      { name: "Cover letter generation", included: false },
      { name: "iMessage integration", included: false },
      { name: "Chrome extension", included: false },
      { name: "MCP / CLI access", included: false },
    ],
    cta: "Start with Starter",
    highlighted: false,
  },
  {
    name: "Pro",
    badge: "Most popular",
    price: { monthly: 29, annual: 24 },
    description: "For the desperate, the laid-off, the OPT-clocked.",
    features: [
      { name: "200 applications / month", included: true },
      { name: "Priority matching", included: true },
      { name: "Resume tailoring", included: true },
      { name: "Cover letter generation", included: true },
      { name: "iMessage integration", included: true },
      { name: "Chrome extension", included: true },
      { name: "Recruiter reply routing", included: true },
      { name: "Application analytics", included: true },
      { name: "MCP / CLI access", included: false },
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Power",
    badge: null,
    price: { monthly: 79, annual: 66 },
    description: "Hit every match before anyone else. Zero limits.",
    features: [
      { name: "Unlimited applications", included: true },
      { name: "Instant match alerts", included: true },
      { name: "Resume tailoring", included: true },
      { name: "Cover letter generation", included: true },
      { name: "All messaging platforms", included: true },
      { name: "Chrome extension", included: true },
      { name: "MCP / CLI access", included: true },
      { name: "Priority support", included: true },
      { name: "Custom application rules", included: true },
    ],
    cta: "Go Power",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade, downgrade, or cancel at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Do unused applications roll over?",
    a: "Monthly plan applications do not roll over. Credit packs never expire — use them at your own pace.",
  },
  {
    q: "Is there a free trial?",
    a: "Your first 25 applications are free, no credit card required. That's the full product, not a limited preview.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe. We also support Apple Pay and Google Pay.",
  },
  {
    q: "Do you offer refunds?",
    a: "If you're not satisfied within the first 7 days of a paid plan, reach out to founders@lyncs.com for a full refund.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Pay for the applications.{" "}
              <span className="text-muted">Not the tool.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              25 free applications to start. No credit card required. Upgrade when it sticks.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-card-alt border border-border">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  !annual
                    ? "bg-foreground text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  annual
                    ? "bg-foreground text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Annual
                <span className="ml-1.5 text-xs text-green-600 font-semibold">
                  -17%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                tier.highlighted
                  ? "border-foreground shadow-xl shadow-foreground/10 scale-[1.02]"
                  : "border-border hover:border-foreground/20 hover:shadow-lg"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex px-3 py-1 rounded-full bg-foreground text-white text-xs font-medium">
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted mb-6">{tier.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold tracking-tight">
                  ${annual ? tier.price.annual : tier.price.monthly}
                </span>
                {tier.price.monthly > 0 && (
                  <span className="text-muted text-sm ml-1">/mo</span>
                )}
              </div>

              <a
                href={`/signup?plan=${tier.name.toLowerCase()}&billing=${
                  annual ? "annual" : "monthly"
                }`}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 mb-8 ${
                  tier.highlighted
                    ? "bg-foreground text-white hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/20"
                    : "border border-border text-foreground hover:bg-card-alt"
                }`}
              >
                {tier.cta}
                <ArrowRight size={14} />
              </a>

              <ul className="space-y-3">
                {tier.features.map((feat) => (
                  <li key={feat.name} className="flex items-start gap-2.5 text-sm">
                    {feat.included ? (
                      <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <XIcon size={16} className="text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span className={feat.included ? "text-muted" : "text-gray-300"}>
                      {feat.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison details */}
      <section className="py-24 px-6 bg-card-alt/50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Why Lyncs costs less.
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Most auto-apply tools charge $40–$200/month for autofill or limited bots. Lyncs does the whole job.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: "$0.03 per application",
                desc: "At the Power tier, each application costs about 3 cents. Competitors average $0.20–$1.00.",
              },
              {
                icon: Check,
                title: "No feature paywalls",
                desc: "Resume tailoring, cover letters, and tracking are included on every paid plan. No add-on fees.",
              },
              {
                icon: HelpCircle,
                title: "No long-term contracts",
                desc: "Month-to-month billing. Cancel anytime. No 6-month commitments or annual lock-ins required.",
              },
              {
                icon: ArrowRight,
                title: "Credit packs available",
                desc: "Don't want a subscription? Buy credit packs that never expire and use at your own pace.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="rounded-2xl bg-white border border-border/50 p-6"
              >
                <item.icon size={20} className="text-foreground mb-3" />
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Pricing questions
            </h2>
          </motion.div>

          <div className="rounded-3xl bg-card-alt border border-border p-2 sm:p-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-0 px-4 py-5">
                <h4 className="text-base font-medium mb-2">{faq.q}</h4>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
