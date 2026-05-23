"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

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
    <section id="pricing" className="relative py-24 px-6 overflow-hidden">
      {/* soft glow behind highlighted card */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/40 via-pink-200/40 to-amber-200/40 blur-3xl" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-border bg-white/70 backdrop-blur text-xs font-medium text-muted">
            <Sparkles size={12} className="text-amber-500" />
            Simple pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Pay for the applications.{" "}
            <span className="gradient-text">Not the tool.</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-8">
            25 free applications to start. No credit card required.
          </p>

          {/* Toggle with sliding indicator */}
          <div className="relative inline-flex items-center gap-1 p-1 rounded-full bg-card-alt border border-border">
            {(
              [
                { id: "monthly", label: "Monthly", value: false },
                { id: "annual", label: "Annual", value: true },
              ] as const
            ).map((opt) => {
              const active = annual === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => setAnnual(opt.value)}
                  className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    active
                      ? "text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {opt.label}
                  {opt.id === "annual" && (
                    <span
                      className={`ml-1.5 text-xs font-semibold ${
                        active ? "text-emerald-300" : "text-green-600"
                      }`}
                    >
                      -17%
                    </span>
                  )}
                </button>
              );
            })}
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
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                tier.highlighted
                  ? "gradient-ring border-transparent bg-white shadow-2xl shadow-indigo-500/10 lg:scale-[1.03]"
                  : "border-border bg-white hover:border-foreground/20 hover:shadow-lg"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-white text-xs font-medium shadow-md">
                    <Sparkles size={11} className="text-amber-300" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted mb-6">{tier.description}</p>

              <div className="mb-8 flex items-baseline">
                <motion.span
                  key={`${tier.name}-${annual}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-5xl font-bold tracking-tight"
                >
                  ${annual ? tier.price.annual : tier.price.monthly}
                </motion.span>
                {tier.price.monthly > 0 && (
                  <span className="text-muted text-sm ml-1">/mo</span>
                )}
              </div>

              <Link
                href={`/signup?plan=${tier.name.toLowerCase()}&billing=${
                  annual ? "annual" : "monthly"
                }`}
                className={`group btn-shine w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 mb-8 ${
                  tier.highlighted
                    ? "bg-foreground text-white hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/25"
                    : "border border-border text-foreground hover:bg-card-alt"
                }`}
              >
                {tier.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feat, fi) => (
                  <motion.li
                    key={feat}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.04 * fi }}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check
                      size={16}
                      className="text-green-600 shrink-0 mt-0.5"
                    />
                    <span className="text-muted">{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
