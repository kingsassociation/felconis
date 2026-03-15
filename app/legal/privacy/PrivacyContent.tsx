"use client";

import { ShieldCheck } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function PrivacyContent() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />
      <main className="grain pt-32 pb-20">
        <div className="container-max max-w-4xl space-y-16">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
              <ShieldCheck size={14} className="text-brand" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Security & Privacy</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              PRIVACY <br /> <span className="text-brand">POLICY.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              At Felconis, we take your privacy seriously. This document explains how we collect, use, and protect your personal and business data.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection
              title="1. DATA COLLECTION"
              content="We collect only the information necessary to provide our services and improve your experience. This includes basic contact details provided through our website forms and technical data such as IP addresses for security purposes."
            />
            <LegalSection
              title="2. TRACKING & COOKIES (Meta Pixel)"
              content="We use tools like the Meta Pixel to understand our audience and provide relevant information. Tracking is only enabled if you provide consent via our cookie banner. We do not use automated tracking for sensitive user actions."
            />
            <LegalSection
              title="3. ADVERTISING & MARKETING"
              content="We use data to improve our services and reach businesses that can benefit from our solutions. We never sell your personal or business information to third-party brokers."
            />
            <LegalSection
              title="4. DATA SECURITY"
              content="All data is processed using industry-standard encryption and stored in secure environments. We prioritize the security of your information to maintain a high level of trust."
            />
            <LegalSection
              title="5. YOUR RIGHTS"
              content="You have full control over your personal data. You can request to view, edit, or delete your information at any time by contacting us directly."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LegalSection({ title, content }: { title: string, content: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary">{title}</h3>
      <p className="text-base text-text-muted leading-relaxed">{content}</p>
    </div>
  );
}
