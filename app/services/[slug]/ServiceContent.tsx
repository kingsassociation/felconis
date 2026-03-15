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
    <div className="min-h-screen bg-white text-text-primary selection:bg-brand selection:text-white">
      <Navbar />

      <main className="grain pt-16">
        {/* PREMIUM INSTITUTIONAL HERO */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-stroke bg-surface/30">
          <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-brand/[0.05] via-brand/[0.01] to-transparent pointer-events-none -z-10" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/[0.03] rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/[0.02] rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 -z-10" />

          <div className="container-max relative z-10">
            <div className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-stroke rounded-full shadow-sm"
              >
                <Link href="/services" className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-brand transition-colors">Capabilities</Link>
                <div className="w-[1px] h-3 bg-stroke" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand">{service.title}</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase text-text-primary"
                >
                  {service.title.split(' ')[0]} <br />
                  <span className="text-brand inline-block relative">
                    {service.title.split(' ').slice(1).join(' ')}.
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute -bottom-2 left-0 right-0 h-1.5 bg-brand/10 origin-left"
                    />
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-3xl"
              >
                {service.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* CONTENT ARCHITECTURE */}
        <section className="py-24">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              {/* Strategic Narrative */}
              <div className="lg:col-span-8 space-y-32">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Institutional Logic</p>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">CAPABILITY <br /> <span className="text-brand">DIAGNOSTIC.</span></h2>
                  </div>
                  <p className="text-text-secondary text-xl md:text-2xl leading-relaxed font-medium max-w-3xl">
                    {service.description}
                  </p>
                </div>

                {/* Detailed Sub-services with IDs */}
                <div className="space-y-24">
                  {service.highlights.map((h: any, i: number) => {
                    const sectionId = h.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]/g, '');
                    return (
                      <div key={h.title} id={sectionId} className="group scroll-mt-32">
                        <div className="p-10 md:p-12 bg-surface border border-stroke rounded-3xl space-y-8 hover:border-brand/40 transition-all duration-500 hover:shadow-2xl hover:shadow-brand/[0.02]">
                          <div className="flex items-start justify-between">
                            <div className="w-16 h-1 bg-brand/20 rounded-full" />
                            <span className="text-4xl font-black text-brand/10 group-hover:text-brand/20 transition-colors">0{i + 1}</span>
                          </div>
                          <div className="space-y-6">
                            <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none group-hover:text-brand transition-colors">{h.title}</h4>
                            <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed border-l-2 border-brand/10 pl-8 ml-1">
                              {h.desc}
                            </p>
                          </div>
                          <div className="pt-8 flex flex-wrap gap-3">
                            {service.features.slice(i * 3, (i + 1) * 3).map((feat: string) => (
                              <span key={feat} className="px-4 py-2 bg-white border border-stroke rounded-full text-[9px] font-black uppercase tracking-widest text-text-muted">
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-12 pt-24 border-t border-stroke">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Technical Protocol</p>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">TECHNICAL <br /> <span className="text-brand">SPECIFICATIONS.</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((f: string) => (
                      <div key={f} className="flex items-center gap-5 p-6 bg-white border border-stroke rounded-2xl shadow-sm hover:border-brand/20 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-primary">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deployment Hub (Sidebar) */}
              <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-10 pt-10 lg:pt-0">
                <div id="cta-card" className="p-12 bg-brand rounded-3xl text-white space-y-10 shadow-2xl shadow-brand/20 relative overflow-hidden">
                  <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Zap size={32} fill="white" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85]">SYSTEM <br /> DEPLOYMENT.</h3>
                      <p className="text-white/70 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                        Ready to architect your institutional scaling protocol? Initiate a technical diagnostic sync today.
                      </p>
                    </div>
                    <Link href="/contact" className="h-16 bg-white text-brand hover:scale-[0.98] w-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl">
                      Initialize Deployment <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </div>
                  <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-white/[0.07] rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-60 h-60 bg-white/[0.05] rounded-full blur-2xl" />
                </div>

                <div className="p-10 md:p-12 bg-surface border border-stroke rounded-3xl space-y-10">
                  <div className="space-y-4 border-b border-stroke pb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Capability Archive</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Explore other institutional engineering practices.</p>
                  </div>
                  <nav className="space-y-8">
                    {Object.entries(servicesData)
                      .filter(([k]) => k !== slug)
                      .map(([k, s]) => (
                        <Link key={k} href={`/services/${k}`} className="flex items-center justify-between group">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-brand transition-colors block leading-none">{s.category}</span>
                            <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-brand transition-colors block">{s.title}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:border-brand group-hover:bg-brand group-hover:text-white transition-all">
                            <ArrowRight size={12} />
                          </div>
                        </Link>
                      ))}
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* STRATEGIC SYNC (FINAL CTA) */}
        <section className="py-32 bg-surface/30 relative overflow-hidden border-t border-stroke text-center">
          <div className="absolute inset-x-0 bottom-0 h-[800px] bg-gradient-to-t from-brand/[0.05] via-transparent to-transparent pointer-events-none -z-10" />

          <div className="container-max relative z-10 space-y-16">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stroke rounded-full mb-4"
              >
                <div className="w-1 h-1 bg-brand rounded-full animate-pulse" />
                <p className="text-[9px] font-black uppercase tracking-widest text-brand">Institutional Activation</p>
              </motion.div>
              <h2 className="text-7xl md:text-9xl font-black tracking-tight uppercase leading-[0.8]">
                GLOBAL <br /> <span className="text-brand">SYNC.</span>
              </h2>
            </div>

            <p className="text-text-secondary max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
              Work with our technical leads to audit your current architecture and build a scalable revenue ecosystem with precision engineering.
            </p>

            <div className="flex justify-center pt-8">
              <Link href="/contact" className="h-16 px-16 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand/90 hover:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-brand/20 group">
                Initialize Technical Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
