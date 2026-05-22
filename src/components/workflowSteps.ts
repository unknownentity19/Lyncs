import type { LucideIcon } from "lucide-react";
import {
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Inbox,
  Search,
  Send,
  Shield,
  Target,
  Zap,
} from "lucide-react";

export type WorkflowStep = {
  id: number;
  label: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  metric: string;
  metricLabel: string;
  accent: string;
  iconBg: string;
};

export const workflowMetrics = [
  { value: "50k+", label: "career pages watched" },
  { value: "12", label: "ATSes covered" },
  { value: "8s", label: "average submit time" },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    label: "Find",
    eyebrow: "Match intake",
    icon: Search,
    title: "Be the first qualified applicant on the job.",
    description:
      "Lyncs watches 50,000+ company career pages. The moment a role drops that fits your résumé, you know - and you are already in the top 100 applicants.",
    details: [
      "Monitors Workday, Greenhouse, Lever, Ashby, and 10+ more ATSes",
      "Scores every posting against your résumé, goals, and location",
      "Sends instant alerts plus a curated daily digest",
      "Lets you paste any job URL into the same queue",
    ],
    metric: "95%",
    metricLabel: "match confidence before the application is queued",
    accent: "border-green-500 bg-green-50 text-green-700",
    iconBg: "bg-green-600",
  },
  {
    id: 2,
    label: "Prep",
    eyebrow: "Materials review",
    icon: FileText,
    title: "A résumé and cover letter, rewritten per role.",
    description:
      "Every application gets keyword-aligned, recruiter-readable, ATS-safe materials generated from the actual job description, with the changes shown before anything goes out.",
    details: [
      "Reads the job description for recruiter screening keywords",
      "Rewrites using only true facts from your original résumé",
      "Generates a custom cover letter for the exact role",
      "Stores tailored versions for follow-ups and interviews",
    ],
    metric: "100%",
    metricLabel: "changes visible before submission",
    accent: "border-zinc-500 bg-zinc-50 text-zinc-700",
    iconBg: "bg-zinc-900",
  },
  {
    id: 3,
    label: "Apply",
    eyebrow: "Submission run",
    icon: Send,
    title: "Lyncs opens the form. Lyncs hits submit.",
    description:
      "Workday, Greenhouse, Lever, Ashby - twelve ATSes covered. Login, every field, open-ended questions in your voice, uploads, and submit are handled end to end.",
    details: [
      "Handles login, form navigation, and file uploads",
      "Answers open-ended questions in your voice",
      "Fills every field including work authorization",
      "Records the exact receipt for every application",
    ],
    metric: "8s",
    metricLabel: "average time from approval to submitted",
    accent: "border-blue-500 bg-blue-50 text-blue-700",
    iconBg: "bg-blue-600",
  },
  {
    id: 4,
    label: "Track",
    eyebrow: "Pipeline sync",
    icon: Inbox,
    title: "Replies, interviews, rejections - auto-routed.",
    description:
      "Recruiter emails land back on the right application. Status moves on its own, so your inbox becomes a pipeline you can actually read.",
    details: [
      "Routes recruiter replies to the correct application",
      "Highlights interview invitations and urgent follow-ups",
      "Updates status without manual spreadsheet work",
      "Keeps rejection data for search quality analytics",
    ],
    metric: "24/7",
    metricLabel: "monitoring for status changes and replies",
    accent: "border-yellow-500 bg-yellow-50 text-yellow-800",
    iconBg: "bg-yellow-500",
  },
];

export const workflowFeatures = [
  {
    icon: Eye,
    title: "Visible receipts",
    description:
      "See the fields filled, answers given, résumé sent, cover letter sent, and ATS confirmation.",
  },
  {
    icon: Shield,
    title: "ATS-safe materials",
    description:
      "Applications go through the same standard forms a manual applicant would use.",
  },
  {
    icon: Zap,
    title: "Fast approval loops",
    description:
      "Approve a strong match once and let the agent handle the repetitive submission work.",
  },
  {
    icon: Clock,
    title: "Always-on monitoring",
    description:
      "Night postings, weekend roles, and new company pages keep flowing into the same queue.",
  },
  {
    icon: CheckCircle,
    title: "Work authorization",
    description:
      "Set your status once and Lyncs handles authorization questions consistently.",
  },
  {
    icon: Target,
    title: "Role-fit scoring",
    description:
      "Matching uses your résumé, preferences, search history, and company constraints.",
  },
];
