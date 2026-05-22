import type { LucideIcon } from "lucide-react";
import {
  Code,
  Globe,
  Laptop,
  MessageCircle,
  Monitor,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";

export type PlatformSurface = {
  icon: LucideIcon;
  badge: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  bestFor: string;
  features: string[];
  link: { label: string; href: string };
  tone: string;
  iconBg: string;
  codeBlock?: string;
};

export const platformSurfaces: PlatformSurface[] = [
  {
    icon: Monitor,
    badge: "Primary workspace",
    title: "Web dashboard",
    shortTitle: "Web",
    subtitle: "The command center for your search.",
    description:
      "Review new matches, approve applications, manage tailored materials, and track recruiter replies from one browser workspace.",
    bestFor: "Daily review, queue management, and pipeline visibility",
    features: [
      "Real-time job discovery feed with smart filters",
      "Application queue with one-click approval",
      "Recruiter inbox with threaded conversations",
      "Resume manager with version history",
      "Analytics for response rates and search quality",
    ],
    link: { label: "Open dashboard", href: "/dashboard" },
    tone: "border-blue-500 bg-blue-50 text-blue-700",
    iconBg: "bg-blue-600",
  },
  {
    icon: MessageCircle,
    badge: "Mobile approval",
    title: "iMessage and WhatsApp",
    shortTitle: "Messaging",
    subtitle: "Approve strong matches from your texts.",
    description:
      "Lyncs sends a concise match summary. Reply yes and the same agent handles the application, receipt, and status update.",
    bestFor: "Fast approvals when you are away from the dashboard",
    features: [
      "Instant match notifications via iMessage or WhatsApp",
      "Reply yes to apply to a matched role",
      "Receipts delivered back into the thread",
      "Ask follow-up questions about any role",
      "Check application status through conversation",
    ],
    link: { label: "See messaging", href: "/messaging" },
    tone: "border-green-500 bg-green-50 text-green-700",
    iconBg: "bg-green-600",
  },
  {
    icon: Globe,
    badge: "Browser assist",
    title: "Chrome extension",
    shortTitle: "Chrome",
    subtitle: "Bring Lyncs to any job posting.",
    description:
      "Open a posting and the toolbar identifies the role, previews fit, and queues the application without making you leave the page.",
    bestFor: "Saving roles you discover outside the dashboard",
    features: [
      "Toolbar overlay on job postings and company pages",
      "Auto-detects job details from the current page",
      "Inline resume tailoring preview",
      "One-click queueing and form handoff",
      "Tracking synced back to the main dashboard",
    ],
    link: { label: "Add to Chrome", href: "/signup?surface=chrome" },
    tone: "border-yellow-500 bg-yellow-50 text-yellow-800",
    iconBg: "bg-yellow-500",
  },
  {
    icon: Terminal,
    badge: "Agent interface",
    title: "MCP server and CLI",
    shortTitle: "CLI",
    subtitle: "Run your search from inside your AI tools.",
    description:
      "Use Lyncs through Claude Code, Cursor, or any MCP-compatible client with authenticated search, apply, and status tools.",
    bestFor: "Developer workflows, batches, and custom automation",
    features: [
      "Works with Claude Code, Cursor, and MCP clients",
      "OAuth-based authentication with no password sharing",
      "CLI commands for search, apply, and status",
      "Batch operations for repeated workflows",
      "Webhooks and API access for custom systems",
    ],
    link: { label: "Set up MCP", href: "/mcp" },
    tone: "border-zinc-500 bg-zinc-50 text-zinc-700",
    iconBg: "bg-zinc-900",
    codeBlock: `$ lyncs search "frontend remote"
2 strong matches found

$ lyncs apply stripe-sr-frontend
submitted via greenhouse in 8s
tracker updated`,
  },
];

export const platformStats = [
  { icon: Laptop, value: "4", label: "connected surfaces" },
  { icon: Smartphone, value: "2", label: "messaging channels" },
  { icon: Code, value: "12", label: "ATSes covered" },
  { icon: Zap, value: "8s", label: "average apply time" },
];
