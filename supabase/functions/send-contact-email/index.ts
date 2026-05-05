import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") || "medisummarize@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactPayload = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rio Adobe Contact Form <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `New message from ${name} — Rio Adobe`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf9f7; padding: 32px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #b91c1c; font-size: 24px; margin: 0;">Rio Adobe Southwest Cafe</h2>
              <p style="color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 4px 0 0;">New Contact Form Submission</p>
            </div>
            <table style="width:100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <tr style="background: #fff8f8;">
                <td style="padding: 12px 16px; font-weight: bold; color: #b91c1c; width: 100px; font-size: 13px;">Name</td>
                <td style="padding: 12px 16px; color: #333; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: bold; color: #b91c1c; font-size: 13px;">Email</td>
                <td style="padding: 12px 16px; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
              </tr>
              <tr style="background: #fff8f8;">
                <td style="padding: 12px 16px; font-weight: bold; color: #b91c1c; font-size: 13px;">Phone</td>
                <td style="padding: 12px 16px; color: #333; font-size: 14px;">${phone || "Not provided"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: white; border-left: 4px solid #b91c1c; border-radius: 0 8px 8px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <p style="margin: 0; color: #444; line-height: 1.7; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #aaa; text-align: center;">
              Sent via Rio Adobe website · <a href="https://rioadobe.com" style="color: #b91c1c;">rioadobe.com</a>
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Server error. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
