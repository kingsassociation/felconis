"use client";

import { Handshake } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function GuidelinesContent() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />
      <main className="grain pt-32 pb-20">
        <div className="container-max max-w-4xl space-y-16">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
              <Handshake size={14} className="text-brand" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Protocol</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              PARTNER <br /> <span className="text-brand">GUIDELINES.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              The Felconis Partner Network is architected for professionals who prioritize technical integrity and industrial growth. This code of conduct ensures absolute strategic alignment across our global ecosystem.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection 
                title="1. TECHNICAL INTEGRITY" 
                content="Partners are the primary emissaries of the Felconis technical authority. All strategic recommendations and engineered solutions must adhere to our zero-compromise quality standard. Misrepresenting technical capability is considered a protocol breach."
            />
            <LegalSection 
                title="2. ROI GOVERNANCE" 
                content="The Felconis Partner Network is architected for value extraction. Partners must prioritize client ROI and organizational objective alignment in every consultative diagnostic. Success is measured by the delta in institutional performance."
            />
            <LegalSection 
                title="3. AUDIENCE SIGNAL AUTHENTICITY" 
                content="Engagement with market signals must be authentic and high-authority. We forbid the use of low-intent acquisition tactics or automated engagement signals that degrade the institutional trust of our global partners."
            />
            <LegalSection 
                title="4. REGISTRATION ACTIVATION" 
                content="Active network status requires the successful completion of annual protocol activations (7,000 BDT) and adherence to continuous professional development modules as defined by the steering committee."
            />
            <LegalSection 
                title="5. CONFIDENTIALITY PROTOCOL" 
                content="Partners may be granted access to sensitive client infrastructure and proprietary Felconis growth logic. Absolute confidentiality regarding architectural details and strategic intent is a permanent requirement."
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
