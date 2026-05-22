"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import {
  Search,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  MessageSquare,
  LineChart,
  Building2,
  FileCheck2,
  FileText,
  Eye,
  CalendarCheck2,
  Percent,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TopMatch {
  id: string;
  company: string;
  role: string;
  matchPercentage: number;
  accent: string;
}

interface Application {
  id: string;
  company: string;
  position: string;
  resume: boolean;
  coverLetter: boolean;
  status: "submitted" | "pending" | "needs_review" | "queued" | "failed";
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
}

const ProgressRing = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="100" height="100" className="transform -rotate-90">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-200"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-blue-600"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy="0.3em"
        className="text-lg font-bold text-gray-900 fill-current"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const StatusBadge = ({
  status,
}: {
  status: "submitted" | "pending" | "needs_review" | "queued" | "failed";
}) => {
  const statusConfig = {
    submitted: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: CheckCircle2,
      label: "Submitted",
    },
    pending: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: Clock,
      label: "Tailoring Resume",
    },
    needs_review: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: AlertCircle,
      label: "Needs You",
    },
    queued: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: Send,
      label: "Queued",
    },
    failed: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      icon: XCircle,
      label: "Failed",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg}`}>
      <IconComponent size={14} className={config.text} />
      <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
    </div>
  );
};

export default function ModernSaaSDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedMatches, setAppliedMatches] = useState<string[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notice, setNotice] = useState(
    "47 active applications are ready for review."
  );

  const topMatches: TopMatch[] = [
    {
      id: "1",
      company: "Stripe",
      role: "Senior Frontend Engineer",
      matchPercentage: 96,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
    },
    {
      id: "2",
      company: "Notion",
      role: "Full Stack Engineer",
      matchPercentage: 92,
      accent: "border-zinc-200 bg-zinc-50 text-zinc-700",
    },
    {
      id: "3",
      company: "Linear",
      role: "Product Engineer",
      matchPercentage: 88,
      accent: "border-orange-200 bg-orange-50 text-orange-700",
    },
    {
      id: "4",
      company: "Figma",
      role: "Design Systems Engineer",
      matchPercentage: 94,
      accent: "border-pink-200 bg-pink-50 text-pink-700",
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
  ];

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "browse", label: "Browse Jobs", icon: Briefcase, badge: 1240 },
    { id: "applications", label: "Applications", icon: ClipboardList, badge: 127 },
    { id: "inbox", label: "Inbox", icon: MessageSquare, badge: 3 },
    { id: "tracker", label: "Tracker", icon: LineChart },
  ];

  const filterTabs = [
    { id: "all", label: "All", count: applicationsData.length },
    {
      id: "in-flight",
      label: "In Flight",
      count: applicationsData.filter((a) => a.status === "pending").length,
    },
    {
      id: "needs-you",
      label: "Needs You",
      count: applicationsData.filter((a) => a.status === "needs_review").length,
    },
    {
      id: "failed",
      label: "Failed",
      count: applicationsData.filter((a) => a.status === "failed").length,
    },
    {
      id: "skipped",
      label: "Skipped",
      count: 0,
    },
  ];

  const filteredApplications = applicationsData.filter((app) => {
    const matchesFilter =
      activeFilter !== "skipped" &&
      (activeFilter === "all" ||
        (activeFilter === "in-flight" && app.status === "pending") ||
        (activeFilter === "needs-you" && app.status === "needs_review") ||
        (activeFilter === "failed" && app.status === "failed"));

    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats: DashboardStat[] = [
    { label: "Applications Sent", value: "127", icon: Send },
    { label: "Interviews", value: "12", icon: CalendarCheck2 },
    { label: "Response Rate", value: "34%", icon: Percent },
    { label: "Avg Apply Time", value: "8s", icon: Timer },
  ];
  const activeNavItem = navItems.find((item) => item.id === activeNav);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 overflow-hidden z-40"
      >
        {sidebarOpen && (
          <div className="w-80 h-screen flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <BrandLogo imageClassName="h-10 rounded-lg" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setNotice(`${item.label} selected.`);
                    if (item.id === "applications") {
                      setActiveFilter("all");
                    }
                  }}
                  whileHover={{ x: 3 }}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    item.id === activeNav
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        item.id === activeNav
                          ? "bg-white/10 text-white"
                          : "bg-white border border-gray-200 text-gray-500"
                      }`}
                    >
                      <item.icon size={17} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        item.id === activeNav
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">Talha</p>
                  <p className="text-xs text-gray-500">Premium</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {profileOpen && (
                <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  <button
                    onClick={() => setNotice("Account settings selected.")}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Account settings
                  </button>
                  <button
                    onClick={() => setNotice("Billing selected.")}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Billing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? "ml-80" : "ml-0"}`}>
        {/* Top Navbar */}
        <motion.nav className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X size={20} className="text-gray-600" />
            ) : (
              <Menu size={20} className="text-gray-600" />
            )}
          </button>

          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setNotice("You have 3 new recruiter messages.")}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setNotice("Settings panel selected.")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </motion.nav>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {activeNavItem?.label ?? "Dashboard"}
              </h1>
              <p className="text-gray-600">
                47 active · Track your job applications in real-time
              </p>
            </motion.div>

            <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              {notice}
            </div>

            {/* Top Job Matches */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Top Job Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topMatches.map((match) => {
                  const isQueued = appliedMatches.includes(match.id);

                  return (
                    <motion.div
                      key={match.id}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {match.company}
                          </h3>
                          <p className="text-sm text-gray-600">{match.role}</p>
                        </div>
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border ${match.accent}`}
                        >
                          <Building2 size={22} />
                        </div>
                      </div>

                      <div className="flex justify-center mb-4">
                        <ProgressRing percentage={match.matchPercentage} />
                      </div>

                      <motion.button
                        onClick={() => {
                          setAppliedMatches((current) =>
                            current.includes(match.id)
                              ? current
                              : [...current, match.id]
                          );
                          setNotice(`${match.company} application queued.`);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                          isQueued
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                        }`}
                      >
                        {isQueued ? "Queued" : "Apply Now"}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* All Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Applications
                </h2>
                <motion.button
                  onClick={() => {
                    setAppliedMatches(topMatches.map((match) => match.id));
                    setNotice("All top matches are queued for submission.");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all"
                >
                  Submit All
                </motion.button>
              </div>

              {/* Filter Tabs */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
                <div className="flex gap-0 px-6 py-4 border-b border-gray-200 overflow-x-auto">
                  {filterTabs.map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                        activeFilter === tab.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {tab.label} <span className="ml-1 opacity-75">{tab.count}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Applications Table */}
                {filteredApplications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Resume
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Cover Letter
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Applied
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <motion.tr
                            key={app.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {app.position}
                                </p>
                                <p className="text-sm text-gray-500">{app.company}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                {app.resume ? (
                                  <>
                                    <FileCheck2 size={16} className="text-green-600" />
                                    <span className="text-green-700">Ready</span>
                                  </>
                                ) : (
                                  <>
                                    <FileText size={16} className="text-gray-400" />
                                    <span className="text-gray-500">Review</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                                {app.coverLetter ? (
                                  <>
                                    <FileCheck2 size={16} className="text-green-600" />
                                    <span className="text-green-700">Ready</span>
                                  </>
                                ) : (
                                  <>
                                    <FileText size={16} className="text-gray-400" />
                                    <span className="text-gray-500">Draft</span>
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={app.status} />
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-600">
                                {app.appliedDate}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => {
                                  setSelectedApplication(app);
                                  setNotice(`${app.company} details opened.`);
                                }}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                              >
                                <Eye size={15} />
                                View
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">
                      No applications found matching your search
                    </p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
                      <stat.icon size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 px-4">
          <button
            aria-label="Close application details"
            onClick={() => setSelectedApplication(null)}
            className="absolute inset-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  {selectedApplication.company}
                </p>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedApplication.position}
                </h3>
              </div>
              <button
                aria-label="Close"
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={selectedApplication.status} />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Resume</span>
                <span className="font-medium text-gray-900">
                  {selectedApplication.resume ? "Ready" : "Needs review"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-gray-500">Cover letter</span>
                <span className="font-medium text-gray-900">
                  {selectedApplication.coverLetter ? "Ready" : "Needs review"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedApplication(null)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Mark reviewed
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
