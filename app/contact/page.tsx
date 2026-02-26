"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Send
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      budget: formData.get("budget"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Sync Failed");
      
      // Meta Pixel Tracking
      if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
        window.fbq('track', 'Contact');
      }

      toast.success("Inquiry Synchronized. A growth architect will reach out shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        <div className="container-max">
          {/* INSTITUTIONAL HERO */}
          <section className="relative py-20 overflow-hidden border-b border-stroke text-center">
             <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />

             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
             >
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                  <div className="w-1 h-1 bg-brand rounded-full" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Interface</p>
               </div>
               
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-text-primary">
                  STRATEGIC <br /> <span className="text-brand">INTERFACE.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                  Connect with our executive board to discuss the architectural trajectory of your enterprise revenue systems and global presence.
                </p>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">
            {/* LEFT: DIRECT PATHS & DIAGNOSTICS */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12">
                <ContactInfo 
                  icon={Mail} 
                  title="Direct Intel" 
                  value="hello@felconis.com" 
                  desc="Operational inquiries and executive partnerships." 
                />
                <ContactInfo 
                  icon={MessageSquare} 
                  title="Priority Sync" 
                  value="+880 1700-000000" 
                  desc="WhatsApp enabled for rapid strategy response." 
                />
                <ContactInfo 
                  icon={MapPin} 
                  title="Operations Hub" 
                  value="Chattogram, Bangladesh" 
                  desc="Strategic Engineering Headquarters." 
                />
              </div>

              {/* DIAGNOSTICS FAQ */}
              <div className="space-y-8 pt-16 border-t border-stroke">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">System Governance</p>
                   <h3 className="text-4xl font-black uppercase tracking-tight leading-none">DIAGNOSTICS & <br /> GOVERNANCE.</h3>
                </div>
                
                <div className="space-y-8">
                  <FaqItem  question="Protocol Response Time" answer="Our executive board analyzes every inquiry with technical precision. Expect a detailed response within 24-48 business hours." />
                  <FaqItem  question="Engagement Minimums" answer="We focus on institutional-grade scaling. Strategic engagements typically start at $5k per ecosystem node." />
                  <FaqItem  question="Direct Consultation" answer="After initial sync via this interface, we provide a secure link for a strategic technical discovery session." />
                </div>
              </div>
            </div>

            {/* RIGHT: INQUIRY INTERFACE */}
            <div className="lg:col-span-7">
               <div className="p-8 md:p-12 bg-white border border-stroke rounded-3xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.02] rounded-full blur-[100px] -z-10" />
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Lead Identity</label>
                        <input name="name" type="text" required className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" placeholder="Full Name" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Organization</label>
                        <input name="company" type="text" required className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" placeholder="Organization Name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Strategic Email</label>
                        <input name="email" type="email" required className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" placeholder="lead@org.com" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Operational Area</label>
                        <div className="relative">
                           <select name="service" required className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-black uppercase tracking-widest appearance-none cursor-pointer shadow-sm">
                              <option value="Growth Marketing">Growth Marketing</option>
                              <option value="Software Engineering">Software Engineering</option>
                              <option value="AI & Automation">AI & Automation</option>
                              <option value="Full Digital Transformation">Ecosystem Sync</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                              <HelpCircle size={14} />
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Operational Tier</label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {["< $2k", "$2k - $5k", "$5k - $15k", "$15k+"].map(tier => (
                          <label key={tier} className="relative group cursor-pointer">
                            <input type="radio" name="budget" value={tier} className="peer sr-only" required />
                             <div className="h-10 border border-stroke bg-white peer-checked:border-brand peer-checked:bg-brand/5 rounded-lg flex items-center justify-center text-[9px] font-black uppercase tracking-widest text-text-muted peer-checked:text-brand transition-all shadow-sm">
                              {tier}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Inquiry Protocol</label>
                      <textarea name="message" required rows={5} className="w-full py-4 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-base font-medium resize-none shadow-sm placeholder:text-text-muted/30" placeholder="Define technical bottlenecks or strategic objectives..."></textarea>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full h-14 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Initialize Strategic Sync <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                  <div className="pt-8 border-t border-stroke mt-8">
                     <p className="text-[8px] text-center text-text-muted font-black uppercase tracking-[0.2em]">SECURE SYSTEM SYNC • GLOBAL OPERATIONS • ROI-MANDATED ARCHITECTURE</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContactInfo({ icon: Icon, title, value, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-12 h-12 bg-surface border border-stroke rounded-xl flex items-center justify-center text-brand">
        <Icon size={24} />
      </div>
      <div className="space-y-1">
         <h4 className="text-[9px] font-black uppercase tracking-widest text-brand">{title}</h4>
        <p className="text-2xl font-black tracking-tight text-text-primary leading-none uppercase">{value}</p>
        <p className="text-sm font-medium text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-3">
      <h5 className="text-[10px] font-black uppercase tracking-widest text-text-primary flex items-center gap-2">
        <div className="w-1 h-1 bg-brand rounded-full" />
        {question}
      </h5>
      <p className="text-sm text-text-muted leading-relaxed font-medium pl-3 border-l border-stroke">{answer}</p>
    </div>
  );
}
