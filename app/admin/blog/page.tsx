import { getCloudinaryUrl } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { FileText, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await prisma.blog.findMany({
    include: { 
      category: true,
      author: true 
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
         <div className="space-y-4">
            <h1 className="text-4xl font-brand tracking-tight text-text-primary uppercase leading-tight">INTELLIGENCE <span className="text-brand">ARCHIVE.</span></h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest bg-surface px-4 py-2 border border-stroke rounded-lg inline-block">MANAGE INSTITUTIONAL BROADCASTS AND INSIGHTS</p>
         </div>
         <Link 
            href="/admin/blog/new" 
            className="h-12 px-8 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-brand/10 flex items-center gap-3"
         >
            <Plus size={16} />
            BROADCAST INTEL
         </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Publication / Analysis</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Sector</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Author</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {posts.map((post: any) => (
                  <tr key={post.id} className="group hover:bg-surface transition-colors">
                     <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                              <FileText size={24} />
                           </div>
                           <div>
                              <p className="text-sm font-bold uppercase tracking-tight text-text-primary">{post.title}</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted line-clamp-1 max-w-xs">{post.createdAt.toLocaleDateString()}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-brand">
                           {post.category.name}
                        </span>
                     </td>
                      <td className="px-10 py-8">
                         <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-surface border border-stroke overflow-hidden flex items-center justify-center text-brand font-bold text-[8px] shrink-0">
                               {post.author.image ? (
                                  <img src={getCloudinaryUrl(post.author.image)} alt={post.author.name} className="w-full h-full object-cover" />
                               ) : (
                                  post.author.name?.[0] || 'A'
                               )}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{post.author.name}</span>
                         </div>
                      </td>
                     <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-4">
                           <Link 
                             href={`/admin/blog/${post.id}`}
                             className="h-10 px-6 border border-stroke rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-brand/40 transition-colors bg-white flex items-center"
                           >
                              CONFIGURE
                           </Link>
                           <form action={deleteBlogPost.bind(null, post.id)}>
                              <button className="w-10 h-10 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                                 <Trash2 size={16} />
                              </button>
                           </form>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {posts.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No intelligence nodes detected in archive.</p>
            </div>
         )}
      </div>
    </div>
  );
}
