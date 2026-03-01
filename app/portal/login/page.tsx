"use client";

import { login } from "@/app/portal/login/actions";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function UnifiedLoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [loginType, setLoginType] = useState<"ADMIN" | "PARTNER">("PARTNER");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("loginType", loginType);

    try {
      const result = await login(formData);
      if (result?.error) {
        toast.error(result.error);
        setIsPending(false);
      }
    } catch (err) {
      // Redirects in server actions throw errors, catch non-redirect errors
      if (!(err instanceof Error && err.message === "NEXT_REDIRECT")) {
        toast.error("Institutional protocol failure.");
        setIsPending(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 grain relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/[0.03] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/[0.02] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 -z-10" />

      <div className="w-full max-w-2xl space-y-12 py-12">
        {/* LOGO & HEADER */}
        <div className="text-center space-y-8">
           <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/10 transition-transform group-hover:scale-105">
                 <Zap size={28} fill="currentColor" />
              </div>
              <div className="text-left">
                 <p className="text-2xl font-black uppercase tracking-tighter text-text-primary leading-none">FELCONIS</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand mt-1">Institutional Portal</p>
              </div>
           </Link>
           
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-primary whitespace-nowrap">
             PORTAL ACCESS.
           </h1>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[2.5rem] border border-stroke p-10 md:p-16 shadow-2xl relative">
           <div className="flex p-1.5 bg-surface rounded-2xl border border-stroke mb-10">
              <button 
                type="button"
                onClick={() => setLoginType("PARTNER")}
                className={`flex-grow h-12 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginType === "PARTNER" ? "bg-white text-brand shadow-md" : "text-text-muted hover:text-brand"}`}
              >
                 Partner Portal
              </button>
              <button 
                type="button"
                onClick={() => setLoginType("ADMIN")}
                className={`flex-grow h-12 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${loginType === "ADMIN" ? "bg-white text-brand shadow-md" : "text-text-muted hover:text-brand"}`}
              >
                 Executive Hub
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Identity Signal</label>
                 <div className="relative group">
                    <input name="email" required type="email" placeholder="official@felconis.com" className="input-field h-14 pl-12 text-sm font-bold uppercase transition-all" />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={18} />
                 </div>
              </div>

              <div className="space-y-2.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Access Protocol</label>
                 <div className="relative group">
                    <input 
                      name="password"
                      required 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="input-field h-14 pl-12 pr-12 text-sm font-bold transition-all" 
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={18} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
              </div>

              <div className="pt-4">
                 <button disabled={isPending} type="submit" className="w-full h-14 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center justify-center gap-3">
                    {isPending ? "SYNCHRONIZING..." : `ALIGN TO ${loginType} HUB`}
                    <ArrowRight size={16} />
                 </button>
              </div>
           </form>

           <div className="mt-12 pt-8 border-t border-stroke flex items-center justify-center gap-3 text-text-muted">
              <ShieldCheck size={16} className="text-brand shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">End-to-End Institutional Encryption</p>
           </div>
        </div>

        <div className="text-center">
           <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-brand transition-colors inline-flex items-center gap-2">
              <ArrowRight size={12} className="rotate-180" />
              Return to Public Node
           </Link>
        </div>
      </div>
    </div>
  );
}
