import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Star, MapPin, Clock, Phone, ChevronRight, Utensils, Flame, Leaf, Award, Heart, Sparkles } from "lucide-react";
const heroImg = "https://rioadobe.com/files/QuickSiteImages/QS_header.jpg";
const tacosImg = "https://rioadobe.com/publishImages/Appetizers~~element21.jpg";
const enchiladaImg = "https://rioadobe.com/IMG_1968.JPG";
const salsaImg = "https://rioadobe.com/publishImages/Appetizers~~element26.jpg";
const margaritaImg = "https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?auto=format&fit=crop&q=80&w=1200";
const chefImg = "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=1200";
const spicesImg = "https://rioadobe.com/files/QuickSiteImages/QS_header.jpg";


import { AsciiBanner } from "@/components/site/AsciiArt";
import { RioAdobeMark } from "@/components/site/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rio Adobe Southwest Cafe — Cupertino's Mexican Kitchen" },
      { name: "description", content: "Handcrafted Southwestern Mexican fare, fresh house-made salsas and margaritas in Cupertino, CA. Dine-in, take-out & delivery. Walk-ins welcome." },
      { property: "og:title", content: "Rio Adobe Southwest Cafe — Cupertino" },
      { property: "og:description", content: "Authentic Southwestern Mexican fare in Cupertino since 2007." },
    ],
  }),
  component: HomePage,
});

const HIGHLIGHTS = [
  { img: tacosImg, title: "Street-Style Tacos", desc: "Char-grilled meats, citrus-marinated seafood, soft corn tortillas." },
  { img: enchiladaImg, title: "Hopi Blue Enchiladas", desc: "Layered blue corn tortillas with fire-roasted corn & green sauce." },
  { img: salsaImg, title: "Fresh Salsa Bar", desc: "Made in-house every morning. Mild, smoky, fiery — your call." },
];

const STATS = [
  { num: "18", label: "Years Serving Cupertino" },
  { num: "4.5★", label: "Google Rating · 561 Reviews" },
  { num: "100%", label: "Recipes Made In-House" },
  { num: "0", label: "Lard, MSG or Fillers" },
];

const PILLARS = [
  { icon: Heart, title: "Made With Care", text: "Every dish is hand-prepared by our team — no shortcuts, no compromises." },
  { icon: Leaf, title: "Sourced Local", text: "Organic produce and partnerships with local farms when in season." },
  { icon: Award, title: "Sustainably Raised", text: "Highest-quality meats and sustainably-caught seafood — always." },
  { icon: Sparkles, title: "Fresh Salsa Bar", text: "House-made salsas crafted fresh each morning, just like abuela's." },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div className="bg-surface">
      {/* HERO with parallax */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Rio Adobe interior at sunset"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <RioAdobeMark size={56} className="text-accent" />
              <div>
                <p className="font-anton text-2xl uppercase tracking-tight">Rio Adobe</p>
                <p className="text-[9px] tracking-[0.4em] uppercase opacity-70">Southwest Cafe · Est. 2007</p>
              </div>
            </div>

            <h1 className="font-anton text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.92] tracking-tight text-balance">
              Southwest Soul.<br />
              <span className="text-accent">Cupertino Heart.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
              Handcrafted Southwestern Mexican fare, a stocked salsa bar, and house-made margaritas — served warm, served right, since 2007.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:4088731600"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-body text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/40"
              >
                Call (408) 873-1600
              </a>
              <Link
                to="/menu"
                className="border border-white/30 text-white px-8 py-4 rounded-full font-body text-xs font-bold uppercase tracking-[0.25em] hover:bg-white/10 hover:border-white transition-all"
              >
                See the Menu
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
                <span className="ml-2 font-bold">4.5</span>
              </div>
              <span className="opacity-70">561 Google Reviews</span>
              <span className="hidden sm:inline opacity-50">·</span>
              <span className="hidden sm:inline opacity-70">Local Favorite</span>
            </div>
          </motion.div>
        </div>

        {/* Quick info strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1A1614]/95 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <InfoChip icon={<Clock size={18} />} label="Open Today" value="11am – 9pm" />
            <InfoChip icon={<Phone size={18} />} label="Call" value="(408) 873-1600" href="tel:4088731600" />
            <InfoChip icon={<MapPin size={18} />} label="Find Us" value="10525 S. De Anza Blvd" />
            <InfoChip icon={<Utensils size={18} />} label="Service" value="Dine-in · Take-out · Delivery" />
          </div>
        </div>
      </section>

      {/* ASCII brand banner */}
      <section className="py-16 md:py-20 bg-card border-b border-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <AsciiBanner />
          <p className="mt-6 text-xs uppercase tracking-[0.5em] text-on-surface-variant">
            Cupertino, California · Since 2007
          </p>
        </div>
      </section>

      {/* INTRO with sticky scroll */}
      <section className="py-24 md:py-40 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-primary font-bold">A Cupertino Tradition</span>
          <h2 className="mt-4 font-anton text-5xl md:text-7xl uppercase tracking-tight text-on-surface text-balance">
            Slow-cooked recipes.<br />Fresh from the desert.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
            Inspired by the flavors of New Mexico and the spirit of the American Southwest. Every recipe at Rio Adobe is made in-house, with seasonal local produce, sustainably-raised meats, and never any lard, MSG, or fillers.
          </p>
        </motion.div>
      </section>

      {/* STATS strip */}
      <section className="bg-primary text-on-primary py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-anton text-5xl md:text-7xl uppercase tracking-tight">{s.num}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] opacity-80">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PILLARS — apple style */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Our Promise</span>
          <h2 className="mt-4 font-anton text-5xl md:text-6xl uppercase tracking-tight">Four pillars. One philosophy.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <p.icon size={22} />
              </div>
              <h3 className="font-anton text-xl uppercase tracking-tight text-on-surface">{p.title}</h3>
              <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="pb-24 md:pb-32 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h, idx) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-card aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <img
                src={h.img}
                alt={h.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="font-anton text-3xl uppercase tracking-tight">{h.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-on-primary font-body text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-primary/30"
          >
            Explore the Full Menu <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* SPLIT FEATURE — Margarita */}
      <section className="bg-[#1A1614] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px]">
            <img src={margaritaImg} alt="Strawberry margarita" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-20">
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-bold">House-Made</span>
            <h2 className="mt-4 font-anton text-5xl md:text-6xl uppercase tracking-tight">
              Margaritas<br />done right.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Blue agave tequila, cane nectar, fresh lime juice. By the glass or by the carafe. Pair with our house-made sangria for a sunset to remember.
            </p>
            <Link to="/menu" className="mt-8 inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.25em] hover:gap-3 transition-all border-b border-accent/30 hover:border-accent pb-1">
              See bar menu →
            </Link>
          </div>
        </div>
      </section>

      {/* SPLIT FEATURE — Chef */}
      <section className="bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <div className="p-10 md:p-20 order-2 md:order-1">
            <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">In Our Kitchen</span>
            <h2 className="mt-4 font-anton text-5xl md:text-6xl uppercase tracking-tight text-on-surface">
              Made by hand.<br />Plated with pride.
            </h2>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              From slow-braised carne adobada to hand-rolled sopapillas, our team prepares every dish from scratch — the way it should be.
            </p>
            <Link to="/heritage" className="mt-8 inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.25em] hover:gap-3 transition-all border-b border-primary/30 hover:border-primary pb-1">
              Read our story →
            </Link>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px] order-1 md:order-2">
            <img src={chefImg} alt="Chef plating a dish" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* SPICES BAND */}
      <section className="relative py-32 overflow-hidden">
        <img src={spicesImg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-bold">From the Desert</span>
          <h2 className="mt-4 font-anton text-5xl md:text-7xl uppercase tracking-tight text-balance">
            Smoke. Spice.<br />Heritage.
          </h2>
          <p className="mt-6 text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            New Mexico chiles, slow-roasted poblanos, and Mexican cinnamon — the soul of every Rio Adobe recipe.
          </p>
        </div>
      </section>

      {/* VISIT BAND */}
      <section className="bg-[#1A1614] text-white py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-accent font-bold">Visit Us</span>
            <h2 className="mt-4 font-anton text-5xl md:text-6xl uppercase tracking-tight">
              Pull up a chair.<br />Stay awhile.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Walk-ins always welcome. Give us a ring for take-out or larger parties — we're happy to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:4088731600"
                className="bg-accent text-accent-foreground px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 hover:scale-105 transition-all"
              >
                Call (408) 873-1600
              </a>
              <a
                href="https://maps.google.com/maps?q=10525+S+De+Anza+Blvd+%23100+Cupertino+CA+95014"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-white/10 transition"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              title="Rio Adobe location map"
              src="https://www.google.com/maps?q=10525+S+De+Anza+Blvd+%23100+Cupertino+CA+95014&output=embed"
              className="w-full h-[360px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-accent text-accent" />
            ))}
          </div>
          <h2 className="font-anton text-4xl md:text-6xl uppercase tracking-tight text-on-surface">
            Loved by locals
          </h2>
          <p className="mt-3 text-on-surface-variant text-sm uppercase tracking-[0.3em]">561+ Google Reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Freddie R.", text: "Great customer service. Fresh salsas every day. Wet burrito was excellent.", role: "Local Guide · 105 reviews" },
            { name: "Massimo P.", text: "Fish and shrimp tacos cooked perfectly and very tasty. Quesadilla was also very good.", role: "Local Guide · 359 reviews" },
            { name: "Fruit tea fan", text: "BEST Mexican food in the area. Huge portions, high quality, great service and affordable.", role: "Verified Guest" },
          ].map((r) => (
            <div key={r.name} className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-on-surface text-lg leading-relaxed italic">"{r.text}"</p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-bold text-on-surface">{r.name}</p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.yelp.com/biz/rio-adobe-southwest-cafe-cupertino"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold text-xs uppercase tracking-[0.3em] hover:underline"
          >
            Read more reviews on Yelp →
          </a>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-surface to-card">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <RioAdobeMark size={60} className="text-primary mx-auto mb-8" />
          <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tight text-on-surface text-balance">
            Come hungry.<br />Leave happy.
          </h2>
          <p className="mt-6 text-on-surface-variant text-lg max-w-xl mx-auto">
            We can't wait to serve you. ¡Bienvenidos a Rio Adobe!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="tel:4088731600" className="bg-primary text-on-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 transition shadow-xl shadow-primary/30">Call (408) 873-1600</a>
            <Link to="/contact" className="border border-on-surface/20 text-on-surface px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] hover:bg-on-surface/5 transition">Get Directions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoChip({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Body = (
    <div className="flex items-center gap-3">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest opacity-60">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="hover:text-accent transition">{Body}</a> : Body;
}
