"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import {
   ArrowRight,
   Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface WorkContentProps {
  initialStudies: any[];
}

const CATEGORIES = ["All", "E-commerce", "SaaS", "Logistics", "Fintech"];

export default function WorkContent({ initialStudies }: WorkContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { content_name: 'Portfolio' });
    }
  }, []);

  const filteredStudies = activeCategory === "All" 
    ? initialStudies 
    : initialStudies.filter(s => s.tag === activeCategory);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-20 border-b border-stroke overflow-hidden">
           <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
           
           <div className="container-max relative z-10 space-y-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md mx-auto">
                   <div className="w-1 h-1 bg-brand rounded-full" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Case Archives</p>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-text-primary">
                  STRATEGIC <br /> <span className="text-brand">RESULTS.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                  A comprehensive record of architectural achievements and successful strategic implementations for global organizations.
                </p>
              </motion.div>
           </div>
        </section>

        {/* FILTER PROTOCOL */}
        <section className="sticky top-[var(--navbar-offset)] z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-4 transition-all duration-300">
           <div className="container-max flex items-center justify-center">
              <div className="flex items-center gap-6">
                 <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                       <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                            activeCategory === cat 
                            ? "bg-brand text-white shadow-lg shadow-brand/10" 
                            : "text-text-muted hover:bg-brand/5 hover:text-brand"
                          }`}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* WORK GRID */}
        <section className="py-32">
           <div className="container-max">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {filteredStudies.map((study, i) => (
                   <motion.div
                     key={study.slug}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     className="group"
                   >
                     <Link href={`/work/${study.slug}`} className="block space-y-8">
                       <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-stroke bg-surface relative group-hover:border-brand/40 transition-all duration-700">
                          <img src={getCloudinaryUrl(study.image)} alt={study.title} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                          <div className="absolute top-8 left-8">
                             <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[8px] font-bold uppercase tracking-[0.2em] text-white">
                               {study.tag}
                             </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                             <div className="flex justify-between items-end">
                                <div>
                                   <p className="text-brand text-[10px] font-black uppercase tracking-widest mb-2">{study.kpi}</p>
                                   <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-[0.9]">{study.stats}</h3>
                                </div>
                                <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white">
                                   <ArrowRight size={20} />
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="space-y-4 px-2">
                          <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-brand transition-colors duration-500 leading-none">
                            {study.title}
                          </h3>
                          <p className="text-[11px] text-text-muted uppercase tracking-widest font-black leading-relaxed">
                            {stripHtml(study.problem).substring(0, 100)}...
                          </p>
                       </div>
                     </Link>
                   </motion.div>
                 ))}
              </div>

              {filteredStudies.length === 0 && (
                <div className="py-20 text-center space-y-6">
                   <Zap size={48} className="mx-auto text-brand opacity-20" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No strategic nodes found in this sector.</p>
                </div>
              )}
           </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 border-t border-stroke">
           <div className="container-max px-10 py-20 bg-brand rounded-[3rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[100px] -mr-40 -mt-40 rounded-full" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                       ARCHITECT <br /> YOUR <br /> IMPACT.
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                       Partner with our engineering board to deploy high-velocity growth infrastructure.
                    </p>
                 </div>
                 <div className="flex justify-start lg:justify-end">
                    <Link href="/contact" className="h-24 px-12 bg-white text-brand rounded-2xl flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-black/20 group/btn">
                       INITIALIZE SYNC
                       <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
