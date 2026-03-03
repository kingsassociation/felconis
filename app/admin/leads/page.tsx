import { getCloudinaryUrl } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { Mail, Phone, Trash2 } from "lucide-react";
import StatusSelector from "../components/StatusSelector";
import { deleteLead, updateLeadStatusAction } from "./actions";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    include: {
      partner: {
        select: { image: true, name: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const STATUS_COLORS: Record<string, string> = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    CONTACTED: "bg-amber-50 text-amber-600 border-amber-100",
    QUALIFIED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
    ARCHIVED: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">LEAD <span className="text-brand">PIPELINE.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE STRATEGIC INQUIRIES AND CONVERSIONS</p>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-x-auto shadow-sm">
         <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
               <tr className="border-b border-stroke bg-surface/50 text-[10px] font-brand tracking-widest text-text-muted">
                  <th className="px-10 py-6 text-left">CONTACT / COMPANY</th>
                  <th className="px-10 py-6 text-left">INQUIRY DETAILS</th>
                  <th className="px-10 py-6 text-center">STATUS PROTOCOL</th>
                  <th className="px-10 py-6 text-right pr-12">ACTIONS</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {leads.map((lead: any) => (
                  <tr key={lead.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold shrink-0">
                              {lead.name[0]}
                           </div>
                            <div>
                               <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{lead.name}</p>
                               <div className="flex items-center gap-2 mt-1">
                                  {lead.partner?.image ? (
                                    <div className="w-4 h-4 rounded-full overflow-hidden border border-stroke shrink-0">
                                      <img src={getCloudinaryUrl(lead.partner.image)} alt={lead.partner.name} className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-brand/20 shrink-0" />
                                  )}
                                  <p className="text-[9px] font-brand tracking-widest text-text-muted uppercase">
                                    {lead.company || (lead.partner?.name ? `Affiliate: ${lead.partner.name}` : "Individual Archive")}
                                  </p>
                               </div>
                               <div className="flex gap-4 mt-2">
                                 <a href={`mailto:${lead.email}`} title={lead.email} className="text-text-muted hover:text-brand transition-colors"><Mail size={12} /></a>
                                 {lead.phone && <a href={`tel:${lead.phone}`} title={lead.phone} className="text-text-muted hover:text-brand transition-colors"><Phone size={12} /></a>}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8 max-w-md">
                        <p className="text-sm font-medium text-text-primary leading-relaxed line-clamp-2">{lead.message}</p>
                        <p className="text-[9px] font-brand tracking-widest text-text-muted mt-2">{new Date(lead.createdAt).toLocaleDateString()} | INCOMING SIGNAL</p>
                     </td>
                     <td className="px-10 py-8 text-center">
                        <StatusSelector 
                          id={lead.id}
                          name="status"
                          defaultValue={lead.status}
                          action={updateLeadStatusAction}
                          statusColors={STATUS_COLORS}
                          options={[
                            { value: "NEW", label: "NEW INQUIRY" },
                            { value: "CONTACTED", label: "CONTACTED" },
                            { value: "QUALIFIED", label: "QUALIFIED NODE" },
                            { value: "REJECTED", label: "ACCESS DENIED" },
                            { value: "ARCHIVED", label: "ARCHIVED" },
                          ]}
                        />
                     </td>
                     <td className="px-10 py-8 text-right pr-12">
                        <form action={deleteLead.bind(null, lead.id)}>
                           <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center ml-auto">
                              <Trash2 size={16} />
                           </button>
                        </form>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {leads.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-brand tracking-widest text-text-muted">No strategic inquiries detected in pipeline.</p>
            </div>
         )}
      </div>
    </div>
  );
}
