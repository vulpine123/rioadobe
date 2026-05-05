import { Link, useRouterState } from "@tanstack/react-router";
import { Home, UtensilsCrossed, BookOpen, Mail } from "lucide-react";

const ITEMS = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/heritage", icon: BookOpen, label: "Heritage" },
  { to: "/contact", icon: Mail, label: "Contact" },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/85 backdrop-blur-2xl border-t border-border/60">
      {ITEMS.map(({ to, icon: Icon, label }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition ${
              active ? "bg-primary text-on-primary -translate-y-2 shadow-lg shadow-primary/30" : "text-on-surface/55"
            }`}
          >
            <Icon size={20} />
            <span className="text-[9px] uppercase tracking-widest font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
