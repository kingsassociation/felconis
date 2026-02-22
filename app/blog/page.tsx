"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Engineering Growth: Why Traditional Marketing is Dying",
    excerpt: "In a world driven by algorithms and sub-second precision, traditional creative agencies are falling behind. Here's why you need an engineering-first approach.",
    category: "Strategy",
    author: "Mahdi Monir",
    date: "Feb 15, 2026",
    slug: "engineering-growth-philosophy",
    image: "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "2",
    title: "Advanced Search Strategies: Beyond Keywords and Backlinks",
    excerpt: "Learn how we build automated content pipelines and technical SEO infrastructure that dominates enterprise Search Results.",
    category: "Marketing",
    author: "SEO Lead",
    date: "Feb 12, 2026",
    slug: "advanced-search-strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  {
    id: "3",
    title: "Leveraging Agentic AI for Workflow Scaling",
    excerpt: "AI is more than just chatbots. Discover how to deploy agentic workflows that automate high-level decision making and operational logic.",
    category: "AI",
    author: "AI Architect",
    date: "Feb 10, 2026",
    slug: "agentic-ai-workflows",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "4",
    title: "Next.js Architecture for High-Scale SaaS",
    excerpt: "A deep dive into multi-tenant systems, sub-second rendering, and edge computing for modern enterprise applications.",
    category: "Engineering",
    author: "System Principal",
    date: "Feb 08, 2026",
    slug: "nextjs-saas-architecture",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "5",
    title: "Data Sovereignty: Reclaiming Your Growth Intelligence",
    excerpt: "Stop relying on black-box platforms. Learn how to build transparent tracking systems that give you absolute data clarity.",
    category: "Strategy",
    author: "Mahdi Monir",
    date: "Feb 05, 2026",
    slug: "data-sovereignty-guide",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "6",
    title: "Sub-Second UX: The Core Web Vital for ROAS",
    excerpt: "How site performance directly impacts your advertising return and why engineering is your best marketing tool.",
    category: "Performance",
    author: "UX Engineer",
    date: "Feb 01, 2026",
    slug: "sub-second-ux-performance",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2055"
  },
  {
    id: "7",
    title: "Architecting the Future: Multi-Agent Systems in Enterprise",
    excerpt: "Moving beyond simple LLM implementations to robust, hierarchical agent architectures that drive real business value.",
    category: "AI",
    author: "Mahdi Monir",
    date: "Jan 28, 2026",
    slug: "enterprise-multi-agent-systems",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "8",
    title: "The Death of Static Content: Dynamic Personalization at Scale",
    excerpt: "How we use edge-side rendering and real-time user intent signals to deliver hyper-relevant experiences without performance hits.",
    category: "Strategy",
    author: "Growth Lead",
    date: "Jan 25, 2026",
    slug: "dynamic-personalization-scale",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  {
    id: "9",
    title: "Technical Debt vs. Growth Speed: A Balancing Act",
    excerpt: "Strategic diagnostics on when to build for scale and when to optimize for market speed in high-growth engineering environments.",
    category: "Engineering",
    author: "System Principal",
    date: "Jan 20, 2026",
    slug: "technical-debt-vs-growth",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  }
];

const CATEGORIES = ["All", "Strategy", "Marketing", "Engineering", "AI", "Performance"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-20 overflow-hidden border-b border-stroke text-center">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          
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
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                KNOWLEDGE & <br /> <span className="text-brand">STRATEGY.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Technical diagnostics, architectural patterns, and strategic growth logic for the modern enterprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEARCH & FILTER PROTOCOL */}
        <section className="py-12 border-b border-stroke bg-surface/30">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Category Interface */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      activeCategory === cat 
                        ? "bg-brand text-white shadow-md shadow-brand/10" 
                        : "bg-white border border-stroke text-text-muted hover:border-brand/40"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Protocol */}
              <div className="relative w-full lg:w-80">
                <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Query Archive..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 bg-white border border-stroke rounded-xl pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-brand/40 transition-all text-text-primary shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* STRATEGIC ARCHIVE */}
        <section className="py-20">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <BlogCard 
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    author={post.author}
                    date={post.date}
                    slug={post.slug}
                    image={post.image}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-surface border border-dashed border-stroke rounded-3xl">
                  <p className="text-text-muted text-lg font-medium italic mb-6">"No strategic publications found in this archive."</p>
                  <button 
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} 
                    className="h-12 px-8 border border-stroke rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-brand/40 transition-colors bg-white shadow-sm"
                  >
                    Reset Archive Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* STRATEGIC HUB */}
        <section className="py-20 bg-white border-t border-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          <div className="container-max text-center max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-brand">Stay Synchronized</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">
                  STRATEGIC <br /> <span className="text-brand">HUB.</span>
                </h2>
                <p className="text-text-secondary text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
                  High-authority insights, strategic diagnostics, and technical benchmarks from our board of digital engineers.
                </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3 p-2 bg-surface border border-stroke rounded-2xl shadow-premium max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Operational Email..." 
                className="flex-grow h-12 bg-transparent px-6 focus:outline-none text-[10px] uppercase font-black tracking-widest text-text-primary placeholder:text-text-muted/30"
                required
              />
              <button type="submit" className="h-12 px-10 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-brand/10">
                Subscribe <ArrowRight size={14} className="ml-2 inline-block" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
