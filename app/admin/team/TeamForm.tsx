"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { Image as ImageIcon, Link as LinkIcon, Save, Shield, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { upsertTeamMember } from "../actions";

export default function TeamForm({ member }: { member?: any }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [imageUrl, setImageUrl] = useState(member?.image || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      id: member?.id || "new",
      name: formData.get("name"),
      role: formData.get("role"),
      image: formData.get("image"),
      bio: formData.get("bio"),
      linkedin: formData.get("linkedin"),
      twitter: formData.get("twitter"),
      order: parseInt(formData.get("order") as string) || 0,
    };

    try {
      await upsertTeamMember(data);
      toast.success("Institutional Leadership Node Synchronized.");
      router.push("/admin/team");
      router.refresh();
    } catch (error) {
      toast.error("Process error. Protocol alignment failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">CONFIGURE <span className="text-brand">LEADER.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">TEAM MEMBER ARCHITECTURAL SETTINGS & IDENTITY PROTOCOLS</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Identity Node */}
         <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[2.5rem] border border-stroke p-12 shadow-sm space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
                     <User size={20} />
                  </div>
                  <h3 className="text-xs font-brand tracking-widest">IDENTITY CORE</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">FULL LEGAL NAME</label>
                     <input required name="name" defaultValue={member?.name} type="text" placeholder="E.G. JOHN DOE" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">INSTITUTIONAL ROLE</label>
                     <input required name="role" defaultValue={member?.role} type="text" placeholder="E.G. CHIEF STRATEGIST" className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-brand tracking-widest text-brand ml-1">BIO / MISSION PROTOCOL</label>
                  <textarea name="bio" defaultValue={member?.bio} rows={6} placeholder="INSTITUTIONAL BIO SUMMARY..." className="w-full bg-surface border border-stroke rounded-xl p-8 text-sm font-medium leading-relaxed focus:border-brand outline-none transition-all resize-none" />
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-stroke p-12 shadow-sm space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
                     <LinkIcon size={20} />
                  </div>
                  <h3 className="text-xs font-brand tracking-widest">SOCIAL NODES</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">LINKEDIN URL</label>
                     <input name="linkedin" defaultValue={member?.linkedin} type="text" placeholder="HTTPS://LINKEDIN.COM/..." className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-brand tracking-widest text-brand ml-1">TWITTER / X URL</label>
                     <input name="twitter" defaultValue={member?.twitter} type="text" placeholder="HTTPS://TWITTER.COM/..." className="w-full h-14 bg-surface border border-stroke rounded-xl px-6 text-sm font-bold uppercase focus:border-brand outline-none transition-all" />
                  </div>
               </div>
            </div>
         </div>

         {/* Configuration Node */}
         <aside className="lg:col-span-4 space-y-10">
            <div className="bg-surface border border-stroke rounded-[2rem] p-8 space-y-10">
               <div className="flex items-center gap-4 text-brand">
                  <ImageIcon size={20} />
                  <h3 className="text-xs font-brand tracking-widest">VISUAL ASSET</h3>
               </div>

               <div className="space-y-6">
                  <div className="aspect-[4/5] w-full rounded-2xl bg-white border border-stroke overflow-hidden relative group shadow-sm">
                     {imageUrl ? (
                        <img 
                           src={getCloudinaryUrl(imageUrl)} 
                           alt="Preview" 
                           className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        />
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-text-muted/30 gap-4">
                           <User size={64} />
                           <span className="text-[8px] font-brand tracking-widest text-center">ASSET PENDING<br/>SYNCHRONIZATION</span>
                        </div>
                     )}
                  </div>

                  <div className="space-y-4">
                     <label className="text-[9px] font-brand tracking-widest text-text-muted">ASSET CLOUD URL</label>
                     <input 
                        name="image" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="HTTPS://CLOUDINARY.COM/..." 
                        className="w-full h-12 bg-white border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all" 
                     />
                     <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-text-muted px-1 text-center">MEDIA PROTOCOL ACTIVE</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-stroke p-8 space-y-8 shadow-sm">
               <div className="flex items-center gap-4 text-brand">
                  <Shield size={20} />
                  <h3 className="text-xs font-brand tracking-widest">PRIORITY</h3>
               </div>
               <div className="space-y-4">
                  <label className="text-[9px] font-brand tracking-widest text-text-muted">ORDER WEIGHT</label>
                  <input name="order" defaultValue={member?.order || 0} type="number" className="w-full h-12 bg-surface border border-stroke rounded-xl px-4 text-[10px] font-bold uppercase tracking-widest focus:border-brand outline-none transition-all" />
                  <p className="text-[7px] font-medium text-text-muted italic">Lower value = higher institutional priority.</p>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <button disabled={isPending} type="submit" className="w-full h-16 bg-brand text-white text-[10px] font-brand tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-brand/10 flex items-center justify-center gap-3 disabled:opacity-50">
                  <Save size={18} /> {isPending ? "SYNCHRONIZING..." : "SYNCHRONIZE LEADER"}
               </button>
               <button type="button" onClick={() => router.back()} className="w-full h-14 border border-stroke rounded-2xl text-[10px] font-brand tracking-widest text-text-muted hover:bg-surface transition-all flex items-center justify-center gap-3">
                  <X size={18} /> ABORT PROTOCOL
               </button>
            </div>
         </aside>
      </form>
    </div>
  );
}
