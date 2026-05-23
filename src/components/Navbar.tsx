"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import ScrollProgress from "@/components/ScrollProgress";

const navLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Platforms", href: "/platforms" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-border/70 shadow-[0_2px_24px_-12px_rgba(15,23,42,0.18)]"
            : "bg-white/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <BrandLogo
            href="/"
            eager
            className="shrink-0 transition-transform duration-200 hover:scale-[1.03]"
            imageClassName={scrolled ? "h-9" : "h-11"}
          />

          {/* Center links – desktop */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  data-active={active}
                  className={`link-underline text-sm transition-colors duration-200 ${
                    active
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side – desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="group btn-shine inline-flex items-center gap-1.5 text-sm font-medium bg-foreground text-white px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-200 hover:shadow-lg hover:shadow-foreground/25"
            >
              Sign up
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Hamburger – mobile */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-border"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.22 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-sm py-2 transition-colors ${
                        pathname === link.href
                          ? "text-foreground font-medium"
                          : "text-muted hover:text-foreground"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
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
                  className="btn-shine text-sm font-medium bg-foreground text-white px-5 py-2.5 rounded-full text-center hover:bg-foreground/90 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
