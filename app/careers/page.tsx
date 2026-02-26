"use client";

import { motion } from "framer-motion";
import {
   ArrowRight,
   Briefcase,
   Layers,
   MapPin,
   Search,
   Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const JOBS = [
  {
    id: "snr-backend",
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote / Dhaka",
    type: "Full-Time",
    salary: "$60k - $90k",
    desc: "Architecting robust API systems and scaling digital infrastructure for global sectors."
  },
  {
    id: "growth-lead",
    title: "Growth Strategy Lead",
    department: "Marketing",
    location: "Hybrid / Dubai",
    type: "Full-Time",
    salary: "$50k - $80k",
    desc: "Developing and executing high-velocity acquisition protocols for enterprise scale."
  },
  {
    id: "uiux-designer",
    title: "Senior UI/UX Architect",
    department: "Design",
    location: "Remote",
    type: "Full-Time",
    salary: "$40k - $70k",
    desc: "Designing conversion-centric visual logic and premium atomic systems."
  }
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
      window.fbq('track', 'ViewContent', { content_name: 'Careers' });
    }
  }, []);

  useEffect(() => {
    if (!searchQuery) return;
    const timeoutId = setTimeout(() => {
      if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
        window.fbq('track', 'Search', { search_string: searchQuery });
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const filteredJobs = JOBS.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Growth</p>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                TALENT <br /> <span className="text-brand">ACQUISITION.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Join our architectural board. We are looking for exceptional talent to lead high-precision engineering and strategic growth initiatives for global organizations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEARCH PROTOCOL */}
        <section className="py-12 border-b border-stroke bg-surface/30">
           <div className="container-max">
              <div className="relative max-w-2xl mx-auto">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search Strategic Roles (e.g. Engineering, Architecture)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-14 pr-8 bg-white border border-stroke rounded-xl text-[10px] font-black uppercase tracking-widest focus:border-brand/40 transition-all outline-none shadow-sm" 
                 />
              </div>
           </div>
        </section>

        {/* INSTITUTIONAL OPPORTUNITIES */}
        <section className="py-20">
           <div className="container-max">
              <div className="space-y-6">
                 {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                    <motion.div 
                       key={job.id}
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1, duration: 0.8 }}
                    >
                       <Link 
                           href={`/careers/${job.id}`} 
                           onClick={() => {
                              if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
                                 window.fbq('track', 'Lead', { 
                                    content_name: job.title, 
                                    content_category: 'Job Openings' 
                                 });
                              }
                           }}
                           className="group block"
                        >
                          <div className="p-8 bg-surface border border-stroke rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-brand/40 transition-colors">
                             <div className="space-y-3">
                                <div className="flex flex-wrap gap-3">
                                   <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand px-2 py-1 bg-brand/5 rounded-md border border-brand/10">
                                      {job.department}
                                   </div>
                                   <div className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                                      <Briefcase size={12} /> {job.type}
                                   </div>
                                   <div className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                                      <MapPin size={12} /> {job.location}
                                   </div>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-brand transition-colors leading-tight">{job.title}</h3>
                                <p className="text-text-muted text-sm font-medium leading-relaxed max-w-xl">
                                   {job.desc}
                                </p>
                             </div>
                             
                             <div className="flex flex-col md:items-end gap-3 min-w-[180px]">
                                <span className="text-xl font-black tracking-tighter text-text-primary leading-none">{job.salary}</span>
                                <div className="h-12 px-8 flex items-center justify-center border border-stroke rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                                   Access Role
                                </div>
                             </div>
                          </div>
                       </Link>
                    </motion.div>
                 )) : (
                    <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-stroke">
                       <p className="text-text-muted text-lg font-medium">No strategic opportunities match your current status.</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* OPERATIONAL CORE */}
        <section className="py-20 bg-black text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-brand/[0.05] -z-10" />
           <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                 <div className="space-y-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Standards</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
                   JOIN THE <br /> <span className="text-brand">CORE.</span>
                 </h2>
                 <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                   We are looking for elite talent to architect high-impact digital systems and lead strategic market growth.
                 </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <Zap className="text-brand" size={24} />
                       <h4 className="text-sm font-black uppercase tracking-widest text-white">SYSTEM VELOCITY</h4>
                       <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Technical speed is our industrial requirement.</p>
                    </div>
                    <div className="space-y-3">
                       <Layers className="text-brand" size={24} />
                       <h4 className="text-sm font-black uppercase tracking-widest text-white">STRATEGIC OWNERSHIP</h4>
                       <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Absolute governance over your architectural nodes.</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative group">
                 <div className="aspect-[16/10] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-15222071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" alt="Core Session" className="w-full h-full object-cover grayscale opacity-20 transition-all duration-1000" />
                 </div>
              </div>
           </div>
        </section>
        {/* FINAL GATEWAY */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          <div className="container-max text-center relative z-10 space-y-12">
            <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Strategic Intake</p>
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                  INITIATE <br /> <span className="text-brand">ARCHITECTURAL</span> <br /> GROWTH.
               </h2>
            </div>
            
            <p className="text-text-secondary max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Can't find your strategic node? Submit your professional identity to our executive board for future consideration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact" className="btn-primary h-14 px-12 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl">
                Submit Executive CV <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
