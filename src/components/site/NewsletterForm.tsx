import { useState } from "react";
import { z } from "zod";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({ email: z.string().trim().email().max(200) });

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email });
    setLoading(false);
    if (error) {
      if (error.code === "23505") toast.success("You're already subscribed — gracias!");
      else toast.error("Could not subscribe. Please try again.");
      return;
    }
    toast.success("Subscribed! Watch your inbox for specials.");
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[0.3em] uppercase text-white/60 flex items-center gap-2">
        <Mail size={12} /> Newsletter
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-on-primary px-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "…" : "Join"}
        </button>
      </div>
      <p className="text-[10px] text-white/30">Specials, fiestas, & new dishes. No spam.</p>
    </form>
  );
}
