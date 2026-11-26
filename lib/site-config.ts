// Single source of truth for contact facts. All are `null` until the client
// confirms them — flip a value here and every tel:/mailto:/JSON-LD reference on
// the site updates at once. See clients/hindley-electric/status.md "Needs-me list".

export const siteConfig = {
  businessName: "Hindley Electric",
  ownerName: "Nick Hindley",
  tagline: "Licensed. Direct. No Runaround.",
  phone: "+1-805-712-0234" as string | null,
  phoneDisplay: "+1-805-712-0234" as string | null,
  email: "nick@hindleyelectric.com" as string | null,
  address: null as string | null, // street address, if a physical office exists
  city: null as string | null,
  state: null as string | null,
  zip: null as string | null,
  serviceArea: "Serving the entire Central Coast — and anywhere else needed.",
  hours: "Mon–Fri, 7am–3:30pm — open 24/7 for emergency calls",
  licenseLine: "Licensed, bonded & insured — license # 1161865",
  yearsExperience: 20,
  yearsAsPartner: 5,
  // The domain the business owns; hindleyelectric.com redirects here (verified 2026-11-17).
  siteUrl: "https://www.hindleyelectric.com",
} as const;

export const jobTypes = [
  "Tripped or loss of power",
  "Replace or add lighting",
  "Full home lighting upgrade",
  "Replace or add ceiling fans",
  "Add or replace outlets",
  "Sch job walk for remodel",
  "EV install (how far from panel)",
  "Panel replacement (what type of panel, and size)",
  "Solar repair (what type of system do you have)",
  "Smart home / low-voltage & data wiring",
  "New construction (home, commercial, or winery)",
] as const;

export type JobType = (typeof jobTypes)[number];

// Google Ads conversion "Website quote request" (shared by the owner 2026-11-25).
// Fired only after the contact form is actually delivered to the CRM.
export const GOOGLE_ADS_LEAD_CONVERSION = "AW-18594327921/QaSUCOS9zb8dEPHau6JF";

async function sha256Hex(value: string): Promise<string | null> {
  if (!value || typeof crypto === "undefined" || !crypto.subtle) return null;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Google's enhanced-conversions normalization: lowercase, trimmed email (dots removed
// before the @ for gmail.com / googlemail.com); phone in E.164 (US numbers assumed).
function normalizeEmail(email: string): string {
  let e = email.trim().toLowerCase();
  const [local, domain] = e.split("@");
  if (domain === "gmail.com" || domain === "googlemail.com") e = `${local.replace(/\./g, "")}@${domain}`;
  return e;
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return "";
}

// Fired only after the quote form is delivered. Sends the lead's email and phone to
// Google as SHA-256 hashes (enhanced conversions for leads) — never in plain text.
export async function trackLeadConversion(lead: { email: string; phone: string }): Promise<void> {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    const [emailHash, phoneHash] = await Promise.all([
      sha256Hex(normalizeEmail(lead.email)),
      sha256Hex(normalizePhone(lead.phone)),
    ]);
    const userData: Record<string, string> = {};
    if (emailHash) userData.sha256_email_address = emailHash;
    if (phoneHash) userData.sha256_phone_number = phoneHash;
    if (Object.keys(userData).length) gtag("set", "user_data", userData);
  } catch {
    // Hashing unavailable — still record the conversion without enhanced data.
  }
  // GTM: a dataLayer event Tag Manager can trigger on (for GA4 etc.). The Google Ads
  // conversion itself is sent below — do not add a second Ads conversion tag for it in GTM.
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "quote_request_submitted", transaction_id: id });
  gtag("event", "conversion", { send_to: GOOGLE_ADS_LEAD_CONVERSION, transaction_id: id });
}

export function telHref(): string | null {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : null;
}

export function mailtoHref(): string | null {
  return siteConfig.email ? `mailto:${siteConfig.email}` : null;
}
