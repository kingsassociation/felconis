"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Box,
  Code2,
  Globe,
  Layers,
  Palette,
  ShieldCheck,
  TrendingUp,
  Video,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import CaseStudyItem from "./components/CaseStudyItem";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const SERVICES = [
  {
    icon: Code2,
    title: "Software Development",
    desc: "Custom enterprise-grade systems, API architecture, and scalable backends built for high-precision logic.",
    features: ["System Architecture", "API Engineering", "Backend Nodes"],
    slug: "software"
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance Next.js platforms and e-commerce ecosystems with sub-second latency.",
    features: ["Next.js/React", "Commerce Engines", "Frontend Systems"],
    slug: "web"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Content SEO, social media marketing, and data-driven growth loops designed to transform business presence.",
    features: ["Content SEO", "Social Marketing", "Growth Funnels"],
    slug: "marketing"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Premium visual identities, brand systems, and UI/UX assets that establish technical authority.",
    features: ["Brand Identity", "Visual Systems", "UI/UX Design"],
    slug: "design"
  },
  {
    icon: Video,
    title: "Video Editing",
    desc: "High-impact video content editing and motion graphics to drive engagement across digital channels.",
    features: ["Engagement Editing", "Motion Graphics", "Storytelling Nodes"],
    slug: "video"
  }
];

export default function Home() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    //@ts-ignore
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      toast.success("Consultation Scheduled. Our team will contact you shortly.");
      //@ts-ignore
      e.target.reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <Navbar />

      <main className="grain pt-16">
        {/* 1. INSTITUTIONAL HERO SECTION */}
        <section className="relative py-20 overflow-hidden border-b border-stroke">
          {/* Subtle Institutional Background */}
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/[0.02] rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 -z-10" />
          
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md"
                >
                   <div className="w-1 h-1 bg-brand rounded-full" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Digital Engineering</p>
                </motion.div>

                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-text-primary"
                  >
                    STRATEGIC <br /> 
                    <span className="text-brand">ENGINEERING</span> <br />
                    FOR SCALE.
                  </motion.h1>
                </div>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-text-secondary max-w-lg text-lg md:text-xl font-medium leading-relaxed"
                >
                  We design and implement high-performance software systems for organizations that require technical precision and operational excellence.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link href="/contact" className="btn-primary h-14 px-10 text-[11px] font-bold uppercase tracking-widest bg-brand rounded-xl">
                    Executive Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Link>
                  <Link href="/work" className="btn-outline h-14 px-10 text-[11px] font-bold uppercase tracking-widest border border-stroke rounded-xl">
                    View Portfolio
                  </Link>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:col-span-5 relative hidden lg:block"
              >
                {/* Architectural Visual Container */}
                <div className="aspect-[4/5] bg-surface border border-stroke rounded-3xl p-10 relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent pointer-events-none" />
                  
                  {/* High-Precision Grid Visualization */}
                  <div className="relative h-full border border-stroke/40 rounded-2xl p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="w-12 h-1 bg-brand/20 rounded-full" />
                      <div className="space-y-3">
                         <div className="h-4 w-3/4 bg-brand/5 rounded-md" />
                         <div className="h-4 w-1/2 bg-brand/5 rounded-md" />
                      </div>
                    </div>

                    <div className="space-y-8 relative z-10">
                      {[
                        { label: "Precision Logic", icon: Code2 },
                        { label: "Scalable Systems", icon: Layers },
                        { label: "Operational Excellence", icon: ShieldCheck }
                      ].map((item, i) => (
                        <motion.div 
                          key={item.label}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-white border border-stroke rounded-xl shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                             <item.icon size={16} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand/5 rounded-full blur-[80px]" />
                  </div>
                </div>

                {/* Performance Metric Box */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white border border-stroke p-6 rounded-2xl shadow-xl flex items-center gap-5 min-w-[240px]"
                >
                  <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-tight text-text-primary">99.9%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">System Availability</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. RECOGNITION & METRICS */}
        <section className="py-16 border-b border-stroke bg-surface/30">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xs text-center lg:text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-4">Institutional Presence</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight uppercase">Trusted by <br /> Organizations.</h2>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-4xl">
                {[
                  { label: "Active Availability", val: "99.9%", icon: ShieldCheck },
                  { label: "Solutions Delivered", val: "12+", icon: Box },
                  { label: "Technical Velocity", val: "Sub-2ms", icon: Zap },
                  { label: "Success Rate", val: "100%", icon: Activity },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand border border-brand/10">
                        <stat.icon size={14} />
                      </div>
                      <span className="text-3xl font-black tracking-tighter">{stat.val}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Logo Cloud - Refined Grayscale */}
            <div className="mt-16 pt-12 border-t border-stroke flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 hover:opacity-100 transition-opacity">
               {["TECHCORP", "STRATEGIC", "GLOBAL", "PRISMA", "NEXTJS", "FINANCE"].map(logo => (
                 <span key={logo} className="text-[10px] font-black tracking-[0.4em] grayscale transition-all cursor-default text-text-muted hover:text-brand">{logo}</span>
               ))}
            </div>
          </div>
        </section>

        {/* 3. CORE CAPABILITIES */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
              <div className="max-w-2xl space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md"
                >
                  <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Services</p>
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] uppercase text-text-primary">
                  SOLUTIONS <br /> <span className="text-brand">ARCHITECTED</span> <br /> FOR GROWTH.
                </h2>
              </div>
              <p className="text-text-muted max-w-sm text-base font-medium leading-relaxed pb-2">
                We design and implement scalable digital systems that drive measurable organizational excellence and technical authority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.title} {...service} index={i} />
              ))}
            </div>
          </div>
        </section>


        {/* 5. FEATURED CASE STUDIES */}
        <section id="work" className="section-padding relative">
          <div className="container-max relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
              <div className="space-y-6">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md"
                >
                  <div className="w-1 h-1 bg-brand rounded-full" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand">Case History</p>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
                  STRATEGIC <br /> <span className="text-brand">CASE</span> HISTORY.
                </h2>
              </div>
              <Link href="/work" className="h-14 px-8 bg-surface border border-stroke text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-brand/40 transition-all inline-flex items-center gap-3 group/arch">
                View All Projects <ArrowUpRight size={14} className="group-hover/arch:translate-x-0.5 group-hover/arch:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <CaseStudyItem 
                title="Revenue Scaling for Raafidan" 
                stats={[{ label: "Revenue Acceleration", value: "+220%" }, { label: "Conversion Lift", value: "45%" }, { label: "Performance", value: "Sub-1s" }]}
                category="E-commerce"
                brand="Raafidan Enterprise"
                slug="raafidan"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <CaseStudyItem 
                title="SaaS Architecture for NextZen" 
                stats={[{ label: "Retention Efficiency", value: "3.2x" }, { label: "System Uptime", value: "99.9%" }, { label: "Deploy Speed", value: "85%" }]}
                category="SaaS"
                brand="NextZen Systems"
                slug="nextzen"
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-full h-full bg-brand/5 blur-[120px] -z-10 -translate-y-1/2" />
        </section>

        <section className="py-20 border-b border-stroke bg-surface/30">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Global Sector Expertise</p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] uppercase text-text-primary">SECTORS <br /> <span className="text-brand">WE SUPPORT.</span></h2>
                </div>
                <p className="text-text-secondary text-base font-medium leading-relaxed">
                  We bring deep domain expertise to high-growth sectors, delivering customized digital infrastructure that aligns with specific organizational requirements.
                </p>
                <Link href="/work" className="btn-primary h-14 px-10 text-[10px] font-black uppercase tracking-widest group bg-brand rounded-xl inline-flex">
                  View Institutional Work <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "SaaS & Enterprise", icon: Box },
                  { name: "Digital Commerce", icon: Globe },
                  { name: "FinTech Systems", icon: ShieldCheck },
                  { name: "Healthcare Tech", icon: Activity },
                  { name: "Logistics & Supply", icon: Layers },
                  { name: "Education Infrastructure", icon: Code2 },
                ].map((sector) => (
                  <div key={sector.name} className="p-6 bg-white border border-stroke rounded-2xl flex flex-col items-center text-center gap-4 hover:border-brand/40 transition-colors shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                      <sector.icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{sector.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. STRATEGIC EXCELLENCE */}
        <section className="section-padding bg-white overflow-hidden">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Our Methodology</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.9]">
                    STRATEGIC <br /> EXCELLENCE.
                  </h2>
                </div>
                
                <p className="text-text-secondary text-lg font-medium leading-relaxed">
                  Our approach integrates precision engineering with high-level strategy to deliver sustainable digital authority for global organizations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                      <Code2 size={20} />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Architectural Precision</h4>
                    <p className="text-text-muted text-[11px] font-medium leading-relaxed">We maintain absolute control over the technical stack, ensuring institutional reliability and security.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                      <Zap size={20} />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Performance Mandate</h4>
                    <p className="text-text-muted text-[11px] font-medium leading-relaxed">Optimization is engineered into every layer, from infrastructure to the final user interface.</p>
                  </div>
                </div>
              </div>

              <div className="lg:order-2 order-1 relative">
                <div className="aspect-square bg-surface border border-stroke rounded-3xl p-10 relative overflow-hidden group shadow-lg">
                   <div className="absolute inset-x-0 top-0 h-1 bg-brand/10" />
                   
                   {/* Architectural Methodology Visualization */}
                   <div className="relative h-full flex flex-col justify-center gap-6">
                      <div className="flex justify-center">
                        <motion.div 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="px-6 py-3 bg-white border border-stroke rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                           <Globe size={14} className="text-brand" />
                           Global Ingress
                        </motion.div>
                      </div>
                      
                       <div className="flex justify-center gap-4">
                        <motion.div 
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="px-6 py-4 bg-brand rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                        >
                           <Zap size={14} />
                           System Core
                        </motion.div>
                        <motion.div 
                          animate={{ scale: [1, 0.98, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                          className="px-6 py-4 bg-white border border-stroke rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                           <Box size={14} className="text-brand" />
                           Logic Layer
                        </motion.div>
                      </div>

                      <div className="flex justify-center">
                        <motion.div 
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="px-8 py-4 bg-brand/5 border border-brand/20 rounded-xl flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                        >
                           <TrendingUp size={20} className="text-brand" />
                           Value Optimization
                        </motion.div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PARTNERSHIP EXCELLENCE */}
        <section className="py-20 bg-surface/30">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative group p-4">
                <div className="aspect-[4/5] bg-white border border-stroke rounded-3xl overflow-hidden relative shadow-lg">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" alt="Consultation" className="w-full h-full object-cover grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent " />
                  
                  {/* Metric Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white border border-stroke rounded-2xl shadow-xl space-y-3">
                     <p className="text-[10px] font-black uppercase tracking-widest text-brand">The Mandate</p>
                     <h4 className="text-2xl font-black tracking-tight text-text-primary uppercase leading-tight">VALUE <br /> GENERATION.</h4>
                     <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest leading-relaxed">Every technical decision is measured by its contribution to organizational growth.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Standards</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.9]">
                    TECHNICAL <br /> AUTHORITY.
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <ValueProp title="Strategic Insight" desc="We focus on long-term value, designing systems that scale alongside complex organizational objectives." />
                  <ValueProp title="Unitary Infrastructure" desc="Our systems are built using high-precision, reusable core modules for technical stability." />
                  <ValueProp title="Total Visibility" desc="Absolute transparency and data-backed performance metrics at every phase of the engagement." />
                </div>

                <Link href="/contact" className="btn-primary h-14 px-10 text-[10px] font-black uppercase tracking-widest bg-brand rounded-xl inline-flex">
                   Begin Strategy Consultation <ArrowRight size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INSTITUTIONAL TESTIMONIALS */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-20 space-y-6">
               <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Partner Testimonials</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">THE PARTNERSHIP <br /> EXPERIENCE.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonyCard 
                name="Ayman Sadiq" 
                role="Founder, 10 Minute School" 
                quote="The Felconis methodology delivered sub-second infrastructure and measurable lift in under 90 days. Their engineering logic is unparalleled."
              />
              <TestimonyCard 
                name="Fahim Mashroor" 
                role="CEO, Bdjobs" 
                quote="They don't just build software—they build digital leverage. Felconis solved architectural bottlenecks that were costing us millions."
              />
              <TestimonyCard 
                name="Zubayer Ahmed" 
                role="Founder, Hishab" 
                quote="Felconis is our tactical advantage. Their precision-first approach and technical mastery has been a key driver in our category dominance."
              />
            </div>
          </div>
        </section>

        {/* 8. KNOWLEDGE & INSIGHTS */}
        <section className="py-20 bg-surface/30">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
              <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Strategic Intelligence</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">
                  STRATEGIC <br /> INSIGHTS.
                </h2>
              </div>
              <Link href="/blog" className="btn-outline h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-surface border border-stroke rounded-lg inline-flex">
                View All Intelligence <ArrowUpRight size={14} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BlogSnippet 
                title="Building Scalable Architectural Sovereignty for 2026" 
                date="Feb 12, 2026"
                category="Engineering"
                image="https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
              />
              <BlogSnippet 
                title="Technical Authority: Outranking Enterprise Competitors" 
                date="Feb 10, 2026"
                category="Strategy"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
              />
              <BlogSnippet 
                title="Leveraging AI for Workflow Automation in E-commerce" 
                date="Feb 05, 2026"
                category="Automation"
                image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
        </section>

        {/* 9. INSTITUTIONAL GATEWAY */}
        <section id="contact" className="py-20 border-t border-stroke bg-white px-6">
          <div className="container-max">
            <div className="max-w-6xl mx-auto bg-surface border border-stroke rounded-3xl p-10 md:p-16 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/[0.02] rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-8">
                   <div className="space-y-4">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Contact</p>
                      <h2 className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">
                        START <br /> YOUR <br /><span className="text-brand">STRATEGY.</span>
                      </h2>
                   </div>
                   <p className="text-text-secondary text-base font-medium leading-relaxed max-w-sm">
                      Connect with our engineering firm to discuss your strategic objectives and platform requirements.
                   </p>
                   
                   <div className="pt-8 border-t border-stroke space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white border border-stroke flex items-center justify-center text-brand">
                            <ShieldCheck size={20} />
                         </div>
                         <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Security</p>
                            <p className="text-[11px] font-black uppercase tracking-widest">Enterprise Compliance</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white border border-stroke flex items-center justify-center text-brand">
                            <Activity size={20} />
                         </div>
                         <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Intelligence</p>
                            <p className="text-[11px] font-black uppercase tracking-widest">Data-Backed Insights</p>
                         </div>
                      </div>
                   </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Name</label>
                      <input required name="name" type="text" placeholder="Full Name" className="input-field h-12 text-[11px] uppercase font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Email</label>
                      <input required name="email" type="email" placeholder="Email Address" className="input-field h-12 text-[11px] uppercase font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Inquiry</label>
                     <textarea required name="message" rows={4} placeholder="Organizational objectives..." className="input-field h-auto py-4 resize-none text-[11px] uppercase font-bold" />
                  </div>
                  
                  <button disabled={isFormSubmitting} type="submit" className="btn-primary w-full h-14 text-[10px] font-black uppercase tracking-widest group bg-brand rounded-xl">
                    {isFormSubmitting ? "Sheduling..." : "Request Executive Consultation"}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ARCHITECTURAL HELPER COMPONENTS */

function ServiceCard({ icon: Icon, title, desc, features, index, slug }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="p-8 bg-surface border border-stroke rounded-2xl hover:border-brand/40 transition-colors"
    >
      <div className="space-y-10">
        <div className="w-14 h-14 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand">
          <Icon size={24} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-black mb-2 tracking-tight uppercase leading-tight">{title}</h3>
          <p className="text-text-muted text-sm font-medium leading-relaxed pr-2 line-clamp-2">{desc}</p>
        </div>

        <ul className="space-y-3 pt-6 border-t border-stroke">
          {features && features.slice(0, 3).map((item: string) => (
            <li key={item} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-text-muted">
              <div className="w-1 h-1 bg-brand rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <Link href={`/services/${slug}`} className="btn-outline h-12 w-full text-[10px] font-bold uppercase tracking-widest group border border-stroke rounded-lg inline-flex">
          Solutions Detail <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function ValueProp({ title, desc }: any) {
  return (
    <div className="flex gap-5 group">
      <div className="w-10 h-10 shrink-0 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand">
        <ShieldCheck size={20} />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-black uppercase tracking-widest text-text-primary">{title}</h4>
        <p className="text-text-muted text-[11px] font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonyCard({ name, role, quote }: any) {
  return (
    <div className="p-8 bg-surface border border-stroke rounded-2xl space-y-8 h-full">
      <p className="text-text-secondary italic text-base leading-relaxed font-medium antialiased">"{quote}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-stroke">
        <div className="w-10 h-10 bg-white border border-stroke rounded-xl flex items-center justify-center font-black text-brand text-xs">
          {name[0]}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">{name}</p>
          <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </div>
  );
}

function BlogSnippet({ title, date, category, image }: any) {
  return (
    <div className="bg-white border border-stroke rounded-2xl overflow-hidden group">
      <div className="aspect-[16/10] overflow-hidden relative">
         <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
         <div className="absolute top-4 left-4 px-3 py-1 bg-brand text-white rounded-md text-[8px] font-bold uppercase tracking-widest">{category}</div>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
           <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{date}</p>
           <h4 className="text-base font-black tracking-tight uppercase group-hover:text-brand transition-colors line-clamp-2 leading-tight">{title}</h4>
        </div>
        <Link href="/blog" className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-text-muted hover:text-brand transition-colors group/link">
          Read Strategic Report <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
