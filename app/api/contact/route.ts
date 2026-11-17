import { NextResponse } from "next/server";
import { jobTypes } from "@/lib/site-config";

export const runtime = "nodejs";

type ContactPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobType: string;
  description: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.jobType === "string" &&
    (jobTypes as readonly string[]).includes(b.jobType) &&
    typeof b.description === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with a valid value." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  // A lead counts as received only when the CRM webhook accepted it. Server logs
  // are not a delivery channel (they expire), so when there is no webhook or it
  // fails, the visitor is told so and handed an email draft of the same request
  // plus the phone number, instead of a "Got it" that nobody will ever read.
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hindley-electric-website",
          submittedAt: new Date().toISOString(),
          ...body,
        }),
      });
      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
      console.error("CRM webhook responded with", res.status);
    } catch (err) {
      console.error("Failed to forward lead to CRM_WEBHOOK_URL", err);
    }
  } else {
    console.warn("Contact form used but CRM_WEBHOOK_URL is not set; visitor sent to email fallback.");
  }

  return NextResponse.json(
    {
      ok: false,
      fallback: "mailto",
      error: "We couldn't send this online right now. Your details are still in the form below.",
    },
    { status: 503 }
  );
}
