"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface BlogListContentProps {
  initialPosts: any[];
  categories: any[];
}

export default function BlogListContent({ initialPosts, categories }: BlogListContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const displayCategories = ["All", ...categories.map(c => c.name)];

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category.name === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-20 border-b border-stroke overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
           <div className="container-max relative z-10 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                   <div className="w-1 h-1 bg-brand rounded-full" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Intelligence</p>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-text-primary">
                  GROWTH <br /> <span className="text-brand">INSIGHTS.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                  Strategic diagnostics, technical engineering audits, and algorithmic acquisition protocols for the modern enterprise.
                </p>
              </motion.div>
           </div>
        </section>

        {/* SEARCH & FILTER PROTOCOL */}
        <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-stroke py-6">
           <div className="container-max">
              <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                 <div className="flex flex-wrap gap-2">
                    {displayCategories.map(cat => (
                       <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={cn(
                            "px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                            activeCategory === cat 
                            ? "bg-brand text-white shadow-lg shadow-brand/10" 
                            : "text-text-muted hover:bg-brand/5 hover:text-brand"
                          )}
                       >
                          {cat}
                       </button>
                    ))}
                 </div>

                 <div className="relative group max-w-sm w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="SEARCH INTEL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 bg-surface border border-stroke rounded-xl pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-20 lg:py-32">
           <div className="container-max space-y-20 lg:space-y-32">
              
              {/* FEATURED POST */}
              {featuredPost && activeCategory === "All" && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                   <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-[3rem] overflow-hidden border border-stroke bg-white shadow-sm hover:shadow-2xl hover:shadow-brand/5 transition-all duration-700">
                      <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[500px]">
                         <div className="lg:col-span-7 relative overflow-hidden">
                            <img src={getCloudinaryUrl(featuredPost.image)} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-brand/5" />
                         </div>
                         <div className="lg:col-span-5 p-12 lg:p-20 flex flex-col justify-center space-y-10 relative">
                            <div className="space-y-6">
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-brand">{featuredPost.category.name}</span>
                                  <span className="w-1 h-1 bg-stroke rounded-full" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{featuredPost.date}</span>
                               </div>
                               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none group-hover:text-brand transition-colors duration-500">
                                 {featuredPost.title}
                               </h2>
                               <p className="text-text-muted text-sm md:text-base font-medium leading-relaxed uppercase tracking-tighter">
                                 {featuredPost.excerpt}
                               </p>
                            </div>
                            <div className="flex items-center gap-4 text-brand text-[10px] font-black uppercase tracking-widest">
                               ACCESS INTEL
                               <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-brand/10">
                                  <ArrowRight size={16} />
                               </div>
                            </div>

                            <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                               <Search size={120} />
                            </div>
                         </div>
                      </div>
                   </Link>
                </motion.div>
              )}

              {/* POSTS LIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 lg:gap-y-32">
                 {(featuredPost && (activeCategory !== "All" || searchQuery) ? [featuredPost, ...regularPosts] : regularPosts).map((post, i) => (
                   <BlogCard key={post.slug} post={post} index={i} />
                 ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center space-y-6">
                   <Search size={48} className="mx-auto text-brand opacity-20" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No Intelligence nodes found for this criteria.</p>
                </div>
              )}
           </div>
        </section>

        {/* NEWSLETTER NODE */}
        <section className="py-32 border-t border-stroke bg-surface grain">
           <div className="container-max">
              <div className="max-w-4xl mx-auto p-12 lg:p-20 bg-white border border-stroke rounded-[3rem] shadow-xl relative overflow-hidden text-center space-y-12">
                 <div className="absolute top-0 left-0 w-24 h-24 bg-brand/5 -ml-8 -mt-8 rounded-full" />
                 
                 <div className="space-y-6 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Broadcast</p>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">JOIN THE <br /> <span className="text-brand">BOARD.</span></h2>
                    <p className="text-text-muted text-[10px] font-black uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                       Bi-weekly growth signals and technical engineering audits delivered directly to your node.
                    </p>
                 </div>

                 <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
                    <input 
                      type="email" 
                      placeholder="ENTER OPERATIONAL EMAIL"
                      className="flex-grow h-16 bg-surface border border-stroke rounded-2xl px-8 text-[10px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all shadow-sm"
                    />
                    <button className="h-16 px-12 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-brand/10">
                       AUTHENTICATE
                    </button>
                 </form>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
