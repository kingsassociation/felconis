"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    image?: string | null;
    category: { name: string };
    date: string;
    excerpt?: string;
  };
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-stroke bg-surface-dark group-hover:border-brand/40 transition-all duration-700 shadow-2xl group-hover:shadow-brand/5">
          {/* Digital Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          {/* Scanning Line Effect */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <motion.div 
              animate={{ 
                top: ["-10%", "110%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent shadow-[0_0_15px_rgba(var(--brand-rgb),0.5)]"
            />
          </div>

          {/* Background Image */}
          <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out">
            {post.image ? (
              <img 
                src={getCloudinaryUrl(post.image)} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" 
              />
            ) : (
              <div className="w-full h-full bg-surface-dark flex items-center justify-center text-brand/20">
                <ArrowRight size={64} className="group-hover:translate-x-4 transition-transform duration-700" />
              </div>
            )}
          </div>

          {/* Glass Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent opacity-90" />
          
          {/* Content Over Image (Bottom) */}
          <div className="absolute bottom-10 left-10 right-10 z-30">
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-black uppercase tracking-widest text-brand backdrop-blur-md">
                   {post.category.name}
                </span>
             </div>
             <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-[0.9] group-hover:text-brand transition-colors duration-500">
                {post.title}
             </h3>
          </div>
        </div>

        {/* Info Area below image for more detail */}
        <div className="mt-8 space-y-4 px-4">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
            <Calendar size={12} className="text-brand" />
            <span>{post.date}</span>
            <span className="text-stroke">/</span>
            <span className="text-brand opacity-60">Intelligence Source</span>
          </div>
          <p className="text-[13px] font-medium leading-relaxed text-text-muted/80 line-clamp-3 group-hover:text-text-primary transition-colors duration-500">
            {post.excerpt}
          </p>
          <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700">
            <span>Read Investigation</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
