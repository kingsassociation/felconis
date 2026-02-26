"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    DollarSign,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface JobContentProps {
  slug: string;
  job: any;
}

export default function JobContent({ slug, job }: JobContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { 
        content_name: job.title,
        content_category: 'Job Detail',
        content_ids: [slug]
      });
    }
  }, [slug, job.title]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Track Lead event
      if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
        window.fbq('track', 'Lead', { 
          content_name: job.title,
          content_category: 'Careers Application'
        });
      }
      
      toast.success("Application Signal Received. Our talent board will audit your status.");
      setIsSubmitting(false);
      //@ts-ignore
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain">
        {/* HERO SECTION */}
        <section className="relative py-20 overflow-hidden border-b border-stroke">
           <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
           </div>
           
            <div className="container-max relative z-10">
               <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Link href="/careers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand hover:opacity-80 pb-1 border-b border-brand transition-opacity">
                      <ArrowLeft size={12} /> Back to Open Nodes
                    </Link>
                  </motion.div>
                  
                  <div className="space-y-12">
                     <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="px-3 py-1 bg-brand text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg">
                           {job.department}
                        </div>
                        <div className="px-3 py-1 bg-surface border border-stroke text-text-muted text-[9px] font-black uppercase tracking-widest rounded-md flex items-center gap-2">
                           <MapPin size={12} /> {job.location}
                        </div>
                     </div>
                     
                     <motion.h1 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8 }}
                       className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary"
                     >
                       {job.title}
                     </motion.h1>
                     
                     <div className="flex flex-wrap gap-12 pt-4 justify-center md:justify-start">
                        <div className="flex items-center gap-3">
                           <Clock className="text-brand/40" size={20} />
                           <span className="text-xl font-black uppercase tracking-tight text-text-primary">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <DollarSign className="text-brand/40" size={20} />
                           <span className="text-xl font-black uppercase tracking-tight text-text-primary">{job.salary}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </section>

        {/* CONTENT GRID */}
        <section className="py-20">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                 {/* Main Content */}
                 <div className="lg:col-span-7 space-y-24">
                     <div className="space-y-10">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Context</p>
                           <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9]">DIAGNOSTIC <br /> <span className="text-brand">OVERVIEW.</span></h2>
                        </div>
                        <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed">
                           {job.overview}
                        </p>
                     </div>

                     <div className="space-y-10">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-brand">Technical Spec</p>
                           <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9]">SYSTEM <br /> <span className="text-brand">REQUIREMENTS.</span></h2>
                        </div>
                        <div className="space-y-4">
                           {job.requirements.map((req: string) => (
                              <div key={req} className="flex items-start gap-4 p-6 bg-white border border-stroke rounded-2xl group hover:border-brand/40 transition-all shadow-sm">
                                 <CheckCircle2 className="text-brand shrink-0 mt-1" size={18} />
                                 <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-text-muted group-hover:text-text-primary">{req}</p>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-10">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Dividends</p>
                           <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.9]">TALENT <br /> <span className="text-brand">YIELD.</span></h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {job.benefits.map((ben: string) => (
                              <div key={ben} className="flex items-center gap-4 p-5 bg-surface/30 border border-stroke rounded-xl">
                                 <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                                    <ArrowRight size={14} />
                                 </div>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{ben}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                 </div>

                 {/* Apply Sidebar */}
                  <aside className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                     <div className="p-10 bg-white border border-stroke rounded-3xl space-y-10 shadow-lg">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Gateway</p>
                           <h3 className="text-3xl font-black uppercase tracking-tight leading-[0.9]">BROADCAST <br /> <span className="text-brand">IDENTITY.</span></h3>
                           <p className="text-text-muted text-sm font-medium leading-relaxed">
                               Submit your technical profile to the Felconis executive board today.
                           </p>
                        </div>

                        <form onSubmit={handleApply} className="space-y-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Full Identity</label>
                              <input required type="text" placeholder="Engineering Name" className="input-field h-12 text-[11px] font-bold uppercase" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Strategic Link (Portfolios)</label>
                              <input required type="url" placeholder="https://..." className="input-field h-12 text-[11px] font-bold uppercase" />
                           </div>
                           <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Capability Statement</label>
                              <textarea required rows={4} placeholder="Why should you join the growth board?" className="input-field h-auto py-4 resize-none text-[11px] font-bold uppercase" />
                           </div>
                           
                           <button disabled={isSubmitting} type="submit" className="h-14 bg-brand text-white w-full text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 group">
                              {isSubmitting ? "Broadcasting..." : "Broadcast Application Signal"}
                              <ArrowRight size={14} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                           </button>
                        </form>
                     </div>
                  </aside>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
