import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Felconis | Institutional Digital Engineering",
  description: "Global digital engineering firm specializing in high-precision software systems and strategic organizational scaling.",
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
        {children}
      </body>
    </html>
  );
}
