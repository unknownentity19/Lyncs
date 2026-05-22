import Link from "next/link";
import { Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const footerLinks = {
  Product: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Get started", href: "/signup" },
  ],
  Platforms: [
    { label: "Web", href: "/platforms" },
    { label: "iMessage", href: "/messaging" },
    { label: "Chrome", href: "/signup?surface=chrome" },
    { label: "MCP / CLI", href: "/mcp" },
  ],
  Company: [
    { label: "Jobs", href: "mailto:founders@lyncs.com?subject=Jobs%20at%20Lyncs" },
    { label: "YC profile", href: "https://www.ycombinator.com/" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/blog" },
    { label: "AI disclosure", href: "mailto:founders@lyncs.com?subject=AI%20disclosure" },
  ],
  Legal: [
    { label: "Privacy", href: "mailto:founders@lyncs.com?subject=Privacy" },
    { label: "Terms", href: "mailto:founders@lyncs.com?subject=Terms" },
    { label: "Bug bounty", href: "mailto:founders@lyncs.com?subject=Bug%20bounty" },
    { label: "Delete account", href: "mailto:founders@lyncs.com?subject=Delete%20account" },
  ],
};

function isExternalLink(href: string) {
  return href.startsWith("http");
}

function isNativeLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <BrandLogo href="/" className="mb-4 inline-flex" imageClassName="h-12" />
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              A transparent agent for job applications. Backed by Y Combinator.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-card-alt border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/20 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://www.ycombinator.com/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs font-bold hover:bg-orange-600 transition-colors">
                Y
              </a>
              <a href="mailto:founders@lyncs.com" className="w-8 h-8 rounded-lg bg-card-alt border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/20 transition-all">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {isNativeLink(link.href) ? (
                      <a
                        href={link.href}
                        target={isExternalLink(link.href) ? "_blank" : undefined}
                        rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                        className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
