import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
const enchiladaImg = "https://rioadobe.com/Adobe_Chicken_Burrito.jpg";
const salsaImg = "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=1200";
const tacosImg = "https://rioadobe.com/Pueblo_Nachos.jpg";
const heroImg = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1920";


export const Route = createFileRoute("/heritage")({
  head: () => ({
    meta: [
      { title: "Heritage — Rio Adobe Southwest Cafe" },
      { name: "description", content: "Our story, food philosophy, service principles, and community pledges. Made in-house, sourced locally — always." },
      { property: "og:title", content: "Heritage — Rio Adobe" },
      { property: "og:description", content: "Made in-house, sourced locally, served with care." },
    ],
  }),
  component: HeritagePage,
});

const SECTIONS = [
  {
    title: "Our Food",
    subtitle: "Moderation & Balance",
    image: enchiladaImg,
    paragraphs: [
      "There are all kinds of diet fads that come and go. The common theme is moderation. A balanced diet of fruit, vegetables, protein and fat — paired with an active lifestyle — is what helps most live well.",
      "Our menu was carefully developed to give you a real choice when dining out: healthy alternatives that actually taste good and stay affordable every day.",
    ],
    pledges: [
      "All our recipes are made in-house and never outsourced.",
      "Organic produce and local farms when in season.",
      "Sustainably-raised, highest-quality meats.",
      "We do not use lard.",
      "No MSG, fillers, or artificial preservatives.",
    ],
  },
  {
    title: "Our Service",
    subtitle: "Time & Nourishment",
    image: heroImg,
    paragraphs: [
      "Life is hectic. We value the time you spend with us, and we styled our service model to maximize the time you have to actually enjoy your food — not rush you out the door.",
      "Manners and courtesy are the foundation of hospitality, and we don't take them lightly.",
    ],
    pledges: [
      "Courteous and conscious of our guests' needs.",
      "Efficient — but never rushed.",
      "Clean and wholesome surroundings.",
      "Greeted warmly, listened to attentively, served with pride.",
    ],
  },
  {
    title: "Our Company",
    subtitle: "Community & Impact",
    image: salsaImg,
    paragraphs: [
      "We're a restaurant, but also a company that provides jobs, generates tax revenue for our community, and makes an impact on our environment.",
      "We feel a responsibility to be conscious about our employees' growth, the community supporting us, and the planet we share.",
    ],
    pledges: [
      "Competitive jobs with promotion from within.",
      "Valuable training and usable job skills.",
      "Support local not-for-profits in our community.",
      "Reduce environmental impact through recycling.",
      "Partner with vendors who share our values.",
    ],
  },
  {
    title: "Employment",
    subtitle: "Pride & Integrity",
    image: tacosImg,
    paragraphs: [
      "Rio Adobe's culture motivates employees to achieve their full potential — through leadership, focus, intensity and persistence — in a workplace built on pride, honesty, integrity and loyalty.",
      "Highly motivated and friendly? We'd love to talk. We offer competitive wages and we're always interviewing qualified candidates.",
    ],
    pledges: [
      "Email or fax your resume: 408-873-1614",
      "Mail: 10525 S. De Anza Blvd #100, Cupertino, CA 95014",
      "Inquire in person for cashier, cook, or busperson positions.",
      "Rio Adobe is an Equal Opportunity Employer.",
    ],
  },
];

function HeritagePage() {
  return (
    <div className="bg-surface py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Our Story</span>
          <h1 className="mt-4 font-anton text-6xl md:text-8xl uppercase tracking-tight text-on-surface">
            Heritage & Vision
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl mx-auto">
            Four pillars that guide everything we cook, every guest we serve, and every choice we make as a business.
          </p>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {SECTIONS.map((s, idx) => (
            <article key={s.title} className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${idx % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <motion.div
                initial={{ opacity: 0, x: idx % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-card aspect-[4/5]"
              >
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">{s.subtitle}</span>
                <h2 className="mt-2 font-anton text-5xl uppercase tracking-tight text-on-surface">{s.title}</h2>
                <div className="mt-6 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-on-surface-variant leading-relaxed text-base">{p}</p>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Our Pledges</h4>
                  <ul className="space-y-2">
                    {s.pledges.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
