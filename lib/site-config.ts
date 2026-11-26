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

export function trackLeadConversion(): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
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
