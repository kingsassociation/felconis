"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface BlogContentProps {
  slug: string;
  post: any;
}

export default function BlogContent({ slug, post }: BlogContentProps) {
  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { 
        content_name: post.title,
        content_category: 'Institutional Insight',
        content_ids: [slug]
      });
    }
  }, [slug, post.title]);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="py-20 grain">
        <div className="container-max">
          {/* IMPACT HERO SECTION */}
          <header className="max-w-4xl mx-auto mb-20 text-center">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md mb-12"
             >
                <div className="w-1 h-1 bg-brand rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Intelligence</span>
             </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 tracking-tighter leading-[0.9] uppercase text-text-primary"
            >
              {post.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-12 mb-20"
            >
               <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand">
                     <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-primary leading-none mb-1.5">{post.author}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Principal Architect</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand">
                     <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-primary leading-none mb-1.5">{post.date}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Audit Timestamp</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden border border-stroke shadow-lg group relative"
            >
               <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-brand/[0.01]" />
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            {/* SIDEBAR / TOC */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 order-2 lg:order-1 space-y-12">
               <div className="space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand pb-4 border-b border-stroke">System Content</p>
                 <nav className="space-y-4">
                    {["Executive Summary", "Strategic Context", "Growth Protocol", "Structural Audit"].map((link, i) => (
                      <a href="#" key={link} className="block text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-brand transition-colors pl-4 border-l border-stroke hover:border-brand">
                        {link}
                      </a>
                    ))}
                 </nav>
               </div>

               <div className="p-10 bg-brand rounded-2xl text-white space-y-6 shadow-xl shadow-brand/10">
                  <TrendingUp size={32} />
                  <h4 className="text-xl font-black uppercase tracking-tight leading-none">STRATEGIC <br /> ACTIVATION.</h4>
                  <p className="text-white/80 text-[10px] leading-relaxed uppercase font-black tracking-widest">Architect your growth engine with 1:1 precision.</p>
                  <Link href="/contact" className="h-12 bg-white text-brand rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center hover:opacity-95 transition-all">
                     Initialize Sync
                  </Link>
               </div>
            </aside>

            {/* MAIN ARTICLE BODY */}
            <article className="lg:col-span-9 order-1 lg:order-2">
               <div className="max-w-3xl prose prose-lg prose-gray prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase">
                  <div 
                    className="text-gray-800 text-xl leading-[1.8] font-medium space-y-12 drop-cap"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
                    {["Strategy", "Systems", "Growth", "Engineering"].map(tag => (
                      <span key={tag} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">#{tag}</span>
                    ))}
                  </div>
               </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
