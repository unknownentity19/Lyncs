"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import ScrollProgress from "@/components/ScrollProgress";

type NavSubItem = { label: string; href: string };

type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "menu"; label: string; items: NavSubItem[] };

const navItems: NavItem[] = [
  { type: "link", label: "Home", href: "/" },
  {
    type: "menu",
    label: "Products",
    items: [
      { label: "Features", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    type: "menu",
    label: "Resources",
    items: [
      { label: "Platforms", href: "/platforms" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    type: "menu",
    label: "Company",
    items: [{ label: "About", href: "/about" }],
  },
];

function isMenuActive(items: NavSubItem[], pathname: string) {
  return items.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside / Escape closes the open desktop dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = (label: string) => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenMenu((current) => (current === label ? null : current));
    }, 120);
  };

  return (
    <>
      <ScrollProgress />
      <motion.nav
        ref={navRef}
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

          {/* Center menu – desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              if (item.type === "link") {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-active={active}
                    className={`link-underline text-sm transition-colors duration-200 ${
                      active
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <NavMenu
                  key={item.label}
                  label={item.label}
                  items={item.items}
                  pathname={pathname}
                  isOpen={openMenu === item.label}
                  onOpen={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  onClose={() => scheduleClose(item.label)}
                  onToggle={() =>
                    setOpenMenu((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                  onSelect={() => setOpenMenu(null)}
                />
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
            aria-expanded={mobileOpen}
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
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.22 }}
                  >
                    {item.type === "link" ? (
                      <Link
                        href={item.href}
                        className={`block py-2 text-sm transition-colors ${
                          pathname === item.href
                            ? "text-foreground font-medium"
                            : "text-muted hover:text-foreground"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <MobileMenuGroup
                        label={item.label}
                        items={item.items}
                        pathname={pathname}
                        expanded={mobileExpanded === item.label}
                        onToggle={() =>
                          setMobileExpanded((current) =>
                            current === item.label ? null : item.label,
                          )
                        }
                        onNavigate={() => {
                          setMobileOpen(false);
                          setMobileExpanded(null);
                        }}
                      />
                    )}
                  </motion.div>
                ))}

                <hr className="border-border my-3" />
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

type NavMenuProps = {
  label: string;
  items: NavSubItem[];
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onSelect: () => void;
};

function NavMenu({
  label,
  items,
  pathname,
  isOpen,
  onOpen,
  onClose,
  onToggle,
  onSelect,
}: NavMenuProps) {
  const menuId = useId();
  const active = isMenuActive(items, pathname);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        data-active={active}
        className={`link-underline inline-flex items-center gap-1 text-sm transition-colors duration-200 ${
          active || isOpen
            ? "text-foreground font-medium"
            : "text-muted hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 min-w-[200px] -translate-x-1/2 origin-top rounded-xl border border-border bg-white/95 p-2 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl"
          >
            {items.map((sub) => {
              const subActive =
                pathname === sub.href || pathname.startsWith(`${sub.href}/`);
              return (
                <Link
                  key={sub.label}
                  href={sub.href}
                  role="menuitem"
                  data-active={subActive}
                  onClick={onSelect}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                    subActive
                      ? "bg-card-alt text-foreground font-medium"
                      : "text-muted hover:bg-card-alt hover:text-foreground"
                  }`}
                >
                  {sub.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MobileMenuGroupProps = {
  label: string;
  items: NavSubItem[];
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

function MobileMenuGroup({
  label,
  items,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: MobileMenuGroupProps) {
  const active = isMenuActive(items, pathname);
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between py-2 text-sm transition-colors ${
          active || expanded
            ? "text-foreground font-medium"
            : "text-muted hover:text-foreground"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-1 mb-2 flex flex-col gap-1 border-l border-border pl-3">
              {items.map((sub) => {
                const subActive =
                  pathname === sub.href || pathname.startsWith(`${sub.href}/`);
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={onNavigate}
                    className={`block py-1.5 text-sm transition-colors ${
                      subActive
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
