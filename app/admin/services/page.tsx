import prisma from "@/lib/prisma";
import { Plus, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">SERVICE <span className="text-brand">NODES.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">MANAGE GROWTH CAPABILITIES AND INFRASTRUCTURE</p>
         </div>
         <Link 
            href="/admin/services/new" 
            className="h-12 px-8 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center gap-3"
         >
            <Plus size={16} />
            DEPLOY NEW NODE
         </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Capability</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Category</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Slug</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {services.map((service: any) => (
                  <tr key={service.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                              <Settings2 size={24} />
                           </div>
                           <div>
                              <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{service.title}</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted line-clamp-1 max-w-xs">{service.subtitle}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-brand">
                           {service.category}
                        </span>
                     </td>
                     <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        /{service.slug}
                     </td>
                     <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-4">
                           <Link 
                             href={`/admin/services/${service.id}`}
                             className="h-10 px-6 border border-stroke rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-brand/40 transition-colors bg-white flex items-center"
                           >
                              CONFIGURE
                           </Link>
                           <form action={deleteService.bind(null, service.id)}>
                              <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                                 <Trash2 size={16} />
                              </button>
                           </form>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {services.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No operational service nodes detected.</p>
            </div>
         )}
      </div>
    </div>
  );
}
