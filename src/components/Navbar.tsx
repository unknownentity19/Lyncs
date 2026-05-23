"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Platforms", href: "/platforms" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandLogo
          href="/"
          eager
          className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          imageClassName="h-11"
        />

        {/* Center links – desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.href
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side – desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200 px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-foreground text-white px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-200 hover:shadow-lg hover:shadow-foreground/20"
          >
            Sign up
          </Link>
        </div>

        {/* Hamburger – mobile */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm py-2 transition-colors ${
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border my-2" />
              <Link
                href="/login"
                className="text-sm text-muted hover:text-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-foreground text-white px-5 py-2.5 rounded-full text-center hover:bg-foreground/90 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
