import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Oswald } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import LoadingScreen from "@/components/loading/LoadingScreen";
import ChatWidget from "@/components/chat/ChatWidget";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Google Ads tag (gtag.js) — conversion ID from the owner's Google Ads account.
const GOOGLE_ADS_ID = "AW-18594327921";
// Google Tag Manager container (owner uses GTM, 2026-11-26).
const GTM_ID = "GTM-T2BQG7TN";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Licensed Electrician`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Hindley Electric — licensed residential, commercial, and industrial electrical work from Nick Hindley, 20+ years in the trade. Panels, EV chargers, lighting, outlets, solar repair, low-voltage & data, and more.",
  openGraph: {
    title: `${siteConfig.businessName} | Licensed Electrician`,
    description:
      "Licensed, direct, no runaround. Nick Hindley brings 20+ years of hands-on electrical experience to every job.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    images: ["/brand/logo.png"],
    type: "website",
  },
  icons: {
    icon: "/brand/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ground font-sans text-bone antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd />
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
        </Script>
      </body>
    </html>
  );
}
