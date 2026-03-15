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
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Terms & Conditions</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
              TERMS OF <br /> <span className="text-brand">USE.</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium leading-relaxed border-l-2 border-brand/20 pl-6">
              By using Felconis, you agree to comply with our terms and conditions and professional standards.
            </p>
          </section>

          <div className="space-y-12 text-text-muted font-medium leading-relaxed">
            <LegalSection
              title="1. INTELLECTUAL PROPERTY"
              content="All designs, code, logos, and content on this platform are the exclusive property of Felconis. Unauthorized reproduction or use of these materials is strictly prohibited."
            />
            <LegalSection
              title="2. SERVICE ACCESS"
              content="Access to Felconis services is provided based on individual business needs. We reserve the right to limit access to certain features or information to protect our business and our clients."
            />
            <LegalSection
              title="3. SYSTEM USE"
              content="Users agree to use our systems in a way that does not interfere with their stability or security. Any attempt to exploit or damage our digital infrastructure is strictly forbidden."
            />
            <LegalSection
              title="4. LIMITATION OF LIABILITY"
              content="Felconis strives for high technical standards and reliability. However, our liability is limited to the scope of our specific service agreements. We are not responsible for issues caused by third-party platforms or external factors."
            />
            <LegalSection
              title="5. CHANGES TO TERMS"
              content="We reserve the right to update these terms to reflect changes in our services or industry standards. Continued use of our platform means you accept any updated terms."
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
