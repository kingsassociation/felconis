"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import { Briefcase, FileText, Save, Target, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertCaseStudy } from "./actions";

interface CaseStudyFormProps {
  initialData?: any;
}

export default function CaseStudyForm({ initialData }: CaseStudyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await upsertCaseStudy(formData);
    
    setIsSubmitting(false);
    router.push("/admin/work");
    router.refresh();
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white border border-stroke rounded-[3rem] p-12 space-y-12 shadow-sm relative overflow-hidden"
    >
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Impact Node */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
             <label className="text-[10px] font-brand tracking-widest text-brand ml-1">IMPACT TITLE</label>
             <input 
               name="title" 
               defaultValue={initialData?.title} 
               required
               placeholder="E.G. REVENUE SCALING FOR RAAFIDAN"
               className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold uppercase tracking-tight focus:border-brand outline-none transition-all placeholder:text-text-muted/30"
             />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
               <label className="text-[10px] font-brand tracking-widest text-brand ml-1">CLIENT IDENTITY</label>
               <input 
                 name="clientName" 
                 defaultValue={initialData?.clientName} 
                 required
                 placeholder="E.G. RAAFIDAN ENTERPRISE"
                 className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
               />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-brand tracking-widest text-brand ml-1">SECTOR / VERTICAL</label>
               <input 
                 name="tag" 
                 defaultValue={initialData?.tag} 
                 required
                 placeholder="E.G. E-COMMERCE SCALE"
                 className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
               />
            </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-brand tracking-widest text-brand ml-1">THE PROBLEM (DIAGNOSTIC)</label>
             <textarea 
               name="problem" 
               defaultValue={initialData?.problem} 
               required
               rows={4}
               className="w-full bg-surface border border-stroke rounded-2xl p-8 text-sm font-medium leading-relaxed focus:border-brand outline-none transition-all resize-none"
               placeholder="DEFINE THE STRATEGIC BLOCKER..."
             />
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-brand tracking-widest text-brand ml-1">STRATEGIC STRATEGY (PROTOCOL)</label>
             <textarea 
               name="strategy" 
               defaultValue={initialData?.strategy} 
               required
               rows={4}
               className="w-full bg-surface border border-stroke rounded-2xl p-8 text-sm font-medium leading-relaxed focus:border-brand outline-none transition-all resize-none"
               placeholder="DEFINE THE GROWTH ENGINEERING PROTOCOL..."
             />
          </div>
        </div>

        {/* Configuration Nodes */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-surface border border-stroke rounded-[2rem] p-8 space-y-8">
             <div className="flex items-center gap-3 text-brand">
                <Target size={18} />
                <h3 className="text-xs font-brand tracking-widest">KPI METRICS</h3>
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">IMPACT STAT</label>
                   <input 
                     name="stats" 
                     defaultValue={initialData?.stats} 
                     required
                     placeholder="+220%"
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[11px] font-brand tracking-tight focus:border-brand outline-none transition-all"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">KPI GAINED</label>
                   <input 
                     name="kpi" 
                     defaultValue={initialData?.kpi} 
                     required
                     placeholder="REVENUE ACCELERATION"
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">PROTOCOL DURATION</label>
                   <input 
                     name="duration" 
                     defaultValue={initialData?.duration} 
                     placeholder="4 MONTHS"
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
                   />
                </div>
                
                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">ROUTE SLUG</label>
                   <input 
                     name="slug" 
                     defaultValue={initialData?.slug} 
                     required
                     placeholder="GROWTH-PROTOCOL"
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
                   />
                </div>
             </div>
          </div>

          <div className="bg-white border border-stroke rounded-[2rem] p-8 space-y-8 shadow-sm">
             <div className="flex items-center gap-3 text-brand">
                <Briefcase size={18} />
                <h3 className="text-xs font-brand tracking-widest">VISUAL ASSET</h3>
             </div>

             <div className="space-y-6">
                <div className="aspect-video w-full rounded-xl bg-surface border border-stroke overflow-hidden relative group">
                   {imageUrl ? (
                     <img 
                       src={getCloudinaryUrl(imageUrl)} 
                       alt="Preview" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-text-muted gap-2">
                        <FileText size={24} />
                        <span className="text-[8px] font-brand tracking-widest">ASSET PENDING</span>
                     </div>
                   )}
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">ASSET CLOUD URL</label>
                   <input 
                     name="image" 
                     value={imageUrl}
                     onChange={(e) => setImageUrl(e.target.value)}
                     placeholder="HTTPS://CLOUDINARY.COM/..."
                     className="w-full h-12 bg-surface border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
                   />
                </div>
             </div>
          </div>
        </aside>
      </div>

      <div className="pt-12 border-t border-stroke flex flex-col sm:flex-row justify-between items-center gap-6">
         <button 
           type="button" 
           onClick={() => router.back()}
           className="w-full sm:w-auto h-14 px-10 border border-stroke rounded-xl text-[10px] font-brand tracking-widest hover:bg-surface transition-all flex items-center justify-center gap-3"
         >
            <X size={16} />
            ABORT MISSION
         </button>
         <button 
           type="submit" 
           disabled={isSubmitting}
           className="w-full sm:w-auto h-14 px-12 bg-brand text-white rounded-xl text-[10px] font-brand tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center justify-center gap-3 disabled:opacity-50"
         >
            <Save size={16} />
            {isSubmitting ? "CONSOLIDATING IMPACT..." : "COMMIT IMPACT"}
         </button>
      </div>
    </motion.form>
  );
}
