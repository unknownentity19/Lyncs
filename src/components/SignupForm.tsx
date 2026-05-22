"use client";

import type { FormEvent } from "react";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Briefcase, Mail, User } from "lucide-react";

const plans = ["starter", "pro", "power"];

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SignupForm({
  selectedPlan,
  selectedBilling,
  surface,
}: {
  selectedPlan: string;
  selectedBilling: string;
  surface?: string;
}) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-8 shadow-xl shadow-foreground/5">
      <div className="mb-8">
        <BrandLogo href="/" className="mb-5 inline-flex" imageClassName="h-12" />
        <p className="text-sm font-medium text-muted mb-3">
          25 free applications
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Create your Lyncs account
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Start with a searchable dashboard, tailored resumes, and one place to
          track every application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <div className="relative mt-2">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              className="w-full rounded-xl border border-border bg-card-alt py-3 pl-10 pr-4 text-sm outline-none transition focus:border-foreground focus:bg-white"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <div className="relative mt-2">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-card-alt py-3 pl-10 pr-4 text-sm outline-none transition focus:border-foreground focus:bg-white"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium">Plan</span>
          <div className="relative mt-2">
            <Briefcase
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <select
              name="plan"
              defaultValue={selectedPlan}
              className="w-full appearance-none rounded-xl border border-border bg-card-alt py-3 pl-10 pr-4 text-sm outline-none transition focus:border-foreground focus:bg-white"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {titleCase(plan)}
                </option>
              ))}
            </select>
          </div>
        </label>

        <input type="hidden" name="billing" value={selectedBilling} />
        {surface && <input type="hidden" name="surface" value={surface} />}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
        >
          Sign up
          <ArrowRight size={16} />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
