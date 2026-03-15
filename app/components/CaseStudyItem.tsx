import { motion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface CaseStudyItemProps {
  title: string;
  category: string;
  stats: { label: string; value: string }[];
  image: string;
  brand: string;
  slug: string;
}

const CaseStudyItem: React.FC<CaseStudyItemProps> = ({ title, category, stats, image, brand, slug }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-[2.5rem] group overflow-hidden transition-all duration-700 hover:glowing-border relative"
    >
      <div className="digital-grid opacity-[0.03]" />

      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-105"
        />

        {/* Scanning Line Animation */}
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="scanning-line z-20 pointer-events-none opacity-40"
        />

        <div className="absolute top-6 left-6 px-4 py-1.5 glass-panel text-brand rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl z-30">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-30" />
      </div>

      <div className="p-10 space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
              <p className="text-[10px] font-black text-brand uppercase tracking-widest">{brand}</p>
            </div>
            <span className="text-[8px] font-mono text-brand/30">PROJECT #202X</span>
          </div>
          <h3 className="text-4xl font-black tracking-tighter uppercase leading-[0.9] group-hover:text-glow transition-all">{title}</h3>
        </div>

        <div className="grid grid-cols-3 gap-6 py-10 border-y border-stroke relative">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <Activity size={10} className="text-brand/50" />
                <p className="text-2xl font-black text-text-primary tracking-tighter">{stat.value}</p>
              </div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/work/${slug}`}
          className="h-16 w-full flex items-center justify-center gap-3 bg-white border border-stroke rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-text-primary hover:border-brand/40 transition-all group/link shadow-sm"
        >
          View Case Study
          <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyItem;
