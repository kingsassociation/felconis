"use client";

import CloudinaryAssetInput from "@/app/components/CloudinaryAssetInput";
import { motion } from "framer-motion";
import { FileText, Globe, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upsertBlogPost } from "../actions";

interface BlogFormProps {
  initialData?: any;
  categories: any[];
  authors: any[];
}

export default function BlogForm({ initialData, categories, authors }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    await upsertBlogPost(formData);
    
    setIsSubmitting(false);
    router.push("/admin/blog");
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
        {/* Main Content Node */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
             <label className="text-[10px] font-brand tracking-widest text-brand ml-1">BROADCAST TITLE</label>
             <input 
               name="title" 
               defaultValue={initialData?.title} 
               required
               placeholder="E.G. ENGINEERING GROWTH: WHY TRADITIONAL MARKETING IS DYING"
               className="w-full h-16 bg-surface border border-stroke rounded-2xl px-8 text-sm font-bold uppercase tracking-tight focus:border-brand outline-none transition-all placeholder:text-text-muted/30"
             />
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-brand tracking-widest text-brand ml-1">BROADCAST CONTENT (INTEL PROTOCOL)</label>
             <textarea 
               name="content" 
               defaultValue={initialData?.content} 
               required
               rows={15}
               className="w-full bg-surface border border-stroke rounded-2xl p-8 text-sm font-medium leading-relaxed focus:border-brand outline-none transition-all resize-none"
               placeholder="INITIATE INTEL BROADCAST CONTENT..."
             />
          </div>
        </div>

        {/* Configuration Nodes */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-surface border border-stroke rounded-[2rem] p-8 space-y-8">
             <div className="flex items-center gap-3 text-brand">
                <Globe size={18} />
                <h3 className="text-xs font-brand tracking-widest">DEPLOYMENT RADIUS</h3>
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">ROUTE SLUG</label>
                   <input 
                     name="slug" 
                     defaultValue={initialData?.slug} 
                     required
                     placeholder="GROWTH-ENGINEERING"
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">INTELLIGENCE SECTOR</label>
                   <select 
                     name="categoryId" 
                     defaultValue={initialData?.categoryId}
                     required
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all appearance-none cursor-pointer"
                   >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                   </select>
                </div>

                <div className="space-y-3">
                   <label className="text-[9px] font-brand tracking-widest text-text-muted">INSTITUTIONAL LEAD</label>
                   <select 
                     name="authorId" 
                     defaultValue={initialData?.authorId}
                     required
                     className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all appearance-none cursor-pointer"
                   >
                      {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                      ))}
                   </select>
                </div>

                <div className="pt-4 border-t border-stroke/50">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                name="isStatic" 
                                defaultChecked={initialData?.isStatic}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-stroke rounded-full peer peer-checked:bg-brand transition-all"></div>
                            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
                        </div>
                        <span className="text-[9px] font-brand tracking-widest text-text-muted group-hover:text-brand transition-colors">AUTHORITY LAYOUT (PREMIUM LONG-FORM)</span>
                    </label>
                </div>
             </div>
          </div>

          <div className="bg-white border border-stroke rounded-[2rem] p-8 space-y-8 shadow-sm">
             <div className="flex items-center gap-3 text-brand">
                <FileText size={18} />
                <h3 className="text-xs font-brand tracking-widest">VISUAL ASSET</h3>
             </div>

             <CloudinaryAssetInput 
               label="Asset Cloud URL"
               name="image"
               defaultValue={initialData?.image || ""}
               aspectRatio="video"
             />
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
            ABORT BROADCAST
         </button>
         <button 
           type="submit" 
           disabled={isSubmitting}
           className="w-full sm:w-auto h-14 px-12 bg-brand text-white rounded-xl text-[10px] font-brand tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center justify-center gap-3 disabled:opacity-50"
         >
            <Save size={16} />
            {isSubmitting ? "SYNCHRONIZING..." : "COMMIT INTEL"}
         </button>
      </div>
    </motion.form>
  );
}
