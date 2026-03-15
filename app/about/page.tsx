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

      <main className="grain pt-4 md:pt-8">
        {/* 1. INSTITUTIONAL HERO */}
        <section className="relative py-4 md:py-8 md:pb-20 overflow-hidden border-b border-stroke">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />

          <div className="container-max relative z-10 text-center space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                <div className="w-1 h-1 bg-brand rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Narrative</p>
              </div>

              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                TECHNICAL <br /> <span className="text-brand">LEADERSHIP.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
                We believe that modern growth is a technical requirement. We architect the systems that provide industrial authority for world-class organizations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. STRATEGIC INTELLIGENCE */}
        <section className="py-12 md:py-20 border-b border-stroke bg-surface/30">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Execution Model</p>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase">STRATEGIC <br /><span className="text-brand">INTELLIGENCE.</span></h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <p className="text-text-secondary text-sm md:text-lg font-medium leading-relaxed">
                    Our methodology integrates precision engineering with high-authority strategic thinking to deliver measurable impact for complex organizations.
                  </p>
                  <p className="text-text-secondary text-sm md:text-lg font-medium leading-relaxed">
                    With over 8 years of industrial experience, we build integrated revenue ecosystems where technical precision and strategic intent act as a single unit. Our mission is to provide organizations with the high-precision infrastructure required to maintain category leadership.
                  </p>
                </div>

                <div className="flex gap-8 md:gap-12 pt-6 md:pt-8 border-t border-stroke">
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-black text-brand tracking-tighter">08+</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Years Active</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-black text-brand tracking-tighter">180+</p>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Systems Deployed</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="aspect-[16/9] md:aspect-square bg-white border border-stroke rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
                    alt="Felconis Lab"
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand/[0.02]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE MISSION & IMPACT */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="mb-12 md:mb-20 text-center space-y-4">
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Value Proposition</p>
              <h2 className="text-4xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">MISSION & <br /> <span className="text-brand">IMPACT.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               <div className="glass-panel p-8 md:p-12 rounded-[2rem] space-y-6 group hover:glowing-border transition-all">
                  <div className="w-12 h-12 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center text-brand">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">OUR MISSION</h3>
                  <p className="text-text-secondary text-sm md:text-lg font-medium leading-relaxed">
                    To architect high-precision digital infrastructure that empowers global organizations to maintain absolute category leadership through technical sovereignity.
                  </p>
               </div>
               <div className="glass-panel p-8 md:p-12 rounded-[2rem] space-y-6 group hover:glowing-border transition-all">
                  <div className="w-12 h-12 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center text-brand">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight uppercase">STRATEGIC IMPACT</h3>
                  <p className="text-text-secondary text-sm md:text-lg font-medium leading-relaxed">
                    We deliver measurable revenue growth by eliminating technical friction and optimizing institutional data environments for sub-2ms logic precision.
                  </p>
               </div>
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
