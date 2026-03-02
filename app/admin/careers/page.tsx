import prisma from "@/lib/prisma";
import { Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { deleteJob } from "./actions";

export default async function AdminCareersPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">TALENT <span className="text-brand">NODES.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE INSTITUTIONAL GROWTH AND ACQUISITION</p>
         </div>
         <Link 
            href="/admin/careers/new" 
            className="h-12 px-8 bg-brand text-white rounded-xl text-[10px] font-brand tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center gap-3"
         >
            <Plus size={16} />
            DEPLOY NEW NODE
         </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-x-auto shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50 text-[10px] font-brand tracking-widest text-text-muted">
                  <th className="px-10 py-6 text-left">POSITION / DEPARTMENT</th>
                  <th className="px-10 py-6 text-left">LOCATION</th>
                  <th className="px-10 py-6 text-left">NODE STATUS</th>
                  <th className="px-10 py-6 text-right pr-12">ACTIONS</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {jobs.map((job: any) => (
                  <tr key={job.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                              <Users size={24} />
                           </div>
                           <div>
                              <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{job.title}</p>
                              <p className="text-[10px] font-brand tracking-widest text-text-muted line-clamp-1 max-w-xs">{job.department}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {job.location}
                     </td>
                     <td className="px-10 py-8">
                        <span className={`px-4 py-1.5 border rounded-lg text-[9px] font-brand tracking-widest ${
                           job.active 
                           ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                           : "bg-red-50 border-red-100 text-red-600"
                        }`}>
                           {job.active ? "ACTIVE NODE" : "INACTIVE NODE"}
                        </span>
                     </td>
                     <td className="px-10 py-8 text-right pr-12">
                        <div className="flex justify-end gap-4">
                           <Link 
                             href={`/admin/careers/${job.id}`}
                             className="h-10 px-6 border border-stroke rounded-lg text-[9px] font-brand tracking-widest hover:border-brand/40 transition-colors bg-white flex items-center"
                           >
                              CONFIGURE
                           </Link>
                           <form action={deleteJob.bind(null, job.id)}>
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
         
         {jobs.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No talent nodes detected in board.</p>
            </div>
         )}
      </div>
    </div>
  );
}
