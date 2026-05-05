import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Printer, Clock, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { RioAdobeMark } from "@/components/site/Brand";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rio Adobe Southwest Cafe" },
      { name: "description", content: "Contact Rio Adobe in Cupertino: phone, address, hours, directions, and message form." },
      { property: "og:title", content: "Contact Rio Adobe" },
      { property: "og:description", content: "Phone, address, and directions to Rio Adobe in Cupertino." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name must be under 80 characters"),
  email: z.string().trim().email("Enter a valid email").max(200, "Email too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number too long")
    .regex(/^[\d\s+()-]*$/, "Phone may only contain digits, spaces, +, -, ( and )")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be under 1000 characters"),
});

type ContactErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactErrors;
        if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err: any) {
      toast.error(err.message || "Could not send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface">
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col items-center gap-2 mb-6">
            <RioAdobeMark size={64} />
            <span className="font-anton text-3xl uppercase tracking-tight text-primary">Rio Adobe</span>
          </div>
          <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Get in Touch</span>
          <h1 className="mt-4 font-anton text-6xl md:text-8xl uppercase tracking-tight text-on-surface">Contact Us</h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl mx-auto">
            Drop in, give us a ring, or send a message — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <InfoBlock
            icon={<MapPin />}
            label="Visit"
            primary="10525 S. De Anza Blvd #100"
            secondary="Cupertino, CA 95014"
            cta={{ href: "https://maps.google.com/?q=10525+South+De+Anza+Blvd+100+Cupertino+CA+95014", label: "Get Directions" }}
          />
          <InfoBlock icon={<Phone />} label="Call" primary="(408) 873-1600" secondary="For takeout & general inquiries" cta={{ href: "tel:4088731600", label: "Call Now" }} />
          <InfoBlock icon={<Printer />} label="Fax" primary="(408) 873-1614" secondary="For resumes & inquiries" />
          <InfoBlock icon={<Clock />} label="Hours" primary="Daily 11:00 AM – 9:00 PM" secondary="Open 7 days a week" />
          <InfoBlock icon={<Mail />} label="Message" primary="Send us a message" secondary="We typically respond within one business day." />
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl h-fit md:sticky md:top-28">
          <h2 className="font-anton text-3xl uppercase tracking-tight text-on-surface">Send a message</h2>
          <p className="text-sm text-on-surface-variant mt-2">We typically respond within one business day.</p>

          {submitted ? (
            <div className="mt-10 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex gap-3">
              <CheckCircle2 className="shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">¡Gracias! Your message has been sent.</p>
                <p className="text-sm mt-1">We'll be in touch soon.</p>
                <button
                  className="mt-3 text-xs font-bold uppercase tracking-widest text-emerald-700 hover:underline"
                  onClick={() => setSubmitted(false)}
                >
                  Send another →
                </button>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
              <Field label="Name" name="name" required maxLength={80} error={errors.name} />
              <Field label="Email" name="email" type="email" required maxLength={200} error={errors.email} />
              <Field label="Phone (optional)" name="phone" type="tel" maxLength={30} error={errors.phone} />
              <div>
                <label htmlFor="c-message" className="block text-[10px] uppercase tracking-[0.25em] font-bold text-on-surface-variant mb-2">Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1000}
                  className={`w-full bg-surface border rounded-xl p-4 text-on-surface focus:outline-none resize-none transition ${
                    errors.message ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary rounded-full py-4 text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                {loading ? "Sending…" : "Send Message"}
              </button>
              <p className="text-[10px] text-on-surface-variant text-center mt-2">
                Your information stays private. We never share or sell guest details.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden border border-border shadow-2xl">
            <iframe
              title="Rio Adobe map"
              src="https://www.google.com/maps?q=10525+S+De+Anza+Blvd+%23100+Cupertino+CA+95014&output=embed"
              className="w-full h-[420px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ icon, label, primary, secondary, cta }: { icon: React.ReactNode; label: string; primary: string; secondary?: string; cta?: { href: string; label: string } }) {
  return (
    <div className="flex gap-5 group">
      <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant font-bold">{label}</p>
        <p className="mt-1 font-headline text-xl font-bold text-on-surface">{primary}</p>
        {secondary && <p className="text-sm text-on-surface-variant">{secondary}</p>}
        {cta && (
          <a href={cta.href} target={cta.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-block mt-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            {cta.label} →
          </a>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required, maxLength, error }: { label: string; name: string; type?: string; required?: boolean; maxLength?: number; error?: string }) {
  const id = `c-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] uppercase tracking-[0.25em] font-bold text-on-surface-variant mb-2">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className={`w-full bg-surface border rounded-xl px-4 py-3 text-on-surface focus:outline-none transition ${
          error ? "border-destructive" : "border-border focus:border-primary"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
