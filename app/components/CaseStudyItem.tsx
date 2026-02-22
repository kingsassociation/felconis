import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import MetricNode from "./MetricNode";

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
      className="bg-white border border-stroke rounded-2xl group overflow-hidden transition-all duration-700 shadow-sm hover:border-brand/40"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
        />
        <div className="absolute top-6 left-6 px-3 py-1 bg-brand text-white rounded-md text-[9px] font-black uppercase tracking-widest shadow-lg">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-40" />
      </div>
      
      <div className="p-12 space-y-10">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-brand uppercase tracking-widest">{brand}</p>
          <h3 className="text-3xl font-black tracking-tight uppercase leading-[0.9] group-hover:text-brand transition-colors">{title}</h3>
        </div>

        <div className="grid grid-cols-3 gap-8 py-8 border-y border-stroke">
          {stats.map((stat, index) => (
            <MetricNode key={index} label={stat.label} value={stat.value} />
          ))}
        </div>

        <Link 
          href={`/work/${slug}`} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand transition-colors group/link"
        >
          Access Case Archive 
          <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudyItem;
