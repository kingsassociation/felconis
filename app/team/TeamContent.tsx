"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Cpu,
  Fingerprint,
  Globe,
  Layers,
  Linkedin,
  ShieldCheck,
  Terminal,
  Twitter,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TeamContent({ team }: { team: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-text-primary selection:bg-brand/20">
      <Navbar />

      <main className="grain pt-4 md:pt-8 overflow-hidden">
        {/* INSTITUTIONAL HERO */}
        <section className="relative h-[250px] md:h-[400px] flex items-center pt-4 md:pt-8 justify-center overflow-hidden bg-brand/[0.02]">
          <div className="digital-grid opacity-[0.05]" />

          {/* Animated Light Beams */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/20 to-transparent blur-sm" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand/10 to-transparent blur-sm" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="container-max relative z-10 text-center space-y-8 md:space-y-12"
          >
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 glass-panel rounded-full mx-auto"
              >
                <Fingerprint size={14} className="text-brand animate-pulse" />
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand">Institutional Identity Verified</p>
              </motion.div>

              <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase text-text-primary relative italic">
                EXECUTIVE <br />
                <span className="text-brand text-glow">BOARD.</span>
                <span className="absolute -top-4 -right-8 text-[10px] font-mono text-text-muted opacity-40 hidden md:block select-none">[SECURE_ACCESS: 0x7F]</span>
              </h1>
            </div>

            <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed antialiased">
              Meet the architects of digital sovereignty. A board of strategists and engineers specialized in mission-critical transformations.
            </p>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="pt-10 md:pt-16 text-brand flex flex-col items-center gap-4"
            >
              <div className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40">Decrypt Leadership</div>
              <div className="w-px h-12 md:h-20 bg-gradient-to-b from-brand via-brand/40 to-transparent" />
            </motion.div>
          </motion.div>

          {/* HUD Decorative Elements */}
          <div className="absolute bottom-10 left-10 text-[10px] font-mono text-text-muted opacity-30 space-y-1 hidden lg:block">
            <p>LAT: 23.8103° N</p>
            <p>LNG: 90.4125° E</p>
            <p>CORE_TEMP: OPTIMAL</p>
          </div>
          <div className="absolute bottom-10 right-10 text-[10px] font-mono text-text-muted opacity-30 text-right space-y-1 hidden lg:block">
            <p>SYSTEM_SYNC: ACTIVE</p>
            <p>PROTOCOL_ID: FEL-99</p>
            <p>UPTIME: 100.00%</p>
          </div>
        </section>

        {/* 2. CORE FOUNDATIONS - HUD STYLE */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-stroke rounded-md">
                    <Terminal size={12} className="text-brand" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand">System Integrity</p>
                  </div>
                  <h2 className="text-6xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase">
                    ENGINEERING <br /> <span className="text-brand">AUTHORITY</span>
                  </h2>
                </div>
                <div className="space-y-6 text-text-secondary text-lg font-medium leading-relaxed max-w-xl">
                  <p>Our foundation is built on absolute technical sovereignty and sub-2ms logic precision.</p>
                  <p className="text-sm border-l-2 border-brand/20 pl-6 opacity-70">"Code is not just functionality; it is the institutional architecture of success."</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Technical Sovereignty", icon: ShieldCheck, status: "ENCRYPTED" },
                  { title: "Sub-2ms Logic", icon: Zap, status: "OPTIMIZED" },
                  { title: "Global Scaling", icon: Globe, status: "ACTIVE" },
                  { title: "Sovereign Design", icon: Layers, status: "VERIFIED" }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 glass-panel rounded-3xl space-y-4 hover:glowing-border transition-all group overflow-hidden relative"
                  >
                    <div className="digital-grid opacity-[0.02]" />
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                        <item.icon size={20} />
                      </div>
                      <span className="text-[8px] font-mono text-brand/40">[{item.status}]</span>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-tight">{item.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. EXECUTIVE BOARD - INTERFACE GRID */}
        <section className="py-32 bg-surface/20 relative">
          <div className="digital-grid opacity-[0.03]" />
          <div className="container-max space-y-32">
            <div className="text-center space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand">Operational Leadership</p>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                THE <span className="text-brand">BOARD.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-32 gap-x-6 md:gap-x-12">
              {team.map((member, i) => (
                <TeamMemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. SYSTEM CALIBRATION (CTA) */}
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="digital-grid opacity-[0.05]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand/[0.03] rounded-full blur-[120px]" />
          </div>

          <div className="container-max relative z-10 flex flex-col items-center text-center space-y-16">
            <div className="space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-brand/20 border-t-brand rounded-full mx-auto flex items-center justify-center"
              >
                <Activity size={24} className="text-brand" />
              </motion.div>
              <h2 className="text-7xl md:text-[9rem] font-black tracking-tight uppercase leading-[0.8]">
                SYSTEM <br /> <span className="text-brand">SYNC.</span>
              </h2>
            </div>

            <p className="text-text-secondary max-w-xl text-xl font-medium antialiased">
              Establish your presence in our technical ecosystem. We are audit-ready for high-precision collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <Link href="/careers" className="h-16 px-12 bg-brand text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center hover:shadow-[0_0_30px_rgba(20,88,195,0.3)] transition-all">
                Join The Board
              </Link>
              <Link href="/contact" className="h-16 px-12 glass-panel text-brand text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                Executive Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TeamMemberCard({ member, index }: { member: any; index: number }) {
  const getCapacities = (role: string) => {
    if (role.includes("CEO")) return ["Strategic Scale", "Organizational Logic"];
    if (role.includes("CTO")) return ["Architecture Board", "Sovereign Infra"];
    if (role.includes("Product")) return ["Visual Logic", "Product Sovereignty"];
    if (role.includes("Engineering")) return ["Precision QA", "Operational Stability"];
    if (role.includes("Architect")) return ["Sub-2ms Systems", "Cloud Orchestration"];
    return ["Institutional Engineering"];
  };

  const getID = (index: number) => `FLX-UNIT-${100 + index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8 }}
      className="group relative"
    >
      {/* Decorative Technical ID */}
      <div className="absolute -top-12 left-0 text-[9px] font-mono text-brand/40 uppercase tracking-widest hidden lg:block">
        [UNIT_ID: {getID(index)}]
      </div>

      <div className="space-y-10">
        <div className="aspect-[3/4] bg-surface rounded-2xl md:rounded-[2rem] overflow-hidden relative border border-stroke group-hover:border-brand transition-all duration-700 shadow-sm group-hover:shadow-[0_20px_50px_rgba(20,88,195,0.1)]">
          {member.image ? (
            <img
              src={member.image.startsWith('http') ? member.image : `/${member.image}`}
              alt={member.name}
              className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-[2000ms] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand/5">
              <Cpu size={120} strokeWidth={0.5} />
            </div>
          )}

          {/* Scanning Line Animation */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="scanning-line z-20 pointer-events-none"
          />

          {/* HUD Overlay - Bottom Panel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

          <div className="absolute inset-x-0 bottom-0 p-8 text-white z-30">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {getCapacities(member.role).map(cap => (
                  <span key={cap} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black uppercase tracking-widest">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-brand rounded-full animate-pulse" />
              <p className="text-[8px] md:text-[10px] font-black text-brand uppercase tracking-[0.2em] md:tracking-[0.3em]">{member.role}</p>
            </div>
            <h3 className="text-xl md:text-5xl font-black text-text-primary uppercase tracking-tighter leading-none group-hover:text-glow transition-all">{member.name}</h3>
          </div>

          <p className="text-text-secondary text-xs md:text-sm font-medium leading-relaxed line-clamp-3 antialiased">
            {member.bio}
          </p>

          <div className="flex items-center gap-8 pt-8 border-t border-stroke">
            <div className="flex items-center gap-4">
              {member.linkedin && <Link href={member.linkedin} className="text-text-muted hover:text-brand transition-colors"><Linkedin size={18} /></Link>}
              {member.twitter && <Link href={member.twitter} className="text-text-muted hover:text-brand transition-colors"><Twitter size={18} /></Link>}
            </div>
            <Link href={`mailto:office@felconis.com`} className="group/btn text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-auto hover:text-brand flex items-center gap-3 transition-colors">
              Request Auth <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
