"use client";

import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Search,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface CareersContentProps {
  initialJobs: any[];
}

export default function CareersContent({ initialJobs }: CareersContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { content_name: 'Careers' });
    }
  }, []);

  useEffect(() => {
    if (!searchQuery) return;
    const timeoutId = setTimeout(() => {
      if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
        window.fbq('track', 'Search', { search_string: searchQuery });
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const filteredJobs = initialJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-4 md:pt-8">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-4 md:py-8 md:pb-20 overflow-hidden border-b border-stroke text-center">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />

          <div className="container-max relative z-10 space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                <div className="w-1 h-1 bg-brand rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Growth</p>
              </div>

              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                TALENT <br /> <span className="text-brand">ACQUISITION.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
                Join our architectural board. We are looking for exceptional talent to lead high-precision engineering and strategic growth initiatives for global organizations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEARCH PROTOCOL */}
        <section className="sticky top-[var(--navbar-offset)] z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-6 transition-all duration-300">
          <div className="container-max">
            <div className="max-w-2xl mx-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={20} />
              <input
                type="text"
                placeholder="SEARCH POSITIONS (E.G. ENGINEERING, MARKETING)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-surface border border-stroke rounded-2xl pl-16 pr-8 text-[10px] font-black uppercase tracking-widest focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* JOB BOARD */}
        <section className="py-32">
          <div className="container-max">
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/careers/${job.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between p-10 bg-white border border-stroke rounded-[2rem] hover:border-brand transition-all duration-500 hover:shadow-xl hover:shadow-brand/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand/[0.02] -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-700" />

                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-md text-[8px] font-bold uppercase tracking-widest text-brand">{job.department}</span>
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <MapPin size={12} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{job.location}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-text-primary group-hover:text-brand transition-colors leading-none">{job.title}</h3>
                      <p className="text-[11px] font-black uppercase tracking-widest text-text-muted leading-relaxed max-w-xl">
                        {job.overview || stripHtml(job.description).substring(0, 100)}...
                      </p>
                    </div>

                    <div className="mt-8 md:mt-0 flex items-center gap-8 relative z-10">
                      <div className="hidden lg:block text-right">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-1">RECOMPENSE</p>
                        <p className="text-sm font-black uppercase tracking-tight">{job.salary}</p>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-surface border border-stroke flex items-center justify-center text-text-muted group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-500">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="py-20 text-center space-y-6">
                <Briefcase size={48} className="mx-auto text-brand opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No talent nodes found for this search.</p>
              </div>
            )}
          </div>
        </section>

        {/* CULTURAL NODE */}
        <section className="py-32 border-t border-stroke bg-surface grain">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Culture</p>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                    THE <br /> ENGINEERING <br /> <span className="text-brand">MINDSET.</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Radical Transparency", desc: "No black boxes. Everything is calculated and measured." },
                    { title: "Sub-Second Velocity", desc: "Speed is a feature. We build for performance first." },
                    { title: "Sovereign Growth", desc: "Building assets that our partners own and control." },
                    { title: "Atomic Precision", desc: "Every detail matters and serves a strategic purpose." }
                  ].map((value, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-primary">{value.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-relaxed">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl md:rounded-[3rem] overflow-hidden border border-stroke shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1522071823991-b9671f30c46f?auto=format&fit=crop&q=80&w=2070" alt="Culture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand/5 mix-blend-overlay" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 p-6 md:p-10 bg-white border border-stroke rounded-xl md:rounded-[2rem] shadow-xl space-y-3 md:space-y-4"
                >
                  <Zap size={24} className="text-brand md:w-8 md:h-8" />
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary leading-none">HIGH <br /> PERFORMANCE.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
