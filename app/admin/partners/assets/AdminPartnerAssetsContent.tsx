"use client";

import { createAsset, deleteAsset } from "@/app/admin/partners/assets/actions";
import {
   Box,
   Download,
   FileText,
   Link as LinkIcon,
   Plus,
   PlusCircle,
   Trash2,
   Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminPartnerAssetsPage({ assets }: { assets: any[] }) {
  const [isAdding, setIsAdding] = useState(false);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createAsset(formData);

    if (result.success) {
      toast.success(result.success);
      setIsAdding(false);
    } else if (result.error) {
      toast.error(result.error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Confirm institutional decommissioning of this asset?")) return;
    const result = await deleteAsset(id);
    if (result.success) {
      toast.success(result.success);
    } else if (result.error) {
      toast.error(result.error);
    }
  }

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">STRATEGIC <span className="text-brand">ASSETS.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">DEPLOY AND MANAGE INSTITUTIONAL HANDOVERS FOR PARTNERS</p>
         </div>
         <button 
           onClick={() => setIsAdding(!isAdding)}
           className="h-12 px-8 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-brand/10"
         >
            {isAdding ? "CANCEL PROTOCOL" : "PUBLISH NEW ASSET"} <Plus size={16} />
         </button>
      </div>

      {isAdding && (
         <div className="bg-white border-2 border-brand/20 rounded-[2.5rem] p-10 shadow-xl shadow-brand/5 animate-in fade-in slide-in-from-top-4 duration-500">
            <form onSubmit={handleAdd} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Asset Identity (Title)</label>
                     <input name="title" required type="text" placeholder="STRATEGIC SALES PLAYBOOK" className="input-field h-14 px-6 text-sm font-bold uppercase transition-all" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Category Protocol</label>
                     <select name="category" required className="input-field h-14 px-6 text-sm font-bold uppercase transition-all appearance-none">
                        <option value="BRAND_KIT">BRAND KIT</option>
                        <option value="SALES_TOOL">SALES TOOL</option>
                        <option value="TECHNICAL_SPEC">TECHNICAL SPEC</option>
                        <option value="LEGAL_DOCUMENT">LEGAL DOCUMENT</option>
                     </select>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Asset Size (e.g. 12.5 MB)</label>
                     <input name="size" required type="text" placeholder="12.5 MB" className="input-field h-14 px-6 text-sm font-bold uppercase transition-all" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">File Type (e.g. PDF, ZIP)</label>
                     <input name="type" required type="text" placeholder="PDF" className="input-field h-14 px-6 text-sm font-bold uppercase transition-all" />
                  </div>
                  <div className="space-y-3 lg:col-span-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-brand ml-1">Strategic URL (Download Link)</label>
                     <div className="relative group">
                        <input name="url" required type="url" placeholder="HTTPS://FELCONIS.COM/ASSETS/..." className="input-field h-14 pl-12 pr-6 text-sm font-bold uppercase transition-all" />
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand" size={18} />
                     </div>
                  </div>
               </div>
               <div className="pt-4 flex justify-end">
                  <button type="submit" className="h-14 px-12 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center gap-3">
                     SYNCHRONIZE ASSET <PlusCircle size={18} />
                  </button>
               </div>
            </form>
         </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-surface/50 border-b border-stroke">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Strategic Asset</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Category</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Identity Metadata</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right pr-12">Protocol Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {assets.length > 0 ? (
                 assets.map((asset: any, i: number) => (
                    <tr key={i} className="group hover:bg-surface transition-colors">
                       <td className="px-10 py-8">
                          <div className="flex gap-6">
                             <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                                {asset.type === 'ZIP' ? <Box size={20} /> : <FileText size={20} />}
                             </div>
                             <div>
                                <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{asset.title}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">VERSION 2025.01</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="px-4 py-1.5 bg-brand/5 text-brand rounded-lg text-[8px] font-black uppercase tracking-widest border border-brand/10">
                             {asset.category.replace('_', ' ')}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">{asset.size}</p>
                          <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">{asset.type} PROTOCOL</p>
                       </td>
                       <td className="px-10 py-8 text-right pr-12">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <a href={asset.url} target="_blank" className="w-10 h-10 rounded-lg bg-white border border-stroke flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all">
                                <Download size={16} />
                             </a>
                             <button 
                               onClick={() => handleDelete(asset.id)}
                               className="w-10 h-10 rounded-lg bg-white border border-stroke flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-200 transition-all"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))
               ) : (
                 <tr>
                    <td colSpan={4} className="py-24 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No strategic assets detected in institutional library.</p>
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>

      <div className="p-10 bg-brand text-white rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-brand/10">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
               <Zap size={24} />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-tight">Institutional Distribution Protocol</p>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Assets are automatically synchronized to all verified Partner Hubs.</p>
            </div>
         </div>
         <button className="h-12 px-8 bg-white text-brand text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-off-white transition-colors">
            Audit Distribution
         </button>
      </div>
    </div>
  );
}
