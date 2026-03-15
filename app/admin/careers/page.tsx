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
         <div className="space-y-2">
            <h1 className="text-3xl font-brand tracking-tight text-text-primary uppercase leading-tight">Careers</h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage job openings</p>
         </div>
         <Link 
            href="/admin/careers/new" 
            className="h-10 px-6 bg-brand text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
         >
            <Plus size={14} />
            Post Job
         </Link>
      </div>

      <div className="bg-white rounded-3xl border border-stroke overflow-x-auto shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50 text-[10px] font-brand tracking-widest text-text-muted">
                  <th className="px-8 py-4 text-left">Position</th>
                  <th className="px-8 py-4 text-left">Location</th>
                  <th className="px-8 py-4 text-left">Status</th>
                  <th className="px-8 py-4 text-right pr-10">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {jobs.map((job: any) => (
                  <tr key={job.id} className="group hover:bg-surface transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                              <Users size={20} />
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{job.title}</p>
                              <p className="text-[9px] font-brand tracking-widest text-text-muted line-clamp-1 max-w-xs">{job.department}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-[9px] font-bold uppercase tracking-widest text-text-muted">
                        {job.location}
                     </td>
                     <td className="px-8 py-6">
                        <span className={`px-3 py-1 border rounded-md text-[8px] font-bold uppercase tracking-widest ${
                           job.active 
                           ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                           : "bg-red-50 border-red-100 text-red-600"
                        }`}>
                           {job.active ? "Active" : "Inactive"}
                        </span>
                     </td>
                     <td className="px-8 py-6 text-right pr-10">
                        <div className="flex justify-end gap-3">
                           <Link 
                             href={`/admin/careers/${job.id}`}
                             className="h-9 px-4 border border-stroke rounded-lg text-[9px] font-bold uppercase tracking-widest hover:border-brand/40 transition-colors bg-white flex items-center"
                           >
                              Edit
                           </Link>
                           <form action={deleteJob.bind(null, job.id)}>
                              <button className="w-9 h-9 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                                 <Trash2 size={14} />
                              </button>
                           </form>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {jobs.length === 0 && (
            <div className="py-20 text-center">
               <p className="text-[10px] font-brand tracking-widest text-text-muted">No jobs found.</p>
            </div>
         )}
      </div>
    </div>
  );
}
