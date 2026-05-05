import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MENU, type DietaryTag } from "@/data/menu";
import { Leaf, WheatOff, Flame, Star, X, Download, Phone } from "lucide-react";
const heroImg = "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=1920";
const tacosImg = "https://rioadobe.com/publishImages/Appetizers~~element21.jpg";
const salsaImg = "https://rioadobe.com/publishImages/Appetizers~~element26.jpg";

import { RioAdobeMark } from "@/components/site/Brand";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Rio Adobe Southwest Cafe" },
      { name: "description", content: "Explore Rio Adobe's full menu: tacos, burritos, enchiladas, salads, soups, margaritas and more — handcrafted Southwestern Mexican." },
      { property: "og:title", content: "Menu — Rio Adobe Southwest Cafe" },
      { property: "og:description", content: "Tacos, burritos, enchiladas, margaritas — handcrafted in Cupertino." },
    ],
  }),
  component: MenuPage,
});

const FILTERS: { id: "all" | DietaryTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "v", label: "Vegetarian" },
  { id: "vg", label: "Vegan" },
  { id: "gf", label: "Gluten-Free" },
  { id: "s", label: "Spicy" },
];

function MenuPage() {
  const [filter, setFilter] = useState<"all" | DietaryTag>("all");
  const [selected, setSelected] = useState<{ name: string; ingredients: string; dietary: DietaryTag[] } | null>(null);

  const filtered = MENU.map((c) => ({
    ...c,
    items: c.items.filter((i) => filter === "all" || i.dietary.includes(filter)),
  })).filter((c) => c.items.length > 0);

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative bg-[#1A1614] text-white py-24 md:py-32 px-6 overflow-hidden">
        <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/70 via-[#1A1614]/85 to-[#1A1614]" />
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RioAdobeMark size={44} className="text-accent" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-bold">The Menu</span>
            </div>
            <h1 className="font-anton text-6xl md:text-8xl uppercase leading-[0.9] tracking-tight text-balance">
              A taste of the<br />Southwest
            </h1>
            <p className="mt-6 text-white/70 max-w-xl text-lg leading-relaxed">
              Hand-prepared in our kitchen daily. Use the filters to find vegetarian, vegan, gluten-free, and spicy dishes.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://www.rioadobe.com/Rio_Adobe_Menu.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition">
              <Download size={14} /> Download PDF
            </a>
            <a href="tel:4088731600" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition">
              <Phone size={14} /> Order: (408) 873-1600
            </a>
          </div>
        </div>
      </section>

      {/* Legend */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-on-surface-variant">
          <LegendDot icon={<Leaf size={12} className="text-emerald-600" />} label="Vegetarian" />
          <LegendDot icon={<Leaf size={12} className="text-emerald-700 fill-emerald-500" />} label="Vegan" />
          <LegendDot icon={<WheatOff size={12} className="text-amber-600" />} label="Gluten-Free" />
          <LegendDot icon={<Flame size={12} className="text-orange-500" />} label="Spicy" />
          <LegendDot icon={<Star size={12} className="fill-accent text-accent" />} label="Signature Dish" />
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-surface/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition ${
                filter === f.id
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "bg-card text-on-surface border border-border hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-x-16 gap-y-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((cat) => (
            <motion.section
              layout
              key={cat.id}
              id={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="scroll-mt-40"
            >
              <h2 className="inline-block bg-primary text-on-primary px-5 py-2 font-anton text-2xl uppercase tracking-tight mb-6 -skew-x-6">
                <span className="inline-block skew-x-6">{cat.category}</span>
              </h2>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setSelected(item)}
                      className="w-full text-left flex items-baseline gap-3 group py-2 border-b border-dashed border-border/60 hover:border-primary transition"
                    >
                      <span className="font-headline font-bold text-on-surface group-hover:text-primary transition flex items-center gap-2">
                        {item.name}
                        {item.isSignature && <Star size={14} className="fill-accent text-accent" />}
                      </span>
                      <div className="flex items-center gap-1.5 ml-1">
                        {item.dietary.includes("v") && <Leaf size={12} className="text-emerald-600" />}
                        {item.dietary.includes("vg") && <Leaf size={12} className="text-emerald-700 fill-emerald-500" />}
                        {item.dietary.includes("gf") && <WheatOff size={12} className="text-amber-600" />}
                        {item.dietary.includes("s") && <Flame size={12} className="text-orange-500" />}
                      </div>
                      <span className="flex-grow border-b border-dotted border-border self-end mb-1.5" />
                      <span className="text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition">
                        Details →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {/* Salsa bar feature */}
      <section className="bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[520px]">
            <img src={salsaImg} alt="Fresh house-made salsa bar" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-16">
            <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Free with every meal</span>
            <h2 className="mt-4 font-anton text-5xl md:text-6xl uppercase tracking-tight text-on-surface">The Salsa Bar</h2>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              Five rotating house-made salsas — from a sweet pico de gallo to a smoky habanero — crafted fresh every morning. Stocked all day, every day.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-y-2 text-sm text-on-surface-variant">
              <li>· Fresh pico de gallo</li>
              <li>· Roasted tomato</li>
              <li>· Tomatillo-cilantro</li>
              <li>· Smoked chipotle</li>
              <li>· Habanero (¡muy picante!)</li>
              <li>· Pickled vegetables</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Take-out CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-6">
        <h2 className="font-anton text-4xl md:text-5xl uppercase tracking-tight text-on-surface">Get Take-Out</h2>
        <p className="mt-4 text-on-surface-variant">
          Download the menu, then call us. We'll have your order ready when you arrive.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="https://www.rioadobe.com/Rio_Adobe_Menu.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 transition shadow-xl shadow-primary/30">
            <Download size={14} /> Menu PDF
          </a>
          <a href="tel:4088731600" className="inline-flex items-center gap-2 border border-on-surface/15 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-on-surface/5 transition">
            <Phone size={14} /> Call to Order
          </a>
        </div>
      </section>
      {/* Item modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.button
              aria-label="Close"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-card w-full max-w-lg rounded-3xl shadow-2xl p-8 md:p-10"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary"
              >
                <X size={20} />
              </button>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Ingredients</span>
              <h3 className="mt-2 font-anton text-3xl uppercase text-on-surface">{selected.name}</h3>
              <div className="w-12 h-1 bg-primary/30 mt-4 mb-6 rounded-full" />
              <p className="text-on-surface-variant leading-relaxed">{selected.ingredients}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.dietary.includes("v") && <Tag color="emerald" icon={<Leaf size={12} />}>Vegetarian</Tag>}
                {selected.dietary.includes("vg") && <Tag color="emerald" icon={<Leaf size={12} />}>Vegan</Tag>}
                {selected.dietary.includes("gf") && <Tag color="amber" icon={<WheatOff size={12} />}>Gluten-Free</Tag>}
                {selected.dietary.includes("s") && <Tag color="orange" icon={<Flame size={12} />}>Spicy</Tag>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Tag({ children, icon, color }: { children: React.ReactNode; icon: React.ReactNode; color: "emerald" | "amber" | "orange" }) {
  const map = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${map[color]}`}>
      {icon}
      {children}
    </span>
  );
}

function LegendDot({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 uppercase tracking-widest font-semibold">
      {icon} {label}
    </span>
  );
}
