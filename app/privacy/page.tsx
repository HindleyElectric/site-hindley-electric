import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, mailtoHref, telHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.businessName} collects, uses, and protects the information you share on this website.`,
};

const EFFECTIVE = "November 26, 2026";

export default function PrivacyPage() {
  const mail = mailtoHref();
  const tel = telHref();
  return (
    <div className="bg-ground pb-24 pt-32">
      <article className="mx-auto max-w-3xl px-6 text-bone/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_h2]:text-bone [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="font-display text-4xl uppercase text-bone sm:text-5xl">Privacy Policy</h1>
        <p className="text-sm text-muted">Effective {EFFECTIVE}</p>

        <p>
          This policy explains what information {siteConfig.businessName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
          collects through hindleyelectric.com, how we use it, and the choices you have.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Job requests.</strong> When you send the quote form, we receive your first and last name,
            phone number, email address, the type of job, and the description you write.
          </li>
          <li>
            <strong>Chat messages.</strong> If you use the chat on this site, we receive the messages you type.
          </li>
          <li>
            <strong>Website usage.</strong> Like most websites, our pages use cookies and similar technology from
            Google (Google Tag Manager and Google Ads) to understand visits and measure which ads lead to job
            requests. This can include your browser and device type, pages viewed, and the ad you clicked.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your request, quote the job, schedule work, and follow up about it.</li>
          <li>To answer chat questions about our services.</li>
          <li>To measure and improve our advertising and website.</li>
        </ul>
        <p>We do not sell the information you give us.</p>

        <h2>Who we share it with</h2>
        <p>We share information only with service providers that help us run the business:</p>
        <ul>
          <li>
            <strong>Our customer management system (GoHighLevel)</strong>, which stores job requests and sends our
            emails, including the confirmation you receive after submitting the form.
          </li>
          <li>
            <strong>Google</strong>, for Google Tag Manager and Google Ads measurement. When you send the quote
            form, your email address and phone number are scrambled on your device into a one-way code (a
            &ldquo;hash&rdquo;) before being sent to Google, which uses it only to match the request to an ad
            interaction (&ldquo;enhanced conversions&rdquo;). Learn more in{" "}
            <a href="https://policies.google.com/privacy" className="text-red underline hover:text-red-glow">
              Google&rsquo;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Anthropic</strong>, the AI provider that powers the chat on this site, which processes the
            messages you type in the chat to generate replies.
          </li>
          <li>
            <strong>Vercel</strong>, which hosts this website.
          </li>
        </ul>
        <p>We may also disclose information if required by law.</p>

        <h2>Your choices</h2>
        <ul>
          <li>
            You can block or delete cookies in your browser settings. You can manage ad personalization at{" "}
            <a href="https://adssettings.google.com" className="text-red underline hover:text-red-glow">
              adssettings.google.com
            </a>
            .
          </li>
          <li>
            You can ask us what information we have about you, or ask us to correct or delete it, by contacting
            us below.
          </li>
          <li>You can ask us to stop emailing you at any time.</li>
        </ul>

        <h2>How long we keep it</h2>
        <p>
          We keep job requests and customer records for as long as needed to serve you and keep business
          records, then delete them.
        </p>

        <h2>Children</h2>
        <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we will update it on this page with a new effective date.</p>

        <h2>Contact us</h2>
        <p>
          {siteConfig.businessName}
          {siteConfig.email && mail && (
            <>
              {" · "}
              <a href={mail} className="text-red underline hover:text-red-glow">
                {siteConfig.email}
              </a>
            </>
          )}
          {siteConfig.phoneDisplay && tel && (
            <>
              {" · "}
              <a href={tel} className="text-red underline hover:text-red-glow">
                {siteConfig.phoneDisplay}
              </a>
            </>
          )}
        </p>
        <p>
          <Link href="/contact" className="text-red underline hover:text-red-glow">
            Back to the contact page
          </Link>
        </p>
      </article>
    </div>
  );
}
