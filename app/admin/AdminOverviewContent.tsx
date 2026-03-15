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
  adminName: string;
}

export default function AdminOverviewContent({ stats, recentLeads, adminName }: AdminOverviewContentProps) {
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
         <div className="space-y-2">
            <h1 className="text-3xl font-brand tracking-tight text-text-primary uppercase leading-tight">Dashboard</h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">
               Welcome back, {adminName}
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">{stat.delta}</span>
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
         <div className="lg:col-span-8 bg-white rounded-3xl border border-stroke p-8 shadow-sm space-y-8 overflow-hidden relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <Users size={20} />
                  </div>
                  <h3 className="text-xl font-brand tracking-tight text-text-primary uppercase">Recent Leads</h3>
               </div>
               <Link href="/admin/leads" className="text-[10px] font-bold uppercase tracking-widest text-brand hover:underline px-4 py-2 bg-brand/5 rounded-lg border border-brand/10 transition-all">View All</Link>
            </div>
            
            <div className="space-y-2 relative z-10">
               {recentLeads.map((lead: any) => (
                 <Link href="/admin/leads" key={lead.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-surface transition-all cursor-pointer group/item">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-surface border border-stroke flex items-center justify-center text-brand font-bold text-lg uppercase group-hover/item:border-brand/20">
                          {lead.name[0]}
                       </div>
                       <div>
                          <p className="text-xs font-bold uppercase tracking-tight text-text-primary group-hover/item:text-brand transition-colors">{lead.name}</p>
                          <p className="text-[9px] font-brand tracking-widest text-text-muted">{lead.company || "Individual"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <span className="hidden md:block text-[8px] font-bold uppercase tracking-widest text-text-muted px-2 py-1 rounded bg-surface border border-stroke">{lead.status}</span>
                       <span className="hidden sm:block text-[8px] font-bold uppercase tracking-widest text-text-muted">{new Date(lead.createdAt).toLocaleDateString()}</span>
                       <ArrowUpRight size={14} className="text-text-muted group-hover/item:text-brand transition-all" />
                    </div>
                 </Link>
               ))}
               {recentLeads.length === 0 && (
                 <div className="py-20 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No recent inquiries.</p>
                 </div>
               )}
            </div>
         </div>

         {/* Stats / Quick Actions */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-white rounded-3xl border border-stroke p-8 shadow-sm space-y-8 relative overflow-hidden">
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-xl font-brand tracking-tight text-text-primary uppercase">Performance</h3>
               </div>
               
               <div className="space-y-6 relative z-10">
                  {[
                    { label: "Frontend Speed", val: "98/100", status: "Good", color: "bg-emerald-500" },
                    { label: "API Response", val: "124ms", status: "Optimal", color: "bg-brand" },
                    { label: "Indexing", val: "Active", status: "Sync", color: "bg-amber-500" }
                  ].map((node: any, i: number) => (
                    <div key={i} className="space-y-2 group">
                       <div className="flex justify-between items-end">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-text-muted">{node.label}</span>
                          <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-600">{node.status}</span>
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

            <div className="bg-brand rounded-3xl p-8 text-white space-y-8 shadow-xl shadow-brand/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700" />
               
               <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-brand tracking-tight leading-tight uppercase">Quick Actions</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Deploy New Assets</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <Link href="/admin/careers" className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 group/btn">
                     <Briefcase size={20} className="group-hover/btn:scale-110 transition-transform" />
                     <span className="text-[8px] font-bold uppercase tracking-widest">Post Job</span>
                  </Link>
                  <Link href="/admin/blog" className="flex flex-col items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-all rounded-xl border border-white/10 group/btn">
                     <FileText size={20} className="group-hover/btn:scale-110 transition-transform" />
                     <span className="text-[8px] font-bold uppercase tracking-widest">New Article</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
