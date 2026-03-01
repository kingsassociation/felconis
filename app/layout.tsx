import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Toaster } from "sonner";
import CookieConsent from "./components/CookieConsent";
import FacebookPixel from "./components/FacebookPixel";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
        className={`${publicSans.variable} antialiased font-sans`}
      >
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        <FacebookPixel />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
