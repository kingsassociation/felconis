import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import CookieConsent from "./components/CookieConsent";
import FacebookPixel from "./components/FacebookPixel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felconis | Institutional Digital Engineering",
  description: "Global digital engineering firm specializing in high-precision software systems and strategic organizational scaling.",
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
        className={`${inter.variable} antialiased`}
      >
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        <FacebookPixel />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
