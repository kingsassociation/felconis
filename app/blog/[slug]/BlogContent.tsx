"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Share2, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface BlogContentProps {
  slug: string;
  post: {
    title: string;
    content: string;
    isStatic: boolean;
    date: string;
    author: string;
    image?: string | null;
  };
}

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogContent({ slug, post }: BlogContentProps) {
  const isPremium = post.isStatic;
  const [activeHash, setActiveHash] = useState("");

  // PROCESS CONTENT TO ENSURE HEADERS HAVE IDS
  const processedContent = useMemo(() => {
    const content = post.content;
    const simpleHeadingRegex = /<h([23])(?![^>]*id=)([^>]*)>(.*?)<\/h\1>/gi;
    let i = 0;
    
    // Inject IDs into headings that don't have them
    return content.replace(simpleHeadingRegex, (match: string, level: string, attrs: string, text: string) => {
      const id = `section-${i++}`;
      // Ensure there is at least one space before the id if attrs is empty
      const cleanAttrs = attrs.trim();
      return `<h${level}${cleanAttrs ? ` ${cleanAttrs}` : ""} id="${id}">${text}</h${level}>`;
    });
  }, [post.content, slug]);

  // DYNAMIC TOC EXTRACTION FROM PROCESSED CONTENT
  const toc = useMemo(() => {
    const headings: ToCItem[] = [];
    const headingRegex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/gi;
    let match;
    
    while ((match = headingRegex.exec(processedContent)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        id: match[2],
        text: stripHtml(match[3]), // Using the centralized cleaning utility
      });
    }

    return headings;
  }, [processedContent]);

  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { 
        content_name: post.title,
        content_category: isPremium ? 'Institutional Authority' : 'Institutional Insight',
        content_ids: [slug]
      });
    }

    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [slug, post.title, isPremium]);

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href.split('#')[0];
      await navigator.clipboard.writeText(url);
      toast.success("Intelligence URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error("Clipboard error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className={`grain ${isPremium ? "" : "py-20"}`}>
        {/* HERO SECTION */}
        {isPremium ? (
          /* AUTHORITY HERO SECTION */
          <section className="relative pt-32 pb-20 border-b border-stroke overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand/[0.02] to-transparent -z-10" />
            <div className="container-max relative">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full"
                >
                  <TrendingUp size={12} className="text-brand" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Authority Page</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase"
                >
                  {post.title}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-text-secondary text-lg md:text-xl font-medium max-w-2xl mx-auto"
                >
                  Comprehensive analysis and strategic rankings for the 2026 digital landscape.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-8 pt-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-brand">
                      <User size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Principal Architect</p>
                      <p className="text-[11px] font-bold uppercase">{post.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-brand">
                      <Calendar size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Last Verified</p>
                      <p className="text-[11px] font-bold uppercase">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Status</p>
                      <p className="text-[11px] font-bold uppercase text-brand">Verified Authority</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ) : (
          /* STANDARD IMPACT HERO SECTION */
          <div className="container-max">
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
            </header>
          </div>
        )}

        {/* FEATURED ASSET */}
        <div className={`container-max ${isPremium ? "-mt-10 mb-20" : "mb-20"} relative z-10`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`rounded-3xl overflow-hidden border border-stroke shadow-2xl relative group ${isPremium ? "aspect-[21/9]" : "aspect-[4/3] md:aspect-[21/9]"}`}
          >
            <img 
              src={getCloudinaryUrl(post.image)} 
              alt={post.title} 
              className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ${isPremium ? "opacity-40 group-hover:opacity-100" : "opacity-20 group-hover:opacity-100"}`} 
            />
            <div className={`absolute inset-0 ${isPremium ? "bg-gradient-to-t from-black/20 to-transparent" : "bg-brand/[0.01]"} pointer-events-none`} />
          </motion.div>
        </div>

        {/* ARTICLE CONTENT */}
        <section className={isPremium ? "section-padding" : ""}>
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
              {/* STICKY NAV / SIDEBAR */}
              <aside className="lg:col-span-3 lg:sticky top-[calc(var(--navbar-offset)+2rem)] h-fit space-y-12 order-2 lg:order-1 transition-all duration-300">
                <div className="p-8 bg-surface border border-stroke rounded-2xl space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand border-b border-stroke pb-4">On This Page</h4>
                  <nav className="space-y-4">
                    {toc.length > 0 ? (
                      toc.map((item) => (
                        <a 
                          key={item.id} 
                          href={`#${item.id}`}
                          className={`block text-[10px] font-bold uppercase tracking-widest transition-colors ${activeHash === `#${item.id}` ? "text-brand" : "text-text-muted hover:text-brand"} ${item.level === 3 ? "ml-4 text-[9px]" : ""}`}
                        >
                          {item.text}
                        </a>
                      ))
                    ) : (
                      <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted italic">No sections detected</p>
                    )}
                  </nav>
                </div>

                <div className="p-8 bg-brand rounded-2xl text-white space-y-6 shadow-xl shadow-brand/20">
                   <Share2 size={24} />
                   <h4 className="text-xl font-black uppercase leading-tight">SHARE THIS <br /> INTELLIGENCE.</h4>
                   <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Distribute these strategic findings across your organization.</p>
                   <button 
                     onClick={handleCopyUrl}
                     className="w-full h-12 bg-white text-brand rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                   >
                     <Share2 size={12} />
                     Copy URL
                   </button>
                </div>
              </aside>

              {/* MAIN CONTENT */}
              <article className="lg:col-span-9 order-1 lg:order-2">
                <div className={`
                  prose prose-lg max-w-none 
                  prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                  ${isPremium ? "prose-brand prose-p:text-text-secondary prose-p:leading-relaxed prose-p:font-medium authority-content" : "prose-gray prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:font-medium drop-cap"}
                  ${isPremium ? "prose-table:border prose-table:border-stroke prose-thead:bg-surface prose-th:p-4 prose-th:text-[10px] prose-th:font-black prose-th:uppercase prose-th:tracking-widest prose-td:p-4 prose-td:text-sm prose-td:border-t prose-td:border-stroke" : ""}
                `}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                    className={isPremium ? "" : "space-y-12"}
                  />

                  <div className={`mt-20 pt-10 border-t border-stroke flex flex-wrap gap-4`}>
                    {(isPremium ? ["Digital Engineering", "Strategic Scale", "Market Leadership", "Bangladesh 2026"] : ["Strategy", "Systems", "Growth", "Engineering"]).map(tag => (
                      <span key={tag} className={`px-4 py-2 bg-surface border border-stroke rounded-lg text-[9px] font-black uppercase tracking-widest text-text-muted`}>
                        {isPremium ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BOTTOM CTA */}
                {isPremium && (
                  <div className="mt-20 p-12 bg-surface border border-stroke rounded-3xl text-center space-y-8">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Ready to Scale Your Infrastructure?</h3>
                    <p className="text-text-secondary max-w-xl mx-auto font-medium">
                      Discuss your organizational objectives with our principal architects and deploy high-performance engineering teams.
                    </p>
                    <div className="flex justify-center">
                      <Link href="/contact" className="btn-primary h-14 px-10 inline-flex items-center gap-3 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/10">
                        Request Executive Consultation
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <style jsx global>{`
        .authority-content h2 { border-left: 4px solid var(--brand); padding-left: 1.5rem; font-size: 2.5rem; }
        .authority-content h3 { font-size: 1.5rem; color: var(--brand); }
        .authority-content table { width: 100%; margin: 3rem 0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); border-radius: 1rem; overflow: hidden; }
        .authority-content ul { list-style: none; padding-left: 0; }
        .authority-content li { position: relative; padding-left: 1.5rem; margin-bottom: 1rem; }
        .authority-content li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; background: var(--brand); border-radius: 9999px; }
        .authority-content img { border-radius: 1.5rem; border: 1px solid var(--stroke); margin: 3rem 0; }
        
        /* SHARED ARTICLE STYLES */
        article h2, article h3 { scroll-margin-top: calc(var(--navbar-offset) + 60px); margin-top: 4rem; margin-bottom: 2rem; transition: scroll-margin-top 0.3s; }
        article h3 { margin-top: 3rem; margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
}
