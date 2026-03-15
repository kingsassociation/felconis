"use client";

import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertJob } from "../actions";

interface JobFormProps {
  initialData?: any;
}

export default function JobForm({ initialData }: JobFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await upsertJob(formData);
    
    setIsSubmitting(false);
    router.push("/admin/careers");
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
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Position Title</label>
            <input 
              name="title" 
              defaultValue={initialData?.title} 
              required
              placeholder="E.G. SENIOR BACKEND ENGINEER"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Route Slug</label>
            <input 
              name="slug" 
              defaultValue={initialData?.slug} 
              required
              placeholder="E.G. SNR-BACKEND-ENG"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Department</label>
            <input 
              name="department" 
              defaultValue={initialData?.department} 
              required
              placeholder="E.G. ENGINEERING"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Location</label>
            <input 
              name="location" 
              defaultValue={initialData?.location} 
              required
              placeholder="E.G. REMOTE / DHAKA"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Job Type</label>
            <select 
              name="type" 
              defaultValue={initialData?.type || "FULL_TIME"}
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all appearance-none"
            >
               <option value="FULL_TIME">FULL_TIME</option>
               <option value="PART_TIME">PART_TIME</option>
               <option value="CONTRACT">CONTRACT</option>
            </select>
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Recompense (Salary)</label>
            <input 
              name="salary" 
              defaultValue={initialData?.salary} 
              placeholder="E.G. $60K - $90K"
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         
         <div className="flex items-center gap-4 py-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="active" 
                defaultChecked={initialData?.id ? initialData.active : true} 
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stroke peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
              <span className="ms-3 text-[10px] font-black uppercase tracking-widest text-text-muted">Active Listing</span>
            </label>
         </div>

         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Job Overview</label>
            <textarea 
              name="overview" 
              defaultValue={initialData?.overview} 
              required
              rows={3}
              className="w-full bg-surface border border-stroke rounded-xl p-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all resize-none"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Detailed Description</label>
            <textarea 
              name="description" 
              defaultValue={initialData?.description} 
              required
              rows={4}
              className="w-full bg-surface border border-stroke rounded-xl p-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all resize-none"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Requirements (Comma Separated)</label>
            <input 
              name="requirements" 
              defaultValue={initialData?.requirements?.join(", ")} 
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Responsibilities (Comma Separated)</label>
            <input 
              name="responsibilities" 
              defaultValue={initialData?.responsibilities?.join(", ")} 
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
            />
         </div>
         <div className="space-y-4 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Benefits (Comma Separated)</label>
            <input 
              name="benefits" 
              defaultValue={initialData?.benefits?.join(", ")} 
              className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-[11px] font-black uppercase tracking-widest focus:border-brand outline-none transition-all"
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
            CANCEL
         </button>
         <button 
           type="submit" 
           disabled={isSubmitting}
           className="h-14 px-12 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center gap-3 disabled:opacity-50"
         >
            <Save size={16} />
            {isSubmitting ? "SAVING..." : "SAVE JOB POSTING"}
         </button>
      </div>
    </motion.form>
  );
}
