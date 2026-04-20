// Owned by Backend. Do not edit from other agents.
import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  organization: z.string().trim().min(1).max(150),
  role: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(2000),
  inquiryType: z.enum(["Investor", "Health system", "Clinical partner", "Other"]),
  // Honeypot — bots fill this in. Must be empty or absent.
  website: z.string().max(0).optional(),
});

type ContactPayload = z.infer<typeof Schema>;

type EmailPayload = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

// In-memory per-IP rate limiter. Resets on cold start; Vercel may route to
// multiple instances so the effective limit is higher than the per-instance cap.
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;
const rateBuckets: Map<string, number[]> = new Map();

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const prior = rateBuckets.get(ip) ?? [];
  const recent = prior.filter((t) => t > cutoff);
  if (recent.length >= RATE_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

async function sendEmail(payload: EmailPayload) {
  try {
    // Lazy import so a missing package or cold-start cost only hits when actually sending.
    // NOTE: The actual verified sender must be configured in Resend. The FROM
    // address below ("noreply@saltarehealth.com") is a placeholder — update after
    // domain verification inside the Resend dashboard.
    const mod = await import("resend");
    const { Resend } = mod as { Resend: new (key: string) => { emails: { send: (args: { from: string; to: string; subject: string; text: string }) => Promise<unknown> } } };
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    return await resend.emails.send({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    });
  } catch (e) {
    console.error("[contact] email send failed", e);
    throw new Error("Delivery failed");
  }
}

function buildEmailBody(data: ContactPayload): string {
  return [
    `Inquiry type: ${data.inquiryType}`,
    `Name: ${data.name}`,
    `Organization: ${data.organization}`,
    `Role: ${data.role}`,
    `Email: ${data.email}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export async function POST(req: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  // Honeypot check BEFORE Zod so bots get a silent 200 instead of a 400
  // that would tell them exactly which field tripped them up.
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as { website?: unknown }).website === "string" &&
    ((raw as { website: string }).website as string).length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Rate limit per IP.
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  // Strip CR/LF from organization before putting it in the subject line to
  // prevent header injection. Zod already clamps length.
  const safeOrg = data.organization.replace(/[\r\n]+/g, " ");
  const subject = `[Saltare] New ${data.inquiryType} inquiry — ${safeOrg}`;
  const textBody = buildEmailBody(data);

  if (apiKey && toEmail) {
    try {
      await sendEmail({
        to: toEmail,
        from: "Saltare Health <noreply@saltarehealth.com>",
        subject,
        text: textBody,
      });
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
      // Generic error — never leak which env var or which upstream failed.
      return NextResponse.json(
        { ok: false, error: "Delivery failed" },
        { status: 500 }
      );
    }
  }

  // Dev fallback when env vars are not configured.
  console.log("[contact:dev-fallback]", {
    inquiryType: data.inquiryType,
    name: data.name,
    organization: data.organization,
    role: data.role,
    email: data.email,
    messagePreview: data.message.slice(0, 200),
  });
  return NextResponse.json({ ok: true }, { status: 200 });
}
