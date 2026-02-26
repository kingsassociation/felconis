"use client";

import { Gavel } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />
      <main className="grain pt-32 pb-20">
        <div className="container-max max-w-4xl space-y-16">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
              <Gavel size={14} className="text-brand" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Operational Standards</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              TERMS OF <br /> <span className="text-brand">USE.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              By accessing the Felconis ecosystem, you agree to comply with our institutional operating procedures and technical standards.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection 
                title="1. INTELLECTUAL GOVERNANCE" 
                content="All architectural layouts, system logic, custom engineering protocols, and visual signals displayed on this platform are the exclusive intellectual property of Felconis. Unauthorized replication, extraction, or industrial utilization of these assets is strictly prohibited."
            />
            <LegalSection 
                title="2. INSTITUTIONAL ACCESS" 
                content="Access to the Felconis ecosystem is granted on a strategic basis. We reserve the right to restrict access to our high-authority consultative archives and engineering diagnostics to protect our institutional assets and client secrets."
            />
            <LegalSection 
                title="3. SYSTEM INTEGRITY & PROTOCOL USE" 
                content="Users agree to interact with our systems in a manner that preserves technical stability. Any attempt to reverse-engineer our proprietary growth logic or compromise the integrity of our digital infrastructure will result in automatic protocol suspension."
            />
            <LegalSection 
                title="4. LIABILITY & SERVICE MARGINS" 
                content="While Felconis engineers for sub-second precision and absolute technical authority, our liability is limited to the defined scope of individual strategic engagements. We are not responsible for architectural failures initiated by third-party platform updates or external interventions."
            />
            <LegalSection 
                title="5. GOVERNANCE CHANGES" 
                content="Felconis reserves the right to update these terms to align with emerging technical requirements and industrial standards. Continuous use of our platform constitutes acceptance of current governing protocols."
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
