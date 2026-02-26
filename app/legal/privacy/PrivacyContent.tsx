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
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Protocol</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              PRIVACY <br /> <span className="text-brand">POLICY.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              At Felconis, data sovereignty and technical transparency are fundamental operational requirements. This document outlines our commitment to protecting organizational and individual intelligence.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection 
                title="1. DATA COLLECTION & STRATEGIC INTENT" 
                content="Felconis collects minimal data required for technical performance and strategic engagement. This includes infrastructure telemetry, conversion signals, and high-intent contact information provided through our institutional gateways. Our intent is purely operational optimization."
            />
            <LegalSection 
                title="2. TRACKING PROTOCOLS (Meta Pixel)" 
                content="We utilize the Meta Pixel to synchronize our digital resonance with high-authority audience segments. Tracking is executed only upon explicit protocol activation (Cookie Consent). We do not utilize automatic configuration for standard events; all tracking is manually architected for precision."
            />
            <LegalSection 
                title="3. ADVERTISING & CONVERSION SIGNALS" 
                content="Conversion data is used to optimize our market positioning and ensure that our technical authority reaches the appropriate organizational leadership. We do not sell user profiles or organizational intelligence to third-party brokers."
            />
            <LegalSection 
                title="4. INFRASTRUCTURE SECURITY" 
                content="All data is processed through industry-standard encryption protocols and stored in data-sovereign environments. We prioritize system integrity as a fundamental requirement for institutional trust."
            />
            <LegalSection 
                title="5. GOVERNANCE & COMPLIANCE" 
                content="Users maintain absolute authority over their digital identity. You may request an audit of your data or immediate removal from our active tracking cycles by contacting our strategic operations board."
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
