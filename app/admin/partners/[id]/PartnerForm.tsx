"use client";

import { updatePartnerProfile } from "@/app/admin/partners/actions";
import CloudinaryAssetInput from "@/app/components/CloudinaryAssetInput";
import { 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Briefcase, 
  Award,
  ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PartnerForm({ partner }: { partner: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        await updatePartnerProfile(formData);
        toast.success("Partner profile updated successfully");
        router.push("/admin/partners");
      } catch (error) {
        toast.error("Failed to update partner profile");
      }
    });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex justify-between items-center">
         <button 
           onClick={() => router.back()}
           className="group flex items-center gap-2 text-text-muted hover:text-brand transition-colors text-[10px] font-bold uppercase tracking-widest"
         >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO NETWORK
         </button>
      </div>

      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">EDIT <span className="text-brand">PARTNER.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE PARTNER DETAILS, SKILLS, AND EXPERIENCE</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <input type="hidden" name="id" value={partner.id} />
         
         {/* Profile Information */}
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[2.5rem] border border-stroke p-12 shadow-sm space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
                     <User size={20} />
                  </div>
                  <h3 className="text-xs font-brand tracking-widest">PERSONAL INFORMATION</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">FULL NAME</label>
                     <input required name="name" defaultValue={partner.name} type="text" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">EMAIL ADDRESS</label>
                     <input required name="email" defaultValue={partner.email} type="email" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">PHONE NUMBER</label>
                     <input required name="phone" defaultValue={partner.phone} type="text" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">WHATSAPP (OPTIONAL)</label>
                     <input name="whatsapp" defaultValue={partner.whatsapp} type="text" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold focus:border-brand outline-none transition-all" />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-stroke p-12 shadow-sm space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
                     <Briefcase size={20} />
                  </div>
                  <h3 className="text-xs font-brand tracking-widest">QUALIFICATIONS & EXPERIENCE</h3>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-brand tracking-widest text-brand ml-1">EXPERIENCE OVERVIEW</label>
                  <textarea name="experience" defaultValue={partner.experience} rows={6} placeholder="DESCRIBE PARTNER EXPERIENCE..." className="w-full bg-surface border border-stroke rounded-xl p-8 text-sm font-medium leading-relaxed focus:border-brand outline-none transition-all resize-none" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">SKILLS (COMMA SEPARATED)</label>
                     <input name="skills" defaultValue={partner.skills?.join(", ")} type="text" placeholder="E.G. MARKETING, SALES, SEO" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">INTERESTS (COMMA SEPARATED)</label>
                     <input name="interests" defaultValue={partner.interests?.join(", ")} type="text" placeholder="E.G. E-COMMERCE, REAL ESTATE" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar Actions */}
         <aside className="lg:col-span-4 space-y-10">
            <div className="bg-surface border border-stroke rounded-[2rem] p-8 space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <Award size={20} />
                  <h3 className="text-xs font-brand tracking-widest">PROFILE IMAGE</h3>
               </div>

               <CloudinaryAssetInput 
                 label="Cloudinary URL"
                 name="image"
                 defaultValue={partner.image || ""}
                 aspectRatio="square"
               />
            </div>

            <div className="flex flex-col gap-4">
               <button disabled={isPending} type="submit" className="w-full h-16 bg-brand text-white text-[10px] font-brand tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center justify-center gap-3 disabled:opacity-50">
                  <Save size={18} /> {isPending ? "SAVING..." : "SAVE CHANGES"}
               </button>
               <button type="button" onClick={() => router.back()} className="w-full h-14 border border-stroke rounded-2xl text-[10px] font-brand tracking-widest text-text-muted hover:bg-surface transition-all flex items-center justify-center gap-3">
                  <X size={18} /> CANCEL
               </button>
            </div>
         </aside>
      </form>
    </div>
  );
}
