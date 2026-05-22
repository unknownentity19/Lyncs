"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    badge: null,
    price: { monthly: 0, annual: 0 },
    description: "Enough for a real job search.",
    features: [
      "25 applications",
      "Basic job matching",
      "Resume tailoring",
      "Email notifications",
      "Application tracking",
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
      "200 applications / month",
      "Priority matching",
      "Cover letter generation",
      "iMessage integration",
      "Chrome extension",
      "Recruiter reply routing",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Power",
    badge: null,
    price: { monthly: 79, annual: 66 },
    description: "Hit every match before anyone else.",
    features: [
      "Unlimited applications",
      "Instant match alerts",
      "MCP / CLI access",
      "All integrations",
      "Priority support",
      "Custom application rules",
      "Team features",
    ],
    cta: "Go Power",
    highlighted: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Pay for the applications.{" "}
            <span className="text-muted">Not the tool.</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-8">
            25 free applications to start. No credit card required.
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

        <div className="grid md:grid-cols-3 gap-6">
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
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className="text-green-600 shrink-0 mt-0.5"
                    />
                    <span className="text-muted">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
