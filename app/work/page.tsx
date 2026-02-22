"use client";

import { motion } from "framer-motion";
import {
   ArrowRight,
   Globe,
   Layers,
   TrendingUp,
   Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CASE_STUDIES = [
  {
    title: "Revenue Scaling for Raafidan",
    stats: "+220%",
    kpi: "Revenue Acceleration",
    tag: "E-commerce",
    slug: "raafidan",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    desc: "Architecting a high-performance commerce engine focused on sub-second conversion and automated SEO scaling."
  },
  {
    title: "SaaS Architecture for NextZen",
    stats: "3.2x",
    kpi: "Retention Efficiency",
    tag: "SaaS",
    slug: "nextzen",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070",
    desc: "Re-engineering core system nodes for enterprise multi-tenancy and real-time data synchronization."
  },
  {
    title: "Global Supply Sync",
    stats: "40%",
    kpi: "Opex Reduction",
    tag: "Logistics",
    slug: "supply-sync",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
    desc: "Synchronizing global logistics nodes with a data-sovereign management layer."
  }
];

const CATEGORIES = ["All", "E-commerce", "SaaS", "Logistics", "Fintech"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStudies = activeCategory === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.tag === activeCategory);

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
        <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-4">
           <div className="container-max flex items-center justify-center">
              <div className="flex items-center gap-6">
                 <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                       <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                             activeCategory === cat 
                             ? "bg-brand text-white shadow-md shadow-brand/10" 
                             : "bg-surface border border-stroke text-text-muted hover:border-brand/40"
                          }`}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* CASE ARCHIVES GRID */}
        <section className="py-20">
           <div className="container-max">
              <div className="grid grid-cols-1 gap-24">
                 {filteredStudies.map((study, i) => (
                    <motion.div 
                       key={study.slug}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                       className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group"
                    >
                       <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-stroke shadow-lg bg-surface">
                          <img 
                             src={study.image} 
                             alt={study.title} 
                             className="w-full aspect-[16/9] object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute bottom-8 left-8 p-6 bg-white border border-stroke rounded-2xl shadow-premium">
                             <p className="text-4xl font-black tracking-tighter text-brand leading-none">{study.stats}</p>
                             <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted mt-1">{study.kpi}</p>
                          </div>
                       </div>
                       
                       <div className="lg:col-span-5 space-y-8">
                          <div className="space-y-4">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md text-[9px] font-black uppercase tracking-widest text-brand">
                                {study.tag}
                             </div>
                             <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] group-hover:text-brand transition-colors">
                                {study.title}
                             </h3>
                             <p className="text-text-muted text-base font-medium leading-relaxed max-w-md">
                                {study.desc}
                             </p>
                          </div>
                          
                          <Link href={`/work/${study.slug}`} className="btn-primary h-14 inline-flex items-center px-10 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl">
                             Access Protocol <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* INSTITUTIONAL METRICS */}
        <section className="py-20 bg-surface/30 border-y border-stroke">
           <div className="container-max grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Systems Built", val: "180+", icon: Layers },
                { label: "Revenue Delta", val: "14M+", icon: TrendingUp },
                { label: "Indexing Rank", val: "TOP 1%", icon: Zap },
                { label: "Active Nodes", val: "12", icon: Globe }
              ].map(stat => (
                <div key={stat.label} className="text-center md:text-left space-y-2">
                   <div className="flex items-center gap-3 justify-center md:justify-start">
                      <stat.icon className="text-brand" size={16} />
                      <span className="text-3xl font-black tracking-tighter text-text-primary">{stat.val}</span>
                   </div>
                   <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FINAL GATEWAY */}
        <section className="py-20 bg-white text-center space-y-12">
           <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Consultation Protocol</p>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">START <br /> <span className="text-brand">STRATEGIC</span> <br /> CONSULTATION.</h2>
           </div>
           <Link href="/contact" className="btn-primary group h-14 px-12 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl">
              Initialize Consultation <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
           </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
