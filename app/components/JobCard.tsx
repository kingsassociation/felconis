import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface JobCardProps {
  title: string;
  location: string;
  type: string;
  slug: string;
  department: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, type, slug, department }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="p-10 bg-white border border-stroke rounded-2xl group hover:border-brand/40 transition-all duration-500 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-6 flex-grow max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-brand text-white text-[9px] font-black uppercase tracking-widest rounded-md">
              {department === "Systems" ? "Engineering" : department === "Marketing" ? "Growth" : department}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Open Position</p>
          </div>

          <h3 className="text-3xl font-black tracking-tight uppercase leading-[0.9] group-hover:text-brand transition-colors">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold text-text-muted uppercase tracking-widest">
            <div className="flex items-center gap-2.5 hover:text-brand transition-colors cursor-default">
              <MapPin size={14} className="text-brand/40" />
              {location}
            </div>
            <div className="flex items-center gap-2.5 hover:text-brand transition-colors cursor-default">
              <Briefcase size={14} className="text-brand/40" />
              {type}
            </div>
            <div className="flex items-center gap-2.5 hover:text-brand transition-colors cursor-default">
              <TrendingUp size={14} className="text-brand/40" />
              Growth Potential
            </div>
          </div>
        </div>

        <Link
          href={`/careers/${slug}`}
          className="h-14 px-10 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10 whitespace-nowrap min-w-[200px]"
        >
          Apply Now <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
