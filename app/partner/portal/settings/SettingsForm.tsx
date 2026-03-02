"use client";

import CloudinaryAssetInput from "@/app/components/CloudinaryAssetInput";
import { updatePartnerProfile } from "@/app/partner/portal/settings/actions";
import {
   Bell,
   Lock,
   Save,
   Shield,
   User,
   Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PartnerSettingsPage({ partner }: { partner: any }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updatePartnerProfile(formData);

    if (result.success) {
      toast.success(result.success);
    } else if (result.error) {
      toast.error(result.error);
    }
    
    setIsUpdating(false);
  }

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary">PORTAL <span className="text-brand">SETTINGS.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">MANAGE INSTITUTIONAL IDENTITY AND SECURITY PROTOCOLS</p>
         </div>
         <button 
           type="submit"
           form="settings-form"
           disabled={isUpdating}
           className="h-12 px-8 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-brand/10 disabled:opacity-50"
         >
            {isUpdating ? "SYNCHRONIZING..." : "SAVE CHANGES"} <Save size={14} />
         </button>
      </div>

      <form id="settings-form" onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Identity Section */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                     <User size={20} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">IDENTITY PROTOCOLS.</h3>
                     <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">PUBLIC PARTNER PROFILE INFORMATION</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Full Legal Name</label>
                           <input name="name" type="text" defaultValue={partner.name} className="input-field h-14 px-6 text-sm font-bold uppercase" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Official Email</label>
                           <input disabled type="email" defaultValue={partner.email} className="input-field h-14 px-6 text-sm font-bold uppercase opacity-60 cursor-not-allowed" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Phone / WhatsApp</label>
                           <input name="phone" type="text" defaultValue={partner.phone} className="input-field h-14 px-6 text-sm font-bold uppercase" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Strategic Portfolio (Link)</label>
                           <input name="portfolio" type="text" defaultValue={partner.portfolio || ""} placeholder="HTTPS://PORTFOLIO.COM" className="input-field h-14 px-6 text-sm font-bold uppercase" />
                        </div>
                     </div>
                  </div>

                  <CloudinaryAssetInput 
                    label="Node Identity (Avatar)"
                    name="image"
                    defaultValue={partner.image || ""}
                    aspectRatio="square"
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Professional Bio / Mission</label>
                  <textarea name="experience" rows={4} className="input-field p-6 text-sm font-bold uppercase resize-none" defaultValue={partner.experience || ""} />
               </div>
            </div>

            <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                     <Lock size={20} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">SECURITY ACCESS.</h3>
                     <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">MANAGE PORTAL ACCESS CREDENTIALS</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">New Password</label>
                     <input name="password" type="password" placeholder="••••••••" className="input-field h-14 px-6 text-sm font-bold uppercase" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Confirm Protocol</label>
                     <input type="password" placeholder="••••••••" className="input-field h-14 px-6 text-sm font-bold uppercase" />
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Controls */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-stroke rounded-[2.5rem] p-10 shadow-sm space-y-8">
               <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">PREFERENCES.</h3>
               
               <div className="space-y-6">
                  {[
                    { label: "Pipeline Alerts", desc: "Notify on lead status change", icon: Bell },
                    { label: "Yield Reports", desc: "Monthly financial synchronization", icon: Zap },
                    { label: "Two-Factor Auth", desc: "Enhanced access security", icon: Shield },
                  ].map((pref: any, i: number) => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-text-muted transition-colors group-hover:text-brand">
                             <pref.icon size={16} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">{pref.label}</p>
                             <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">{pref.desc}</p>
                          </div>
                       </div>
                       <div className="w-10 h-6 bg-brand/10 border border-brand/20 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-brand rounded-full transition-all" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 bg-red-50 border border-red-100 rounded-[2rem] space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Institutional Danger Zone</p>
               <h4 className="text-sm font-black uppercase tracking-tight text-text-primary">Delete Partner Account</h4>
               <p className="text-[10px] font-semibold text-text-muted leading-relaxed uppercase">
                 Permanently terminate your institutional partnership and discard all yield history.
               </p>
               <button type="button" className="w-full h-12 border border-red-200 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  Terminate Node
               </button>
            </div>
         </aside>
      </form>
    </div>
  );
}
