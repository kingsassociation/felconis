"use client";

import CloudinaryAssetInput from "@/app/components/CloudinaryAssetInput";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertService } from "../actions";

interface ServiceFormProps {
  initialData?: any;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await upsertService(formData);
    
    setIsSubmitting(false);
    router.push("/admin/services");
    router.refresh();
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white border border-stroke rounded-[2rem] p-12 space-y-10 shadow-sm"
    >
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Node Title</label>
            <input 
              name="title" 
              defaultValue={initialData?.title} 
              required
              placeholder="E.G. GROWTH ENGINE"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Route Slug</label>
            <input 
              name="slug" 
              defaultValue={initialData?.slug} 
              required
              placeholder="E.G. GROWTH-ENGINE"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Subtitle / Signal</label>
            <input 
              name="subtitle" 
              defaultValue={initialData?.subtitle} 
              placeholder="E.G. HIGH-VELOCITY ACQUISITION INFRASTRUCTURE"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Strategic Overview</label>
            <textarea 
              name="description" 
              defaultValue={initialData?.description} 
              required
              rows={4}
              className="w-full bg-surface border border-stroke rounded-xl p-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all resize-none"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Sector / Category</label>
            <select 
              name="category" 
              defaultValue={initialData?.category || "MARKETING"}
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all appearance-none"
            >
               <option value="MARKETING">MARKETING</option>
               <option value="SOFTWARE">SOFTWARE</option>
               <option value="AI">AI</option>
            </select>
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Signal Icon (Lucide)</label>
            <input 
              name="icon" 
              defaultValue={initialData?.icon} 
              placeholder="E.G. Zap, Globe, Briefcase"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <CloudinaryAssetInput 
              label="Primary Visual Asset (Cloud URL)"
              name="image"
              defaultValue={initialData?.image || ""}
              aspectRatio="video"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Core Features (Comma Separated)</label>
            <input 
              name="features" 
              defaultValue={initialData?.features?.join(", ")} 
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Institutional Highlights (JSON)</label>
            <textarea 
              name="highlights" 
              defaultValue={JSON.stringify(initialData?.highlights || [], null, 2)} 
              rows={6}
              className="w-full bg-surface border border-stroke rounded-xl p-6 font-mono text-[11px] focus:border-brand outline-none transition-all resize-none"
            />
         </div>
      </div>

      <div className="pt-10 border-t border-stroke flex justify-between items-center">
         <button 
           type="button" 
           onClick={() => router.back()}
           className="h-14 px-10 border border-stroke rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface transition-all flex items-center gap-3"
         >
            <X size={16} />
            ABORT MISSION
         </button>
         <button 
           type="submit" 
           disabled={isSubmitting}
           className="h-14 px-12 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center gap-3 disabled:opacity-50"
         >
            <Save size={16} />
            {isSubmitting ? "DEPLOYING..." : "COMMIT CHANGES"}
         </button>
      </div>
    </motion.form>
  );
}
