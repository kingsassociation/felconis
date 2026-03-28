import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Toaster } from "sonner";
import CookieConsent from "./components/CookieConsent";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://felconis.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Felconis | Institutional Digital Engineering",
    template: "%s | Felconis"
  },
  description: "Software company offering custom software development, web applications, SaaS solutions and scalable digital systems for startups and growing business.",
  keywords: ["digital engineering", "software systems", "strategic scaling", "enterprise software", "institutional engineering"],
  authors: [{ name: "Felconis Team" }],
  creator: "Felconis",
  publisher: "Felconis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Felconis",
    title: "Felconis | Institutional Digital Engineering",
    description: "Software company offering custom software development, web applications, SaaS solutions and scalable digital systems for startups and growing business.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Felconis - Institutional Digital Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felconis | Institutional Digital Engineering",
    description: "Software company offering custom software development, web applications, SaaS solutions and scalable digital systems for startups and growing business.",
    images: ["/logo.png"],
    creator: "@felconis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "facebook-domain-verification": "2kby8y0ggs4v7eypy43zte2vnls70w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} antialiased font-sans`}
      >
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        <FacebookPixel />
        <GoogleAnalytics />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
