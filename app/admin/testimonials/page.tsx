import { getCloudinaryUrl } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { Plus, Quote, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteTestimonial } from "../actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany();

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">EXPERIENCE <span className="text-brand">RECORDS.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">MANAGE INSTITUTIONAL CREDIBILITY AND TESTIMONIALS</p>
         </div>
         <Link href="/admin/testimonials/new" className="h-12 px-8 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-brand/10">
            <Plus size={16} /> Record Experience
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {testimonials.map((test: any) => (
            <div key={test.id} className="bg-white border border-stroke rounded-2xl p-8 space-y-6 group hover:border-brand/40 transition-all shadow-sm">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                     <Quote size={20} />
                  </div>
                  <div className="flex gap-4">
                     <Link href={`/admin/testimonials/${test.id}`} className="h-10 px-6 border border-stroke rounded-lg text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-brand/40 hover:text-brand transition-all flex items-center justify-center">
                        EDIT
                     </Link>
                     <form action={deleteTestimonial.bind(null, test.id)}>
                        <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                           <Trash2 size={16} />
                        </button>
                     </form>
                  </div>
               </div>
               
               <p className="text-sm font-medium text-text-secondary leading-relaxed line-clamp-3 italic">"{test.quote}"</p>
               
                <div className="flex items-center gap-4 pt-6 border-t border-stroke">
                   <div className="w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-brand font-bold uppercase transition-all group-hover:bg-brand group-hover:text-white group-hover:border-brand overflow-hidden">
                      {test.photo ? (
                        <img src={getCloudinaryUrl(test.photo)} alt={test.name} className="w-full h-full object-cover" />
                      ) : (
                        test.name[0]
                      )}
                   </div>
                  <div>
                     <p className="text-xs font-black uppercase tracking-tight text-text-primary">{test.name}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">{test.designation || test.company}</p>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
