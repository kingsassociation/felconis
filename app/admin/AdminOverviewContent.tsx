"use client";

import { motion } from "framer-motion";
import {
   Activity,
   ArrowUpRight,
   Briefcase,
   FileText,
   TrendingUp,
   Users,
   Zap
} from "lucide-react";
import Link from "next/link";

interface AdminOverviewContentProps {
  stats: any[];
  recentLeads: any[];
}

export default function AdminOverviewContent({ stats, recentLeads }: AdminOverviewContentProps) {
  const ICON_MAP: Record<string, any> = {
    Zap,
    Users,
    Activity,
    TrendingUp
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">SYSTEM <span className="text-brand">OVERVIEW.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">
               DIAGNOSTIC STATUS: <span className="text-emerald-600">OPTIMAL</span> | GLOBAL SYNC ACTIVE
            </p>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {stats.map((stat: any, i: number) => {
           const Icon = ICON_MAP[stat.icon] || Zap;
           return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-stroke shadow-sm hover:border-brand transition-all group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 -mr-12 -mt-12 rounded-full group-hover:bg-brand/10 transition-colors" />
               
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                     <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">{stat.delta}</span>
               </div>
               <div className="relative z-10">
                 <h3 className="text-4xl font-brand tracking-tight mb-2 text-text-primary leading-none">{stat.val}</h3>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted group-hover:text-brand transition-colors">{stat.label}</p>
               </div>
            </motion.div>
           );
         })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Recent Leads */}
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-stroke p-10 shadow-sm space-y-10 group overflow-hidden relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-xl font-brand tracking-tight text-text-primary uppercase">Recent Leads <span className="text-brand">Pipeline.</span></h3>
               </div>
               <Link href="/admin/leads" className="text-[10px] font-bold uppercase tracking-widest text-brand hover:underline px-4 py-2 bg-brand/5 rounded-lg border border-brand/10 transition-all">View Full Pipeline</Link>
            </div>
            
            <div className="space-y-4 relative z-10">
               {recentLeads.map((lead: any) => (
                 <Link href="/admin/leads" key={lead.id} className="flex items-center justify-between p-6 rounded-2xl border border-transparent hover:border-stroke hover:bg-surface transition-all cursor-pointer group/item">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-brand font-bold text-xl uppercase group-hover/item:border-brand/20">
                          {lead.name[0]}
                       </div>
                       <div>
                          <p className="text-sm font-bold uppercase tracking-tight text-text-primary group-hover/item:text-brand transition-colors">{lead.name}</p>
                          <p className="text-[10px] font-brand tracking-widest text-text-muted">{lead.company || "INDIVIDUAL ARCHIVE"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-8">
                       <span className="hidden md:block text-[9px] font-bold uppercase tracking-widest text-text-muted bg-surface px-3 py-1 rounded-md border border-stroke">{lead.status}</span>
                       <span className="hidden sm:block text-[9px] font-bold uppercase tracking-widest text-text-muted">{new Date(lead.createdAt).toLocaleDateString()}</span>
                       <div className="w-8 h-8 rounded-lg bg-surface border border-stroke flex items-center justify-center text-text-muted group-hover/item:text-brand transition-colors">
                          <ArrowUpRight size={16} />
                       </div>
                    </div>
                 </Link>
               ))}
               {recentLeads.length === 0 && (
                 <div className="py-20 text-center space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No strategic inquiries detected in current window.</p>
                 </div>
               )}
            </div>
         </div>

         {/* System Health / Quick Actions */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-white rounded-[2.5rem] border border-stroke p-10 shadow-sm space-y-10 relative overflow-hidden">
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-xl font-brand tracking-tight text-text-primary uppercase">System <span className="text-brand">Nodes.</span></h3>
               </div>
               
               <div className="space-y-8 relative z-10">
                  {[
                    { label: "Frontend Speed", val: "98/100", status: "Healthy", color: "bg-emerald-500" },
                    { label: "API Response", val: "124ms", status: "Optimal", color: "bg-brand" },
                    { label: "SEO Indexing", val: "Active", status: "Synched", color: "bg-amber-500" }
                  ].map((node: any, i: number) => (
                    <div key={i} className="space-y-4 group">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-text-muted">{node.label}</span>
                             <p className="text-sm font-brand text-text-primary">{node.val}</p>
                          </div>
                          <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{node.status}</span>
                       </div>
                       <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden border border-stroke">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            className={`h-full ${node.color}`}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-brand rounded-[2.5rem] p-10 text-white space-y-10 shadow-xl shadow-brand/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700" />
               
               <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-brand tracking-tight leading-tight uppercase">Quick <br /> Deployment.</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">RAPID ASSET CREATION PROTOCOLS</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <Link href="/admin/careers" className="flex flex-col items-center gap-4 p-6 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10 group/btn">
                     <Briefcase size={24} className="group-hover/btn:scale-110 transition-transform" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Post Job</span>
                  </Link>
                  <Link href="/admin/blog" className="flex flex-col items-center gap-4 p-6 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10 group/btn">
                     <FileText size={24} className="group-hover/btn:scale-110 transition-transform" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">New Article</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
