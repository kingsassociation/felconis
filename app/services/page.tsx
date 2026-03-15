"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  ShieldCheck,
  Search,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  useEffect(() => {
    // Track Meta Pixel ViewContent only if consent is allowed
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { content_name: 'Services' });
    }

    // Handle initial hash on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Clean the URL
          window.history.replaceState(null, "", window.location.pathname);
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-4 md:pt-8">
        {/* 1. INSTITUTIONAL HERO */}
        <section className="relative py-4 md:py-8 md:pb-20 overflow-hidden border-b border-stroke">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />

          <div className="container-max relative z-10 text-center space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                <div className="w-1 h-1 bg-brand rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Capabilities</p>
              </div>

              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                TECHNICAL <br /> <span className="text-brand">AUTHORITY.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
                We design and deploy integrated digital systems that provide sector dominance and scalable infrastructure for global category leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE CAPABILITIES */}
        <section className="pb-20">
          <div className="container-max space-y-24">

            {/* CORE ENGINEERING SECTION */}
            <div id="engineering" className="pt-20 space-y-16 scroll-mt-32">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Code2 className="text-brand" size={24} />
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-text-primary">CORE <br /> <span className="text-brand">ENGINEERING.</span></h2>
                </div>
                <p className="text-text-secondary text-base md:text-lg font-medium max-w-3xl leading-relaxed">
                  High-performance infrastructure and backend systems architected for global scale. We build the technical foundation for robust, mission-critical applications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailBlock
                  slug="engineering"
                  title="Cloud Architecture"
                  desc="Designing scalable, secure, and resilient cloud infrastructure. We implement multi-region deployments and automated scaling protocols for absolute availability."
                  bullets={["Distributed Systems Logic", "Serverless & Edge Compute", "Infrastructure as Code", "High-Availability Clusters"]}
                />
                <DetailBlock
                  slug="engineering"
                  title="Enterprise Backend"
                  desc="Robust server-side logic engineered for high-throughput environments. We focus on data integrity, sub-second latency, and industrial-grade security."
                  bullets={["Microservices Orchestration", "Real-time Data Streams", "Advanced Encryption Layers", "Legacy Core Migration"]}
                />
                <DetailBlock
                  slug="engineering"
                  title="API Ecosystems"
                  desc="Building high-performance API layers that serve as the connective tissue for modern digital platforms. Optimized for developer experience and technical velocity."
                  bullets={["REST & GraphQL Protocols", "Gateway & Auth Engineering", "System Integration Sync", "Documentation-First Flow"]}
                />
                <DetailBlock
                  slug="engineering"
                  title="Database Engineering"
                  desc="Complex data modeling and optimization for relational and non-relational environments. We ensure your data layer scales linearly with your organizational growth."
                  bullets={["Performance Query Logic", "Sharding & Replication", "ETL & Pipeline Sync", "Data Governance Protocol"]}
                />
              </div>
            </div>

            {/* PRODUCT DEVELOPMENT SECTION */}
            <div id="product" className="space-y-16 scroll-mt-32">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Layers className="text-brand" size={24} />
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-text-primary">PRODUCT <br /> <span className="text-brand">DEVELOPMENT.</span></h2>
                </div>
                <p className="text-text-secondary text-base md:text-lg font-medium max-w-3xl leading-relaxed">
                  End-to-end digital product engineering focused on user experience and technical excellence. We transform strategic roadmaps into high-performance software platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailBlock
                  slug="product"
                  title="SaaS Engineering"
                  desc="Building multi-tenant platforms architected for scalability and maintainability. We deliver robust software-as-a-service solutions for global markets."
                  bullets={["Multi-Tenant Logic", "Subscription & Billing Kernels", "Feature Flagging Systems", "Scalable Growth Layers"]}
                />
                <DetailBlock
                  slug="product"
                  title="Web Applications"
                  desc="Next-generation frontend engineering using modern frameworks. We build responsive, high-fidelity experiences that command technical authority."
                  bullets={["Next.js/React Expertise", "State Management Logic", "Hydration Optimization", "Global CDN Deployment"]}
                />
                <DetailBlock
                  slug="product"
                  title="Technical UX/UI"
                  desc="Visual logic architected for conversion and clarity. We build scalable design systems that eliminate user friction and elevate brand trust."
                  bullets={["Atomic Design Infrastructure", "Interactive Prototype Logic", "Accessibility Compliance", "Metric-Driven Design"]}
                />
                <DetailBlock
                  slug="product"
                  title="Custom Systems"
                  desc="Bespoke software solutions tailored to unique institutional requirements. We solve complex operational challenges with precision engineering."
                  bullets={["Operations Automation", "Internal Tooling Logic", "Custom ERP Components", "Proprietary Core Protocol"]}
                />
              </div>
            </div>

            {/* EXPERIENCE & QUALITY SECTION */}
            <div id="assurance" className="space-y-16 scroll-mt-32">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="text-brand" size={24} />
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-text-primary">EXPERIENCE & <br /> <span className="text-brand">QUALITY.</span></h2>
                </div>
                <p className="text-text-secondary text-base md:text-lg font-medium max-w-3xl leading-relaxed">
                  Ensuring the stability, security, and performance of your digital ecosystem. We implement rigorous assurance protocols to maintain technical dominance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailBlock
                  slug="assurance"
                  title="QA Automation"
                  desc="Industrial-grade testing infrastructure integrated into your CI/CD pipeline. We ensure every release meets absolute quality and performance standards."
                  bullets={["End-to-End Automation", "Visual Regression Logic", "Unit & Integration Audits", "Continuous Testing Ops"]}
                />
                <DetailBlock
                  slug="assurance"
                  title="Security Audits"
                  desc="In-depth vulnerability assessments and compliance reviews. We protect your institutional assets through encryption-first security protocols."
                  bullets={["Penetration Lab Audits", "SOC2/Compliance Logic", "Threat Modeling", "Zero-Trust Architecture"]}
                />
                <DetailBlock
                  slug="assurance"
                  title="Performance Ops"
                  desc="Continuous monitoring and optimization for sub-second platform velocity. We identify and eliminate bottlenecks across your entire technical stack."
                  bullets={["Sub-2ms Latency Goals", "Global Load Balancing", "Memory Usage Audits", "Core Web Vital Dominance"]}
                />
              </div>
            </div>

          </div>
        </section>

        {/* 3. UNIFIED LOGIC */}
        <section className="py-20 bg-surface/30 border-y border-stroke">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Protocol</p>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
                    SOLVING <br /> <span className="text-brand">AT SCALE.</span>
                  </h2>
                  <p className="text-text-secondary text-base md:text-lg font-medium max-w-xl leading-relaxed">
                    We implement unified digital protocols that ensure technical authority and measurable organizational growth.
                  </p>

                  <div className="space-y-8 pt-10 border-t border-stroke">
                    <StackItem title="Strategic Diagnostic" desc="In-depth technical and market audit to identify operational and structural bottlenecks." />
                    <StackItem title="Architectural Deployment" desc="Building high-performance systems and growth layers for absolute operational synergy." />
                    <StackItem title="Institutional Governance" desc="Rigorous iterative optimization against real-time performance and revenue data." />
                  </div>
                </div>
              </div>

              <div className="relative group p-4">
                <div className="aspect-square bg-white border border-stroke rounded-3xl p-10 flex items-center justify-center relative shadow-lg overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-brand/10" />
                  <div className="grid grid-cols-2 gap-6 relative z-10 w-full h-full">
                    <TechNode icon={Globe} label="Global Protocol" />
                    <TechNode icon={Search} label="Search Authority" />
                    <TechNode icon={Layers} label="Logic Layer" />
                    <TechNode icon={TrendingUp} label="Value Core" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand/[0.02] -z-10" />
          <div className="container-max text-center relative z-10 space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Strategic Consultation</p>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                REQUEST <br /> <span className="text-brand">METHODOLOGY.</span>
              </h2>
            </div>

            <p className="text-text-secondary max-w-xl mx-auto text-base md:text-xl font-medium leading-relaxed">
              Initiate a strategic diagnostic call with our engineers to plan your organization's technical trajectory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact" className="btn-primary h-14 px-10 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl">
                Request Strategy Consultation <ArrowRight size={14} className="ml-2" />
              </Link>
              <Link href="/work" className="btn-outline h-14 px-10 text-[10px] font-black uppercase tracking-widest border border-stroke rounded-xl bg-white">
                Case Archives
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ARCHITECTURAL HELPER COMPONENTS */

function DetailBlock({ title, desc, bullets, slug }: any) {
  return (
    <div className="p-8 bg-surface border border-stroke rounded-2xl group space-y-8 hover:border-brand/40 transition-colors">
      <div className="space-y-3">
        <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{title}</h3>
        <p className="text-text-muted text-sm font-medium leading-relaxed">{desc}</p>
      </div>
      <ul className="space-y-3 pt-6 border-t border-stroke">
        {bullets.map((b: string) => (
          <li key={b} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-text-muted">
            <CheckCircle2 size={12} className="text-brand shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${slug}`}
        onClick={() => {
          if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
            window.fbq('track', 'ViewContent', {
              content_name: title,
              content_category: 'Capabilities'
            });
          }
        }}
        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand group/link pt-2 hover:translate-x-1 transition-transform"
      >
        Capability Details <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function StackItem({ title, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-10 h-10 shrink-0 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand">
        <ShieldCheck size={20} />
      </div>
      <div>
        <h4 className="text-sm font-black mb-1 uppercase tracking-widest text-text-primary leading-none">{title}</h4>
        <p className="text-text-muted text-[11px] font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TechNode({ icon: Icon, label }: any) {
  return (
    <div className="bg-white border border-stroke rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-brand/40 transition-colors shadow-sm p-6 cursor-default">
      <Icon size={24} className="text-brand/40" />
      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted text-center leading-tight">{label}</span>
    </div>
  );
}
