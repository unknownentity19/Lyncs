"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  AlertCircle,
  ArrowUpRight,
  Bell,
  Briefcase,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  Command,
  Eye,
  FileCheck2,
  FileText,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Menu,
  Percent,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Timer,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ApplicationStatus =
  | "submitted"
  | "pending"
  | "needs_review"
  | "queued"
  | "failed";

interface TopMatch {
  id: string;
  company: string;
  role: string;
  matchPercentage: number;
  location: string;
  salary: string;
}

interface Application {
  id: string;
  company: string;
  position: string;
  resume: boolean;
  coverLetter: boolean;
  status: ApplicationStatus;
  appliedDate: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface DashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  delta: string;
  trend: number[];
  positive: boolean;
}

interface ActivityEvent {
  id: string;
  icon: LucideIcon;
  title: string;
  meta: string;
  tone: "ok" | "info" | "warn" | "fail";
  time: string;
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Circular match-score ring with a gradient stroke. Animates from 0 to
 * `percentage` on mount via framer-motion.
 */
function MatchRing({ percentage, id }: { percentage: number; id: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const gradientId = `match-grad-${id}`;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        className="-rotate-90"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#eef2f7"
          strokeWidth="6"
        />
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
        {percentage}%
      </span>
    </div>
  );
}

/**
 * Compact line chart for stat-card trend deltas.
 */
function Sparkline({
  values,
  positive = true,
  className = "",
}: {
  values: number[];
  positive?: boolean;
  className?: string;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 84;
  const h = 28;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const stroke = positive ? "#10b981" : "#ef4444";

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      aria-hidden
    >
      <motion.polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { bg: string; text: string; ring: string; icon: LucideIcon; label: string }
> = {
  submitted: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200/60",
    icon: CheckCircle2,
    label: "Submitted",
  },
  pending: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-200/60",
    icon: Clock,
    label: "Tailoring",
  },
  needs_review: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200/60",
    icon: AlertCircle,
    label: "Needs you",
  },
  queued: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    ring: "ring-violet-200/60",
    icon: Send,
    label: "Queued",
  },
  failed: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200/60",
    icon: XCircle,
    label: "Failed",
  },
};

function StatusPill({ status }: { status: ApplicationStatus }) {
  const c = STATUS_CONFIG[status];
  const Icon = c.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 ${c.bg} ${c.text} ${c.ring}`}
    >
      <Icon size={13} />
      <span className="text-xs font-medium">{c.label}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Static seed data (kept local so the demo dashboard can render statically) */
/* -------------------------------------------------------------------------- */

const topMatches: TopMatch[] = [
  {
    id: "1",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    matchPercentage: 96,
    location: "San Francisco, CA",
    salary: "$180\u2013220k",
  },
  {
    id: "2",
    company: "Notion",
    role: "Full-Stack Engineer",
    matchPercentage: 92,
    location: "Remote \u00b7 US",
    salary: "$160\u2013195k",
  },
  {
    id: "3",
    company: "Linear",
    role: "Product Engineer",
    matchPercentage: 88,
    location: "Remote \u00b7 Worldwide",
    salary: "$155\u2013190k",
  },
  {
    id: "4",
    company: "Figma",
    role: "Design Systems Engineer",
    matchPercentage: 94,
    location: "New York, NY",
    salary: "$170\u2013210k",
  },
];

const applicationsData: Application[] = [
  {
    id: "1",
    company: "Stripe",
    position: "Senior Frontend Engineer",
    resume: true,
    coverLetter: true,
    status: "submitted",
    appliedDate: "2h ago",
  },
  {
    id: "2",
    company: "Notion",
    position: "Full Stack Engineer",
    resume: true,
    coverLetter: false,
    status: "pending",
    appliedDate: "1h ago",
  },
  {
    id: "3",
    company: "Linear",
    position: "Product Engineer",
    resume: false,
    coverLetter: false,
    status: "needs_review",
    appliedDate: "45m ago",
  },
  {
    id: "4",
    company: "Figma",
    position: "Design Systems Engineer",
    resume: true,
    coverLetter: true,
    status: "submitted",
    appliedDate: "30m ago",
  },
  {
    id: "5",
    company: "Vercel",
    position: "Backend Engineer",
    resume: true,
    coverLetter: false,
    status: "failed",
    appliedDate: "15m ago",
  },
  {
    id: "6",
    company: "Ramp",
    position: "Senior Software Engineer",
    resume: true,
    coverLetter: true,
    status: "queued",
    appliedDate: "5m ago",
  },
];

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "browse", label: "Browse Jobs", icon: Briefcase, badge: 1240 },
  { id: "applications", label: "Applications", icon: ClipboardList, badge: 127 },
  { id: "inbox", label: "Inbox", icon: MessageSquare, badge: 3 },
  { id: "tracker", label: "Tracker", icon: LineChart },
];

const stats: DashboardStat[] = [
  {
    label: "Applications sent",
    value: "127",
    icon: Send,
    delta: "+24 this week",
    trend: [12, 14, 11, 16, 18, 21, 24],
    positive: true,
  },
  {
    label: "Interviews",
    value: "12",
    icon: CalendarCheck2,
    delta: "+3 vs last week",
    trend: [2, 3, 2, 4, 5, 6, 8],
    positive: true,
  },
  {
    label: "Response rate",
    value: "34%",
    icon: Percent,
    delta: "+4 pts",
    trend: [22, 25, 23, 28, 30, 32, 34],
    positive: true,
  },
  {
    label: "Avg apply time",
    value: "8s",
    icon: Timer,
    delta: "-2s",
    trend: [14, 13, 12, 11, 10, 9, 8],
    positive: true,
  },
];

const activityEvents: ActivityEvent[] = [
  {
    id: "a1",
    icon: CheckCircle2,
    title: "Submitted to Stripe",
    meta: "Senior Frontend Engineer \u00b7 Greenhouse \u00b7 resume v6",
    tone: "ok",
    time: "2m ago",
  },
  {
    id: "a2",
    icon: Sparkles,
    title: "New 96% match found",
    meta: "Stripe \u00b7 Senior Frontend Engineer",
    tone: "info",
    time: "4m ago",
  },
  {
    id: "a3",
    icon: AlertCircle,
    title: "Linear needs your review",
    meta: "2 open-ended questions detected",
    tone: "warn",
    time: "12m ago",
  },
  {
    id: "a4",
    icon: Clock,
    title: "Tailoring resume for Notion",
    meta: "Highlighting React + collaboration tools",
    tone: "info",
    time: "18m ago",
  },
  {
    id: "a5",
    icon: XCircle,
    title: "Vercel submission failed",
    meta: "ATS rejected \u2014 retry queued",
    tone: "fail",
    time: "26m ago",
  },
  {
    id: "a6",
    icon: Send,
    title: "Queued 5 new applications",
    meta: "Daily batch \u00b7 matches over 88%",
    tone: "info",
    time: "1h ago",
  },
];

const TONE_DOT: Record<ActivityEvent["tone"], string> = {
  ok: "bg-emerald-500",
  info: "bg-indigo-500",
  warn: "bg-amber-500",
  fail: "bg-rose-500",
};

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                 */
/* -------------------------------------------------------------------------- */

export default function ModernSaaSDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedMatches, setAppliedMatches] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(
    "47 active applications are ready for review."
  );

  const searchRef = useRef<HTMLInputElement>(null);

  // Bind cmd+K / ctrl+K to focus the global search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSelectedApplication(null);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filterTabs = useMemo(
    () => [
      { id: "all", label: "All", count: applicationsData.length },
      {
        id: "in-flight",
        label: "In flight",
        count: applicationsData.filter(
          (a) => a.status === "pending" || a.status === "queued"
        ).length,
      },
      {
        id: "needs-you",
        label: "Needs you",
        count: applicationsData.filter((a) => a.status === "needs_review")
          .length,
      },
      {
        id: "failed",
        label: "Failed",
        count: applicationsData.filter((a) => a.status === "failed").length,
      },
      {
        id: "submitted",
        label: "Submitted",
        count: applicationsData.filter((a) => a.status === "submitted").length,
      },
    ],
    []
  );

  const filteredApplications = applicationsData.filter((app) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "in-flight" &&
        (app.status === "pending" || app.status === "queued")) ||
      (activeFilter === "needs-you" && app.status === "needs_review") ||
      (activeFilter === "failed" && app.status === "failed") ||
      (activeFilter === "submitted" && app.status === "submitted");

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      app.company.toLowerCase().includes(q) ||
      app.position.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const activeNavItem = navItems.find((item) => item.id === activeNav);

  const submittedTotal = applicationsData.filter(
    (a) => a.status === "submitted"
  ).length;

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 288 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="relative h-full shrink-0 overflow-hidden border-r border-gray-200 bg-white"
      >
        {sidebarOpen && (
          <div className="flex h-full w-72 flex-col">
            {/* Workspace card */}
            <div className="px-5 pt-5">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="group flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <BrandLogo imageClassName="h-9 rounded-lg" />
                <div className="flex-1 text-left">
                  <p className="text-[13px] font-semibold leading-tight">
                    Lyncs Workspace
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Premium &middot; monthly
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-400 transition-transform group-hover:translate-y-0.5"
                />
              </button>
            </div>

            {/* Apply-all CTA */}
            <div className="px-5 mt-4">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setAppliedMatches(topMatches.map((m) => m.id));
                  setNotice("All top matches queued for submission.");
                }}
                className="group btn-shine flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-amber-500 px-4 py-2.5 text-white shadow-[0_8px_24px_-12px_rgba(99,102,241,0.6)]"
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Zap size={15} />
                  Apply to all matches
                </span>
                <span className="text-xs opacity-80">&#8984; &#8629;</span>
              </motion.button>
              <button
                onClick={() => setNotice("New search created.")}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-white py-2 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                <Plus size={13} />
                New search
              </button>
            </div>

            {/* Sectioned nav */}
            <nav className="mt-6 flex-1 overflow-y-auto px-3 pb-4">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Workspace
              </p>
              <div className="space-y-0.5">
                {navItems.slice(0, 4).map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    active={item.id === activeNav}
                    onClick={() => {
                      setActiveNav(item.id);
                      setNotice(`${item.label} selected.`);
                      if (item.id === "applications") setActiveFilter("all");
                    }}
                  />
                ))}
              </div>

              <p className="mt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Insights
              </p>
              <div className="space-y-0.5">
                {navItems.slice(4).map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    active={item.id === activeNav}
                    onClick={() => {
                      setActiveNav(item.id);
                      setNotice(`${item.label} selected.`);
                    }}
                  />
                ))}
              </div>
            </nav>

            {/* Plan / usage card */}
            <div className="border-t border-gray-200 p-4">
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-900">Pro plan</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <span className="dot-pulse h-1.5 w-1.5" />
                    Active
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  127 / 200 applications used
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "63.5%" }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-500"
                  />
                </div>
                <button
                  onClick={() => setNotice("Upgrade flow launched.")}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white py-1.5 text-[11px] font-semibold text-gray-700 hover:border-gray-300 hover:text-gray-900 transition-colors"
                >
                  Upgrade
                  <ArrowUpRight size={11} />
                </button>
              </div>
            </div>

            {/* Avatar dropdown */}
            <div className="border-t border-gray-200 p-3">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex w-full items-center gap-2.5 rounded-lg p-2 hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-amber-400 text-xs font-bold text-white shadow-inner">
                    A
                  </div>
                  <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[13px] font-medium leading-tight">
                    Alex Morgan
                  </p>
                  <p className="text-[11px] text-gray-500">alex@lyncs.com</p>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
                  >
                    {[
                      "Account settings",
                      "Billing",
                      "Keyboard shortcuts",
                      "Sign out",
                    ].map((label) => (
                      <button
                        key={label}
                        onClick={() => {
                          setNotice(`${label} selected.`);
                          setProfileOpen(false);
                        }}
                        className="block w-full rounded-md px-3 py-1.5 text-left text-[13px] text-gray-700 hover:bg-gray-50"
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-200 bg-white/85 px-5 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-2 text-[13px] text-gray-500 md:flex">
            <span className="text-gray-400">Workspace</span>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-gray-900">
              {activeNavItem?.label ?? "Dashboard"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search jobs, companies, applications\u2026"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-[200px] rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-14 text-[13px] placeholder:text-gray-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:w-[280px] md:w-[320px]"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">
                <Command size={10} />K
              </span>
            </div>

            <button
              onClick={() => setNotice("You have 3 new recruiter messages.")}
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <button
              onClick={() => setNotice("Settings panel selected.")}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <Settings size={17} />
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-2.5 sm:inline-flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-amber-400 text-[11px] font-bold text-white">
                A
              </div>
              <span className="text-[12px] font-medium">Alex</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
            {/* Greeting */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 sm:p-7"
            >
              <div className="aurora pointer-events-none">
                <span
                  className="aurora__blob aurora__blob--a"
                  style={{ opacity: 0.35 }}
                />
                <span
                  className="aurora__blob aurora__blob--b"
                  style={{ opacity: 0.3 }}
                />
              </div>
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-600 backdrop-blur">
                    <span className="dot-pulse" />
                    Live &middot; 47 active
                  </span>
                  <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Good afternoon, Alex.
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    {submittedTotal} submissions today &middot; 8s average apply time.
                    Your agent is still hunting.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setNotice("Showing today's plan.")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-3.5 py-2 text-[13px] font-medium text-gray-700 hover:border-gray-300 hover:bg-white transition-colors"
                  >
                    Today&apos;s plan
                    <ArrowUpRight size={14} />
                  </button>
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setAppliedMatches(topMatches.map((m) => m.id));
                      setNotice("Submitting all queued applications.");
                    }}
                    className="group btn-shine inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    <Zap size={14} />
                    Submit all
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* Notice */}
            <AnimatePresence>
              {notice && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
                    <Sparkles
                      size={15}
                      className="mt-0.5 shrink-0 text-indigo-600"
                    />
                    <p className="flex-1 text-[13px] text-indigo-900">{notice}</p>
                    <button
                      aria-label="Dismiss notice"
                      onClick={() => setNotice(null)}
                      className="rounded-md p-0.5 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* KPI strip */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  whileHover={{ y: -2 }}
                  className="hover-glow relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600">
                      <stat.icon size={17} />
                    </span>
                    <Sparkline values={stat.trend} positive={stat.positive} />
                  </div>
                  <p className="mt-4 text-3xl font-bold tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <span
                      className={`text-[11px] font-semibold ${
                        stat.positive ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {stat.delta}
                    </span>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Top matches */}
            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Top matches</h2>
                  <p className="text-xs text-gray-500">
                    Sorted by fit &middot; refreshed 2 minutes ago
                  </p>
                </div>
                <button
                  onClick={() => setNotice("Browsing all matches.")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  See all
                  <ArrowUpRight size={12} />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {topMatches.map((match, i) => {
                  const queued = appliedMatches.includes(match.id);
                  return (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      whileHover={{ y: -3 }}
                      className="hover-glow relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-500 opacity-70" />
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
                          <Building2 size={20} />
                        </div>
                        <MatchRing
                          percentage={match.matchPercentage}
                          id={match.id}
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-semibold">{match.company}</p>
                        <p className="text-xs text-gray-500">{match.role}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          {match.location}
                        </span>
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          {match.salary}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setAppliedMatches((c) =>
                            c.includes(match.id) ? c : [...c, match.id]
                          );
                          setNotice(`${match.company} application queued.`);
                        }}
                        className={`mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-semibold transition-all ${
                          queued
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "btn-shine bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        {queued ? (
                          <>
                            <CheckCircle2 size={14} />
                            Queued
                          </>
                        ) : (
                          <>
                            <Zap size={14} />
                            Apply now
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Applications + Activity */}
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              {/* Applications panel */}
              <div className="rounded-2xl border border-gray-200 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
                  <div>
                    <h2 className="text-lg font-semibold">All applications</h2>
                    <p className="text-xs text-gray-500">
                      Across every connected ATS
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setNotice("Submitting all in-flight items.")}
                    className="group btn-shine inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                  >
                    <Send size={12} />
                    Submit all
                  </motion.button>
                </div>

                {/* Filter pills */}
                <div className="flex gap-1 overflow-x-auto px-3 py-3">
                  {filterTabs.map((tab) => {
                    const active = activeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveFilter(tab.id)}
                        className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? "text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="dashboard-filter-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-gray-900"
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                            }}
                          />
                        )}
                        {tab.label}
                        <span
                          className={`ml-1.5 ${
                            active ? "text-white/70" : "text-gray-400"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Table */}
                {filteredApplications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-y border-gray-200 bg-gray-50/60 text-left text-[10px] uppercase tracking-[0.1em] text-gray-500">
                          <th className="px-5 py-2.5 font-semibold">Position</th>
                          <th className="px-5 py-2.5 font-semibold">Resume</th>
                          <th className="px-5 py-2.5 font-semibold">
                            Cover letter
                          </th>
                          <th className="px-5 py-2.5 font-semibold">Status</th>
                          <th className="px-5 py-2.5 font-semibold">Applied</th>
                          <th className="px-5 py-2.5 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence initial={false}>
                          {filteredApplications.map((app, i) => (
                            <motion.tr
                              key={app.id}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, delay: 0.02 * i }}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition-colors"
                            >
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600">
                                    <Building2 size={15} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {app.position}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {app.company}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <FileChip ready={app.resume} kind="resume" />
                              </td>
                              <td className="px-5 py-3.5">
                                <FileChip
                                  ready={app.coverLetter}
                                  kind="cover"
                                />
                              </td>
                              <td className="px-5 py-3.5">
                                <StatusPill status={app.status} />
                              </td>
                              <td className="px-5 py-3.5 text-xs text-gray-600">
                                {app.appliedDate}
                              </td>
                              <td className="px-5 py-3.5">
                                <button
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setNotice(`${app.company} details opened.`);
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-gray-300 hover:text-gray-900 transition-colors"
                                >
                                  <Eye size={12} />
                                  View
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <Search size={16} />
                    </div>
                    <p className="text-sm font-medium">No matches</p>
                    <p className="text-xs text-gray-500">
                      Try a different filter or clear your search.
                    </p>
                  </div>
                )}
              </div>

              {/* Activity feed */}
              <aside className="rounded-2xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <div>
                    <h2 className="text-lg font-semibold">Agent activity</h2>
                    <p className="text-xs text-gray-500">Last hour</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="dot-pulse h-1.5 w-1.5" />
                    Live
                  </span>
                </div>
                <ol className="relative px-5 py-5">
                  <span className="absolute bottom-5 left-[26px] top-5 w-px bg-gray-200" />
                  {activityEvents.map((ev, i) => {
                    const Icon = ev.icon;
                    return (
                      <motion.li
                        key={ev.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * i }}
                        className="relative flex gap-3 pb-4 last:pb-0"
                      >
                        <span className="relative z-10 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white ring-2 ring-white">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm ${TONE_DOT[ev.tone]}`}
                          >
                            <Icon size={13} />
                          </span>
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-medium text-gray-900">
                              {ev.title}
                            </p>
                            <span className="text-[10px] text-gray-400">
                              {ev.time}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                            {ev.meta}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ol>
              </aside>
            </section>
          </div>
        </div>
      </div>

      {/* Application details modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close application details"
              onClick={() => setSelectedApplication(null)}
              className="absolute inset-0"
            />
            <motion.div
              key="dialog"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="relative border-b border-gray-200 bg-gradient-to-br from-white via-indigo-50/40 to-fuchsia-50/30 px-6 py-5">
                <button
                  aria-label="Close"
                  onClick={() => setSelectedApplication(null)}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 hover:bg-white/70 hover:text-gray-900"
                >
                  <X size={16} />
                </button>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {selectedApplication.company}
                </p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedApplication.position}
                </h3>
                <div className="mt-3">
                  <StatusPill status={selectedApplication.status} />
                </div>
              </div>
              <div className="space-y-2 px-6 py-5 text-sm">
                <DetailRow
                  label="Resume"
                  value={
                    selectedApplication.resume
                      ? "Tailored \u2014 ready"
                      : "Needs review"
                  }
                  ok={selectedApplication.resume}
                />
                <DetailRow
                  label="Cover letter"
                  value={
                    selectedApplication.coverLetter
                      ? "Generated \u2014 ready"
                      : "Needs review"
                  }
                  ok={selectedApplication.coverLetter}
                />
                <DetailRow
                  label="Applied"
                  value={selectedApplication.appliedDate}
                  ok
                />
              </div>
              <div className="flex gap-2 border-t border-gray-200 bg-gray-50/60 px-6 py-4">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setNotice(
                      `${selectedApplication.company} application marked reviewed.`
                    );
                    setSelectedApplication(null);
                  }}
                  className="btn-shine flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  Mark reviewed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sidebar nav row                                                           */
/* -------------------------------------------------------------------------- */

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
        active
          ? "text-white"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active-pill"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="absolute inset-0 -z-10 rounded-lg bg-gray-900"
        />
      )}
      <span className="flex items-center gap-2.5">
        <Icon size={16} strokeWidth={2} />
        <span className="font-medium">{item.label}</span>
      </span>
      {item.badge !== undefined && (
        <span
          className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
            active ? "bg-white/15 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  File-ready chip + detail row                                              */
/* -------------------------------------------------------------------------- */

function FileChip({
  ready,
  kind,
}: {
  ready: boolean;
  kind: "resume" | "cover";
}) {
  if (ready) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/60">
        <FileCheck2 size={13} />
        Ready
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200/70">
      <FileText size={13} />
      {kind === "resume" ? "Review" : "Draft"}
    </span>
  );
}

function DetailRow({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span
        className={`text-sm font-medium ${
          ok ? "text-gray-900" : "text-amber-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
