"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CASE_STUDIES_DATA: Record<string, any> = {
  "raafidan": {
    title: "Revenue Scaling for Raafidan",
    client: "Raafidan Enterprise",
    tag: "E-commerce",
    stats: "+220%",
    kpi: "Revenue Acceleration",
    duration: "4 Months",
    problem: "The client was experiencing stagnating revenue growth despite high traffic. Their legacy infrastructure was causing sub-optimal conversion rates and high bounce rates on product pages.",
    strategy: "We deployed a sub-second Next.js commerce architecture integrated with an automated SEO semantic engine. This was coupled with a systematic approach to target high-intent segments.",
    execution: [
      "Modular Frontend Engineering",
      "Headless CMS Integration",
      "Automated SEO Pipelines",
      "Algorithmic Ad Optimization"
    ],
    results: [
      "220% Revenue Increase",
      "45% Decrease in Bounce Rate",
      "3.2x Return on Ad Spend (ROAS)",
      "Top 1% Page Speed Performance"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  "nextzen": {
    title: "SaaS Architecture for NextZen",
    client: "NextZen Systems",
    tag: "SaaS",
    stats: "3.2x",
    kpi: "Retention Efficiency",
    duration: "6 Months",
    problem: "NextZen was struggling with technical debt in their core multi-tenant platform, leading to scalability issues and high churn rates among enterprise clients.",
    strategy: "Our engineering board re-architected the core system nodes using a server-side rendering logic and real-time data sync. We also implemented a custom CRM integration to track user intent signals.",
    execution: [
      "Multi-Tenant Node Architecture",
      "Real-time Data Sync Protocol",
      "Enterprise UI/UX Audit",
      "Strategic Retargeting Loops"
    ],
    results: [
      "3.2x User Retention Lift",
      "99.99% System Uptime",
      "85% Faster Deployment Cycles",
      "12 New Enterprise Contracts"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
  }
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = CASE_STUDIES_DATA[slug as string] || CASE_STUDIES_DATA["raafidan"];

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden border-b border-stroke">
          <div className="absolute inset-0 -z-10">
             <img 
               src={study.image} 
               alt={study.title} 
               className="absolute inset-0 w-full h-full object-cover grayscale opacity-20" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
          
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
              <div className="lg:col-span-8 space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link href="/work" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand hover:opacity-80 pb-1 border-b border-brand transition-opacity">
                    <ArrowLeft size={12} /> Back to Archive
                  </Link>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary"
                >
                  {study.title.split(':').length > 1 ? study.title.split(':')[0] : study.title}
                </motion.h1>
                
                <div className="flex flex-wrap gap-12 pt-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Client</p>
                      <p className="text-xl font-black uppercase tracking-tight text-text-primary">{study.client}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Global Sector</p>
                      <p className="text-xl font-black uppercase tracking-tight text-text-primary">{study.tag}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Audit Duration</p>
                      <p className="text-xl font-black uppercase tracking-tight text-text-primary">{study.duration}</p>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-end">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 bg-white border border-stroke rounded-3xl text-center space-y-4 shadow-lg min-w-[320px]"
                  >
                     <p className="text-6xl md:text-7xl font-black text-brand tracking-tighter">{study.stats}</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{study.kpi}</p>
                  </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CASE CONTENT */}
        <section className="py-20">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              {/* Problem & Strategy */}
              <div className="lg:col-span-8 space-y-32">
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Audit</p>
                       <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">OPERATIONAL <br /> <span className="text-brand">BOTTLENECKS.</span></h2>
                    </div>
                    <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-medium">
                      {study.problem}
                    </p>
                 </div>

                <div className="space-y-10">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Strategic Protocol</p>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">DIAGNOSTIC <br /> <span className="text-brand">EXECUTION.</span></h2>
                   </div>
                   <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-medium">
                     {study.strategy}
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                      {study.execution.map((exc: string) => (
                        <div key={exc} className="flex items-center gap-4 p-5 bg-white border border-stroke rounded-xl shadow-sm">
                           <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                              <Layers size={16} />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{exc}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Verified Results Sidebar */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
                  <div className="p-12 bg-text-primary text-white space-y-10 rounded-2xl shadow-xl shadow-brand/5 border border-white/5 grain relative overflow-hidden">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Impact</p>
                       <h3 className="text-3xl font-black uppercase tracking-tight leading-[0.9]">VERIFIED <br /> <span className="text-brand">DELTA.</span></h3>
                    </div>
                    <div className="space-y-6 pt-6 border-t border-white/10">
                       {study.results.map((res: string) => (
                         <div key={res} className="flex items-start gap-4 group">
                            <CheckCircle2 className="text-brand shrink-0 mt-1" size={16} />
                            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-white/80 group-hover:text-white transition-colors">{res}</p>
                         </div>
                       ))}
                    </div>
                    
                    <Link href="/contact" className="h-14 bg-brand text-white w-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-95 transition-opacity shadow-lg shadow-brand/10">
                       Request Strategic Sync <ArrowRight size={14} className="ml-2" />
                    </Link>
                 </div>

                  <div className="p-10 bg-surface border border-stroke rounded-2xl space-y-8 grain">
                     <div className="space-y-4 pb-6 border-b border-stroke">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand">Growth Board Feedback</p>
                        <h4 className="text-xl font-black uppercase tracking-tight">INSTITUTIONAL <br /> <span className="text-brand">VALIDATION.</span></h4>
                     </div>
                     <p className="text-text-muted text-sm italic font-medium leading-relaxed">
                       "The technical precision and ROI focus Felconis brought to this project redefined our scaling trajectory. Highly recommended for enterprise growth."
                     </p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">— Project Lead, {study.client}</p>
                  </div>
              </aside>
            </div>
          </div>
        </section>

        {/* DATA REPRESENTATION CTA */}
        <section className="py-20 bg-white relative overflow-hidden grain border-t border-stroke">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
           <div className="container-max relative z-10 text-center space-y-16">
              <div className="space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand">Strategic Deployment</p>
                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                    SYSTEM <br /> <span className="text-brand">DEPLOYMENT.</span>
                 </h2>
              </div>
              
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                 Audit your current revenue ecosystems with our strategy architects. Stop guessing. Start engineering.
              </p>
              
              <div className="flex justify-center flex-wrap gap-8 pt-8">
                <Link href="/contact" className="h-20 px-16 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:opacity-95 transition-all shadow-2xl shadow-brand/20 group">
                   Initialize Sync <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/" className="h-20 px-16 bg-white border border-stroke text-text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-4 hover:bg-surface transition-all shadow-sm">
                   Capability Preview <ExternalLink size={18} />
                </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
