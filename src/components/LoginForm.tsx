"use client";

import type { FormEvent } from "react";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="rounded-3xl border border-border bg-white p-8 shadow-xl shadow-foreground/5">
      <div className="mb-8">
        <BrandLogo href="/" className="mb-5 inline-flex" imageClassName="h-12" />
        <p className="text-sm font-medium text-muted mb-3">Welcome back</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Log in to Lyncs
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Open your job search dashboard and pick up where you left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <span className="text-sm font-medium">Password</span>
          <div className="relative mt-2">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              minLength={8}
              placeholder="8+ characters"
              className="w-full rounded-xl border border-border bg-card-alt py-3 pl-10 pr-4 text-sm outline-none transition focus:border-foreground focus:bg-white"
            />
          </div>
        </label>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition hover:bg-foreground/90 hover:shadow-xl hover:shadow-foreground/20"
        >
          Log in
          <ArrowRight size={16} />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to Lyncs?{" "}
        <Link href="/signup" className="font-medium text-foreground hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
