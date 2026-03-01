import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
    Calendar,
    Filter,
    Search
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PartnerActivityPage() {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const leads = await prisma.lead.findMany({
    where: { partnerId: session.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">LEAD <span className="text-brand">PIPELINE.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">TRANSPARENT TRACKING OF INSTITUTIONAL REFERRALS</p>
         </div>
         <div className="flex gap-4">
            <div className="relative group">
               <input type="text" placeholder="Search Identity..." className="h-12 w-64 bg-white border border-stroke rounded-xl pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-brand/40 transition-all shadow-sm" />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={16} />
            </div>
            <button className="w-12 h-12 bg-white border border-stroke rounded-xl flex items-center justify-center text-text-muted hover:text-brand transition-all shadow-sm">
               <Filter size={18} />
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-surface/50 border-b border-stroke">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Lead Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Signature Date</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Protocol Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right pr-12">Details</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
                 {leads.length > 0 ? (
                   leads.map((lead: any, i: number) => (
                      <tr key={i} className="group hover:bg-surface transition-colors">
                       <td className="px-10 py-8">
                          <div className="flex gap-6">
                             <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center text-brand font-bold text-xs">
                                {lead.name ? lead.name[0] : 'L'}
                             </div>
                             <div>
                                <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{lead.name || "Institutional Identity"}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{lead.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3 text-text-muted">
                             <Calendar size={14} />
                             <span className="text-[10px] font-black uppercase tracking-widest">{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                            lead.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            lead.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                             {lead.status}
                          </span>
                       </td>
                       <td className="px-10 py-8 text-right pr-12">
                          <button className="text-[9px] font-black uppercase tracking-widest text-brand hover:underline">
                             Audit Protocol
                          </button>
                       </td>
                    </tr>
                 ))
               ) : (
                 <tr>
                    <td colSpan={4} className="py-24 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No institutional leads detected in active pipeline.</p>
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
