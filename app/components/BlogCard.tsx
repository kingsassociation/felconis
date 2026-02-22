import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  slug: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, category, author, date, slug, image }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group space-y-6"
    >
      <div className="aspect-[16/10] bg-white border border-stroke rounded-2xl overflow-hidden relative shadow-sm transition-all duration-700 hover:border-brand/40">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-brand/[0.01]" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-stroke text-brand text-[8px] font-black uppercase tracking-widest rounded-md shadow-sm">
            {category}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
           <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-brand transition-colors uppercase">
             {title}
           </h3>
           <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-2">
             {excerpt}
           </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stroke">
          <div className="flex items-center gap-4 text-[9px] font-black text-text-muted uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <User size={12} className="text-brand/40" />
              {author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-brand/40" />
              {date}
            </div>
          </div>
          <Link 
            href={`/blog/${slug}`} 
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand hover:opacity-70 transition-opacity"
          >
            Access <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
