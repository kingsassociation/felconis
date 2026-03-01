"use client";

import { Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { upsertTestimonial } from "../actions";

export default function TestimonialForm({ testimonial }: { testimonial?: any }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      id: testimonial?.id || "new",
      name: formData.get("name"),
      company: formData.get("company"),
      designation: formData.get("designation"),
      photo: formData.get("photo"),
      quote: formData.get("quote"),
    };

    try {
      await upsertTestimonial(data);
      toast.success("Experience record synchronized successfully.");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (error) {
      toast.error("Process error. Protocol alignment failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">RECORD <span className="text-brand">EXPERIENCE.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">PARTNER TESTIMONIAL CONFIGURATION</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] border border-stroke p-12 shadow-sm space-y-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Partner Identity</label>
               <input required name="name" defaultValue={testimonial?.name} type="text" placeholder="Full Name" className="input-field h-14 text-sm font-bold uppercase" />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Organization</label>
               <input required name="company" defaultValue={testimonial?.company} type="text" placeholder="Company Name" className="input-field h-14 text-sm font-bold uppercase" />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Partner Designation</label>
               <input name="designation" defaultValue={testimonial?.designation} type="text" placeholder="CEO / Founder" className="input-field h-14 text-sm font-bold uppercase" />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Photo Reference URL</label>
               <input name="photo" defaultValue={testimonial?.photo} type="text" placeholder="https://..." className="input-field h-14 text-sm font-bold uppercase" />
            </div>
         </div>

         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Strategic Quote</label>
            <textarea required name="quote" defaultValue={testimonial?.quote} rows={6} placeholder="How was the partnership experience?" className="input-field h-auto py-6 text-sm font-bold uppercase resize-none" />
         </div>

         <div className="flex gap-6 pt-6">
            <button disabled={isPending} type="submit" className="flex-grow h-14 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center justify-center gap-3">
               <Save size={18} /> {isPending ? "SYNCHRONIZING..." : "SYNCHRONIZE RECORD"}
            </button>
            <Link href="/admin/testimonials" className="w-14 h-14 border border-stroke rounded-xl text-text-muted hover:bg-surface transition-colors flex items-center justify-center">
               <X size={20} />
            </Link>
         </div>
      </form>
    </div>
  );
}
