import prisma from "@/lib/prisma";
import { Briefcase, Download, ExternalLink, Mail, Trash2 } from "lucide-react";
import { deleteApplication } from "./actions";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: { job: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">TALENT <span className="text-brand">REVIEW.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">MANAGE INSTITUTIONAL GROWTH AND ACQUISITION NODES</p>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Applicant / Contact</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Target Position</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Credentials</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {applications.map((app: any) => (
                  <tr key={app.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold">
                              {app.name[0]}
                           </div>
                           <div>
                              <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{app.name}</p>
                              <div className="flex items-center gap-4 mt-2">
                                 <a href={`mailto:${app.email}`} title={app.email} className="text-text-muted hover:text-brand transition-colors"><Mail size={12} /></a>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                           <Briefcase size={14} className="text-brand" />
                           <p className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{app.job.title}</p>
                        </div>
                     </td>
                     <td className="px-10 py-8">
                        <div className="flex gap-4">
                           <a 
                             href={app.resume} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="h-10 px-6 bg-brand/5 border border-brand/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-brand hover:bg-brand hover:text-white transition-all flex items-center gap-2"
                           >
                              <Download size={14} />
                              RESUME
                           </a>
                           {app.portfolio && (
                             <a 
                               href={app.portfolio} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="h-10 px-6 border border-stroke rounded-lg text-[9px] font-black uppercase tracking-widest text-text-muted hover:border-brand/40 hover:text-brand transition-all flex items-center gap-2"
                             >
                                <ExternalLink size={14} />
                                PORTFOLIO
                             </a>
                           )}
                        </div>
                     </td>
                     <td className="px-10 py-8 text-right">
                        <form action={async () => {
                          "use server";
                          await deleteApplication(app.id);
                        }}>
                           <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center ml-auto">
                              <Trash2 size={16} />
                           </button>
                        </form>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {applications.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No talent acquisition requests detected in review board.</p>
            </div>
         )}
      </div>
    </div>
  );
}
