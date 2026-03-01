import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
    Box,
    Download,
    ExternalLink,
    FileText,
    Filter,
    Search,
    Zap
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PartnerAssetsPage() {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const assets = await prisma.asset.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">STRATEGIC <span className="text-brand">LIBRARY.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">PRIVATE ACCESS TO INSTITUTIONAL BRAND ASSETS AND SPECS</p>
         </div>
         <div className="flex gap-4">
            <div className="relative group">
               <input type="text" placeholder="Search Assets..." className="h-12 w-64 bg-white border border-stroke rounded-xl pl-12 pr-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-brand/40 transition-all shadow-sm" />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={16} />
            </div>
            <button className="w-12 h-12 bg-white border border-stroke rounded-xl flex items-center justify-center text-text-muted hover:text-brand transition-all shadow-sm">
               <Filter size={18} />
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {assets.length > 0 ? (
           assets.map((asset: any, i: number) => (
              <div key={i} className="bg-white border border-stroke rounded-[2.5rem] p-10 hover:border-brand/40 transition-all group shadow-sm flex flex-col justify-between">
                 <div className="space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="w-14 h-14 rounded-2xl bg-brand/5 flex items-center justify-center text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          {asset.type === 'ZIP' ? <Box size={28} /> : <FileText size={28} />}
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{asset.size}</span>
                    </div>
                    <div>
                       <h3 className="text-lg font-black uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{asset.title}</h3>
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">{asset.category.replace('_', ' ')} • {asset.type}</p>
                    </div>
                 </div>

                 <div className="mt-10 pt-8 border-t border-stroke flex items-center justify-between">
                    <a href={asset.url} target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand hover:underline">
                       <ExternalLink size={14} /> View Asset
                    </a>
                    <a href={asset.url} download className="h-10 w-10 rounded-xl bg-surface flex items-center justify-center text-text-muted hover:text-brand transition-colors">
                       <Download size={16} />
                    </a>
                 </div>
              </div>
           ))
         ) : (
            <div className="col-span-full py-24 text-center">
               <div className="w-20 h-20 bg-brand/5 rounded-3xl flex items-center justify-center text-brand mx-auto mb-8">
                  <Box size={40} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No strategic assets detected in institutional library.</p>
               <p className="text-[8px] font-black uppercase tracking-widest text-text-muted/60 mt-2">The Executive Board publishes handovers here once protocols are finalized.</p>
            </div>
         )}
      </div>

      <div className="p-10 bg-surface border border-stroke rounded-[2.5rem] flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/10">
               <Zap size={24} />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-tight text-text-primary">Institutional Sovereignty</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">All assets are provided under the Felconis Operational Agreement.</p>
            </div>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline">
            Request Custom Spec
         </button>
      </div>
    </div>
  );
}
