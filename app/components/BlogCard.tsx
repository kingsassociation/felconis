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
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block space-y-6">
        <div className="aspect-[16/10] rounded-[2rem] overflow-hidden border border-stroke bg-surface relative group-hover:border-brand/40 transition-all duration-700">
           {post.image ? (
             <img src={getCloudinaryUrl(post.image)} alt={post.title} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
           ) : (
             <div className="w-full h-full bg-brand/5 flex items-center justify-center text-brand opacity-20">
                <ArrowRight size={48} />
             </div>
           )}
           <div className="absolute inset-0 bg-brand/5" />
        </div>
        
        <div className="space-y-4 px-2">
           <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-brand">{post.category.name}</span>
              <span className="w-1 h-1 bg-stroke rounded-full" />
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-text-muted">
                 <Calendar size={12} className="text-brand/40" />
                 {post.date}
              </div>
           </div>
           <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-brand transition-colors duration-500 leading-none">
             {post.title}
           </h3>
           <p className="text-[11px] font-black uppercase tracking-widest text-text-muted leading-relaxed line-clamp-2">
             {post.excerpt}
           </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
