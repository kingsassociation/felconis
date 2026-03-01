import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
    Activity,
    ArrowUpRight,
    Briefcase,
    DollarSign,
    ExternalLink,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PartnerOverviewPage() {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const partner = await prisma.partner.findUnique({
    where: { id: session.id },
    include: {
      leads: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  if (!partner) {
    redirect("/portal/login");
  }

  const leadCount = await prisma.lead.count({
    where: { partnerId: partner.id }
  });

  const stats = [
    { label: "Yield Performance", val: `${partner.totalEarned?.toLocaleString() || '0'} BDT`, delta: "+2.4%", icon: DollarSign },
    { label: "Strategic Leads", val: leadCount.toString(), delta: "+1", icon: Users },
    { label: "Commission Rate", val: `${partner.commissionRate}%`, delta: "Institutional", icon: Zap },
    { label: "Pipeline Health", val: "Optimal", delta: "Active", icon: Activity },
  ];

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">COMMAND <span className="text-brand">CENTER.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">WELCOME BACK, {partner.name} • INSTITUTIONAL OVERVIEW</p>
         </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-stroke p-8 rounded-[2rem] hover:border-brand/40 transition-all group shadow-sm">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-text-muted transition-colors group-hover:text-brand">
                   <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand">{stat.delta}</span>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
             <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* ACTIVITY FEED */}
         <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">PIPELINE ACTIVITY.</h3>
               <Link href="/partner/portal/activity" className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline flex items-center gap-2">
                  View Full Feed <ArrowUpRight size={12} />
               </Link>
            </div>
            
            <div className="bg-white border border-stroke rounded-[2.5rem] overflow-hidden shadow-sm">
               <div className="p-8 border-b border-stroke bg-surface/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">RECENT REFERRED NODES</p>
               </div>
               <div className="divide-y divide-stroke">
                  {partner.leads.length > 0 ? (
                    partner.leads.map((lead: any, i: number) => (
                      <div key={i} className="p-8 flex items-center justify-between hover:bg-surface transition-colors group">
                         <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center text-brand">
                               <Briefcase size={18} />
                            </div>
                            <div>
                               <p className="text-[12px] font-black uppercase tracking-tight text-text-primary">{lead.name || "Institutional Identity"}</p>
                               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{lead.email}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <div className="text-right">
                               <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">{new Date(lead.createdAt).toLocaleDateString()}</p>
                               <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">SIGNATURE DATE</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                              lead.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                            }`}>
                               {lead.status}
                            </span>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-20 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No institutional leads detected in pipeline.</p>
                    </div>
                  )}
               </div>
            </div>
         </div>

         {/* SIDEBAR WIDGETS */}
         <div className="lg:col-span-4 space-y-12">
            <div className="bg-brand text-white p-10 rounded-[2.5rem] space-y-8 relative overflow-hidden shadow-xl shadow-brand/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">STRATEGIC SUPPORT</p>
                  <h4 className="text-2xl font-black uppercase tracking-tight">NEED PROTOCOL ASSISTANCE?</h4>
               </div>
               <p className="text-[11px] font-black uppercase tracking-widest opacity-80 leading-relaxed">
                  Your dedicated Executive Manager is ready to synchronize on complex deployments.
               </p>
               <button className="w-full h-12 bg-white text-brand rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-off-white transition-colors">
                  Contact Support Node
               </button>
            </div>

            <div className="bg-white border border-stroke p-10 rounded-[2.5rem] space-y-8 shadow-sm">
               <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">ASSET HANDOVER.</h3>
               <div className="space-y-6">
                  {[
                    { title: "Institutional Brand Kit 2025", type: "ZIP", size: "45.2 MB" },
                    { title: "Strategic Sales Playbook", type: "PDF", size: "12.8 MB" },
                  ].map((asset, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-text-muted group-hover:text-brand transition-colors">
                             <Briefcase size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-text-primary">{asset.title}</p>
                             <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">{asset.size} • {asset.type}</p>
                          </div>
                       </div>
                       <ExternalLink size={14} className="text-text-muted group-hover:text-brand transition-colors" />
                    </div>
                  ))}
               </div>
               <Link href="/partner/portal/assets" className="block text-center pt-4 border-t border-stroke text-[10px] font-black uppercase tracking-widest text-brand hover:underline">
                  View Strategic Library
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
