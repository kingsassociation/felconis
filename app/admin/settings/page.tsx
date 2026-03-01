import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
    Bell,
    Lock,
    Shield,
    User,
    Zap
} from "lucide-react";
import { redirect } from "next/navigation";
import { updateAdminPassword, updateAdminProfile } from "./actions";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/portal/login");
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.id }
  });

  if (!admin) {
    redirect("/portal/login");
  }

  return (
    <div className="space-y-12 max-w-5xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-brand tracking-tight text-text-primary">ADMIN <span className="text-brand">SETTINGS.</span></h1>
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">CONTROL HUB CONFIGURATION AND SECURITY AUDIT</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-8">
           <form action={updateAdminProfile} className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <User size={20} />
                 </div>
                 <div>
                    <h3 className="text-xl font-brand tracking-tight text-text-primary">EXECUTIVE PROFILE.</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">ADMINISTRATOR IDENTITY PROTOCOLS</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand ml-1">Full Legal Name</label>
                    <input name="name" type="text" defaultValue={admin.name || ""} className="input-field h-14 px-6 text-sm font-bold uppercase" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand ml-1">Official Email</label>
                    <input disabled type="email" defaultValue={admin.email} className="input-field h-14 px-6 text-sm font-bold uppercase opacity-60 cursor-not-allowed" />
                 </div>
              </div>
              
              <button type="submit" className="btn-primary w-full md:w-auto px-12">
                 SYNCHRONIZE PROFILE
              </button>
           </form>

           <form action={updateAdminPassword} className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <Lock size={20} />
                 </div>
                 <div>
                    <h3 className="text-xl font-brand tracking-tight text-text-primary">SECURITY ACCESS.</h3>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">MANAGE CONTROL HUB CREDENTIALS</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand ml-1">New Password</label>
                    <input name="password" type="password" placeholder="••••••••" className="input-field h-14 px-6 text-sm font-bold" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand ml-1">Confirm Protocol</label>
                    <input name="confirmPassword" type="password" placeholder="••••••••" className="input-field h-14 px-6 text-sm font-bold" />
                 </div>
              </div>

              <button type="submit" className="btn-primary w-full md:w-auto px-12">
                 UPDATE CREDENTIALS
              </button>
           </form>
        </div>

        <aside className="md:col-span-4 space-y-8">
           <div className="bg-white border border-stroke rounded-[2.5rem] p-8 shadow-sm space-y-8">
              <h3 className="text-lg font-brand tracking-tight text-text-primary">SYSTEM NOTIFICATIONS.</h3>
              <div className="space-y-6">
                 {[
                   { label: "New Leads", icon: Zap },
                   { label: "Applications", icon: Bell },
                   { label: "Security Alerts", icon: Shield },
                 ].map((pref, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-muted group-hover:text-brand">
                            <pref.icon size={14} />
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{pref.label}</p>
                      </div>
                      <div className="w-8 h-4 bg-brand/10 border border-brand/20 rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-0.5 w-3 h-3 bg-brand rounded-full" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
