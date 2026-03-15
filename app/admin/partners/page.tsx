import { getCloudinaryUrl } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { ExternalLink, Mail, MessageSquare, Phone, Save, Trash2 } from "lucide-react";
import StatusSelector from "../components/StatusSelector";
import { deletePartner, updatePartnerFinance, updatePartnerStatus } from "./actions";

export default async function AdminPartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const STATUS_COLORS: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-600 border-amber-100",
    REVIEWING: "bg-blue-50 text-blue-600 border-blue-100",
    APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">PARTNER <span className="text-brand">NETWORK.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE PARTNER ACCOUNTS, COMMISSION RATES, AND STATUS</p>
         </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-x-auto shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50 text-[10px] font-brand tracking-widest text-text-muted">
                  <th className="px-10 py-6 text-left">PARTNER PROFILE</th>
                  <th className="px-10 py-6 text-left">FINANCIAL SETTINGS</th>
                  <th className="px-10 py-6 text-center">ACCOUNT STATUS</th>
                  <th className="px-10 py-6 text-right pr-12">ACTIONS</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {partners.map((partner: any) => (
                  <tr key={partner.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand font-bold shrink-0 overflow-hidden">
                               {partner.image ? (
                                 <img src={getCloudinaryUrl(partner.image)} alt={partner.name} className="w-full h-full object-cover" />
                               ) : (
                                 partner.name[0]
                               )}
                           </div>
                           <div>
                              <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{partner.name}</p>
                              <p className="text-[9px] font-brand tracking-widest text-text-muted">PARTNER ID: {partner.id.slice(0, 8)}</p>
                              <div className="flex gap-4 mt-2">
                                 <a href={`mailto:${partner.email}`} title={partner.email} className="text-text-muted hover:text-brand transition-colors"><Mail size={12} /></a>
                                 <a href={`tel:${partner.phone}`} title={partner.phone} className="text-text-muted hover:text-brand transition-colors"><Phone size={12} /></a>
                                 {partner.whatsapp && <a href={`https://wa.me/${partner.whatsapp}`} target="_blank" className="text-text-muted hover:text-brand transition-colors"><MessageSquare size={12} /></a>}
                              </div>
                           </div>
                        </div>
                     </td>
                     
                     <td className="px-10 py-8">
                        <form action={updatePartnerFinance} className="flex items-center gap-4 group/form">
                           <input type="hidden" name="id" value={partner.id} />
                           <div className="space-y-1">
                              <label className="text-[8px] font-bold uppercase tracking-widest text-text-muted">Commission %</label>
                              <input 
                                name="commissionRate"
                                type="number" 
                                step="0.1"
                                defaultValue={partner.commissionRate || 10}
                                className="w-20 h-8 bg-surface border border-stroke rounded-md px-2 text-[10px] font-bold outline-none focus:border-brand/40"
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[8px] font-bold uppercase tracking-widest text-text-muted">Total Earned (BDT)</label>
                              <input 
                                name="totalEarned"
                                type="number" 
                                defaultValue={partner.totalEarned || 0}
                                className="w-24 h-8 bg-surface border border-stroke rounded-md px-2 text-[10px] font-bold outline-none focus:border-brand/40"
                              />
                           </div>
                           <button 
                             type="submit"
                             className="mt-4 p-2 text-text-muted hover:text-brand transition-colors opacity-0 group-hover/form:opacity-100"
                             title="Save Finance"
                           >
                              <Save size={14} />
                           </button>
                        </form>
                     </td>

                     <td className="px-10 py-8 text-center">
                          <StatusSelector 
                            id={partner.id}
                            name="status"
                            defaultValue={partner.status}
                            action={updatePartnerStatus}
                            statusColors={STATUS_COLORS}
                            options={[
                              { value: "PENDING", label: "PENDING" },
                              { value: "REVIEWING", label: "UNDER REVIEW" },
                              { value: "APPROVED", label: "APPROVED" },
                              { value: "REJECTED", label: "REJECTED" },
                            ]}
                          />
                      </td>
                     
                      <td className="px-10 py-8 text-right pr-12">
                        <div className="flex justify-end gap-3">
                            <a 
                              href={`/admin/partners/${partner.id}`}
                              className="w-10 h-10 border border-stroke rounded-lg text-text-muted hover:text-brand hover:border-brand/40 transition-all flex items-center justify-center"
                            >
                               <ExternalLink size={16} />
                            </a>
                            <form action={deletePartner}>
                               <input type="hidden" name="id" value={partner.id} />
                               <button 
                                 type="submit"
                                 className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </form>
                        </div>
                      </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {partners.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No partners found.</p>
            </div>
         )}
      </div>
    </div>
  );
}
