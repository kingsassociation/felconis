"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface ServiceContentProps {
  slug: string;
  service: any;
  servicesData: Record<string, any>;
}

export default function ServiceContent({ slug, service, servicesData }: ServiceContentProps) {
  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { 
        content_name: service.title,
        content_category: 'Service Detail',
        content_ids: [slug]
      });
    }
  }, [slug, service.title]);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-20 overflow-hidden border-b border-stroke">
          {/* Subtle Institutional Background */}
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          
          <div className="container-max relative z-10">
            <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md"
              >
                <Link href="/services" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand">Services</Link>
                <ChevronRight size={12} className="text-text-muted" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand">{service.title}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary"
              >
                {service.title.split(' ')[0]} <br /> <span className="text-brand">{service.title.split(' ')[1]}.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
              >
                {service.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* CONTENT ARCHITECTURE */}
        <section className="py-20">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              {/* Strategic Narrative */}
              <div className="lg:col-span-8 space-y-24">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Narrative</p>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">CAPABILITY <br /> <span className="text-brand">DIAGNOSTIC.</span></h2>
                   </div>
                   <p className="text-text-secondary text-lg md:text-xl leading-relaxed font-medium">
                     {service.description}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.highlights.map((h: any, i: number) => (
                    <div key={h.title} className="p-8 bg-surface border border-stroke rounded-2xl group space-y-4 hover:border-brand/40 transition-colors">
                       <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-brand transition-colors">{h.title}</h4>
                       <p className="text-text-muted text-sm font-medium leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-12 pt-16 border-t border-stroke">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Technical Protocol</p>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">TECHNICAL <br /> <span className="text-brand">SPECIFICATIONS.</span></h2>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((f: string) => (
                        <div key={f} className="flex items-center gap-4 p-5 bg-white border border-stroke rounded-xl shadow-sm">
                           <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                              <CheckCircle2 size={16} />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{f}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Deployment Hub (Sidebar) */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                <div className="p-10 bg-brand rounded-2xl text-white space-y-8 shadow-xl shadow-brand/10 relative overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <Zap size={32} fill="white" className="mb-2" />
                      <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.9]">SYSTEM <br /> DEPLOYMENT.</h3>
                      <p className="text-white/80 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                        Ready to architect your scaling protocol? Start a technical sync today.
                      </p>
                      <Link href="/contact" className="h-14 bg-white text-brand hover:opacity-95 w-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg">
                         Initialize Deployment <ArrowRight size={14} className="ml-2" />
                      </Link>
                   </div>
                   <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="p-10 bg-surface border border-stroke rounded-2xl space-y-8">
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand border-b border-stroke pb-4">Capability Archive</p>
                   <nav className="space-y-6">
                      {Object.entries(servicesData)
                        .filter(([k]) => k !== slug)
                        .map(([k, s]) => (
                        <Link key={k} href={`/services/${k}`} className="flex items-center justify-between group">
                           <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-brand transition-colors">{s.title}</span>
                           <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                   </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* STRATEGIC SYNC (FINAL CTA) */}
        <section className="py-20 bg-white relative overflow-hidden border-t border-stroke text-center">
          <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          
          <div className="container-max relative z-10 space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Activation</p>
               <h2 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">
                  GLOBAL <br /> <span className="text-brand">SYNC.</span>
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Work with our technical leads to audit your current architecture and build a scalable revenue ecosystem.
            </p>
            
            <div className="flex justify-center pt-4">
              <Link href="/contact" className="h-14 px-12 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10">
                Initialize Consultation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
