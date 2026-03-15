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
         <div className="space-y-2">
            <h1 className="text-3xl font-brand tracking-tight text-text-primary uppercase leading-tight">Blog Archive</h1>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Manage insights and news</p>
         </div>
         <Link 
            href="/admin/blog/new" 
            className="h-10 px-6 bg-brand text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
         >
            <Plus size={14} />
            New Post
         </Link>
      </div>

      <div className="bg-white rounded-3xl border border-stroke overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-stroke bg-surface/50 text-[10px] font-brand tracking-widest text-text-muted">
                  <th className="px-8 py-4">Publication</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Author</th>
                  <th className="px-8 py-4 text-right pr-10">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
               {posts.map((post: any) => (
                  <tr key={post.id} className="group hover:bg-surface transition-colors">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-brand/5 border border-brand/10 flex items-center justify-center text-brand">
                              <FileText size={20} />
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-tight text-text-primary group-hover:text-brand transition-colors">{post.title}</p>
                              <p className="text-[9px] font-brand tracking-widest text-text-muted">{post.createdAt.toLocaleDateString()}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-brand/10 rounded-md text-[8px] font-bold uppercase tracking-widest text-brand">
                           {post.category.name}
                        </span>
                     </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-surface border border-stroke overflow-hidden flex items-center justify-center text-brand font-bold text-[8px] shrink-0">
                               {post.author.image ? (
                                  <img src={getCloudinaryUrl(post.author.image)} alt={post.author.name} className="w-full h-full object-cover" />
                               ) : (
                                  post.author.name?.[0] || 'A'
                               )}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{post.author.name}</span>
                         </div>
                      </td>
                     <td className="px-8 py-6 text-right pr-10">
                        <div className="flex justify-end gap-3">
                           <Link 
                             href={`/admin/blog/${post.id}`}
                             className="h-9 px-4 border border-stroke rounded-lg text-[9px] font-bold uppercase tracking-widest hover:border-brand/40 transition-colors bg-white flex items-center"
                           >
                              Edit
                           </Link>
                           <form action={deleteBlogPost.bind(null, post.id)}>
                              <button className="w-9 h-9 border border-stroke rounded-lg text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center">
                                 <Trash2 size={14} />
                              </button>
                           </form>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         
         {posts.length === 0 && (
            <div className="py-20 text-center">
               <p className="text-[10px] font-brand tracking-widest text-text-muted">No posts found.</p>
            </div>
         )}
      </div>
    </div>
  );
}
