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
         <div className="space-y-2">
            <h1 className="text-3xl font-brand tracking-tight text-text-primary uppercase leading-tight">Executive Team</h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage leadership profiles</p>
         </div>
         <Link href="/admin/team/new" className="h-10 px-6 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <Plus size={14} /> Add Member
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {team.map((member: any) => (
            <div key={member.id} className="bg-white border border-stroke rounded-3xl overflow-hidden group hover:border-brand/40 transition-all shadow-sm flex flex-col">
               <div className="aspect-[4/5] relative bg-surface border-b border-stroke overflow-hidden">
                  {member.image ? (
                    <img 
                      src={getCloudinaryUrl(member.image)} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand/20">
                       <User size={60} />
                    </div>
                  )}
               </div>
               <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                     <h3 className="text-lg font-brand tracking-tight text-text-primary uppercase">{member.name}</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-0.5">{member.role}</p>
                  </div>
                  <div className="flex gap-3">
                     <Link href={`/admin/team/${member.id}`} className="flex-grow h-10 border border-stroke rounded-lg text-[9px] font-bold uppercase tracking-widest text-text-muted hover:border-brand hover:text-brand hover:bg-brand/5 transition-all flex items-center justify-center">
                        Edit
                     </Link>
                     <form action={deleteTeamMember.bind(null, member.id)}>
                        <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                           <Trash2 size={16} />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         ))}
      </div>
      
      {team.length === 0 && (
        <div className="py-20 text-center">
           <p className="text-[10px] font-brand tracking-widest text-text-muted">No team members found.</p>
        </div>
      )}
    </div>
  );
}
