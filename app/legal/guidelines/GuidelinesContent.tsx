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
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Partner Network</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              NETWORK <br /> <span className="text-brand">GUIDELINES.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              The Felconis Partner Network is designed for professionals who prioritize quality and growth. This code of conduct ensures alignment across our global community.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection
              title="1. QUALITY STANDARDS"
              content="Partners are the primary representatives of Felconis. All recommendations and solutions must adhere to our zero-compromise quality standard. Misrepresenting capabilities is considered a breach of trust."
            />
            <LegalSection
              title="2. CLIENT SUCCESS"
              content="Our network is built for delivering value. Partners must prioritize client success and business objectives in every consultation. Success is measured by the improvement in client performance."
            />
            <LegalSection
              title="3. AUTHENTIC ENGAGEMENT"
              content="Marketing and engagement must be authentic. We forbid the use of low-quality tactics or automated signals that degrade trust with our global partners."
            />
            <LegalSection
              title="4. ACCOUNT ACTIVATION"
              content="Active status requires a successful account setup and adherence to continuous professional development as defined by the community."
            />
            <LegalSection
              title="5. CONFIDENTIALITY"
              content="Partners may be granted access to sensitive client information and proprietary Felconis strategies. Absolute confidentiality regarding all project details is a permanent requirement."
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
