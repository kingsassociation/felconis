import { getCloudinaryUrl } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { Plus, Trash2, User } from "lucide-react";
import Link from "next/link";
import { deleteTeamMember } from "../actions";

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">LEADERSHIP <span className="text-brand">BOARD.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE INSTITUTIONAL LEADERSHIP AND STRATEGIC NODES</p>
         </div>
         <Link href="/admin/team/new" className="h-12 px-8 bg-brand text-white text-[10px] font-brand tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-brand/10">
            <Plus size={16} /> DEPLOY LEADER
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {team.map((member: any) => (
            <div key={member.id} className="bg-white border border-stroke rounded-[2rem] overflow-hidden group hover:border-brand/40 transition-all shadow-sm flex flex-col">
               <div className="aspect-[4/5] relative bg-surface border-b border-stroke overflow-hidden">
                  {member.image ? (
                    <img 
                      src={getCloudinaryUrl(member.image)} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand/20">
                       <User size={80} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-stroke opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-[8px] font-bold uppercase tracking-widest text-brand">ACTIVE NODE</p>
                  </div>
               </div>
               <div className="p-10 space-y-6 flex-grow flex flex-col justify-between">
                  <div>
                     <h3 className="text-xl font-brand tracking-tight text-text-primary uppercase">{member.name}</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-1">{member.role}</p>
                  </div>
                  <div className="flex gap-4">
                     <Link href={`/admin/team/${member.id}`} className="flex-grow h-12 border border-stroke rounded-xl text-[10px] font-brand tracking-widest text-text-muted hover:border-brand hover:text-brand hover:bg-brand/5 transition-all flex items-center justify-center">
                        CONFIGURE
                     </Link>
                     <form action={async () => {
                       "use server";
                       await deleteTeamMember(member.id);
                     }}>
                        <button className="w-12 h-12 border border-stroke rounded-xl text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                           <Trash2 size={18} />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         ))}
      </div>
      
      {team.length === 0 && (
        <div className="py-20 text-center space-y-4">
           <p className="text-[10px] font-brand tracking-widest text-text-muted">No leadership nodes deployed in the record.</p>
        </div>
      )}
    </div>
  );
}
