"use client";

import { motion } from "framer-motion";
import {
   ArrowRight,
   ShieldCheck,
   Target,
   Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TeamMemberCard from "../components/TeamMemberCard";
import ValueCard from "../components/ValueCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* 1. INSTITUTIONAL HERO */}
        <section className="relative py-20 overflow-hidden border-b border-stroke">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          
          <div className="container-max relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                 <div className="w-1 h-1 bg-brand rounded-full" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Narrative</p>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                TECHNICAL <br /> <span className="text-brand">LEADERSHIP.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We believe that modern growth is a technical requirement. We architect the systems that provide industrial authority for world-class organizations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. STRATEGIC INTELLIGENCE */}
        <section className="py-20 border-b border-stroke bg-surface/30">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-10">
                    <div className="space-y-6">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Execution Model</p>
                       <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase">STRATEGIC <br /><span className="text-brand">INTELLIGENCE.</span></h2>
                    </div>
                    
                    <div className="space-y-6">
                       <p className="text-text-secondary text-base md:text-lg font-medium leading-relaxed">
                         Our methodology integrates precision engineering with high-authority strategic thinking to deliver measurable impact for complex organizations.
                       </p>
                       <p className="text-text-secondary text-base md:text-lg font-medium leading-relaxed">
                          With over 8 years of industrial experience, we build integrated revenue ecosystems where technical precision and strategic intent act as a single unit. Our mission is to provide organizations with the high-precision infrastructure required to maintain category leadership.
                       </p>
                    </div>

                    <div className="flex gap-12 pt-8 border-t border-stroke">
                       <div className="space-y-1">
                          <p className="text-4xl font-black text-brand tracking-tighter">08+</p>
                           <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Years Active</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-4xl font-black text-brand tracking-tighter">180+</p>
                           <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Systems Deployed</p>
                       </div>
                    </div>
                 </div>

                  <div className="relative group">
                      <div className="aspect-square bg-white border border-stroke rounded-3xl overflow-hidden relative shadow-lg">
                         <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                            alt="Felconis Lab" 
                            className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                         />
                         <div className="absolute inset-0 bg-brand/[0.02]" />
                      </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. EXECUTIVE LEADERSHIP */}
        <section className="py-20 bg-white relative overflow-hidden">
           <div className="container-max relative z-10">
              <div className="mb-20 text-center space-y-4">
                 <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Steering Committee</p>
                 <h2 className="text-5xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">EXECUTIVE <br /> <span className="text-brand">LEADERSHIP.</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 <TeamMemberCard 
                    name="Mahdi Monir" 
                    role="Founder / Chief Strategist" 
                    image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070" 
                    bio="Strategic architect focused on technical revenue ecosystems and organizational category leadership."
                 />
                 <TeamMemberCard 
                    name="Industrial Lead" 
                    role="Engineering Director" 
                    image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2070" 
                    bio="Directing institutional-grade digital infrastructure and multi-tenant enterprise systems engineering."
                 />
                 <TeamMemberCard 
                    name="Strategic Lead" 
                    role="Operational Director" 
                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070" 
                    bio="Overseeing high-intent market acquisition and algorithmic performance governance for global partners."
                 />
              </div>
           </div>
        </section>

        {/* 4. INDUSTRIAL PRINCIPLES */}
        <section className="py-20 border-y border-stroke bg-surface/30">
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <ValueCard 
                    icon={Target} 
                    title="PERFORMANCE CORE" 
                    desc="Every line of code and strategic asset is evaluated by institutional revenue and organizational objective impact." 
                 />
                 <ValueCard 
                    icon={ShieldCheck} 
                    title="SYSTEM OWNERSHIP" 
                    desc="We build transparent tracking and data environments that give organizations absolute sovereignty over their growth signals." 
                 />
                 <ValueCard 
                    icon={Zap} 
                    title="TECHNICAL VELOCITY" 
                    desc="Platform speed is an industrial requirement. We engineer for maximum performance to eliminate organizational friction." 
                 />
              </div>
           </div>
        </section>

        {/* 5. FINAL GATEWAY */}
        <section className="py-20 bg-white relative px-6 overflow-hidden">
          <div className="absolute inset-0 bg-brand/[0.01] -z-10" />
          
          <div className="container-max text-center relative z-10 space-y-12">
            <div className="space-y-6">
               <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Strategic Interface</p>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                    ACCESS <br /> <span className="text-brand">METHODOLOGY.</span>
                  </h2>
            </div>
            
            <p className="text-text-secondary max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Connect with our executive committee to discuss the architectural trajectory of your enterprise revenue systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/contact" className="btn-primary h-14 px-12 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl">
                Initiate Strategic Dialogue <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
