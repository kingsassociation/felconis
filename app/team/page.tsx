"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TEAM = [
  {
    name: "Mahdi Monir",
    role: "Chief Systems Architect",
    bio: "Specializing in high-precision digital architecture and enterprise scalability. 10+ years of engineering category-leading platforms.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974"
  },
  {
    name: "Israt Jahan",
    role: "Experience Lead",
    bio: "Architecting visual logic and premium design systems for global brands. Focused on conversion-centric aesthetics.",
    socials: { linkedin: "#", twitter: "#", mail: "#" },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974"
  },
  {
    name: "Alex Rivera",
    role: "Growth Strategist",
    bio: "Decoding market intent to architect aggressive acquisition engines. Expert in algorithmic performance scaling.",
    socials: { linkedin: "#", twitter: "#" },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1974"
  },
  {
    name: "Sarah Chen",
    role: "Technical Lead",
    bio: "Next.js and React specialist focused on sub-second frontend performance and atomic component libraries.",
    socials: { linkedin: "#", github: "#" },
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1976"
  },
  {
    name: "Marcus Thorne",
    role: "Backend Engineer",
    bio: "Designing robust API systems and database architectures that handle million-user scale without latency.",
    socials: { github: "#", linkedin: "#" },
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1974"
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    bio: "Merging technical authority with visual storytelling to build brands that command market attention.",
    socials: { twitter: "#", linkedin: "#" },
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961"
  }
];

export default function TeamPage() {
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
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Leadership</p>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                EXECUTIVE <br /> <span className="text-brand">LEADERSHIP.</span>
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Meet the board of engineers, architects, and strategists dedicated to scaling your organization's digital sovereignty.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EXECUTIVE GRID */}
        <section className="py-20">
           <div className="container-max">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 {TEAM.map((member, i) => (
                    <motion.div 
                       key={member.name}
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                    >
                       <div className="group space-y-6">
                          <div className="aspect-[4/5] bg-white border border-stroke rounded-2xl overflow-hidden relative shadow-sm transition-all duration-700 hover:border-brand/40">
                             <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                             />
                             <div className="absolute inset-0 bg-brand/[0.01]" />
                          </div>
                          
                          <div className="space-y-4 px-2">
                             <div className="space-y-1">
                                <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight leading-tight group-hover:text-brand transition-colors">{member.name}</h3>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-brand">{member.role}</p>
                             </div>
                             <p className="text-text-muted text-sm font-medium leading-relaxed">
                                {member.bio}
                             </p>
                             
                             <div className="flex items-center gap-4 pt-4 border-t border-stroke">
                                {member.socials.linkedin && <Link href={member.socials.linkedin} className="text-text-muted hover:text-brand transition-colors"><Linkedin size={14} /></Link>}
                                {member.socials.twitter && <Link href={member.socials.twitter} className="text-text-muted hover:text-brand transition-colors"><Twitter size={14} /></Link>}
                                {member.socials.github && <Link href={member.socials.github} className="text-text-muted hover:text-brand transition-colors"><Github size={14} /></Link>}
                                {member.socials.mail && <Link href={`mailto:${member.socials.mail}`} className="text-text-muted hover:text-brand transition-colors"><Mail size={14} /></Link>}
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* SYSTEM SYNC (FINAL CTA) */}
        <section className="py-20 bg-surface/30 border-y border-stroke relative overflow-hidden">
           <div className="container-max relative z-10 flex flex-col items-center text-center space-y-12">
            <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Scale</p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.9]">
                    SYSTEM <br /> <span className="text-brand">SYNC.</span>
                </h2>
            </div>
            <p className="text-text-secondary max-w-xl text-lg md:text-xl font-medium leading-relaxed">
                We're always looking for high-precision talent to join our board of digital engineers. Audit our open nodes.
            </p>
            <Link href="/careers" className="h-14 px-10 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10">
                Explore Careers <ArrowRight size={14} />
            </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
