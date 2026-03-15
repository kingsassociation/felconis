"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    DollarSign,
    Globe,
    Layout,
    ShieldCheck,
    Target,
    User,
    Video,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BENEFITS = [
    {
        icon: DollarSign,
        title: "Client Commission",
        desc: "Earn commission on every project confirmed through your introduction."
    },
    {
        icon: Globe,
        title: "Portfolio Support",
        desc: "Personal portfolio website with domain and hosting included for active partners."
    },
    {
        icon: Layout,
        title: "Marketing Assets",
        desc: "Social media content support to help you promote Felconis services effectively."
    },
    {
        icon: Video,
        title: "Video Support",
        desc: "Limited monthly allocation for video editing of partner-created content."
    },
    {
        icon: User,
        title: "Official Recognition",
        desc: "Recognized partner status with access to official branding and assets."
    },
    {
        icon: Target,
        title: "Performance Renewal",
        desc: "Achieve your annual target to receive free automatic membership renewal."
    }
];

export default function PartnerPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [protocolId, setProtocolId] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/partner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Submission failed");
            }

            const result = await response.json();
            setProtocolId(result.protocolId);
            
            // Meta Pixel Tracking
      if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
        window.fbq('track', 'CompleteRegistration');
      }

            toast.success("Institutional Admission Protocol Initiated.");
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            toast.error(error.message || "Process error. Please retry submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-text-primary">
            <Navbar />

      <main className="grain pt-4 md:pt-8">
        {/* INSTITUTIONAL HERO */}
        <section className="relative py-4 md:py-8 md:pb-20 overflow-hidden border-b border-stroke text-center">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand/[0.03] to-transparent pointer-events-none -z-10" />
          
          <div className="container-max relative z-10 space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                 <div className="w-1 h-1 bg-brand rounded-full" />
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Institutional Partnership</p>
              </div>
              
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-text-primary">
                EXECUTIVE <br /> <span className="text-brand">PARTNER</span> <br /> PROTOCOL.
              </h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
                Connect international enterprises with industry-leading digital architecture. Join a structured strategic program designed for consultants and professional advocates.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 md:pt-6">
                <a href="#apply" className="h-14 px-10 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10">
                  Submit Application <ArrowRight size={14} />
                </a>
                <a href="#about" className="h-14 px-10 border border-stroke text-text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-surface transition-colors flex items-center justify-center gap-3 bg-white">
                  Program Overview <Globe size={14} />
                </a>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-16 border-t border-stroke grid grid-cols-2 md:grid-cols-4 gap-8"
            >
                {[
                    { label: "Verified Development", val: "Software & Web" },
                    { label: "Marketing Mastery", val: "Ads & Socials" },
                    { label: "Creative Authority", val: "Design & Video" },
                    { label: "Global Delivery", val: "International" }
                ].map((item) => (
                    <div key={item.label} className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-brand">{item.label}</p>
                        <p className="text-sm font-black text-text-primary uppercase tracking-tight leading-none">{item.val}</p>
                    </div>
                ))}
            </motion.div>
          </div>
        </section>
                
                {/* INSTITUTIONAL CORE */}
                <section id="about" className="py-20 border-b border-stroke bg-surface/30">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand">Strategic Core</p>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-[0.01em] uppercase leading-[0.9]">INSTITUTIONAL <br /> CORE.</h2>
                                </div>
                                <p className="text-text-secondary text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                    Felconis is a global digital architecture firm dedicated to engineering scalable systems that transform enterprises into tech-first powerhouses. We merge mathematical precision with strategic growth logic.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        "Custom Software Architecture",
                                        "Enterprise Web Ecosystems",
                                        "Strategic Growth Protocols",
                                        "High-Authority Branding",
                                        "Advanced Visual Content"
                                    ].map((service) => (
                                        <div key={service} className="flex items-center gap-3">
                                            <div className="w-1 h-1 bg-brand rounded-full" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:pl-16">
                                <div className="aspect-square bg-white border border-stroke rounded-[3rem] relative overflow-hidden shadow-sm flex items-center justify-center p-12">
                                    <div className="absolute inset-0 bg-brand/[0.02]" />
                                    <div className="text-center space-y-2 relative z-10">
                                        <div className="text-7xl font-black tracking-tighter text-brand leading-none">100%</div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Commitment to <br /> Digital Sovereignty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PARTNERSHIP ARCHITECTURE */}
                <section className="py-20 bg-white border-b border-stroke">
                    <div className="container-max text-center space-y-16">
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand">Protocol Design</p>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9]">PARTNERSHIP <br /> ARCHITECTURE.</h2>
                            <p className="text-text-muted text-base md:text-lg font-medium leading-relaxed">
                                Join a high-integrity network designed to connect global businesses with industry-leading digital services. Built on transparency, ROI, and institutional scale.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {[
                                { title: "Strategic Referral", desc: "Connect enterprises with Felconis digital architecture." },
                                { title: "Executive Agreement", desc: "Facilitate service protocols and project board starts." },
                                { title: "Performance Return", desc: "Access high-tier executive returns on every successful sync." }
                            ].map((step, i) => (
                                <div key={step.title} className="p-10 bg-surface border border-stroke rounded-3xl space-y-4 hover:border-brand/40 transition-colors">
                                    <div className="w-10 h-10 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand text-xs font-black mb-4">
                                        0{i + 1}
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-widest text-text-primary leading-tight">{step.title}</h4>
                                    <p className="text-text-muted text-sm font-medium leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                  {/* MEMBERSHIP & BENCHMARKS */}
                 <section id="details" className="py-20 bg-white relative overflow-hidden">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            {/* PRICING CARD */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="p-10 bg-white border border-stroke rounded-3xl shadow-sm space-y-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.02] rounded-full blur-[80px]" />
                                    
                                    <div className="space-y-6 relative z-10 border-b border-stroke pb-10">
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-md">
                                                <div className="w-1 h-1 bg-brand rounded-full" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Activation</span>
                                            </div>
                                            <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-text-primary">ACCOUNT <br /> ACTIVATION.</h3>
                                        </div>
                                        
                                        <div className="flex items-start gap-1">
                                            <span className="text-2xl font-black text-brand mt-2 leading-none">৳</span>
                                            <div className="flex flex-col">
                                                <span className="text-7xl font-black tracking-tighter text-text-primary leading-none">7,000</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-brand mt-1">BDT / ANNUAL PROTOCOL</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6 relative z-10">
                                        <p className="text-text-muted text-sm font-medium leading-relaxed">
                                            Formalize your strategic partnership. Includes institutional brand assets, professional board support, and high-tier return authorization.
                                        </p>
                                        
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { text: "ANNUAL PERFORMANCE QUOTAS", highlight: false },
                                                { text: "AUTOMATIC PROTOCOL RENEWAL", highlight: true },
                                                { text: "OFFICIAL PARTNER VERIFICATION", highlight: false }
                                            ].map((item) => (
                                                <div key={item.text} className={`p-4 rounded-xl border flex items-center gap-4 transition-colors ${item.highlight ? 'bg-brand/5 border-brand/20' : 'bg-surface border-stroke hover:border-brand/30'}`}>
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.highlight ? 'bg-brand text-white' : 'bg-brand/10 text-brand'}`}>
                                                        <CheckCircle2 size={14} />
                                                    </div>
                                                    <span className={`text-[9px] font-black tracking-widest uppercase ${item.highlight ? 'text-brand' : 'text-text-primary'}`}>{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 relative z-10 border-t border-stroke">
                                        <div className="flex items-center justify-center gap-2 text-text-muted opacity-40">
                                            <ShieldCheck size={14} />
                                            <span className="text-[8px] font-black uppercase tracking-widest">SECURE INSTITUTIONAL ONBOARDING</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-surface border border-stroke rounded-3xl space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Target size={18} className="text-brand" />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-primary">ADMISSIONS CORE</h4>
                                    </div>
                                    <p className="text-text-muted text-sm font-medium leading-relaxed">
                                        Ideal for strategic consultants and executive sales professionals with established enterprise networks and architectural integrity.
                                    </p>
                                </div>
                            </div>

                            {/* BENEFITS GRID */}
                            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {BENEFITS.map((benefit, i) => (
                                    <motion.div 
                                        key={benefit.title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 bg-white border border-stroke rounded-3xl space-y-6 hover:border-brand/40 transition-colors shadow-sm"
                                    >
                                        <div className="w-12 h-12 bg-surface border border-stroke rounded-xl flex items-center justify-center text-brand">
                                            <benefit.icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-black uppercase tracking-widest text-text-primary leading-tight">{benefit.title}</h4>
                                            <p className="text-text-muted text-sm font-medium leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROTOCOL ADMISSION */}
                <section id="apply" className="py-20 bg-surface/30 border-t border-stroke">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            <div className="lg:col-span-5 space-y-12">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand">Institutional Onboarding</p>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">PROTOCOL <br /> <span className="text-brand">ADMISSION.</span></h2>
                                    <p className="text-text-muted text-base md:text-lg font-medium leading-relaxed max-w-sm">
                                        Submit your professional entity for executive review. Approved partners will receive strategic onboard details and membership activation protocols.
                                    </p>
                                </div>
                                
                                <div className="space-y-6 pt-10 border-t border-stroke">
                                    {[
                                        { step: "01", title: "Strategic Review", icon: User },
                                        { step: "02", title: "Institutional Sync", icon: ShieldCheck },
                                        { step: "03", title: "Protocol Activation", icon: Zap }
                                    ].map((item) => (
                                        <div key={item.step} className="flex items-center gap-6 group">
                                            <div className="w-12 h-12 bg-white border border-stroke rounded-xl flex items-center justify-center text-brand">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-brand">Step {item.step}</p>
                                                <p className="text-sm font-black uppercase tracking-widest text-text-primary leading-tight">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                {protocolId ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-12 md:p-16 bg-white border-2 border-brand/20 rounded-3xl shadow-2xl relative overflow-hidden text-center space-y-10 grain"
                                    >
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/[0.03] rounded-full blur-[80px]" />
                                        
                                        <div className="w-20 h-20 bg-brand text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-brand/20 relative z-10">
                                            <ShieldCheck size={40} />
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <h3 className="text-3xl font-black tracking-tight uppercase">PROTOCOL <br /> <span className="text-brand">ACTIVATED.</span></h3>
                                            <p className="text-text-muted text-sm font-medium leading-relaxed max-w-sm mx-auto">
                                                Your institutional admission request has been logged. Use your unique Protocol ID for all strategic communications.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-surface border border-stroke rounded-2xl space-y-3 relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Verified Admission Identity</p>
                                            <p className="text-2xl font-black tracking-widest text-brand selection:bg-brand selection:text-white">{protocolId}</p>
                                        </div>

                                        <div className="pt-6 border-t border-stroke relative z-10">
                                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] animate-pulse">Awaiting Executive Board Review</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="p-10 bg-white border border-stroke rounded-3xl shadow-sm">
                                        <form onSubmit={handleSignup} className="space-y-8">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Full Identity</label>
                                                    <input required name="name" type="text" placeholder="John Doe" className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" />
                                                </div>
                                                 <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Strategic Email</label>
                                                    <input required name="email" type="email" placeholder="john@example.com" className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" />
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Operational Phone</label>
                                                    <input required name="phone" type="tel" placeholder="+880..." className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">WhatsApp Interface</label>
                                                    <input name="whatsapp" type="text" placeholder="wa.me/..." className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Professional Portfolio / LinkedIn</label>
                                                <input name="portfolio" type="url" placeholder="https://linkedin.com/in/..." className="w-full h-12 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium shadow-sm" />
                                            </div>

                                             <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-text-primary ml-1">Strategic Experience</label>
                                                <textarea required name="experience" rows={3} placeholder="Describe your experience in digital sales or corporate consulting..." className="w-full py-4 bg-surface border border-stroke rounded-xl px-6 focus:outline-none focus:border-brand/40 transition-all text-sm font-medium resize-none shadow-sm" />
                                            </div>

                                            <div className="space-y-3 pt-6 border-t border-stroke">
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input required type="checkbox" className="mt-1 w-4 h-4 rounded border-stroke text-brand focus:ring-brand" />
                                                    <span className="text-[10px] text-text-muted font-medium leading-relaxed group-hover:text-text-primary transition-colors">
                                                        I acknowledge the annual protocol activation fee of 7,000 BDT is required for active executive status.
                                                    </span>
                                                </label>
                                                 <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input required type="checkbox" className="mt-1 w-4 h-4 rounded border-stroke text-brand focus:ring-brand" />
                                                    <span className="text-[10px] text-text-muted font-medium leading-relaxed group-hover:text-text-primary transition-colors">
                                                        I agree to the <Link href="/legal/guidelines" className="text-brand hover:underline">institutional partner guidelines</Link> and professional code of conduct.
                                                    </span>
                                                </label>
                                            </div>
                                            
                                            <button disabled={isSubmitting} type="submit" className="w-full h-14 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-brand/10">
                                                 {isSubmitting ? "Processing Protocol Admission..." : "Submit Admission Request"}
                                                <ArrowRight size={14} />
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
