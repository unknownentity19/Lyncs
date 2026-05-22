"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  FileCheck2,
  Percent,
  Send,
  Timer,
  XCircle,
} from "lucide-react";

const previewJobs = [
  {
    company: "Stripe",
    match: 96,
    accent: "border-blue-200 bg-blue-50 text-blue-700",
  },
  {
    company: "Notion",
    match: 92,
    accent: "border-zinc-200 bg-zinc-50 text-zinc-700",
  },
  {
    company: "Linear",
    match: 88,
    accent: "border-orange-200 bg-orange-50 text-orange-700",
  },
  {
    company: "Figma",
    match: 94,
    accent: "border-pink-200 bg-pink-50 text-pink-700",
  },
];

const previewApplications = [
  {
    role: "Senior Frontend Engineer",
    company: "Stripe",
    status: "Submitted",
    icon: CheckCircle2,
    statusColor: "bg-green-50 text-green-700",
    time: "2h ago",
  },
  {
    role: "Full Stack Engineer",
    company: "Notion",
    status: "Tailoring Resume",
    icon: Clock,
    statusColor: "bg-blue-50 text-blue-700",
    time: "1h ago",
  },
  {
    role: "Product Engineer",
    company: "Linear",
    status: "Needs You",
    icon: XCircle,
    statusColor: "bg-red-50 text-red-700",
    time: "45m ago",
  },
];

const previewStats = [
  { label: "Applications", value: "127", icon: Send },
  { label: "Interviews", value: "12", icon: CalendarCheck2 },
  { label: "Response Rate", value: "34%", icon: Percent },
  { label: "Avg Time", value: "8s", icon: Timer },
];

export default function DashboardShowcase() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Built for modern job hunters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A beautiful, intuitive dashboard inspired by Linear, Notion, and Stripe. Track applications, manage opportunities, and stay organized.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Blur background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-3xl opacity-20 -z-10" />

          {/* Screenshot Container */}
          <div className="rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gray-100 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-auto text-xs text-gray-500 font-mono">
                dashboard.lyncs.com
              </span>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Track your job applications and opportunities in real-time
                  </p>
                </div>

                {/* Top Matches Grid */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Job Matches
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {previewJobs.map((job) => (
                      <motion.div
                        key={job.company}
                        whileHover={{ y: -2 }}
                        className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                      >
                        <div
                          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${job.accent}`}
                        >
                          <Building2 size={19} />
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {job.company}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          Senior Engineer
                        </p>
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900">
                            {job.match}%
                          </p>
                          <p className="inline-flex items-center justify-center gap-1 text-xs text-gray-500">
                            <FileCheck2 size={12} />
                            match
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Applications Table Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      All Applications
                    </h4>
                    <Link
                      href="/dashboard"
                      className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit All
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="flex gap-2 px-6 py-4 border-b border-gray-200">
                      {["All", "In Flight", "Needs You", "Failed", "Skipped"].map(
                        (tab) => (
                          <span
                            key={tab}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              tab === "All"
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {tab}
                          </span>
                        )
                      )}
                    </div>

                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">
                            Applied
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewApplications.map((app) => (
                          <tr
                            key={app.role}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <p className="text-sm font-medium text-gray-900">
                                {app.role}
                              </p>
                              <p className="text-xs text-gray-500">
                                {app.company}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${app.statusColor}`}
                              >
                                <app.icon size={13} />
                                {app.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs text-gray-500">
                                {app.time}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 pt-4">
                  {previewStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl border border-gray-200 p-4"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600">
                        <stat.icon size={17} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore the Dashboard
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
