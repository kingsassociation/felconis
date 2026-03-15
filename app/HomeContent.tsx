"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Box,
  Code2,
  Fingerprint,
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

interface HomeContentProps {
  services: any[];
  testimonials: any[];
  blogs: any[];
}

export default function HomeContent({ services, testimonials, blogs }: HomeContentProps) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const ICON_MAP: Record<string, any> = {
    Code2,
    Globe,
    TrendingUp,
    Palette,
    Video,
    Zap,
    Box,
    Layers,
    ShieldCheck,
    Activity
  };

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

      <main className="grain pt-4 md:pt-8 overflow-hidden">
        {/* 1. DIGITAL COMMAND HERO */}
        <section className="relative min-h-[90vh] flex items-center pt-8 md:pt-12 pb-16 md:pb-20 overflow-hidden bg-surface/5">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="digital-grid opacity-[0.05]" />

            {/* Animated Light Beams */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/10 to-transparent blur-sm" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/5 to-transparent blur-sm" />

            {/* Gradient Fade Top-Bottom */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/[0.02] rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="container-max relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content Column */}
              <div className="space-y-8 md:space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-4 px-4 py-1.5 glass-panel rounded-full"
                >
                  <Fingerprint size={14} className="text-brand animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand">Institutional Access Verified</p>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] md:leading-[0.8] text-text-primary uppercase italic"
                  >
                    SOFTWARE <br />
                    <span className="text-brand text-glow">CRAFTING</span> <br />
                    FOR SUCCESS.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-text-secondary max-w-lg text-lg md:text-2xl font-medium leading-tight antialiased"
                  >
                    Transforming global sectors with high-precision digital infrastructure and sovereign engineering.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6"
                >
                  <Link href="/contact" className="h-14 md:h-16 px-8 md:px-12 bg-brand text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center shadow-2xl shadow-brand/30 hover:shadow-brand/50 transition-all group">
                    Work With Us
                    <ArrowRight size={14} className="ml-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/services" className="h-14 md:h-16 px-8 md:px-12 glass-panel text-text-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                    View Capacity
                  </Link>
                </motion.div>
              </div>

              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="relative lg:block"
              >
                <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-stroke/50">
                  {/* Main Image */}
                  <img
                    src="/images/hero.png"
                    alt="Professional IT Team"
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-[2000ms] group-hover:scale-105"
                  />

                  {/* Scanning Line Animation */}
                  <motion.div
                    animate={{ top: ["-10%", "110%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="scanning-line z-20 pointer-events-none opacity-30"
                  />

                  {/* Image Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/10 to-transparent opacity-80 lg:opacity-60 z-10" />
                  <div className="absolute inset-0 bg-brand/5 mix-blend-overlay z-10" />

                  {/* Floating Metric - HUD STYLE */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-10 right-10 glass-panel p-8 rounded-[2rem] shadow-2xl z-30 group-hover:glowing-border transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20 group-hover:animate-pulse">
                        <Activity size={28} />
                      </div>
                      <div>
                        <p className="text-4xl font-black tracking-tighter text-text-primary text-glow">Sub-2ms</p>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-text-muted">Execution Velocity</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Digital Background */}
                <div className="absolute -top-12 -right-12 w-80 h-80 opacity-[0.03] select-none pointer-events-none z-[-1]"
                  style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. INCREMENTAL SUCCESS & PROGRESS */}
        <section className="py-24 bg-surface/30 border-y border-stroke relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-stroke">
                  <img src="/images/business-1.png" alt="Strategic Consultation" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent" />
                </div>
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-stroke hidden md:block"
                >
                  <p className="text-4xl font-black text-brand tracking-tighter">12+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Global Operations</p>
                </motion.div>
              </motion.div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stroke rounded-md"
                  >
                    <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Business Velocity</p>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] uppercase">
                    INCREASING BUSINESS <br />
                    <span className="text-brand">SUCCESS</span> WITH <br />
                    TECHNOLOGY.
                  </h2>
                  <p className="text-text-secondary text-lg font-medium leading-relaxed max-w-xl">
                    We deploy high-precision digital infrastructure that scales with organizational complexity, ensuring technical authority in every deployment.
                  </p>
                </div>

                <div className="space-y-8">
                  <InstitutionalMetric label="Technical Maturity" value={94} />
                  <InstitutionalMetric label="Operational Efficiency" value={88} />
                  <InstitutionalMetric label="Delivery Precision" value={99} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </section>

        {/* 2.5 RECOGNITION LOGOS */}
        <section className="py-12 bg-white border-b border-stroke">
          <div className="container-max">
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 hover:opacity-60 transition-opacity">
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
                  SOLUTIONS <br /> <span className="text-brand">ENGINEERED</span> <br /> FOR SCALE.
                </h2>
              </div>
              <p className="text-text-muted max-w-sm text-base font-medium leading-relaxed pb-2">
                We design and deploy scalable software systems that drive measurable organizational excellence and technical authority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = ICON_MAP[service.icon] || Zap;
                return (
                  <ServiceCard key={service.id} {...service} icon={Icon} index={i} />
                );
              })}
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
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
              />
            </div>
          </div>
        </section>

        {/* 6. PARTNERSHIP SOLUTIONS HUB */}
        <section className="section-padding bg-white relative">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md"
                  >
                    <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Partnerships</p>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] uppercase">
                    PROVIDING SOLUTIONS <br />
                    & BUSINESS <br />
                    <span className="text-brand">PARTNERSHIPS.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    { title: "Strategic Architecture", desc: "Foundational engineering for mission-critical systems.", icon: Layers },
                    { title: "Quality Assurance", desc: "Rigorous automated testing and security protocols.", icon: ShieldCheck },
                    { title: "Performance Ops", desc: "Continuous monitoring and sub-2ms optimization.", icon: Activity }
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 p-6 rounded-2xl border border-stroke hover:border-brand/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                        <item.icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black uppercase tracking-tight">{item.title}</h4>
                        <p className="text-text-muted text-sm font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-stroke relative group">
                  <img src="/images/business-2.png" alt="Institutional Hub" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-brand/10 mix-blend-overlay" />
                </div>
                {/* Accent Dot Pattern */}
                <div className="absolute -top-10 -left-10 w-48 h-48 opacity-[0.03] select-none pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6.5 STRATEGIC ENGAGEMENT MODELS */}
        <section className="section-padding bg-surface/30 border-y border-stroke relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="text-center mb-20 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stroke rounded-md mx-auto"
              >
                <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Engagement</p>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">STRATEGIC <br /> ENGAGEMENT MODELS.</h2>
              <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-xl mx-auto">
                We offer tailored engagement structures designed to align with your organization's technical maturity and strategic scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Strategic Growth",
                  desc: "Ideal for accelerating specific digital initiatives.",
                  price: "Growth",
                  features: ["Core Product Engineering", "Integrated QA Protocol", "Sub-2ms Optimization"],
                  icon: TrendingUp,
                  unit_id: "MDL-A1"
                },
                {
                  title: "Institutional Scale",
                  desc: "Full-spectrum engineering for expansive platforms.",
                  price: "Scale",
                  features: ["Platform Architecture", "Operational Velocity", "24/7 Strategic Support"],
                  icon: Layers,
                  featured: true,
                  unit_id: "MDL-B2"
                },
                {
                  title: "Enterprise Authority",
                  desc: "Deep integration for mission-critical dominance.",
                  price: "Authority",
                  features: ["High-Security Infrastructure", "Automated Compliance", "Expert Tech Advisory"],
                  icon: ShieldCheck,
                  unit_id: "MDL-C3"
                }
              ].map((model, i) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[2.5rem] border ${model.featured ? 'bg-brand text-white border-brand shadow-2xl shadow-brand/30 glowing-border' : 'glass-panel text-text-primary border-stroke'} space-y-8 flex flex-col justify-between group transition-all hover:scale-[1.02] relative overflow-hidden`}
                >
                  <div className="digital-grid opacity-[0.03]" />
                  <div className="absolute top-4 right-8 text-[8px] font-mono opacity-30">[{model.unit_id}]</div>

                  <div className="space-y-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${model.featured ? 'bg-white/10' : 'bg-surface'} text-brand group-hover:bg-brand group-hover:text-white transition-all`}>
                      <model.icon size={28} className={model.featured ? 'text-white' : 'text-brand'} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-glow transition-all">{model.title}</h4>
                      <p className={`text-sm font-medium ${model.featured ? 'text-white/70' : 'text-text-muted'} antialiased`}>{model.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-6 flex-1 pt-8 relative z-10">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black tracking-tighter uppercase">{model.price}</span>
                    </div>

                    <ul className="space-y-4">
                      {model.features.map(feat => (
                        <li key={feat} className={`flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest ${model.featured ? 'text-white/80' : 'text-text-primary underline decoration-brand/20'}`}>
                          <div className={`w-1 h-1 rounded-full ${model.featured ? 'bg-white' : 'bg-brand'}`} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact" className={`h-16 w-full flex items-center justify-center rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 ${model.featured ? 'bg-white text-brand hover:bg-white/90 shadow-xl' : 'bg-white border border-stroke text-text-primary hover:border-brand/40 shadow-sm'}`}>
                    Select Model <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </section>

        {/* 7. INSTITUTIONAL TESTIMONIALS */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-[0.03] select-none pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

          <div className="container-max relative z-10">
            <div className="text-center mb-20 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md mx-auto"
              >
                <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Trust</p>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">THE PARTNERSHIP <br /> EXPERIENCE.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <TestimonyCard
                  key={test.id}
                  name={test.name}
                  role={test.designation || test.company}
                  quote={test.quote}
                />
              ))}
              {testimonials.length === 0 && (
                <p className="text-center col-span-3 text-[10px] font-black uppercase tracking-widest text-text-muted">No testimonials synchronized yet.</p>
              )}
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
              {blogs.map((blog) => (
                <BlogSnippet
                  key={blog.id}
                  title={blog.title}
                  date={new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  category={blog.category.name}
                  image={blog.image || "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"}
                  slug={blog.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ & INSTITUTIONAL GATEWAY */}
        <section id="contact" className="py-24 bg-white border-t border-stroke">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div className="space-y-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand">Institutional FAQ</p>
                  <h2 className="text-5xl font-black tracking-tight uppercase leading-[0.9]">SUPPORT <br /> & STRATEGY.</h2>
                </div>

                <div className="max-w-xl">
                  <FaqItem
                    question="How does Felconis approach digital transformation?"
                    answer="We utilize a high-precision digital engineering framework that prioritizes scalability, security, and measurable business velocity."
                  />
                  <FaqItem
                    question="What sectors do you specialize in?"
                    answer="We serve organizations in fintech, global commerce, and enterprise SaaS that require technical authority and operational scale."
                  />
                  <FaqItem
                    question="How do you ensure project success?"
                    answer="Our process is backed by sub-2ms precision logic and a rigorous quality assurance protocol that guarantees system integrity."
                  />
                </div>
              </div>

              <div className="space-y-12">
                <div className="bg-brand p-12 rounded-[3rem] text-white space-y-8 relative overflow-hidden group shadow-2xl shadow-brand/20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                  <div className="space-y-4 relative z-10">
                    <h3 className="text-4xl font-black tracking-tighter uppercase leading-[0.9]">READY TO SCALE <br /> YOUR SYSTEMS?</h3>
                    <p className="text-white/80 text-lg font-medium leading-relaxed">
                      Connect with our executive team to start your strategic digital engineering journey.
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4 relative z-10">
                    <input required name="email" type="email" placeholder="YOUR@EMAIL.COM" className="w-full h-16 bg-white/10 border border-white/20 rounded-2xl px-6 text-sm font-black uppercase tracking-widest placeholder:text-white/40 focus:bg-white/20 outline-none transition-all" />
                    <button type="submit" className="w-full h-16 bg-white text-brand rounded-2xl text-[11px] font-black uppercase tracking-[.2em] hover:scale-[0.98] transition-all">
                      REQUEST CONSULTATION
                    </button>
                  </form>

                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 text-center pt-4">
                    Strict Enterprise Compliance Guaranteed
                  </p>
                </div>
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

function InstitutionalMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 bg-brand rounded-full animate-pulse" />
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-text-primary">{label}</p>
        </div>
        <p className="text-sm font-mono font-black text-brand">[{value}%]</p>
      </div>
      <div className="h-[2px] w-full bg-stroke rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-brand rounded-full shadow-[0_0_10px_rgba(20,88,195,0.4)]"
        />
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, features, index, slug }: any) {
  const getID = (index: number) => `SVC-UNIT-${100 + index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="p-10 glass-panel rounded-[2.5rem] hover:glowing-border transition-all group relative overflow-hidden"
    >
      <div className="digital-grid opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-8 relative z-10">
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-white border border-stroke rounded-2xl flex items-center justify-center text-brand shadow-sm transition-transform group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:border-brand">
            <Icon size={28} />
          </div>
          <span className="text-[9px] font-mono text-brand/40 group-hover:text-brand transition-colors">[{getID(index)}]</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-black mb-2 tracking-tight uppercase leading-[0.9] group-hover:text-glow transition-all">{title}</h3>
          <p className="text-text-secondary text-sm font-medium leading-relaxed line-clamp-3 antialiased">{desc}</p>
        </div>

        <ul className="space-y-3 pt-6 border-t border-stroke">
          {features && features.slice(0, 3).map((item: string) => (
            <li key={item} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-primary transition-colors">
              <div className="w-1.5 h-1.5 bg-brand/30 rounded-full group-hover:bg-brand transition-all" />
              {item}
            </li>
          ))}
        </ul>

        <Link href={`/services/${slug}`} className="h-16 w-full flex items-center justify-center bg-white border border-stroke rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-text-primary hover:border-brand/40 transition-all group/btn shadow-sm">
          Explore Capacity <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

function TestimonyCard({ name, role, quote }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 bg-surface border border-stroke rounded-[2.5rem] space-y-8 h-full flex flex-col justify-between hover:border-brand/30 transition-all group"
    >
      <div className="space-y-6">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-1 h-4 bg-brand/20 rounded-full" />
          ))}
        </div>
        <p className="text-text-primary text-lg leading-relaxed font-medium antialiased">"{quote}"</p>
      </div>

      <div className="flex items-center gap-4 pt-8 border-t border-stroke">
        <div className="w-12 h-12 bg-white border border-stroke rounded-2xl flex items-center justify-center font-black text-brand text-sm shadow-sm group-hover:bg-brand group-hover:text-white transition-all">
          {name[0]}
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-text-primary">{name}</p>
          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none pt-1">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function BlogSnippet({ title, date, category, image, slug }: any) {
  return (
    <div className="glass-panel rounded-[2.5rem] overflow-hidden group hover:glowing-border transition-all flex flex-col h-full relative">
      <div className="digital-grid opacity-[0.03]" />
      <div className="aspect-[16/10] overflow-hidden relative border-b border-stroke">
        <img src={image} alt={title} className="w-full h-full object-cover brightness-95 group-hover:brightness-110 transition-all duration-[2000ms] group-hover:scale-110" />

        {/* Scanning Line Animation */}
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="scanning-line z-20 pointer-events-none opacity-40 md:opacity-40 opacity-20"
        />

        <div className="absolute top-4 left-4 px-3 py-1 glass-panel text-brand rounded-md text-[8px] font-black uppercase tracking-widest shadow-lg z-30">{category}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-8 space-y-6 flex flex-col flex-1 justify-between relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-brand rounded-full animate-pulse" />
            <p className="text-[9px] font-mono font-black text-brand/60 uppercase tracking-widest">{date}</p>
          </div>
          <h4 className="text-xl font-black tracking-tight uppercase group-hover:text-glow transition-all line-clamp-2 leading-[1.1]">{title}</h4>
        </div>
        <Link href={`/blog/${slug}`} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-text-muted hover:text-brand transition-colors group/link pt-6 border-t border-stroke">
          Strategic Review <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stroke py-8 last:border-0 relative group">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-brand group-hover:h-8 transition-all duration-500 rounded-full" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-sm font-black uppercase tracking-tight group-hover:text-brand transition-colors flex items-center gap-4">
          <span className="text-[8px] font-mono text-brand/30">[SYS_QUERY]</span>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-xl border border-stroke glass-panel flex items-center justify-center transition-all ${isOpen ? 'bg-brand text-white border-brand rotate-180 shadow-[0_0_20px_rgba(20,88,195,0.3)]' : 'group-hover:border-brand/40'}`}>
          <Activity size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm font-medium leading-relaxed pt-6 pl-14 max-w-xl antialiased">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
