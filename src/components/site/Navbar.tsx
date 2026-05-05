import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { RioAdobeMark } from "./Brand";

const NAV = [
  { to: "/menu", label: "Menu" },
  { to: "/heritage", label: "Heritage" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all ${
        scrolled ? "bg-surface/90 border-b border-border/60 py-2" : "bg-surface/40 border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img 
            src="https://rioadobe.com/~site/Scripts_ElementBanner/ElementBanner.dll?BANNERID=1&SITEID=RTK3&VER=1" 
            alt="Rio Adobe" 
            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>


        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-primary" : "text-on-surface/60 hover:text-primary"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:4088731600"
            className="font-body text-xs font-semibold uppercase tracking-widest text-on-surface/70 hover:text-primary"
          >
            (408) 873-1600
          </a>
          <a
            href="tel:4088731600"
            className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:opacity-90 transition shadow-lg shadow-primary/20"
          >
            Call Us
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-on-surface"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-surface">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-headline text-lg font-bold uppercase tracking-wider text-on-surface hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="tel:4088731600"
              className="mt-2 font-body text-sm uppercase tracking-widest text-on-surface/70"
            >
              Call (408) 873-1600
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
