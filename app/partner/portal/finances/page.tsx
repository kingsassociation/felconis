import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Download,
    TrendingUp,
    Zap
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PartnerFinancesPage() {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const partner = await prisma.partner.findUnique({
    where: { id: session.id }
  });

  if (!partner) {
    redirect("/portal/login");
  }

  const stats = [
    { label: "Total Yield", val: `${partner.totalEarned?.toLocaleString() || '0'} BDT`, icon: DollarSign },
    { label: "Commission Rate", val: `${partner.commissionRate}%`, icon: Zap },
    { label: "Pending Payout", val: "0 BDT", icon: CreditCard },
  ];

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">FINANCIAL <span className="text-brand">PROTOCOL.</span></h1>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">REAL-TIME YIELD PERFORMANCE AND COMMISSION HISTORY</p>
         </div>
         <button className="h-12 px-8 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-brand/10">
            Request Payout <ArrowUpRight size={16} />
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat: any, i: number) => (
          <div key={i} className="bg-white border border-stroke p-8 rounded-[2rem] hover:border-brand/40 transition-all group shadow-sm">
             <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-text-muted transition-colors group-hover:text-brand mb-6">
                <stat.icon size={24} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
             <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="bg-white rounded-[2.5rem] border border-stroke overflow-hidden shadow-sm">
         <div className="p-8 border-b border-stroke bg-surface/50 flex justify-between items-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">TRANSACTION PROTOCOL AUDIT</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-brand hover:underline flex items-center gap-2">
               Download CSV <Download size={14} />
            </button>
         </div>
         <div className="divide-y divide-stroke">
            <div className="p-24 text-center">
               <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center text-brand mx-auto mb-6">
                  <TrendingUp size={32} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No institutional transactions detected in current period.</p>
               <p className="text-[8px] font-black uppercase tracking-widest text-text-muted/60 mt-2">Transactions are generated automatically upon successful project signature.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
